from deepface import DeepFace
import numpy as np


def get_embeddings_similarity(img1_path, img2_path, model, detector):
    embedding1 = DeepFace.represent(
        img_path = img1_path,
        model_name = model,
        enforce_detection=True,
        detector_backend=detector,
        align=True
    )[0]['embedding']
    embedding2 = DeepFace.represent(
        img_path = img2_path,
        model_name = model,
        enforce_detection=True,
        detector_backend=detector,
        align=True
    )[0]['embedding']
    similarity = np.dot(
            np.array(embedding1), 
            np.array(embedding2)
        )/(np.linalg.norm(np.array(embedding1))*np.linalg.norm(np.array(embedding2))
    )
    minx = -1 
    maxx = 1
    normalize_similarity = (similarity-minx)/(maxx-minx)
    return normalize_similarity