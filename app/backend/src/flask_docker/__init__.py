from flask_docker.controllers import register_routes
from flask import Flask

def create_app():
    app = Flask(__name__)
    register_routes(app)
    return app