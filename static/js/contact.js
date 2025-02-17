document.addEventListener("DOMContentLoaded", function() {
    // 버튼 요소 가져오기
    const inquiryButton = document.getElementById("inquirySubmit");

    // 버튼이 존재하는 경우에만 이벤트 추가
    if (inquiryButton) {
        inquiryButton.addEventListener("click", function() {
            alert("문의가 정상적으로 접수되었습니다!");
            location.reload();
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.querySelector(".inquiry__agree-checkbox");
    const label = document.querySelector(".inquiry__agree-checkbox-label");

    const imgOff = label.getAttribute("data-img-off");
    const imgOn = label.getAttribute("data-img-on");

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            label.style.backgroundImage = `url('${imgOn}')`;
        } else {
            label.style.backgroundImage = `url('${imgOff}')`;
        }
    });
});