var swiper = new Swiper('.swiper-container', {
  direction: 'horizontal', // 슬라이드 방향: 'horizontal' 또는 'vertical'
  loop: true, // 슬라이드 루프 설정

  // 페이지네이션 설정
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // 네비게이션 버튼 설정
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 자동 재생 설정 (필요 시)
  autoplay: {
    delay: 1000, // 3초마다 자동으로 슬라이드 전환
  },
});