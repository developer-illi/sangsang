document.addEventListener("focusin", function (event) {
    // 현재 포커스된 요소가 input 또는 textarea인지 확인
    if (event.target.matches("input, textarea")) {
        event.target.classList.add("--editable");
    }
});

document.addEventListener("focusout", function (event) {
    // 포커스를 벗어나면 클래스 제거
    if (event.target.matches("input, textarea")) {
        event.target.classList.remove("--editable");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        // 클릭한 요소가 삭제 버튼인지 확인
        if (event.target.matches(".editable-btn.--delete")) {
            const button = event.target;  // 클릭한 버튼 요소
            const listItem = button.closest(".solution-info__item");  // 해당 버튼이 속한 li 찾기

            if (!listItem) {
                alert("삭제할 항목을 찾을 수 없습니다.");
                return;
            }

            const itemId = button.getAttribute("data-id");  // 버튼의 data-id 가져오기
            if (!itemId) {
                alert("삭제할 항목의 ID가 없습니다.");
                return;
            }

            if (!confirm("정말 삭제하시겠습니까?")) {
                return;
            }

            fetch(`/delete_sol_item/${itemId}/`, {  // Django URL로 요청 전송
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),  // CSRF 토큰 추가
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("삭제되었습니다!");
                        listItem.remove();  // 해당 리스트 아이템만 삭제
                    } else {
                        alert("삭제 실패: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("서버 오류 발생");
                });
        }
    });

    // CSRF 토큰 가져오기 (Django 보안 정책에 필요)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sol_title_saver").addEventListener("click", function () {
        const titleValue = document.getElementById("sol_main_title").value; // 입력된 제목 값 가져오기

        if (!titleValue.trim()) {
            alert("제목을 입력해주세요!"); // 제목이 없을 경우 경고
            return;
        }

        fetch("/edit_soltitle", {  // Django URL에 요청
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),  // CSRF 토큰 추가
            },
            body: JSON.stringify({ title: titleValue })  // JSON 데이터 전송
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("저장되었습니다!");
                } else {
                    alert("저장 실패: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("서버 오류 발생");
            });
    });

    // CSRF 토큰 가져오기 (Django 보안 정책)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // `--titleimg` 클래스가 있는 save 버튼만 선택
    const saveButtons = document.querySelectorAll(".editable-btn.--titleimg");

    saveButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 버튼에서 data-id 값을 가져옴 (sol_info.pk 값)
            const solId = this.getAttribute("data-id");

            // 버튼과 같은 `li` 안에 있는 input[type="file"] 찾기
            const fileInput = this.closest("li").querySelector("input[type='file']");

            if (!fileInput) {
                alert("파일 입력 요소를 찾을 수 없습니다.");
                return;
            }

            if (!fileInput.files.length) {
                alert("이미지를 선택해주세요!");
                return;
            }

            const fileData = fileInput.files[0];

            const formData = new FormData();
            formData.append("sol_id", solId);
            formData.append("sol_image", fileData);

            fetch("/edit_title_img", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken") // CSRF 토큰 추가
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("저장되었습니다.");
                    } else {
                        alert("업로드 실패: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("서버 오류 발생");
                });
        });
    });

    // CSRF 토큰 가져오는 함수 (Django 보안 정책)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".editable-btn.--sol_detail").forEach(button => {
        button.addEventListener("click", async (event) => {
            const buttonElement = event.target;
            const solDetailsId = buttonElement.getAttribute("data-id");

            // 현재 버튼이 속한 .solution-info__title-wrap 영역 찾기
            const titleWrap = buttonElement.closest(".solution-info__title-wrap");

            // 해당 영역 내의 textarea 값 가져오기
            const koTitle = titleWrap.querySelector(".solution-info__title.--ko").value.trim();
            const enTitle = titleWrap.querySelector(".solution-info__title.--en").value.trim();
            const content = titleWrap.querySelector(".solution-info__title-quotation").value.trim();
            const details = titleWrap.querySelector(".solution-info__title-desc").value.trim();

            if (!koTitle || !enTitle || !content || !details) {
                alert("모든 필드를 입력해주세요!");
                return;
            }

            // CSRF 토큰 가져오기
            const csrftoken = getCookie("csrftoken");

            // 데이터 객체 생성
            const formData = new FormData();
            formData.append("sol_details_id", solDetailsId);
            formData.append("title", koTitle);
            formData.append("eg_title", enTitle);
            formData.append("content", content);
            formData.append("details", details);

            try {
                const response = await fetch("/edit_soldetail", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRFToken": csrftoken, // CSRF 토큰 추가
                    },
                });

                const data = await response.json();

                if (data.success) {
                    alert("저장되었습니다!");
                } else {
                    alert("저장 실패: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("서버 오류 발생");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const solAddButton = document.querySelector(".editable-btn-wrap.--add-itembox .--add-itembox");
    const solutionList = document.querySelector(".solution-info__item").parentNode; // ul 또는 적절한 부모 요소

    // ✅ "추가" 버튼 클릭 시 새로운 아이템 추가
    solAddButton.addEventListener("click", () => {
        const itemCount = solutionList.querySelectorAll(".solution-info__item").length + 1;

        // 새로운 리스트 항목 생성
        const newItem = document.createElement("li");
        newItem.classList.add("solution-info__item");

        newItem.innerHTML = `
            <div class="solution-info__item-detail-wrap">
                <div class="solution-info__item-num">${String(itemCount).padStart(2, '0')}</div>
                <textarea class="solution-info__item-title --sol_item_edit" placeholder="제목 입력"></textarea>
                <textarea class="solution-info__item-desc --sol_item_edit" placeholder="설명 입력"></textarea>
            </div>
            <div class="solution-info__item-img-wrap">
                <img id="solution-image-new-${itemCount}" src="/static/img/common/Vector.png"
                     alt="솔루션 인포 이미지"
                     onerror="this.onerror=null; this.src='/static/img/common/Vector.png';">
                <input type="file" class="--sol_item_edit">
            </div>
            <div class="editable-btn-wrap --no-margin--solution"></div>
        `;

        // 새로운 버튼 그룹 생성
        const newButtonWrap = document.createElement("div");
        newButtonWrap.classList.add("editable-btn-wrap", "--align-center");
        newButtonWrap.innerHTML = `
            <button class="editable-btn --cancel --sol_item_edit" data-id="">delete</button>
            <button class="editable-btn --save --sol_item_edit" data-id="">save</button>
        `;

        // 추가 버튼 위에 새로운 항목 추가
        solAddButton.parentNode.insertAdjacentElement("beforebegin", newItem);
        solAddButton.parentNode.insertAdjacentElement("beforebegin", newButtonWrap);
    });

    // ✅ 이벤트 위임을 사용하여 동적 요소도 작동하도록 설정
    document.addEventListener("click", (event) => {
        const target = event.target;

        // ✅ "삭제 (delete)" 버튼 클릭 시
        if (target.classList.contains("--cancel") && target.classList.contains("--sol_item_edit")) {
            if (confirm("정말 삭제하시겠습니까?")) {
                let itemToDelete = target.closest(".solution-info__item");

                const controlBtns = target.parentElement; // 버튼 그룹

                if (!itemToDelete) {
                    itemToDelete = target.parentElement.previousElementSibling;
                }
                // 🔥 서버에서 삭제 요청 보내기
                const itemId = target.getAttribute("data-id");
                let formData = new FormData();
                formData.append('itemId',itemId)

                if (!itemId.startsWith("new-")) {
                    fetch("/delete_solution", {
                        method: "POST",
                        body:formData,
                        headers: {
                            "X-CSRFToken": getCSRFToken(),
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert("삭제되었습니다.");
                                itemToDelete.remove();
                                controlBtns.remove();
                            } else {
                                alert("삭제 실패: " + data.message);
                            }
                        })
                        .catch(error => {
                            console.error("삭제 중 오류 발생:", error);
                            alert("서버 오류 발생");
                        });
                } else {
                    itemToDelete.remove();
                    controlBtns.remove();
                }
            }
        }

        // ✅ "저장 (save)" 버튼 클릭 시
        if (target.classList.contains("--save") && target.classList.contains("--sol_item_edit")) {
            let solutionItem = target.closest(".solution-info__item");

            if (!solutionItem) {
                console.error("저장할 `.solution-info__item`을 찾을 수 없습니다.");
                solutionItem = target.parentElement.previousElementSibling;
            }

            const solutionList = solutionItem.closest(".solution-info__list");
            const solutionListId = solutionList ? solutionList.getAttribute("data-id") : null;
            const deleteButton = target.previousElementSibling;
            const deleteItemId = deleteButton ? deleteButton.getAttribute("data-id") : null;
            const title = solutionItem.querySelector(".solution-info__item-title").value;
            const content = solutionItem.querySelector(".solution-info__item-desc").value;
            const fileInput = solutionItem.querySelector("input[type='file']");
            const imageFile = fileInput.files.length > 0 ? fileInput.files[0] : null;

            const formData = new FormData();
            formData.append("mainId", solutionListId);
            formData.append("itemId", deleteItemId);
            formData.append("title", title);
            formData.append("content", content);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            // 🔥 서버에 저장 요청 보내기
            fetch("/sol_item_add", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("저장되었습니다.");
                        location.reload();
                    } else {
                        alert("저장 실패: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("저장 중 오류 발생:", error);
                    alert("서버 오류 발생");
                });
        }
    });

    // ✅ CSRF 토큰 가져오는 함수
    function getCSRFToken() {
        return document.cookie.split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    }
});




// ✅ CSRF 토큰 가져오는 함수 (Django 보안 정책)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
