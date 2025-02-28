import argparse
import os
import utils
from random import randrange

import sys
sys.path.append('../') 
from src.bio_wallet import recognition

def create_similarity_matrix(dataset_path, model, detector, name_file):
    similarity_metrix = [
       ["Probes"]
    ]
    root_directory = dataset_path
    probes = []
    galery = []
    for dir in os.listdir(root_directory):
      if dir.startswith("."):
        continue
      directory = root_directory+"/"+dir
      if not os.path.isdir(directory):
        continue
      images_in_dir = len([img for img in os.listdir(directory) if not img.startswith(".")])
      probe_template = randrange(1, images_in_dir)
      for image in os.listdir(directory):
        if (image.endswith(".png") or image.endswith(".pgm")) and not image.startswith("."):
            img_path = directory+"/"+image
            img_label = dir+"_"+image.split(".")[0]
            if(int(image.split(".")[0]) == probe_template):
                probes.append((img_path, img_label))
            else:
               galery.append((img_path, img_label))
               similarity_metrix[0].append(img_label)
    print("Galery and Probes have been calculated")
    counter = 0
    required_calcolus = len(probes)*len(galery)
    for p in probes:
        probe_similarity = [p[1]]
        for g in galery:
            similarity = None
            try:
                similarity = recognition.get_embeddings_similarity(p[0],g[0],model, detector)
            except:
               similarity = 0 #Face not detected
            counter+=1
            print(f"Progress: {round(counter/required_calcolus,2)*100}%", end="\r")
            probe_similarity.append(similarity)
        similarity_metrix.append(probe_similarity)
    print("Save to CSV ...")         
    utils.save_to_csv("./SimilarityMatrixes/"+name_file, similarity_metrix)
    print("Complete!")

def main():
    parser = argparse.ArgumentParser()
    
    parser.add_argument("--dataset", type=str, required=True)
    parser.add_argument("--model", type=str, required=True)
    parser.add_argument("--face_detector", type=str, required=True)
    parser.add_argument("--output_file_name", type=str, required=True)


    args = parser.parse_args()

    dataset = args.dataset
    if not os.path.isdir(dataset):
        raise Exception("the dateset argoument requires a valid directory")
    
    valid_models = [
        "VGG-Face", 
        "Facenet", 
        "Facenet512", 
        "OpenFace", 
        "DeepFace", 
        "DeepID", 
        "ArcFace", 
        "Dlib", 
        "SFace",
        "GhostFaceNet"
    ]
    model = args.model
    if model not in valid_models:
        raise Exception(f"the model argoument must be one of the following: {', '.join(map(str, valid_models))}")

    valid_detectors = [
        'opencv', 
        'ssd', 
        'dlib', 
        'mtcnn', 
        'fastmtcnn',
        'retinaface', 
        'mediapipe',
        'yolov8',
        'yolov11s',
        'yolov11n',
        'yolov11m',
        'yunet',
        'centerface',
    ]
    face_detector = args.face_detector
    if face_detector not in valid_detectors:
        raise Exception(f"the face detector argoument must be one of the following: {', '.join(map(str, valid_detectors))}")
    
    output_file_name = args.output_file_name
    create_similarity_matrix(dataset, model, face_detector, output_file_name)


if __name__ == "__main__":
    main()