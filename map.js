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
var canvas = document.getElementById('canvas');
var fig = canvas.getContext("2d");

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
    
    h1.style.width = ( data[room]["pos"][2] - data[room]["pos"][0] ) + "px";
    h1.style.height = ( data[room]["pos"][3] - data[room]["pos"][1] ) + "px";
    h1.style.left = data[room]["pos"][0] + "px";
    h1.style.top = data[room]["pos"][1] + "px";
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
            h1.style.width = ( data[room]["pos"][2] - data[room]["pos"][0] ) + "px";
            h1.style.height = ( data[room]["pos"][3] - data[room]["pos"][1] ) + "px";
            h1.style.left = data[room]["pos"][0] + "px";
            h1.style.top = data[room]["pos"][1] + "px";
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
            h2.style.width = ( data[dayroom]["pos"][2] - data[dayroom]["pos"][0] ) + "px";
            h2.style.height = ( data[dayroom]["pos"][3] - data[dayroom]["pos"][1] ) + "px";
            h2.style.left = data[dayroom]["pos"][0] + "px";
            h2.style.top = data[dayroom]["pos"][1] + "px";
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
        h2.style.width = ( data[dayroom]["pos"][2] - data[dayroom]["pos"][0] ) + "px";
        h2.style.height = ( data[dayroom]["pos"][3] - data[dayroom]["pos"][1] ) + "px";
        h2.style.left = data[dayroom]["pos"][0] + "px";
        h2.style.top = data[dayroom]["pos"][1] + "px";
        h2.style.visibility = "visible";
        h2.classList.add("show");
        h2.style.zIndex = 1;
    }
}

//経路検索
function line(Sx,Sy,Gx,Gy){
    fig.beginPath();
    fig.lineWidth = 8;
    fig.strokeStyle = "red";
    fig.moveTo(Sx,Sy);
    fig.lineTo(Gx,Gy);
    fig.stroke();
}

function draw(Sx, Sy, Gx, Gy){
    fig.clearRect(0,0,1651,1350);
    var work;
    if(Gx < Sx){
        work = Gx;
        Gx = Sx;
        Sx = work;

        work = Gy;
        Gy = Sy;
        Sy = work;
    }
    //東棟から移動するとき
    if(Sy == 181){
        if(Gy == Sy){
            line(Sx,Sy,Gx,Gy);
        }
        else if(Gy == 658){
            if(Sx < 366){
                line(Sx,Sy,366,Sy);
                line(366,Sy,366,Gy);
                line(Gx,Gy,366,Gy);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) < Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366)){
                    line(Sx,Sy,1182,Sy);
                    line(1182,Sy,1182,Gy);
                    line(Gx,Gy,1182,Gy);
                }
                else{
                    line(Sx,Sy,366,Sy);
                    line(366,Sy,366,Gy);
                    line(Gx,Gy,366,Gy);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //事務室へ移動するとき
        else if(Gy == 300){
            line(Sx,Sy,1182,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //校長室側へ移動するとき
        else if(Gy == 256){
            if(Math.abs(938 - Sx) < Math.abs(1182 - Sx)){
                line(Sx,Sy,938,Sy);
                line(938,Sy,938,Gy);
                line(938,Gy,Gx,Gy);
            }
            else{
                line(Sx,Sy,1182,Sy);
                line(1182,Sy,1182,Gy);
                line(Gx,Gy,1182,Gy);
            }
        }
    }
    //西棟から移動するとき
    else if(Sy == 658){
        if(Gy == Sy){
            line(Sx,Sy,Gx,Gy);
        }
        else if(Gy == 181){
            if(Sx < 366){
                line(Sx,Sy,366,Sy);
                line(366,Sy,366,Gy);
                line(Gx,Gy,366,Gy);
            }
            else if(1182 < Gx){
                line(Sx,Sy,1182,Sy);
                line(1182,Sy,1182,Gy);
                line(Gx,Gy,1182,Gy);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) < Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366)){
                    line(Sx,Sy,1182,Sy);
                    line(1182,Sy,1182,Gy);
                    line(Gx,Gy,1182,Gy);
                }
                else{
                    line(Sx,Sy,366,Sy);
                    line(366,Sy,366,Gy);
                    line(Gx,Gy,366,Gy);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //事務室へ移動するとき
        else if(Gy == 300){
            line(Sx,Sy,1182,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //校長室側へ移動するとき
        else if(Gy == 256){
            if(Math.abs(366 - Sx) + 572 + Math.abs(Gx - 938) < Math.abs(1182 - Sx) + Math.abs(1182 - Gx)){
                line(Sx,Sy,336,Sy);
                line(336,Sy,336,181);
                line(336,181,938,181);
                line(938,181,938,Gy);
                line(938,Gy,Gx,Gy);
            }
            else{
                line(Sx,Sy,1182,Sy);
                line(1182,Sy,1182,Gy);
                line(Gx,Gy,1182,Gy);
            }
        }
    }
    //117,118から移動するとき
    else if(Sx == 366){
        if(Gy == 300){
            line(Sx,Sy,Sx,181);
            line(Sx,181,1182,181);
            line(1182,181,1182,300);
        }
        else if(Gy != 256){
            line(Sx,Sy,Sx,Gy);
            line(Sx,Gy,Gx,Gy);
        }
        else{
            line(Sx,Sy,Sx,181);
            line(Sx,181,938,181);
            line(938,181,938,Gy);
            line(938,Gy,Gx,Gy);
        }
    }
    //事務室から移動するとき
    else if(Sy == 300){
        line(Sx,Sy,Sx,Gy);
        line(Sx,Gy,Gx,Gy);
    }
    //校長室側から移動するとき
    else if(Sy == 256){
        line(Sx,Sy,1182,Sy);
        line(1182,Sy,1182,Gy);
        line(1182,Gy,Gx,Gy);
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

      touchScale = initialScale * scaleChange;
      image.style.scale = touchScale;

      event.preventDefault();
    }
  });

  function getDistance(touch1, touch2) {
    const x = touch1.pageX - touch2.pageX;
    const y = touch1.pageY - touch2.pageY;

    return Math.sqrt(x * x + y * y);
  }