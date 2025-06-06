let pictures = new Array("https://lisanavi.github.io/map/img/1F.png","https://lisanavi.github.io/map/img/2F.png","https://lisanavi.github.io/map/img/3F.png","https://lisanavi.github.io/map/img/4F.png");
let img_height = 1350;
let img_width = 1651;
let zoomlevel = 1;
let img = document.getElementById("image");
let room = "";
let dayroom = "";
let floornum = 1;
let Sroom = "";
let Groom = "";
let Mroom = "";
let Vroom = "";
let Sf = "";
let Gf = "";
let container = document.getElementById("container");
let h1 = document.getElementById("highlight");
let h2 = document.getElementById("cls-highlight");
let h3 = document.getElementById("start-highlight");
let h4 = document.getElementById("goal-highlight");
var canvas = document.getElementById('canvas');
var fig = canvas.getContext("2d");
let Sx = [];
let Sy = [];
let Gx = [];
let Gy = [];
let Mx = [];
let My = [];
let Vx = [];
let Vy = [];
let floor1 = "";

h1.onanimationend = function () {
    h1.classList.remove("show");
}
h2.onanimationend = function () {
    h2.classList.remove("show");
}
h3.onanimationend = function () {
    h3.classList.remove("show");
}
h4.onanimationend = function () {
    h4.classList.remove("show");
}

// Search room by input roomnumber
function showup(rn)
{
    room = rn;
    afloor=data[room]["floor"][0];
    img.src = pictures[afloor];

    // lefttop y - rightbottom y = height
    
    h1.style.width = ( data[room]["pos"][2] - data[room]["pos"][0] ) + "px";
    h1.style.height = ( data[room]["pos"][3] - data[room]["pos"][1] ) + "px";
    h1.style.left = data[room]["pos"][0] + "px";
    h1.style.top = data[room]["pos"][1] + "px";
    h1.style.visibility = "visible";
    h1.classList.add("show");
    h1.style.zIndex = 1;
}

//ハイライト削除
function clearhighlight(){
    h3.classList.remove("show");
    h3.style.visibility = "hidden";
    h4.classList.remove("show");
    h4.style.visibility = "hidden";
}

