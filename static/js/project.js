document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get("target");

    if (targetId) {
        const targetLi = document.getElementById(targetId);
        //console.log("Found targetLi:", targetLi); // 디버깅용

        if (targetLi) {
            // 부모 요소가 `overflow: hidden`인지 체크
            let parent = targetLi.parentElement;
            while (parent) {
                if (getComputedStyle(parent).overflow.includes("hidden")) {
                    console.warn("Parent element has overflow:hidden, changing to auto.");
                    parent.style.overflow = "auto"; // 스크롤 가능하게 변경
                }
                parent = parent.parentElement;
            }

            // 1️⃣ **스크롤 강제 실행**
            setTimeout(() => {
                //console.log("Scrolling to:", targetLi);
                targetLi.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 500);

            // 2️⃣ **스크롤 완료 후 클릭 실행**
            setTimeout(() => {
                //console.log("Clicking on:", targetLi);
                targetLi.click();
            }, 1000); // 클릭을 1.5초 뒤에 실행하여 스크롤이 완료된 후 작동
        } else {
            console.error("No element found with ID:", targetId);
        }
    }
});
