// 드래그 방지
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

// 텍스트 선택 방지
document.addEventListener('selectstart', function(event) {
    event.preventDefault();
});

// 우클릭 방지
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
