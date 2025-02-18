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

document.getElementById("pro_main_preview").addEventListener("change", function(event) {
    const file = event.target.files[0]; // 파일 가져오기
    if (file) {
        const reader = new FileReader(); // 파일 읽기 객체 생성
        reader.onload = function(e) {
            const previewImage = document.getElementById("pro_main_img");
            previewImage.src = e.target.result; // 미리보기 이미지 적용
        };
        reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".--projectsaver").addEventListener("click", async function () {
        // 프로젝트 제목 가져오기
        const titleInput = document.querySelector(".project-info__detail-desc.--pro_main_title").value;

        // 파일 가져오기
        const fileInput = document.querySelector(".project-info__img-wrap input[type='file']");
        const file = fileInput.files.length > 0 ? fileInput.files[0] : null;

        if (!titleInput.trim()) {
            alert("제목을 입력해주세요!");
            return;
        }

        // FormData 생성
        const formData = new FormData();
        formData.append("title", titleInput);
        if (file) {
            formData.append("image", file);
        }

        try {
            const response = await fetch("/project_main_update", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });

            const data = await response.json();
            if (data.success) {
                alert("저장되었습니다!");
                location.reload();  //
            } else {
                alert("저장 실패: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류 발생");
        }
    });

    // ✅ CSRF 토큰 가져오기
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


//detail-edit
document.addEventListener("DOMContentLoaded", () => {
    // 모든 .--pro_detail_edit 버튼을 선택
    const saveButtons = document.querySelectorAll(".editable-btn.--save.--pro_detail_edit");

    saveButtons.forEach(button => {
        button.addEventListener("click", async function () {
            const projectId = this.getAttribute("data-id"); // 프로젝트 ID 가져오기

            // 같은 .project-list__item 내의 --pro_detail_edit 클래스를 가진 모든 textarea 찾기
            const projectItem = this.closest(".project-list__item");
            const textareas = projectItem.querySelectorAll("textarea.--pro_detail_edit");

            // 데이터 수집
            let formData = new FormData();
            formData.append("project_id", projectId); // 프로젝트 ID 추가

            textareas.forEach(textarea => {
                formData.append(textarea.classList[0], textarea.value); // textarea 클래스명을 key로 사용
            });

            console.log("프로젝트 ID:", projectId);
            console.log("수집된 데이터:", Object.fromEntries(formData.entries()));

            try {
                const response = await fetch("/project_detail_edit", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRFToken": getCSRFToken() // CSRF 토큰 추가
                    }
                });

                const data = await response.json();
                if (data.success) {
                    alert("성공적으로 업데이트되었습니다!");
                } else {
                    alert("저장 실패: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("서버 오류 발생");
            }
        });
    });

    // CSRF 토큰 가져오는 함수
    function getCSRFToken() {
        return document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // 모든 "save" 버튼 이벤트 추가
    document.querySelectorAll(".editable-btn.--save.--proj_sub_edit").forEach(button => {
        button.addEventListener("click", async function () {
            const projSubId = this.getAttribute("data-id"); // 프로젝트 서브 ID 가져오기
            // 현재 버튼이 속한 버튼 래퍼에서 이전 요소 탐색하여 가장 가까운 <li> 찾기
            let projectItem = this.closest("div.editable-btn-wrap").previousElementSibling;
            while (projectItem && !projectItem.classList.contains("project-list__info-item")) {
                projectItem = projectItem.previousElementSibling;
            }

            if (!projectItem) {
                alert("프로젝트 정보를 찾을 수 없습니다.");
                return;
            }

            // 해당 리스트 내부에서 `.--proj_sub_edit` 클래스가 포함된 textarea와 input[type="file"] 찾기
            const textareas = projectItem.querySelectorAll("textarea.--proj_sub_edit");
            const fileInput = projectItem.querySelector("input.--proj_sub_edit");

            // FormData 생성
            let formData = new FormData();
            formData.append("proj_sub_id", projSubId); // 프로젝트 서브 ID 추가

            // textarea 값 추가
            textareas.forEach(textarea => {
                formData.append(textarea.classList[0], textarea.value); // textarea의 class명을 key로 사용
            });

            // 파일 데이터 추가
            if (fileInput && fileInput.files.length > 0) {
                formData.append("proj_sub_img", fileInput.files[0]); // 파일 데이터 추가
            }

            console.log("프로젝트 서브 ID:", projSubId);
            console.log("전송할 데이터:", Object.fromEntries(formData.entries()));

            try {
                const response = await fetch("/project_content_edit", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRFToken": getCSRFToken() // CSRF 토큰 추가
                    }
                });

                const data = await response.json();
                if (data.success) {
                    alert("성공적으로 업데이트되었습니다!");
                } else {
                    alert("저장 실패: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("서버 오류 발생 ❌");
            }
        });
    });

    // CSRF 토큰 가져오는 함수
    function getCSRFToken() {
        return document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // "추가" 버튼 이벤트 추가
    const addButton = document.querySelector("#sol_add .--add-itembox");

    addButton.addEventListener("click", function () {
        // 🔹 `data-id` 값 가져오기
        const projectId = addButton.getAttribute("data-id");

        // 1️⃣ 새로운 리스트 항목(`.project-list__info-item`) 생성
        const newItem = document.createElement("li");
        newItem.classList.add("project-list__info-item");
        newItem.innerHTML = `
            <div class="project-list__info-item-detail-wrap">
                <h6 class="project-list__info-item-num">NEW</h6>
                <textarea class="project-list__info-item-title --proj_sub_edit" placeholder="새로운 제목 입력"></textarea>
                <textarea class="project-list__info-item-desc --proj_sub_edit" placeholder="새로운 설명 입력"></textarea>
            </div>
            <div class="project-list__info-item-img-wrap">
                <img src="/static/img/common/Vector.png" alt="새로운 이미지를 추가해주세요"
                     onerror="this.onerror=null; this.src='/static/img/common/Vector.png';" class="project-list__info-item-img">
                <input type="file" class="--proj_sub_edit --proj_sub_preview">
            </div>
        `;

        // 2️⃣ 새로운 "저장" 버튼 생성
        const newButtonWrap = document.createElement("div");
        newButtonWrap.classList.add("editable-btn-wrap", "--align-center");
        newButtonWrap.innerHTML = `
            <button class="editable-btn --cancel --proj_sub_create">cancel</button>
            <button class="editable-btn --save --proj_sub_create" data-id="${projectId}">
                save
            </button>
        `;

        // 3️⃣ 추가 버튼(#sol_add) 위에 새로운 아이템과 저장 버튼 추가
        const solAdd = document.getElementById("sol_add");
        solAdd.parentNode.insertBefore(newItem, solAdd);
        solAdd.parentNode.insertBefore(newButtonWrap, solAdd);

        // 🔹 "취소" 버튼 클릭 시 요소 제거
        const cancelBtn = newButtonWrap.querySelector(".--cancel");
        cancelBtn.addEventListener("click", () => {
            newItem.remove();
            newButtonWrap.remove();
        });

        // ✅ **이미지 미리보기 기능 추가**
        const fileInput = newItem.querySelector("input[type='file']");
        const previewImage = newItem.querySelector(".project-list__info-item-img");

        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result; // 🔥 이미지 변경
            };
            reader.readAsDataURL(file);
        });

        // 🔹 "저장" 버튼 클릭 시 데이터 전송
        const saveBtn = newButtonWrap.querySelector(".--save");
        saveBtn.addEventListener("click", async () => {
            const titleInput = newItem.querySelector(".project-list__info-item-title").value;
            const descInput = newItem.querySelector(".project-list__info-item-desc").value;
            const fileInput = newItem.querySelector("input[type='file']"); // ⬅️ 파일 입력 필드 찾기

            let fileData = null;
            if (fileInput && fileInput.files.length > 0) { // ⬅️ undefined 체크
                fileData = fileInput.files[0];
            }

            const formData = new FormData();
            formData.append("project_id", projectId);
            formData.append("title", titleInput);
            formData.append("content", descInput);
            if (fileData) {
                formData.append("image", fileData);
            }

            try {
                const response = await fetch("/project_content_create", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken") // CSRF 토큰 추가
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    alert("저장 되었습니다.");
                    location.reload(true);
                } else {
                    alert("저장 실패: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("서버 오류 발생");
            }
        });
    });

    // ✅ **기존의 input[type='file']에도 미리보기 적용**
    document.querySelectorAll(".--proj_sub_preview").forEach(input => {
        input.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const previewImage = input.previousElementSibling;
                if (previewImage) {
                    previewImage.src = e.target.result; // 🔥 기존 이미지 변경
                }
            };
            reader.readAsDataURL(file);
        });
    });

    // 🔹 CSRF 토큰 가져오는 함수
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
    document.addEventListener("click", function (event) {
        if (event.target.matches(".editable-btn.--cancel.--proj_sub_edit")) {
            const deleteButton = event.target;
            const itemId = deleteButton.getAttribute("data-id"); // data-id 가져오기

            if (!itemId) {
                alert("삭제할 항목의 ID가 없습니다.");
                return;
            }

            // 삭제 확인 메시지 띄우기
            if (!confirm("정말 삭제하시겠습니까?")) {
                return;
            }

            // 삭제 요청 보내기
            fetch(`/project_content_delete/${itemId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"), // CSRF 토큰 추가
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("삭제되었습니다!");

                    // 🔥 해당 리스트 전체 삭제 (LI + 버튼)
                    location.reload(true);
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







