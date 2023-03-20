$(document).ready(function () {

    // Hide intro text to didplay weather info
    $('.txtHide').animate({
        opacity: '1'
      }, 
       1000);

       $("#search-button, .cityBtn").on("click", function(event) {

            $('.txtHide').animate({
                opacity: '0'
            }, 
            100);

	});

    // Cause elements of the dashboard such as background to fade-in.
    $('.dashB').animate({
        opacity: '0',
        marginTop: '50rem'
      }, 
       5);

       $("#search-button, .cityBtn").on("click", function(event) {

            $('.dashB').animate({
                opacity: '1',
                marginTop: 0
            }, 
            4000);

	});

    // Cause the footer text to fade-in.
    $('#zoneTxt').animate({
        right: '-180rem',
        opacity: '0'
      }, 
       5);

       $("#search-button, .cityBtn").on("click", function(event) {

            $('#zoneTxt').animate({
                right: '0',
                opacity: '1'
            }, 
            2000);

	});


});