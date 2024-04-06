$(document).ready(function () {
    // Object or dictionary to store checked amenities
    let checkedAmenities = {};

    // Listen for changes on checkboxes
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            // If checkbox is checked, add the amenity ID and name to the dictionary
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            // If checkbox is unchecked, remove the amenity from the dictionary
            delete checkedAmenities[$(this).data('id')];
        }

        // Update the h4 tag with the list of checked amenities
        updateAmenitiesH4();
    });

    // Function to update the h4 tag with the list of checked amenities
    function updateAmenitiesH4() {
        // Get the list of amenity names from the dictionary
        const amenityNames = Object.values(checkedAmenities);
        // Join the names with a comma and space, then update the h4 text
        $('.amenities h4').text(amenityNames.join(', '));
    }

    // Function to check API status
    function checkAPIStatus() {
        // Make AJAX request to API status endpoint
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            success: function (data) {
                // Check if status is "OK"
                if (data.status === 'OK') {
                    // Add class "available" to div#api_status
                    $('#api_status').addClass('available');
                } else {
                    // Remove class "available" from div#api_status
                    $('#api_status').removeClass('available');
                }
            },
            error: function (xhr, status, error) {
                // Log error to console
                console.error('Error checking API status:', error);
            }
        });
    }

    // Function to fetch places data and populate the UI
    function fetchPlacesData() {
        // Make AJAX request to places_search endpoint
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                // Loop through places data and create article tags representing places
                data.forEach(function (place) {
                    createPlaceElement(place);
                });
            },
            error: function (xhr, status, error) {
                // Log error to console
                console.error('Error fetching places data:', error);
            }
        });
    }

    // Function to create an article element representing a place
    function createPlaceElement(place) {
        // Create the article element
        const article = $('<article>');

        // Add HTML content representing place details
        article.html(`
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="user">
                <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
            </div>
            <div class="description">${place.description}</div>
        `);

        // Append the article to the places section
        $('.places').append(article);
    }

    // Check API status and fetch places data on page load
    checkAPIStatus();
    fetchPlacesData();
});

