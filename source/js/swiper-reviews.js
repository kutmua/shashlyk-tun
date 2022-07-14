document.addEventListener('DOMContentLoaded', function(){
  const eventsSlider = new Swiper('.reviews-swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 50,

    pagination: {
      el: '.reviews-swiper-pagination',
      clickable: true,
    },

    grid: {
      rows: 1,
      fill: "row"
    },

    navigation: {
      nextEl: '.reviews__content-next',
      prevEl: '.reviews__content-prev',
    },

    // breakpoints: {
    //   200: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },

    //   570: {
    //     slidesPerView: 2,
    //     slidesPerGroup: 2,
    //   },

    //   768: {
    //     slidesPerView: 2,
    //     spaceBetween: 34,
    //     slidesPerGroup: 2,
    //   },

    //   1024: {
    //     slidesPerView: 3,
    //     spaceBetween: 27,
    //   },

    //   1500: {
    //     slidesPerView: 3,
    //     spaceBetween: 50
    //   }
    // },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",
  });
})