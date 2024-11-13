$(document).ready(function() {
    // 폼 제출 이벤트 처리
    $('#login_forms').submit(function(event) {
        event.preventDefault();  // 폼 기본 제출 방지
        // 폼 데이터를 가져오기
        var formData = $(this).serialize();

        // Ajax 요청
        $.ajax({
            url: "login_ck",  // Django URL (뷰에 맞게 수정)
            type: "POST",
            data: formData,
            success: function(response) {
                if (response.status === 'error') {
                    // 서버에서 에러 메시지가 반환되면 alert로 표시
                    alert(response.message);
                } else {
                    // 성공 시 페이지 리다이렉트 또는 다른 동작 수행
                    window.location.href = "admin_pg";  // 원하는 URL로 리다이렉트
                }
            },
            error: function() {
                alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
            }
        });
    });
});
