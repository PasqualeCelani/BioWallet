from deepface import DeepFace
import numpy as np
import cv2
import base64
from tensorflow.keras.models import load_model

def get_embeeding_from_image(img):
    embedding = DeepFace.represent(
        img_path = img,
        model_name = "Facenet512",
        enforce_detection=True,
        detector_backend="retinaface",
        align=True
    )[0]['embedding']
    return embedding

def images_quality(imgs):
    model = load_model("./util/models/FaceQnet_v1.h5")
    faces = []
    result = [["image", "score"]]
    for i in range(len(imgs)):
        data = imgs[i].split(',')[1]
        image_bytes = base64.b64decode(data)
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        img_cv = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        try:
            face_box = DeepFace.extract_faces(img_path=imgs[i] , detector_backend = "mtcnn")[0]["facial_area"]
            padding = 0 
            y1 = max(face_box["y"] - padding, 0)
            y2 = min(face_box["y"] + face_box["h"] + padding, img_cv.shape[0])
            x1 = max(face_box["x"] - padding, 0)
            x2 = min(face_box["x"] + face_box["w"] + padding, img_cv.shape[1])
            cropped_face = img_cv[y1:y2, x1:x2]
            cropped_face_resized = cv2.resize(cropped_face, (224, 224))
            faces.append((cropped_face_resized, i))
        except:
            result.append([0, i])
    y = np.array([f[0] for f in faces], copy=False, dtype=np.float32)
    score = model.predict(y, batch_size=1, verbose=1)
    for i in range(len(score)):
        result.append([score[i][0], faces[i][1]])
    return result

def get_simmilarity(embedding1, embedding2):
    similarity = np.dot(
            np.array(embedding1), 
            np.array(embedding2)
        )/(np.linalg.norm(np.array(embedding1))*np.linalg.norm(np.array(embedding2))
    )
    minx = -1 
    maxx = 1
    normalize_similarity = (similarity-minx)/(maxx-minx)
    return normalize_similarity     
    
