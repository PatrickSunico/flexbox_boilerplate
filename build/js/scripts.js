$("document").ready(function() {
    $(".toggleNav").on("click", function(e) {
        e.preventDefault();
        $(".ul-container").toggleClass("open");

        $(window).on("resize", function() {
            $("ul").removeClass("open");
        });
    });
});
var swiper = new Swiper(".swiper-container", {
    pagination: ".swiper-pagination",
    paginationClickable: !0,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    spaceBetween: 30
});