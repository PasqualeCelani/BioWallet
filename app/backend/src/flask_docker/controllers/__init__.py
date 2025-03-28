from .user_controller import user_bp
from flask_cors import CORS 

def register_routes(app):
    CORS(app)
    app.register_blueprint(user_bp, url_prefix='/api/users')