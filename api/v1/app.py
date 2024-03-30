#!/usr/bin/python3
from flask import Flask
from models import storage
from api.v1.views import app_views
from flask_cors import CORS
import os

app = Flask(__name__)
app.register_blueprint(app_views)

cors = CORS(app, resources={r"/api/*": {"origins": "http://0.0.0.0"}})

@app.errorhandler(404)
def not_found(error):
    """Custom 404 error handler."""
    return jsonify({"error": "Not found"}), 404

def close_storage(exception):
    """Close the database or storage session."""
    storage.close()

if __name__ == "__main__":
    host = os.getenv('HBNB_API_HOST', '0.0.0.0')
    port = os.getenv('HBNB_API_PORT', '5000')
    app.run(host=host, port=int(port), threaded=True)
