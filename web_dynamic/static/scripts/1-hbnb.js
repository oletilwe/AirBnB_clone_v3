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
});
