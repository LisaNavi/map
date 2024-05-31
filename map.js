let pictures = new Array("https://lisanavi.github.io/map/img/1F.png","https://lisanavi.github.io/map/img/2F.png","https://lisanavi.github.io/map/img/3F.png","https://lisanavi.github.io/map/img/4F.png");
let img_height = 1350;
let img_width = 1651;
let zoomlevel = 1;
let img = document.getElementById("image");
let room = "";
let dayroom = "";
let floornum = 1;
let container = document.getElementById("container");
let h1 = document.getElementById("highlight");
let h2 = document.getElementById("cls-highlight");

h1.onanimationend = function () {
    h1.classList.remove("show");
}
h2.onanimationend = function () {
    h2.classList.remove("show");
}

// Search room by input roomnumber
function showup(rn)
{
    room = rn;
    img.src = pictures[room[0] - 1]

    // lefttop y - rightbottom y = height
    
    h1.style.width = ( data[room][2] - data[room][0] ) + "px";
    h1.style.height = ( data[room][3] - data[room][1] ) + "px";
    h1.style.left = data[room][0] + "px";
    h1.style.top = data[room][1] + "px";
    h1.style.visibility = "visible";
    h1.classList.add("show");
    h1.style.zIndex = 1;
}

// Change floor
function flchange(num)
{
    floornum = num;
    img.src=pictures[floornum];
    

    // ハイライトと同じ階になったら表示
    if (room != "" && room[0] == floornum+1)
    {
        if (h1.style.visibility == "hidden") {
            // 大きさを計算して座標配置
            h1.style.width = ( data[room][2] - data[room][0] ) + "px";
            h1.style.height = ( data[room][3] - data[room][1] ) + "px";
            h1.style.left = data[room][0] + "px";
            h1.style.top = data[room][1] + "px";
            h1.style.visibility = "visible";
            h1.classList.add("show");
            h1.style.zIndex = 1;
        }
    }
    // 別の階になったら非表示
    else
    {
        h1.classList.remove("show");
        h1.style.visibility = "hidden";
    }

    // 週程ハイライトと同じ階になったら表示
    if (dayroom != "" && dayroom[0] == floornum+1)
    {
        if (h2.style.visibility == "hidden") {
            // 大きさを計算して座標配置
            h2.style.width = ( data[dayroom][2] - data[dayroom][0] ) + "px";
            h2.style.height = ( data[dayroom][3] - data[dayroom][1] ) + "px";
            h2.style.left = data[dayroom][0] + "px";
            h2.style.top = data[dayroom][1] + "px";
            h2.style.visibility = "visible";
            h2.classList.add("show");
            h2.style.zIndex = 1;
        }
    }
    else
    {
        h2.classList.remove("show");
        h2.style.visibility = "hidden";
    }
}

function clschange(num)
{
    dayroom = num;
    if (dayroom != "" && dayroom[0] == floornum+1 && h2.style.visibility == "hidden")
    {
        // 大きさを計算して座標配置
        h2.style.width = ( data[dayroom][2] - data[dayroom][0] ) + "px";
        h2.style.height = ( data[dayroom][3] - data[dayroom][1] ) + "px";
        h2.style.left = data[dayroom][0] + "px";
        h2.style.top = data[dayroom][1] + "px";
        h2.style.visibility = "visible";
        h2.classList.add("show");
        h2.style.zIndex = 1;
    }
}

function zoomin() {
    if (zoomlevel < 2) {
        zoomlevel += 0.05;
        container.style.scale = zoomlevel;
    }
}

function zoomout() {
    if (zoomlevel > 0.5) {
        zoomlevel -= 0.05;
        container.style.scale = zoomlevel;
    }
}

window.onload = function(){
    // 画像プリロード
    getImages();
    
}

// 画像プリロード用関数
function getImages(){
    for (i = 0; i < pictures.length; i++){
        var img = document.createElement('img');
        img.src = pictures[i];
    }
}

//ピンチ機能
const touchContainer = document.getElementById('display');
const image = document.getElementById('container');
let touchScale = 1;
let initialDistance = 0;
let initialScale = 1;

touchContainer.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches[0], event.touches[1]);
        initialScale = touchScale;
        event.preventDefault();
    }
});

touchContainer.addEventListener('touchmove', function (event) {
    if (event.touches.length === 2) {
    const distance = getDistance(event.touches[0], event.touches[1]);
    const scaleChange = distance / initialDistance;

    if (initialScale * scaleChange >= 0.2 && initialScale * scaleChange <= 1.0) { // 拡大縮小制限
        touchScale = initialScale * scaleChange;
        // image.style.transform = `scale(${touchScale})`;
        image.style.scale = touchScale;

        event.preventDefault();
        }
    }
});

function getDistance(touch1, touch2) {
    const x = touch1.pageX - touch2.pageX;
    const y = touch1.pageY - touch2.pageY;

    return Math.sqrt(x * x + y * y);
}
