document.addEventListener("DOMContentLoaded", function () {
    // 제출 버튼 가져오기
    const inquiryButton = document.getElementById("inquirySubmit");

    // 버튼이 존재하는 경우 이벤트 추가
    if (inquiryButton) {
        inquiryButton.addEventListener("click", async function (event) {
            event.preventDefault(); // 기본 동작 방지 (예: 폼 자동 제출 방지)

            // 입력 필드 값 가져오기
            const name = document.getElementById("name").value.trim();
            const company = document.querySelector("input[placeholder='기업(단체)명을 작성해주세요.']").value.trim();
            const contact = document.querySelector("input[placeholder='연락 가능한 번호를 작성해주세요.']").value.trim();
            const email = document.querySelector("input[placeholder='이메일 주소를 작성해주세요.']").value.trim();
            const message = document.querySelector("textarea").value.trim();
            const checkbox = document.getElementById("checkbox"); // 체크박스 가져오기

            // 필수 입력값 체크
            if (!name || !company || !contact || !email || !message) {
                alert("모든 필수 입력 항목을 작성해주세요.");
                return;
            }


            // ✅ 체크박스가 체크되었는지 확인
            if (!checkbox.checked) {
                alert("문의 접수 전에 개인정보 제공에 동의해주세요.");
                return;
            }

            // FormData 객체 생성 (Django에서 request.POST로 받을 수 있음)
            let formData = new FormData();
            formData.append("name", name);
            formData.append("company", company);
            formData.append("contact", contact);
            formData.append("email", email);
            formData.append("message", message);

            try {
                const response = await fetch("/contact_send", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRFToken": getCSRFToken() // CSRF 토큰 추가 (Django 보안)
                    }
                });

                const data = await response.json(); // JSON 응답 처리
                if (data.success) {
                    alert("문의가 정상적으로 접수되었습니다!");
                    location.reload(); // 페이지 새로고침
                } else {
                    alert("문의 접수에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error("서버 오류 발생:", error);
                alert("서버 오류로 인해 문의를 접수할 수 없습니다.");
            }
        });
    }

    // ✅ CSRF 토큰 가져오는 함수 (Django 보안)
    function getCSRFToken() {
        return document.cookie.split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
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