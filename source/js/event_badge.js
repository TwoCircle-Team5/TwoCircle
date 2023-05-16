export function eventBadgeHandler() {
  const body = document.querySelector("body")
  const darkLogo = document.querySelector(".dark_logo")
  const lightLogo = document.querySelector(".light_logo")
  const toggle = document.querySelector("#toggle")
  const mode = localStorage.getItem("mode")
  toggle.addEventListener("click",()=>{
    body.classList.toggle("dark")
    if(body.className==="dark"){
      localStorage.setItem("mode","dark")
    }else{
      localStorage.setItem("mode","light")
    }
  })
  if(mode === "dark"){
    body.classList.add("dark")
    toggle.checked = true
  }
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
