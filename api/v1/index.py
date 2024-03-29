#!/usr/bin/python3
from flask import jsonify
from . import app_views

@app_views.route('/status')
def status():
    """Route that returns a JSON indicating the status."""
    return jsonify({"status": "OK"})
