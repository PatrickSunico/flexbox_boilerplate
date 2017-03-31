// javascript here
$('document').ready(function() {
    $('.toggleNav').on('click', function(e) {
        $('.ul-container').toggleClass('open');
        e.preventDefault();
    });

    // removes margin on every 2nd, 4th , 6th etc small-story container 
    var story_small = $('.nw-story-small');
    // var story_small = $('.nw-story-small').length;

});

$(window).on('resize', function() {
    // remove class on resize
    $('ul').removeClass('open');
});

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
});