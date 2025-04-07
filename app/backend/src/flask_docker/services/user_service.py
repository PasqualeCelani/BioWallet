import sys
sys.path.append('../') 
import flask_docker.util.recognition as recognition
import flask_docker.dao.user_dao as dao
import flask_docker.util.crypto as crypto
import jwt
import datetime


def verify(id, image):
    user = dao.get_user_by_id(id)
    if user  == None:
        raise Exception(f"The identity {id} is not pressent in the system.")
    
    qualities = recognition.images_quality([image])
    for i in range(1, len(qualities)):
        if qualities[i][0] < 0.30:
            raise Exception(f"The image {qualities[i][1]+1} has poor quality. \
            Please try to align the face with the camera and maintain an appropriate distance, similar to a passport photo.")
        
    probe = recognition.get_embeeding_from_image(image)
    count = 0
    print("I am HERE!")
    for template in user["templates"]:
        similarity = recognition.get_simmilarity(probe, template)
        if similarity < 0.81:
           count += 1
    
    if count == len(user["templates"]):
        raise Exception(f"The provided image is not of the given identity")
    
    token = jwt.encode(
        {
            'user_id': id,
            'exp': datetime.datetime.now() + datetime.timedelta(hours=1)
        }, 
        "sjfdjfJsbhasUik!u3y^^^^&623", algorithm='HS256'
    )

    return token
     

def enroll(id, images):
    data = {
        "id" : id,
        "templates" : [],
        "keys" : []
    }

    if dao.get_user_by_id(id) != None:
        raise Exception(f"The identity {id} is already pressent in the system.") 
    
    qualities = recognition.images_quality(images)
    for i in range(1, len(qualities)):
        if qualities[i][0] < 0.30:
            raise Exception(f"The image {qualities[i][1]+1} has poor quality. \
            Please try to align the face with the camera and maintain an appropriate distance, similar to a passport photo.") 

    for img in images:
        templates = recognition.get_embeeding_from_image(img)
        data["templates"].append(templates)

    for i in range(0, 5):
        sk = crypto.generate_private_key()
        pk = crypto.generate_public_key(sk)
        data["keys"].append(
            {"pubblic_key" : pk, "private_key" : sk}
        )

    dao.insert_user(data)

def keys(id):
    return dao.get_user_by_id(id)["keys"]
