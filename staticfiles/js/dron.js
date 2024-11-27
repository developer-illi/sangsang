document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null, // 뷰포트를 기준으로
        rootMargin: "0px",
        threshold: 0.1 // 요소가 10% 보일 때 애니메이션 시작
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // 이미 한 번 보이면 더 이상 관찰하지 않음
            }
        });
    }, observerOptions);

    // dron_ct1 요소를 관찰 대상으로 설정
    const elements = document.querySelectorAll(".dron_ct1");
    elements.forEach(element => {
        observer.observe(element);
    });
});
