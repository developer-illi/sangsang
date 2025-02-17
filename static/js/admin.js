function openFileDialog() {
    document.getElementById('main_img').click();
}


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
    document.getElementById("about_text_save").addEventListener("click", function () {
        let mainText = document.getElementById("main_text").value;
        let subText = document.getElementById("sub_text").value;
        let mainImg = document.getElementById("main_img").files[0];

        let formData = new FormData();
        formData.append("main_text", mainText);
        formData.append("sub_text", subText);
        if (mainImg) {
            formData.append("main_img", mainImg);
        }

        fetch("abpg_saver_main_text", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCSRFToken() // CSRF 토큰 추가
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("저장되었습니다!");
                } else {
                    alert("오류 발생: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });

    function getCSRFToken() {
        return document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const historyLists = document.querySelectorAll(".history__cnt-list");

    historyLists.forEach(historyList => {
        // ➕ "추가" 버튼 이벤트 추가
        const addButton = historyList.querySelector(".--month_add");
        addButton.addEventListener("click", function () {
            addNewHistoryItem(historyList);
            updateHistoryHeight(historyList); // 높이 다시 계산
        });

        // 🗑️ "삭제" 버튼 이벤트 추가
        historyList.querySelectorAll(".--delete").forEach(button => {
            button.addEventListener("click", function () {
                deleteHistoryItem(this, historyList);
                updateHistoryHeight(historyList); // 삭제 후 높이 갱신
            });
        });

        // 💾 "저장" 버튼 이벤트 추가
        historyList.querySelectorAll(".--save").forEach(button => {
            button.addEventListener("click", function () {
                saveHistoryItem(this);
            });
        });
    });

    // ✅ **새로운 히스토리 아이템 추가 함수**
    function addNewHistoryItem(historyList) {
        const newItem = document.createElement("li");
        newItem.classList.add("history__cnt-item");
        newItem.innerHTML = `
            <div class="editable-btn-wrap --no-margin">
                <button class="editable-btn --delete"></button>
            </div>
            <div class="history__cnt-item-date">
                <input type="text" class="--about_edit" placeholder="월 입력">
                <div class="editable-btn-wrap --no-margin"></div>
            </div>
            <input type="text" class="history__cnt-item-desc --about_edit" placeholder="내용 입력">
            <button class="editable-btn --save --about_edit" style="margin-left: 100px">
                save
            </button>
        `;

        // 리스트에 새로운 항목 추가
        historyList.insertBefore(newItem, historyList.querySelector(".--month_add").parentNode);

        // 새롭게 추가된 삭제/저장 버튼에도 이벤트 추가
        newItem.querySelector(".--delete").addEventListener("click", function () {
            deleteHistoryItem(this, historyList);
            updateHistoryHeight(historyList);
        });

        newItem.querySelector(".--save").addEventListener("click", function () {
            saveHistoryItem(this);
        });

        updateHistoryHeight(historyList); // 추가 후 높이 갱신
    }

    // **삭제 기능 (삭제 후 높이 갱신)**
    function deleteHistoryItem(button, historyList) {
        if (confirm("정말 삭제하시겠습니까?")) {
            const item = button.closest(".history__cnt-item");
            const itemId = button.getAttribute("data-id"); // 삭제할 항목의 ID 가져오기
            if (!itemId) {
                // 프론트에서만 추가된 새로운 항목이라면 그냥 삭제
                item.remove();
                updateHistoryHeight(historyList);
                return;
            }

            // 서버에 삭제 요청 보내기
            fetch(`/delete_history_item/${itemId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(),  // CSRF 토큰 추가
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "item_id": itemId })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("삭제되었습니다!");
                        item.remove();  // 성공적으로 삭제되면 프론트에서도 제거
                        updateHistoryHeight(historyList);  // 높이 업데이트
                    } else {
                        alert("삭제 실패: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("서버 오류 발생");
                });
        }
    }

    // **저장 기능**
    function saveHistoryItem(button) {
        const item = button.closest(".history__cnt-item");
        const parentItem = button.closest(".history__item");

        const month = item.querySelector(".--about_edit").value;
        const content = item.querySelector(".history__cnt-item-desc").value;
        const itemId = button.getAttribute("data-id");
        const yearId = parentItem.querySelector("input[type='hidden']").value; // Hidden input에서 item.pk 가져오기

        if (!month.trim() || !content.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("month", month);
        formData.append("content", content);
        formData.append("item_id", itemId || "");
        formData.append("year_id", yearId); // 년도 정보 추가

        fetch("/save_history_item", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": getCSRFToken()
            }
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
    }

    function getCSRFToken() {
        return document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }

    // ✅ **화면 밀림 방지: `.history__cnt-list`의 높이 자동 갱신**
    function updateHistoryHeight(historyList) {
        if (historyList.classList.contains("on")) {
            historyList.style.height = "auto"; // 높이를 auto로 설정 후 읽어오기
            const scrollHeight = historyList.scrollHeight; // 전체 높이 계산
            historyList.style.height = `${scrollHeight}px`; // 실제 높이 적용
        }
    }

    // 🛠 **리사이즈 이벤트에서도 높이 갱신**
    window.addEventListener("resize", () => {
        historyLists.forEach(updateHistoryHeight);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const addHistoryButton = document.querySelector(".--his_add_btn");
    const historyList = document.querySelector(".history__list");

    // ✅ "히스토리 추가" 버튼 클릭 이벤트
    addHistoryButton.addEventListener("click", function () {
        const newHistoryItem = document.createElement("li");
        newHistoryItem.classList.add("history__item");

        newHistoryItem.innerHTML = `
            <input type="text" class="history__num --his_edit" value="Year">
            <input type="hidden" class="--about_edit --his_edit" value="">
            <ul class="history__cnt-list">
                <li class="history__cnt-item">
                    <div class="editable-btn-wrap --no-margin">
                        <button class="editable-btn --delete" data-id=""></button>
                    </div>
                    <div class="history__cnt-item-date">
                        <input type="text" class="--about_edit" placeholder="Month">
                        <div class="editable-btn-wrap --no-margin"></div>
                    </div>
                    <input type="text" class="history__cnt-item-desc --about_edit" placeholder="Content">
                    <button class="editable-btn --save --about_edit" style="margin-left: 100px">save</button>
                </li>
                <div class="editable-btn-wrap --align-center">
                    <button class="editable-btn --add-blue --month_add"></button>
                </div>
            </ul>
            <button class="history__btn" 
                data-img-url="/static/img/common/icon-history-btn.png">
            </button>
        `;
        // ✅ "관리자용 삭제 & 저장 버튼" 추가
        const newControlBtns = document.createElement("div");
        newControlBtns.classList.add("editable-btn-wrap", "--align-right");
        newControlBtns.innerHTML = `
            <button class="editable-btn --cancel --his_edit" data-id="">delete</button>
            <button class="editable-btn --save --his_edit" data-id="">save</button>
        `;

        // ✅ "추가 버튼" 바로 아래에 새로운 히스토리 항목 추가
        addHistoryButton.parentNode.insertAdjacentElement("afterend", newHistoryItem);
        newHistoryItem.insertAdjacentElement("afterend", newControlBtns);

        const newHistoryBtn = newHistoryItem.querySelector(".history__btn");
        if (newHistoryBtn) {
            const imgUrl = newHistoryBtn.getAttribute("data-img-url");
            newHistoryBtn.style.backgroundImage = `url('${imgUrl}')`;
            newHistoryBtn.style.backgroundRepeat = "no-repeat";
            newHistoryBtn.style.backgroundPosition = "center";
            newHistoryBtn.style.backgroundSize = "contain";
        }
    });

    // ✅ 이벤트 위임을 사용하여 동적 요소도 작동하도록 설정
    historyList.addEventListener("click", function (event) {
        const target = event.target;

        // ✅ "히스토리 열기/닫기 버튼" 기능 추가
        if (target.classList.contains("history__btn")) {
            const historyItem = target.closest(".history__item");
            const historyCntList = historyItem.querySelector(".history__cnt-list");
            const historyNum = historyItem.querySelector(".history__num");

            if (historyCntList.classList.contains("on")) {
                historyCntList.style.height = "0"; // 닫기
                historyCntList.classList.remove("on");
                historyNum.classList.remove("on");
                target.classList.remove("on");
            } else {
                historyCntList.style.height = `${historyCntList.scrollHeight + 60}px`; // 열기
                historyCntList.classList.add("on");
                historyNum.classList.add("on");
                target.classList.add("on");
            }
        }

        // ✅ "히스토리 삭제 버튼" 클릭 시
        if (target.classList.contains("--cancel") && target.classList.contains("--his_edit")) {
            if (confirm("정말 삭제하시겠습니까?")) {
                let itemToDelete = target.closest(".history__item");  // 원래 방식

                if (!itemToDelete) {
                    itemToDelete = target.parentElement.previousElementSibling;
                }

                if (!itemToDelete) {
                    console.error("`.history__item`을 찾을 수 없습니다. HTML 구조 확인 필요!");
                    return;
                }

                // ✅ 삭제할 ID 가져오기 (input[type=hidden]에 저장된 값)
                const itemId = itemToDelete.querySelector("input.--about_edit.--his_edit")?.value;
                const formData = new FormData();
                formData.append("itemId", itemId);


                // 🔥 서버에 삭제 요청 보내기 (AJAX)
                fetch("/delete_history", {
                    method: "POST",
                    body:formData,
                    headers: {
                        "X-CSRFToken": getCSRFToken(),
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {

                            // 🔥 서버에서 삭제 성공하면 화면에서도 삭제
                            const controlBtns = itemToDelete.nextElementSibling; // "삭제 & 저장" 버튼 그룹
                            itemToDelete.remove(); // `li.history__item` 삭제

                            if (controlBtns && controlBtns.classList.contains("--align-right")) {
                                controlBtns.remove(); // 관련된 버튼도 삭제
                            }

                            alert("히스토리가 삭제되었습니다!");
                        } else {
                            alert("삭제 실패: " + data.message);
                        }
                    })
                    .catch(error => {
                        console.error("서버 오류 발생:", error);
                        alert("서버 오류로 삭제할 수 없습니다.");
                    });
            }
        }


        //  "히스토리 저장 버튼" 클릭 시
        if (target.classList.contains("--save") && target.classList.contains("--his_edit")) {
            let historyItem = target.closest(".history__item");  // 원래 방식

            // `.history__item`을 못 찾았다면
            if (!historyItem) {
                console.log("❌ `.history__item`을 직접 찾지 못함. 이전 요소를 확인합니다.");

                // 🔥 해결책: 버튼의 `previousElementSibling` 또는 `parentElement.previousElementSibling`을 활용
                historyItem = target.parentElement.previousElementSibling;

                console.log("✅ 새롭게 찾은 `.history__item`:", historyItem);
            }

            // ❗ 그래도 못 찾으면 실행 중단
            if (!historyItem) {
                console.error("🚨 `.history__item`을 찾을 수 없습니다. HTML 구조 확인 필요!");
                return;
            }

            const year = historyItem.querySelector(".history__num").value;
            const content = historyItem.querySelector(".--about_edit").value;

            console.log("📌 year:", year,"content:",content);
            const formData = new FormData();
            formData.append("year", year);
            formData.append("content", content);

            fetch("/add_history", {
                method: "POST",
                body:formData,
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("작업이 완료 되었습니다!");
                        location.reload()
                    } else {
                        alert("추가 실패: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("서버 오류 발생");
                });
        }
    });

    function getCSRFToken() {
        return document.cookie.split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    }
});











