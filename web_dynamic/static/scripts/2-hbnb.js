$(document).ready(function () {
    let checkedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete checkedAmenities[$(this).data('id')];
        }

        updateAmenitiesH4();
    });

    function updateAmenitiesH4() {
        const amenityNames = Object.values(checkedAmenities);
        $('.amenities h4').text(amenityNames.join(', '));
    }

    function checkAPIStatus() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            success: function (data) {
                if (data.status === 'OK') {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error checking API status:', error);
            }
        });
    }

    checkAPIStatus();
});

