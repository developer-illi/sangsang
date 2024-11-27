window.onload = function (){
    const header = document.querySelector("header");
    const header_bg = document.querySelector(".header_main");

    header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 전 완전 투명
    header_bg.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 전 완전 투명

};
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const header_bg = document.querySelector(".header_main");
    if (window.scrollY > 0) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // 스크롤 시 검정색 배경, 투명도 0.8
        header_bg.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // 스크롤 시 검정색 배경, 투명도 0.8
    } else {
        header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 전 완전 투명
        header_bg.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 전 완전 투명
    }
});
