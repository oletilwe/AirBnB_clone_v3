#!/usr/bin/python3
from flask import jsonify
from api.v1.views import app_views
from models import storage

all_models = ['Model1', 'Model2']

@app_views.route('/stats', methods=['GET'])
def get_stats():
    """
    Retrieves the number of each object by type.
    """
    stats = {}
    for model in all_models:
        stats[model.lower()] = storage.count(model)
    return jsonify(stats)
