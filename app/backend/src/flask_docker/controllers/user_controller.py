from flask import Blueprint, request, jsonify

import traceback

import sys
sys.path.append('../') 
import flask_docker.services.user_service as service


user_bp = Blueprint("user", __name__)

@user_bp.route('/verify', methods=['POST'])
def verify():
    data = request.get_json()

    bad_input_req = {
        "error" : {
            "code": 400,
            "message": "Bad Request"
        }
    }

    id = data["id"]
    if id == "":
        return jsonify(bad_input_req), 400

    image = data["image"]
    if image == "":
        return jsonify(bad_input_req), 400
    
    service.verify(id, image)
    
    return '', 200

@user_bp.route('/enroll', methods=['POST'])
def enroll():
    data = request.get_json()

    bad_input_req = {
        "error" : {
            "code": 400,
            "message": ""
        }
    }
    id = data["id"]

    if id == "":
        bad_input_req["error"]["message"] = "The id field is mandatory and could not be empthy"
        return jsonify(bad_input_req), 400

    images = data["images"]
    if len(images) == 0:
        bad_input_req["error"]["message"] = "The images field is mandatory and could not be empthy"
        return jsonify(bad_input_req), 400
    
    error = False
    error_resp = {
        "error" : {
            "code": 500,
            "message": ""
        }
    }

    try:
        service.enroll(id, images)
    except Exception as e:
        traceback.print_exc()
        error = True
        error_resp["error"]["message"] = str(e)


    if error:
        return jsonify(error_resp), 500

    return '', 200
    

