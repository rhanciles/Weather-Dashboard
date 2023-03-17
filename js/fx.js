$(document).ready(function () {

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

    // $('.wDboard').animate({
    //     border: "#ffffff"
    //   }, 
    //    1000);

    //    $("#search-button, .cityBtn").on("click", function(event) {

    //         $('.wDboard').animate({
    //             border: ""
    //         }, 
    //         4000);

	// });

    // $("#search-button, .cityBtn").click(function(){
    //     $(".txtHide").hide(1000);

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


    // $('.weather-header').animate({
    //     opacity: '1'
    //   }, 
    //    5);

    //    $("#search-button, .cityBtn").on("click", function(event) {

    //         $('.weather-header').animate({
    //             opacity: '0.2'
    //             backgroundImage: 
    //         }, 
    //         100);

	// });



    // $('#letsPlay').animate({
    //     // width: '2%',
    //     opacity: '0',
    //     fontSize: '1%'
    // }, 
    // {    // options parameter 
    //     duration: 5,
    //     complete: function () {
    //         $(this)
    //         .animate({ opacity: '1'}, 2200 )
    //         .animate({ fontSize: '100%'}, 1000 );
                
    //         }
            
    //     }

    // );

});