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
document.addEventListener('DOMContentLoaded', function () {
    // 모든 textarea 요소를 선택
    const textareas = document.querySelectorAll('textarea');

    // 각 textarea에 이벤트 리스너 추가
    textareas.forEach(textarea => {
        // 초기 높이 설정
        adjustHeight(textarea);

        // 입력 이벤트가 발생할 때마다 높이 조절
        textarea.addEventListener('input', function () {
            adjustHeight(textarea);
        });
    });

    // 높이를 조절하는 함수
    function adjustHeight(element) {
        element.style.height = 'auto'; // 높이 초기화
        element.style.height = element.scrollHeight + 'px'; // 스크롤 높이에 따라 높이 설정
    }
});
