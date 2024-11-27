document.addEventListener("DOMContentLoaded", function () {
    // 모든 섹션을 순서대로 배열로 저장
    const sections = [
        document.querySelector('.intro_msgintro_msg'),
        document.querySelector('.history'),
        document.querySelector('.dron_promotion'),
        document.querySelector('.find_cop')
    ];

    let currentSectionIndex = 0;
    let isScrolling = false;
    let hasScrolled = false; // 스크롤 여부를 추적

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('wheel', function (event) {
        if (isScrolling) return; // 스크롤 애니메이션이 끝날 때까지 무시

        if (event.deltaY > 0) {
            // 아래로 스크롤
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                hasScrolled = true; // 스크롤 발생 여부를 true로 설정
                scrollToSection(currentSectionIndex);
            }
        } else {
            // 위로 스크롤
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                hasScrolled = true; // 스크롤 발생 여부를 true로 설정
                scrollToSection(currentSectionIndex);
            }
        }
    });

    // 버튼 클릭 시 해당 섹션으로 스크롤 이동
    document.querySelectorAll('.navigation-sidebar button').forEach((button, index) => {
        button.addEventListener('click', function () {
            currentSectionIndex = index;
            hasScrolled = true; // 버튼 클릭으로 스크롤 발생 시에도 설정
            scrollToSection(currentSectionIndex);
        });
    });

    // 해당 섹션으로 스크롤하는 함수
    function scrollToSection(index) {
        isScrolling = true;

        // 헤더 높이를 고려한 스크롤 위치 계산
        const headerHeight = 60; // 헤더 높이를 픽셀 단위로 설정
        let sectionTop = sections[index].getBoundingClientRect().top + window.scrollY - headerHeight;

        // 첫 번째 섹션의 경우 더 윗쪽으로 스크롤되게 조정
        if (index === 0) {
            sectionTop -= 150; // 20px 더 윗쪽으로 이동 (원하는 만큼 조정 가능)
        }

        // 부드럽게 해당 섹션으로 스크롤
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });

        // 스크롤 애니메이션이 끝난 후에 isScrolling을 false로 설정
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 애니메이션 지속 시간을 고려하여 설정
    }
});
