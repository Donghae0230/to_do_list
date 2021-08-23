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

const weather = document.querySelector(".js-weather");
const API_key = "your_api_key";
const COORDS = "coords";

function handleGeoSucc(position) {  
    console.log(position)
    const latitude = position.coords.latitude; // 경도
    const longitude = position.coords.longitude; //위도
    const coordsObj = { 
        latitude : latitude, 
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoErr(err) {
    console.log("geo err!" + err);
}

function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
}

function getWeather(lat, lon) {
    // units=metric 사용해서 화씨 -> 섭씨 단위로 변경
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const temp = data.main.temp;
        const name = data.name;
        const weathers = data.weather[data.weather.length-1];
        weather.innerHTML = `${name} ${temp}&#176;C ${weathers.main}`;
    })
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null) {
        requestCoords();
    } else {
        const parsedCoords = JSON.parse(loadCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();