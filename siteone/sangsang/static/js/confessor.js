document.addEventListener('DOMContentLoaded', function () {
    const confContents = document.querySelectorAll('.conf_content');

    // 스크롤 이벤트 추가
    function handleScroll() {
        confContents.forEach(confContent => {
            const contentTop = confContent.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (contentTop < windowHeight * 0.9) {
                // 요소가 화면의 90% 지점에 도달하면 나타나게 함
                confContent.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // 페이지 로드시 한번 실행하여 초기 화면에도 요소가 보이도록 함
    handleScroll();
});
