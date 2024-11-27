document.addEventListener("DOMContentLoaded", function () {
    // 요소 선택
    const tapAddButton = document.querySelector(".tap_add_button");
    const toggleTaps = document.querySelector(".toggle-taps");
    const toggleTaps2 = document.querySelector(".toggle-taps2");

    const tapAdds = document.querySelector(".tap_adds");
    const solAddItems = document.querySelector(".sol_additems");
    const appAddItems = document.querySelector(".app_additems");
    const mainContent = document.querySelector(".main_content");

    // main_content는 기본적으로 표시
    mainContent.style.display = "flex";

    // 모든 콘텐츠를 숨기는 함수
    function hideAllContents() {
        mainContent.style.display = "none";
        tapAdds.style.display = "none";
        solAddItems.style.display = "none";
        appAddItems.style.display = "none";
    }

    // tap_add_button 클릭 시
    tapAddButton.addEventListener("click", function () {
        hideAllContents();
        tapAdds.style.display = "flex"; // tap_adds만 표시
    });

    // toggle-taps 클릭 시
    toggleTaps.addEventListener("click", function () {
        hideAllContents();
        solAddItems.style.display = "flex"; // sol_additems만 표시
    });

    // toggle-taps2 클릭 시
    toggleTaps2.addEventListener("click", function () {
        hideAllContents();
        appAddItems.style.display = "flex"; // app_additems만 표시
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tap_add_form");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
        let isValid = true;
        let errorMessage = "다음 값을 입력하세요:\n";

        // 모든 필드를 검사
        form.querySelectorAll("input, textarea, select").forEach(function (field) {
            if (field.type === "file") {
                if (!field.files || field.files.length === 0) {
                    isValid = false;
                    errorMessage += "- 메인 이미지\n";
                }
            } else if (!field.value.trim()) {
                isValid = false;
                errorMessage += `- ${field.previousElementSibling.innerText}\n`;
            }
        });

        // 유효하지 않은 경우 제출을 막고 경고 메시지 표시
        if (!isValid) {
            event.preventDefault(); // 폼 제출 방지
            alert(errorMessage); // 경고 메시지 표시
        } else {
            alert('등록 되었습니다.');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="sol_item_category"]');
    const valItemsContainer = document.querySelector('.val_items');
    const fileInput = document.getElementById('sol-img-edit'); // 파일 입력 요소 선택

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;  // 선택된 value 값 가져오기

        // AJAX 요청 보내기
        fetch(`/get_val_items/?sol_item_category=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                // val_items 업데이트
                valItemsContainer.innerHTML = '';  // 기존 항목 제거

                data.val_items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('sol_item_val');

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('val_title');
                    titleDiv.textContent = item.title;

                    const delIconDiv = document.createElement('div');
                    delIconDiv.classList.add('del_icon');
                    const delIconImg = document.createElement('img');
                    delIconImg.id = item.pk;
                    delIconImg.src = '/static/img/delete.png';
                    delIconDiv.appendChild(delIconImg);

                    itemDiv.appendChild(titleDiv);
                    itemDiv.appendChild(delIconDiv);
                    valItemsContainer.appendChild(itemDiv);
                });

                // 기존의 hidden input 제거 (만약 이미 추가된 경우)

            })
            .catch(error => console.error('Error:', error));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="sol_item_category"]');

    // 기본 선택 항목 설정
    categorySelect.selectedIndex = -1; // 선택을 초기화하여 아무 항목도 선택되지 않도록 설정
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="sol_type"]');

    // 기본 선택 항목 설정
    categorySelect.selectedIndex = -1; // 선택을 초기화하여 아무 항목도 선택되지 않도록 설정
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="app_item_category"]');

    // 기본 선택 항목 설정
    categorySelect.selectedIndex = -1; // 선택을 초기화하여 아무 항목도 선택되지 않도록 설정
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="app_type"]');

    // 기본 선택 항목 설정
    categorySelect.selectedIndex = -1; // 선택을 초기화하여 아무 항목도 선택되지 않도록 설정
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sol_item_add");
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.addEventListener("click", function (event) {
        // 각 입력 요소 가져오기
        const categorySelect = form.querySelector('select[name="sol_item_category"]');
        const titleInput = form.querySelector('input[name="sol_title"]');
        const contentTextarea = form.querySelector('textarea[name="sol_content"]');
        const imageInput = form.querySelector('input[name="sol_image"]');
        const typeSelect = form.querySelector('select[name="sol_type"]');

        // 검증할 모든 필드를 배열로 저장
        const fields = [
            {element: categorySelect, placeholder: ""},
            {element: titleInput, placeholder: "제목을 입력해주세요."},
            {element: contentTextarea, placeholder: "내용을 입력해주세요."},
            {element: imageInput, placeholder: ""},
            {element: typeSelect, placeholder: ""}
        ];

        // 이전 강조 스타일과 안내 문구 제거
        fields.forEach(field => {
            field.element.style.border = ""; // 테두리 초기화
            field.element.placeholder = field.originalPlaceholder || ""; // 원래 placeholder로 복구
            const messageElement = field.element.nextElementSibling;
            if (messageElement && messageElement.classList.contains("error-message")) {
                messageElement.remove(); // 기존 안내 문구 제거
            }
        });

        // 입력 검증
        let isValid = true;
        fields.forEach(field => {
            if (!field.element.value) {
                isValid = false;
                // 테두리를 빨간색으로 강조
                field.element.style.border = "2px solid red";

                // placeholder 변경
                if (field.placeholder) {
                    field.element.placeholder = field.message;
                }

                // 안내 문구 추가
                const errorMessage = document.createElement("div");
                errorMessage.classList.add("error-message");
                errorMessage.style.color = "red";
                errorMessage.style.fontSize = "12px";
                errorMessage.textContent = field.message;
                field.element.insertAdjacentElement("afterend", errorMessage); // 필드 바로 아래에 추가
            }
        });

        if (!isValid) {
            event.preventDefault(); // 폼 제출 방지
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="sol_item_category"]');
    const valItemsContainer = document.querySelector('.val_items');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;  // 선택된 value 값 가져오기

        // AJAX 요청 보내기
        fetch(`/get_val_items/?sol_item_category=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                // val_items 업데이트
                valItemsContainer.innerHTML = '';  // 기존 항목 제거

                data.val_items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('sol_item_val');

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('val_title');
                    titleDiv.textContent = item.title;

                    const delIconDiv = document.createElement('div');
                    delIconDiv.classList.add('del_icon');
                    const delIconImg = document.createElement('img');
                    delIconImg.id = item.pk;
                    delIconImg.src = '/static/img/delete.png';
                    delIconImg.classList.add('delete-icon'); // 클래스 추가
                    delIconDiv.appendChild(delIconImg);

                    itemDiv.appendChild(titleDiv);
                    itemDiv.appendChild(delIconDiv);
                    valItemsContainer.appendChild(itemDiv);
                });

                // 삭제 아이콘 클릭 이벤트 추가
                document.querySelectorAll('.delete-icon').forEach(icon => {
                    icon.addEventListener('click', function () {
                        const itemId = this.id;

                        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
                        if (!confirmDelete) {
                            return; // 사용자가 취소를 누르면 삭제 중단
                        }

                        // AJAX 요청으로 데이터베이스에서 항목 삭제
                        fetch(`/delete_sol_item/${itemId}/`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    // 삭제 성공 시 해당 항목 제거
                                    this.parentElement.parentElement.remove();
                                } else {
                                    console.error('삭제 실패');
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="app_item_category"]');
    const valItemsContainer = document.querySelector('.val_items_app');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;  // 선택된 value 값 가져오기

        // AJAX 요청 보내기
        fetch(`/get_app_items/?app_item_category=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                // val_items 업데이트
                valItemsContainer.innerHTML = '';  // 기존 항목 제거

                data.val_items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('sol_item_val');

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('val_title');
                    titleDiv.textContent = item.title;

                    const delIconDiv = document.createElement('div');
                    delIconDiv.classList.add('del_icon');
                    const delIconImg = document.createElement('img');
                    delIconImg.id = item.pk;
                    delIconImg.src = '/static/img/delete.png';
                    delIconImg.classList.add('delete-icon'); // 클래스 추가
                    delIconDiv.appendChild(delIconImg);

                    itemDiv.appendChild(titleDiv);
                    itemDiv.appendChild(delIconDiv);
                    valItemsContainer.appendChild(itemDiv);
                });

                // 삭제 아이콘 클릭 이벤트 추가
                document.querySelectorAll('.delete-icon').forEach(icon => {
                    icon.addEventListener('click', function () {
                        const itemId = this.id;

                        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
                        if (!confirmDelete) {
                            return; // 사용자가 취소를 누르면 삭제 중단
                        }

                        // AJAX 요청으로 데이터베이스에서 항목 삭제
                        fetch(`/delete_app_item/${itemId}/`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    // 삭제 성공 시 해당 항목 제거
                                    this.parentElement.parentElement.remove();
                                } else {
                                    console.error('삭제 실패');
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    });
});

// // JavaScript로 버튼 클릭 시 새 창 열기
document.addEventListener("DOMContentLoaded", function () {
    const previewButton = document.getElementById("previewButton");

    previewButton.addEventListener("click", function () {
        const url = previewButton.getAttribute("data-url");
        const form = document.querySelector("#sol_item_add");
        const categoryValue = form.querySelector("select[name='sol_item_category']").value;
        const makeurl = url+'/'+categoryValue;
        window.open(makeurl, "미리보기", "width=800,height=600,scrollbars=yes");
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const previewButton = document.getElementById("previewButton_app");

    previewButton.addEventListener("click", function () {
        const url = previewButton.getAttribute("data-url");
        const form = document.querySelector("#app_item_add");
        const categoryValue = form.querySelector("select[name='app_item_category']").value;
        const makeurl = url+'/'+categoryValue;
        window.open(makeurl, "미리보기", "width=800,height=600,scrollbars=yes");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.querySelector('select[name="qnsfb"]');
    const valItemsContainer = document.querySelector('.tap_items');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;  // 선택된 value 값 가져오기

        // AJAX 요청 보내기
        fetch(`/get_tap_items/?tap_item=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                // val_items 업데이트
                valItemsContainer.innerHTML = '';  // 기존 항목 제거

                data.val_items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('tap_item_val');

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('val_title');
                    titleDiv.textContent = item.title;

                    const delIconDiv = document.createElement('div');
                    delIconDiv.classList.add('tap_del_icon');
                    const delIconImg = document.createElement('img');
                    delIconImg.id = item.pk;
                    delIconImg.src = '/static/img/delete.png';
                    delIconImg.classList.add('tap-delete-icon'); // 클래스 추가
                    delIconDiv.appendChild(delIconImg);

                    itemDiv.appendChild(titleDiv);
                    itemDiv.appendChild(delIconDiv);
                    valItemsContainer.appendChild(itemDiv);
                });

                // 삭제 아이콘 클릭 이벤트 추가
                document.querySelectorAll('.tap-delete-icon').forEach(icon => {
                    icon.addEventListener('click', function () {
                        const itemId = this.id;

                        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
                        if (!confirmDelete) {
                            return; // 사용자가 취소를 누르면 삭제 중단
                        }
                        // AJAX 요청으로 데이터베이스에서 항목 삭제
                        fetch(`/delete_tap_item/${itemId}/`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    // 삭제 성공 시 해당 항목 제거
                                    this.parentElement.parentElement.remove();
                                } else {
                                    console.error('삭제 실패');
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    });
});