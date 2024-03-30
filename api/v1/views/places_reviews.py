#!/usr/bin/python3
"""
Review objects view to handle all API actions.
"""
from flask import jsonify, request, abort
from models import storage
from models.review import Review
from models.place import Place
from models.user import User
from api.v1.views import app_views

@app_views.route('/places/<place_id>/reviews', methods=['GET'], strict_slashes=False)
def get_reviews(place_id):
    """Retrieves the list of all Review objects of a Place."""
    place = storage.get(Place, place_id)
    if not place:
        abort(404)

    reviews = [review.to_dict() for review in place.reviews]
    return jsonify(reviews)

@app_views.route('/reviews/<review_id>', methods=['GET'], strict_slashes=False)
def get_review(review_id):
    """Retrieves a Review object."""
    review = storage.get(Review, review_id)
    if not review:
        abort(404)
    return jsonify(review.to_dict())

@app_views.route('/reviews/<review_id>', methods=['DELETE'], strict_slashes=False)
def delete_review(review_id):
    """Deletes a Review object."""
    review = storage.get(Review, review_id)
    if not review:
        abort(404)
    storage.delete(review)
    storage.save()
    return jsonify({}), 200

@app_views.route('/places/<place_id>/reviews', methods=['POST'], strict_slashes=False)
def create_review(place_id):
    """Creates a Review in a specific Place."""
    place = storage.get(Place, place_id)
    if not place:
        abort(404)

    review_data = request.get_json()
    if not review_data:
        abort(400, "Not a JSON")
    if 'user_id' not in review_data:
        abort(400, "Missing user_id")
    if 'text' not in review_data:
        abort(400, "Missing text")

    user = storage.get(User, review_data['user_id'])
    if not user:
        abort(404)

    review_data['place_id'] = place_id
    new_review = Review(**review_data)
    storage.new(new_review)
    storage.save()
    return jsonify(new_review.to_dict()), 201

@app_views.route('/reviews/<review_id>', methods=['PUT'], strict_slashes=False)
def update_review(review_id):
    """Updates a Review object."""
    review = storage.get(Review, review_id)
    if not review:
        abort(404)

    update_data = request.get_json()
    if not update_data:
        abort(400, "Not a JSON")

    ignore_keys = ['id', 'user_id', 'place_id', 'created_at', 'updated_at']
    for key, value in update_data.items():
        if key not in ignore_keys:
            setattr(review, key, value)
    storage.save()
    return jsonify(review.to_dict()), 200