// Change floor
function flchange(num)
{
    floornum = num;
    img.src=pictures[floornum];
    fig.clearRect(0,0,1651,1350);
    draw(Sx[floornum],Sy[floornum],Gx[floornum],Gy[floornum]);
    draw(Mx[floornum],My[floornum],Vx[floornum],Vy[floornum]);
    

    // ハイライトと同じ階になったら表示
    if (room != "" && afloor == floornum)
    {
        if (h1.style.visibility == "hidden") {
            // 大きさを計算して座標配置
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

    //経路スタート地点
    if (Sroom != "" && Sfloor == floornum){
        if (h3.style.visibility == "hidden") {
            // 大きさを計算して座標配置
            h3.style.visibility = "visible";
            h3.classList.add("show");
            h3.style.zIndex = 1;
        }
    }
    // 別の階になったら非表示
    else
    {
        h3.classList.remove("show");
        h3.style.visibility = "hidden";
    }
    //経路ゴール地点
    if (Groom != "" && Gfloor == floornum){
        if (h4.style.visibility == "hidden") {
            // 大きさを計算して座標配置
            h4.style.visibility = "visible";
            h4.classList.add("show");
            h4.style.zIndex = 1;
        }
    }
    // 別の階になったら非表示
    else
    {
        h4.classList.remove("show");
        h4.style.visibility = "hidden";
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
function download(S1,S2,G1,G2,S3,G3,fl){
    fig.clearRect(0,0,1651,1350);
    Sx = S1;
    Sy = S2;
    Gx = G1;
    Gy = G2;
    Sf = S3;
    Gf = G3;
    floor1 = fl;
}

function showupS(rn)
{
    Sroom = rn;
    Sfloor=data[Sroom]["floor"][0];
    img.src = pictures[Sfloor];

    // lefttop y - rightbottom y = height
    
    h3.style.width = ( data[Sroom]["pos"][2] - data[Sroom]["pos"][0] ) + "px";
    h3.style.height = ( data[Sroom]["pos"][3] - data[Sroom]["pos"][1] ) + "px";
    h3.style.left = data[Sroom]["pos"][0] + "px";
    h3.style.top = data[Sroom]["pos"][1] + "px";
    h3.style.visibility = "visible";
    h3.classList.add("show");
    h3.style.zIndex = 1;
}

function showupG(rn)
{
    Groom = rn;
    Gfloor = data[Groom]["floor"][0];

    // lefttop y - rightbottom y = height

    h4.style.width = ( data[Groom]["pos"][2] - data[Groom]["pos"][0] ) + "px";
    h4.style.height = ( data[Groom]["pos"][3] - data[Groom]["pos"][1] ) + "px";
    h4.style.left = data[Groom]["pos"][0] + "px";
    h4.style.top = data[Groom]["pos"][1] + "px";
}

function download1(S1,S2,G1,G2,S3,G3){
    Mx = S1;
    My = S2;
    Vx = G1;
    Vy = G2;
    Mf = S3;
    Vf = G3;
}

function showupM(rn){
    if(Sroom == 167 || Sroom == 267){
        Sroom = rn;
        Sfloor=data[Sroom]["floor"][0];
        img.src = pictures[Sfloor];

        // lefttop y - rightbottom y = height
        
        h3.style.width = ( data[Sroom]["pos"][2] - data[Sroom]["pos"][0] ) + "px";
        h3.style.height = ( data[Sroom]["pos"][3] - data[Sroom]["pos"][1] ) + "px";
        h3.style.left = data[Sroom]["pos"][0] + "px";
        h3.style.top = data[Sroom]["pos"][1] + "px";
        h3.style.visibility = "visible";
        h3.classList.add("show");
        h3.style.zIndex = 1;
    }
    else if(Groom == 167 || Groom == 267){
        Groom = rn;
        Gfloor = data[Groom]["floor"][0];

        // lefttop y - rightbottom y = height
    
        h4.style.width = ( data[Groom]["pos"][2] - data[Groom]["pos"][0] ) + "px";
        h4.style.height = ( data[Groom]["pos"][3] - data[Groom]["pos"][1] ) + "px";
        h4.style.left = data[Groom]["pos"][0] + "px";
        h4.style.top = data[Groom]["pos"][1] + "px";
    }
}

function delate_route(S1,S2,G1,G2){
    Sx = S1;
    Sy = S2;
    Gx = G1;
    Gy = G2;
    flchange(floornum);
    // lefttop y - rightbottom y = height 
    h3.style.width = "0px";
    h3.style.height = "0px";
    h3.style.left = "0px";
    h3.style.top = "0px";
    h3.style.visibility = "visible";
    h3.classList.add("show");
    h3.style.zIndex = 1;
    h4.style.width = "0px";
    h4.style.height = "0px";
    h4.style.left = "0px";
    h4.style.top = "0px";
    h4.style.visibility = "visible";
    h4.classList.add("show");
    h4.style.zIndex = 1;
}

function line(Sx,Sy,Gx,Gy){
    if (Sx == Gx && Sy == Gy){
        Sx = Sx - 5;
        Gx = Gx + 5;
    }
    fig.beginPath();
    fig.lineWidth = 8;
    fig.strokeStyle = "red";
    fig.moveTo(Sx,Sy);
    fig.lineTo(Gx,Gy);
    fig.stroke();
}

function draw(Sx, Sy, Gx, Gy){
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
            if(Sx < 366 && (Sf != 3 && Gf != 3)){
                line(Sx,Sy,366,Sy);
                line(366,Sy,366,Gy);
                line(Gx,Gy,366,Gy);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) > Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366) && (Sf != 3 && Gf != 3)){
                    line(Sx,Sy,366,Sy);
                    line(366,Sy,366,Gy);
                    line(Gx,Gy,366,Gy);
                }
                else if(floor1 == 1){
                    line(Sx,Sy,1182,Sy);
                    line(1182,Sy,1182,Gy);
                    line(Gx,Gy,1182,Gy);
                }
                else{
                    line(Sx,Sy,1131,Sy);
                    line(1131,Sy,1131,Gy);
                    line(Gx,Gy,1131,Gy);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //一般教室へ移動するとき
        else if(Gx == 1131){
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
            if(Sx < 366 && (Sf != 3 && Gf != 3)){
                line(Sx,Sy,366,Sy);
                line(366,Sy,366,Gy);
                line(Gx,Gy,366,Gy);
            }
            else if(1182 < Gx && (floor1 == 1)){
                line(Sx,Sy,1182,Sy);
                line(1182,Sy,1182,Gy);
                line(Gx,Gy,1182,Gy);
            }
            else if(1182 < Gx){
                line(Sx,Sy,1131,Sy);
                line(1131,Sy,1131,Gy);
                line(Gx,Gy,1131,Gy);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) > Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366) && (Sf != 3 && Gf != 3)){
                    line(Sx,Sy,366,Sy);
                    line(366,Sy,366,Gy);
                    line(Gx,Gy,366,Gy);
                }
                else if(floor1 == 1){
                    line(Sx,Sy,1182,Sy);
                    line(1182,Sy,1182,Gy);
                    line(Gx,Gy,1182,Gy);
                }
                else{
                    line(Sx,Sy,1131,Sy);
                    line(1131,Sy,1131,Gy);
                    line(Gx,Gy,1131,Gy);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy);
            line(Gx,Sy,Gx,Gy);
        }
        //一般教室へ移動するとき
        else if(Gx == 1131){
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
                line(Sx,Sy,366,Sy);
                line(366,Sy,366,181);
                line(366,181,938,181);
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
    //一般教室から移動するとき
    else if(Sx == 1131){
        line(Sx,Sy,Sx,Gy);
        line(Sx,Gy,Gx,Gy);
    }
    //事務室から移動するとき
    else if(Sy == 300){
        line(Sx,Sy,Sx,Gy);
        line(Sx,Gy,Gx,Gy);
    }
    //校長室側から移動するとき
    else if(Sy == 256){
        if(Sy == Gy){
            line(Sx,Sy,Sx,Gy);
            line(Sx,Gy,Gx,Gy);
        }
        else{
            line(Sx,Sy,1182,Sy);
            line(1182,Sy,1182,Gy);
            line(1182,Gy,Gx,Gy);
        }
    }
    //体育館1Fへ移動するとき
    else if(Sx == 290){
        line(Gx,Gy,Gx,1006);
        line(Gx,1006,Sx,1006);
        line(Sx,1006,Sx,Sy);
    }
    else if(Sy > 700){
        line(Gx,Gy,Sx,Sy);
    }
    //その他
    else {
        line(Sx,Sy,Gx,Gy);
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
/*
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
*/
const touchcontainer = document.getElementById('container');

let scale = 1;
let origin = { x: 0, y: 0 };
let lastTouchDist = null;
let lastCenter = null;

function getTouchCenter(touches) {
  const x = (touches[0].clientX + touches[1].clientX) / 2;
  const y = (touches[0].clientY + touches[1].clientY) / 2;
  return { x, y };
}

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function updateTransform() {
  const translateX = origin.x;
  const translateY = origin.y;
  container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

document.getElementById('display').addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    lastTouchDist = getTouchDistance(e.touches);
    lastCenter = getTouchCenter(e.touches);
  }
}, { passive: false });

document.getElementById('display').addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // 標準のズーム無効化
    const newDist = getTouchDistance(e.touches);
    const newCenter = getTouchCenter(e.touches);

    const scaleChange = newDist / lastTouchDist;
    const newScale = scale * scaleChange;

    // 原点位置の調整
    const dx = newCenter.x - origin.x;
    const dy = newCenter.y - origin.y;

    origin.x -= dx * (scaleChange - 1);
    origin.y -= dy * (scaleChange - 1);

    scale = newScale;
    lastTouchDist = newDist;
    lastCenter = newCenter;

    updateTransform();
  }
}, { passive: false });