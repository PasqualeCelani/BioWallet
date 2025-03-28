import sys
sys.path.append('../') 
import flask_docker.util.recognition as recognition
import flask_docker.dao.user_dao as dao

def verify(id, image):
    probe = recognition.get_embeeding_from_image(image)

def enroll(id, images):
    data = {
        "id" : id,
        "templates" : []
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

    dao.insert_user(data)
