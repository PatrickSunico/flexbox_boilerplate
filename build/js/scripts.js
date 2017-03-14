// javascript here
$('document').ready(function() {
    $('.toggleNav').on('click', function(e) {
        $('.ul-container').toggleClass('open');
        e.preventDefault();
    });
});

$(window).on('resize', function() {
    // remove class on resize
    $('ul').removeClass('open');
});