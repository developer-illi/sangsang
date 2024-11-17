window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const header_bg = document.querySelector(".header_main");
    if (window.scrollY > 0) {
        header.style.backgroundColor = "#000"; // 스크롤 시 검정색 배경
        header_bg.style.backgroundColor = "#000"; // 스크롤 시 검정색 배경
    } else {
        header.style.backgroundColor = "transparent"; // 스크롤 전 투명 배경
        header_bg.style.backgroundColor = "transparent"; // 스크롤 전 투명 배경
    }
});