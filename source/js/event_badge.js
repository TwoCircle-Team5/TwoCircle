export function eventBadgeHandler() {
  // TOP
  const top = document.querySelector('.scroll_top');
  top.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // 이벤트 베너
  const eventBanner = new Swiper('.event-swiper', {
    slidesPerView: 1,
    width: 100,
    loop: true,
    autoplay: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });
  // 스크롤 이벤트
  const eventSection = document.querySelector('.event');
  window.addEventListener(
    'scroll',
    _.throttle(() => {
      if (window.scrollY < 330) {
        gsap.to(eventSection, 0.4, {
          opacity: 0,
          display: 'none',
        });
      } else {
        gsap.to(eventSection, 0.4, {
          opacity: 1,
          display: 'block',
        });
      }
    }, 300)
  );
}
