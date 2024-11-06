
    document.addEventListener("DOMContentLoaded", function() {
        // 모든 섹션을 순서대로 배열로 저장
        const sections = [
            document.querySelector('.intro_msgintro_msg'),
            document.querySelector('.history'),
            document.querySelector('.dron_promotion'),
            document.querySelector('.find_cop')
        ];

        let currentSectionIndex = 0;
        let isScrolling = false;

        // 스크롤 이벤트 리스너 추가
        window.addEventListener('wheel', function(event) {
            if (isScrolling) return; // 스크롤 애니메이션이 끝날 때까지 무시

            if (event.deltaY > 0) {
                // 아래로 스크롤
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                    scrollToSection(currentSectionIndex);
                }
            } else {
                // 위로 스크롤
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                    scrollToSection(currentSectionIndex);
                }
            }
        });

        // 버튼 클릭 시 해당 섹션으로 스크롤 이동
        document.querySelectorAll('.navigation-sidebar button').forEach(button => {
            button.addEventListener('click', function() {
                const sectionClass = button.getAttribute('data-section');
                const sectionIndex = sections.findIndex(section => section.classList.contains(sectionClass));
                if (sectionIndex !== -1) {
                    currentSectionIndex = sectionIndex;
                    scrollToSection(currentSectionIndex);
                }
            });
        });

        // 해당 섹션으로 스크롤하는 함수
        function scrollToSection(index) {
            isScrolling = true;

            // 이전에 마진을 추가한 섹션이 있다면, 그 섹션의 margin-top을 초기화
            if (index > 0) {
                sections[index - 1].style.marginTop = "0px";
            }

            // 현재 섹션에 margin-top을 80px로 설정한 후 딜레이를 준 다음 스크롤
            sections[index].style.marginTop = "60px";

            // 약간의 딜레이를 준 후 부드럽게 해당 섹션으로 스크롤
            setTimeout(() => {
                sections[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });

                // 스크롤 애니메이션이 끝난 후에 isScrolling을 false로 설정
                setTimeout(() => {
                    isScrolling = false;
                }, 1000); // 애니메이션 지속 시간을 고려하여 설정
            }, 100); // 마진 반영 후 스크롤을 위해 약간의 딜레이 추가
        }
    });
