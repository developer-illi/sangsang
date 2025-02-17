// * 헤더 fixed scroll 애니메이션 *
const headerAni = () => {
  const header = document.querySelector('.header');
  const wrapper = document.querySelector('.wrapper');

  wrapper.addEventListener('scroll', () => {
    const currentScrollY = wrapper.scrollTop;

    if (currentScrollY > 100) {
      header.classList.add('on');
    } else {
      header.classList.remove('on');
    }
  });

};

// * 헤더 메뉴 애니메이션 *
const menuAni = () => {
  const headerMenu = document.querySelector('.header__menu');
  const gnb = document.querySelector('.gnb');

  headerMenu.addEventListener('click', () => {
    headerMenu.classList.toggle('on');
    gnb.classList.toggle('on');
  })
}

headerAni();
menuAni();

// * gsap animation *
gsap.registerPlugin(ScrollTrigger);

  // sub-Main 섹션 애니메이션
  gsap.from(".section.--sub-main:not([class*='--contact'])", {
    opacity: 0, // 투명도 0부터 시작
    scale: 1.5, // 작게 시작
    duration: 3, // 애니메이션 지속 시간
    ease: "power3.out", // 부드러운 가속 및 감속
  });

  // sub-Main 텍스트 애니메이션
  gsap.from(".sub-main__sub-title:not([class*='--contact']), .sub-main__main-title:not([class*='--contact']), .sub-main__desc:not([class*='--contact'])", {
    y: 50, // 아래에서 시작
    opacity: 0, // 투명도 0부터 시작
    duration: 1, // 애니메이션 지속 시간
    delay: 1,
    stagger: 0.3, // 순차적 실행 간격
    ease: "power2.out", // 부드러운 가속 및 감속
  });
  function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}
