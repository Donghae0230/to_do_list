'use strict';

let addButton = document.querySelector(".add-button");
let itemList = []

addButton.addEventListener("click", addItem)

function addItem() {
    let item = document.querySelector(".input-box").value;
    if (item != null) {
        // 값이 null이 아닐 때 push하고 초기화
        itemList.push(item) 
        document.querySelector(".input-box").value = "";
    }
    showList();
}

function showList() {
    let list = "<ul>"

    for (let i = 0; i < itemList.length; i++) {
        list += "<li><input type='checkbox'><label></label></input><p>" + itemList[i] + "</p><button class='delete-button' id=" + i + "></button>" + "</li>"
    }
    list += "</ul>";
    document.querySelector(".item-container").innerHTML = list;

    let deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i ++) {
        deleteButtons[i].addEventListener("click", deleteItem);
    }
}

function deleteItem() {
    let id = this.getAttribute("id");   //선택한 요소의 특정 속성값을 가져옴
    itemList.splice(id, 1); //itemList 배열 id인덱스에서 한 개 요소 제거
    showList();
}

let checkList = document.querySelector('.item-container');
checkList.addEventListener("click", event => {
    if (event.target.tagName === 'LABEL') {
        event.target.parentNode.classList.toggle('checked');
        let cbox = event.target.parentNode.firstChild;
        if (cbox.checked == true) {
            cbox.checked = false;
        }
        else {
            cbox.checked = true;
        }
    }
})