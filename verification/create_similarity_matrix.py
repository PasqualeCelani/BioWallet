import argparse
import os

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






if __name__ == "__main__":
    main()