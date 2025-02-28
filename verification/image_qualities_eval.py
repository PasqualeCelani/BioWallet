import argparse
import cv2
from deepface import DeepFace
import numpy as np
import utils
import os
from tensorflow.keras.models import load_model

def get_qualities(dataset_path, name_file):
    model = load_model("../models/FaceQnet_v1.h5")
    faces = []
    root_directory = dataset_path
    for dir in os.listdir(root_directory):
        if dir.startswith("."):
            continue
        directory = root_directory+"/"+dir
        if not os.path.isdir(directory):
            continue
        for image in os.listdir(directory):
            if (image.endswith(".png") or image.endswith(".pgm")) and not image.startswith("."):
                img_path = directory+"/"+image
                img_label = dir+"_"+image.split(".")[0]
                img_cv = cv2.imread(img_path, cv2.IMREAD_COLOR)
                try:
                    face_box = DeepFace.extract_faces(img_path=img_path , detector_backend = "mtcnn")[0]["facial_area"]
                    padding = 0 
                    y1 = max(face_box["y"] - padding, 0)
                    y2 = min(face_box["y"] + face_box["h"] + padding, img_cv.shape[0])
                    x1 = max(face_box["x"] - padding, 0)
                    x2 = min(face_box["x"] + face_box["w"] + padding, img_cv.shape[1])
                    cropped_face = img_cv[y1:y2, x1:x2]
                    cropped_face_resized = cv2.resize(cropped_face, (224, 224))
                    faces.append((cropped_face_resized, img_label))
                except:
                    None
    y = np.array([f[0] for f in faces], copy=False, dtype=np.float32)
    score = model.predict(y, batch_size=1, verbose=1)
    result = [["image", "score"]]
    for i in range(len(score)):
        result.append([score[i][0], faces[i][1]])
    utils.save_to_csv("./DatasetQualityScores/"+name_file, result)

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--dataset", type=str, required=True)
    parser.add_argument("--output_file_name", type=str, required=True)

    args = parser.parse_args()

    dataset = args.dataset
    if not os.path.isdir(dataset):
        raise Exception("the dateset argoument requires a valid directory")
    
    output_file_name = args.output_file_name

    get_qualities(dataset, output_file_name)


if __name__ == "__main__":
    main()