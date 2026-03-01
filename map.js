let pictures = new Array("https://lisanavi.github.io/map/img/1F_ex2-over.png","https://lisanavi.github.io/map/img/2F_ex2-over.png","https://lisanavi.github.io/map/img/3F_ex2-over.png","https://lisanavi.github.io/map/img/4F_ex2-over.png");
let pictures2 = new Array("https://lisanavi.github.io/map/img/1F_ex2-under.png","https://lisanavi.github.io/map/img/2F_ex2-under.png","https://lisanavi.github.io/map/img/3F_ex2-under.png","https://lisanavi.github.io/map/img/4F_ex2-under.png");
let img_height = 1350;
let img_width = 1651;
let zoomlevel = 1;
let img = document.getElementById("image");
let img2=document.getElementById("image2");
let room = "";
let dayroom = "";
let floornum = 0;
let Sroom = "";
let Wroom = "";
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
let h5 = document.getElementById("waypoint-highlight"); //経由地です
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

let routes = [];          // 各ルートは {Sx:[], Sy:[], Gx:[], Gy:[], Sf:..., Gf:..., floor1:...}
let appendMode = false;   // true のとき download() は既存ルートを消さず追加する

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
h5.onanimationend = function () {
    h5.classList.remove("show");
}

// Search room by input roomnumber
function showup(rn)
{
    room = rn;
    afloor=data[room]["floor"][0];

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
    h5.classList.remove("show"); //h5は経由地ですよ～
    h5.style.visibility = "hidden";
}

// Change floor
function flchange(num)
{
    floornum = num;
    img.src = pictures[floornum];
    img2.src = pictures2[floornum];
    fig.clearRect(0, 0, 1651, 1350);

// 通常ルート
for (const r of routes) {
    if (
        r &&
        r.Sx &&
        r.Sx[floornum] !== undefined &&
        r.Gx &&
        r.Gx[floornum] !== undefined
    ) {
        draw(
            r.Sx[floornum],
            r.Sy[floornum],
            r.Gx[floornum],
            r.Gy[floornum],
            r.color
        );
    }
}

// 体育館ルート（従来方式を維持）
if (typeof Mx !== "undefined" &&
    Mx[floornum] !== undefined &&
    My[floornum] !== undefined &&
    Vx[floornum] !== undefined &&
    Vy[floornum] !== undefined
) {
    draw(
        Mx[floornum],
        My[floornum],
        Vx[floornum],
        Vy[floornum],
        "red"
    );
}


        if(floornum==0){
body.style.backgroundColor='rgb(255,244,227)';

    }else if(floornum==1){
body.style.backgroundColor='rgb(227,247,255)';

    }else if(floornum==2){
body.style.backgroundColor='rgb(237,255,227)';

    }else if(floornum==3){
        body.style.backgroundColor='rgb(255,234,227)';
    }

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

    //経路経由地地点
    if (Wroom != "" && Wfloor == floornum){
        if (h5.style.visibility == "hidden") {
            // 大きさを計算して座標配置
            h5.style.visibility = "visible";
            h5.classList.add("show");
            h5.style.zIndex = 1;
        }
    }
    // 別の階になったら非表示
    else
    {
        h5.classList.remove("show");
        h5.style.visibility = "hidden";
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
/*
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
*/
function download(S1, S2, G1, G2, S3, G3, fl) {

    const useVia = window.useVia === true;
    const append = window.appendMode === true;

    let color;

    if (!useVia) {
        color = "red";
    } else if (!append) {
        color = "blue";
    } else {
        color = "red";
    }

    const route = {
        Sx: Array.isArray(S1) ? S1.slice() : S1,
        Sy: Array.isArray(S2) ? S2.slice() : S2,
        Gx: Array.isArray(G1) ? G1.slice() : G1,
        Gy: Array.isArray(G2) ? G2.slice() : G2,
        Sf: S3,
        Gf: G3,
        floor1: fl,
        color: color
    };

    // 互換用：既存 draw() が参照するグローバル変数を更新
    Sx = route.Sx;
    Sy = route.Sy;
    Gx = route.Gx;
    Gy = route.Gy;
    Sf = route.Sf;
    Gf = route.Gf;
    floor1 = route.floor1;

    // ルート登録
    if (!append) {
        routes = [route];
        fig.clearRect(0, 0, img_width, img_height);
    } else {
        routes.push(route);
    }

    flchange(floornum);
}

function showupS(rn)
{
    Sroom = rn;
    Sfloor=data[Sroom]["floor"][0];
    /*img.src = pictures[Sfloor];*/

    // lefttop y - rightbottom y = height
    
    h3.style.width = ( data[Sroom]["pos"][2] - data[Sroom]["pos"][0] ) + "px";
    h3.style.height = ( data[Sroom]["pos"][3] - data[Sroom]["pos"][1] ) + "px";
    h3.style.left = data[Sroom]["pos"][0] + "px";
    h3.style.top = data[Sroom]["pos"][1] + "px";
    h3.style.visibility = "hidden";
    /*
    h3.classList.add("show");
    h3.style.zIndex = 1;
    */
}

function showupW(rn)
{
    Wroom = rn;
    Wfloor = data[Wroom]["floor"][0];

    h5.style.width  = ( data[Wroom]["pos"][2] - data[Wroom]["pos"][0] ) + "px";
    h5.style.height = ( data[Wroom]["pos"][3] - data[Wroom]["pos"][1] ) + "px";
    h5.style.left   = data[Wroom]["pos"][0] + "px";
    h5.style.top    = data[Wroom]["pos"][1] + "px";
    h5.style.visibility = "hidden";
    /*
    h5.classList.add("show");
    h5.style.zIndex = 1;
    */
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
    h4.style.visibility = "hidden";
    /*
    h4.classList.add("show");
    h4.style.zIndex = 1;
    */
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
    h5.style.width = "0px";
    h5.style.height = "0px";
    h5.style.left = "0px";
    h5.style.top = "0px";
    h5.style.visibility = "visible";
    h5.classList.add("show");
    h5.style.zIndex = 1;
}

function clear_all_routes(){
    routes = [];
    Sx = []; Sy = []; Gx = []; Gy = [];
    fig.clearRect(0,0,img_width,img_height);
    // ハイライト類を消す
    h3.style.width = "0px"; h3.style.height = "0px"; h3.style.left = "0px"; h3.style.top = "0px";
    h3.style.visibility = "hidden"; h3.classList.remove("show");
    h4.style.width = "0px"; h4.style.height = "0px"; h4.style.left = "0px"; h4.style.top = "0px";
    h4.style.visibility = "hidden"; h4.classList.remove("show");
    h5.style.width = "0px"; h5.style.height = "0px"; h5.style.left = "0px"; h5.style.top = "0px";
    h5.style.visibility = "hidden"; h5.classList.remove("show");
    flchange(floornum);
}

function line(Sx,Sy,Gx,Gy, color) {
    // color が未指定なら赤をデフォルト
    const routeColor = color || "blue";

    // 同じ点の場合は少しずらす（既存の挙動）
    if (Sx == Gx && Sy == Gy){
        Sx = Sx - 5;
        Gx = Gx + 5;
    }

    fig.beginPath();
    fig.lineWidth = 8;
    fig.strokeStyle = routeColor;
    fig.moveTo(Sx,Sy);
    fig.lineTo(Gx,Gy);
    fig.stroke();
}

function draw(Sx, Sy, Gx, Gy, color){
    // color が未指定なら赤をデフォルト
    const routeColor = color || "blue";

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
            line(Sx,Sy,Gx,Gy, routeColor);
        }
        else if(Gy == 658){
            if(Sx < 366 && (Sf != 3 && Gf != 3)){
                line(Sx,Sy,366,Sy, routeColor);
                line(366,Sy,366,Gy, routeColor);
                line(Gx,Gy,366,Gy, routeColor);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) > Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366) && (Sf != 3 && Gf != 3)){
                    line(Sx,Sy,366,Sy, routeColor);
                    line(366,Sy,366,Gy, routeColor);
                    line(Gx,Gy,366,Gy, routeColor);
                }
                else if(floor1 == 1){
                    line(Sx,Sy,1182,Sy, routeColor);
                    line(1182,Sy,1182,Gy, routeColor);
                    line(Gx,Gy,1182,Gy, routeColor);
                }
                else{
                    line(Sx,Sy,1131,Sy, routeColor);
                    line(1131,Sy,1131,Gy, routeColor);
                    line(Gx,Gy,1131,Gy, routeColor);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //一般教室へ移動するとき
        else if(Gx == 1131){
            line(Sx,Sy,Gx,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //事務室へ移動するとき
        else if(Gy == 300){
            line(Sx,Sy,1182,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //校長室側へ移動するとき
        else if(Gy == 256){
            if(Math.abs(938 - Sx) < Math.abs(1182 - Sx)){
                line(Sx,Sy,938,Sy, routeColor);
                line(938,Sy,938,Gy, routeColor);
                line(938,Gy,Gx,Gy, routeColor);
            }
            else{
                line(Sx,Sy,1182,Sy, routeColor);
                line(1182,Sy,1182,Gy, routeColor);
                line(Gx,Gy,1182,Gy, routeColor);
            }
        }
    }
    //西棟から移動するとき
    else if(Sy == 658){
        if(Gy == Sy){
            line(Sx,Sy,Gx,Gy, routeColor);
        }
        else if(Gy == 181){
            if(Sx < 366 && (Sf != 3 && Gf != 3)){
                line(Sx,Sy,366,Sy, routeColor);
                line(366,Sy,366,Gy, routeColor);
                line(Gx,Gy,366,Gy, routeColor);
            }
            else if(1182 < Gx && (floor1 == 1)){
                line(Sx,Sy,1182,Sy, routeColor);
                line(1182,Sy,1182,Gy, routeColor);
                line(Gx,Gy,1182,Gy, routeColor);
            }
            else if(1182 < Gx){
                line(Sx,Sy,1131,Sy, routeColor);
                line(1131,Sy,1131,Gy, routeColor);
                line(Gx,Gy,1131,Gy, routeColor);
            }
            else{
                if(Math.abs(1182 - Sx) + 477 + Math.abs(1182 -Gx) > Math.abs(Sx - 366) + 477 + Math.abs(Gx - 366) && (Sf != 3 && Gf != 3)){
                    line(Sx,Sy,366,Sy, routeColor);
                    line(366,Sy,366,Gy, routeColor);
                    line(Gx,Gy,366,Gy, routeColor);
                }
                else if(floor1 == 1){
                    line(Sx,Sy,1182,Sy, routeColor);
                    line(1182,Sy,1182,Gy, routeColor);
                    line(Gx,Gy,1182,Gy, routeColor);
                }
                else{
                    line(Sx,Sy,1131,Sy, routeColor);
                    line(1131,Sy,1131,Gy, routeColor);
                    line(Gx,Gy,1131,Gy, routeColor);
                }
            }
        }
        //117,118へ移動するとき
        else if(Gx == 366){
            line(Sx,Sy,Gx,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //一般教室へ移動するとき
        else if(Gx == 1131){
            line(Sx,Sy,Gx,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //事務室へ移動するとき
        else if(Gy == 300){
            line(Sx,Sy,1182,Sy, routeColor);
            line(Gx,Sy,Gx,Gy, routeColor);
        }
        //校長室側へ移動するとき
        else if(Gy == 256){
            if(Math.abs(366 - Sx) + 572 + Math.abs(Gx - 938) < Math.abs(1182 - Sx) + Math.abs(1182 - Gx)){
                line(Sx,Sy,366,Sy, routeColor);
                line(366,Sy,366,181, routeColor);
                line(366,181,938,181, routeColor);
                line(938,181,938,Gy, routeColor);
                line(938,Gy,Gx,Gy, routeColor);
            }
            else{
                line(Sx,Sy,1182,Sy, routeColor);
                line(1182,Sy,1182,Gy, routeColor);
                line(Gx,Gy,1182,Gy, routeColor);
            }
        }
    }
    //117,118から移動するとき
    else if(Sx == 366){
        if(Gy == 300){
            line(Sx,Sy,Sx,181, routeColor);
            line(Sx,181,1182,181, routeColor);
            line(1182,181,1182,300, routeColor);
        }
        else if(Gy != 256){
            line(Sx,Sy,Sx,Gy, routeColor);
            line(Sx,Gy,Gx,Gy, routeColor);
        }
        else{
            line(Sx,Sy,Sx,181, routeColor);
            line(Sx,181,938,181, routeColor);
            line(938,181,938,Gy, routeColor);
            line(938,Gy,Gx,Gy, routeColor);
        }
    }
    //一般教室から移動するとき
    else if(Sx == 1131){
        line(Sx,Sy,Sx,Gy, routeColor);
        line(Sx,Gy,Gx,Gy, routeColor);
    }
    //事務室から移動するとき
    else if(Sy == 300){
        line(Sx,Sy,Sx,Gy, routeColor);
        line(Sx,Gy,Gx,Gy, routeColor);
    }
    //校長室側から移動するとき
    else if(Sy == 256){
        if(Sy == Gy){
            line(Sx,Sy,Sx,Gy, routeColor);
            line(Sx,Gy,Gx,Gy, routeColor);
        }
        else{
            line(Sx,Sy,1182,Sy, routeColor);
            line(1182,Sy,1182,Gy, routeColor);
            line(1182,Gy,Gx,Gy, routeColor);
        }
    }
    //体育館1Fへ移動するとき
    else if(Sx == 290){
        line(Gx,Gy,Gx,1006, routeColor);
        line(Gx,1006,Sx,1006, routeColor);
        line(Sx,1006,Sx,Sy, routeColor);
    }
    else if(Sy > 700){
        line(Gx,Gy,Sx,Sy, routeColor);
    }
    //その他
    else {
        line(Sx,Sy,Gx,Gy, routeColor);
    }
}

function ll_routes(){
    routes = [];
    Sx = [];
    Sy = [];
    Gx = [];
    Gy = [];
    // canvas とハイライトをクリアしてフロア再描画
    fig.clearRect(0,0,1651,1350);
    h3.style.width = "0px";
    h3.style.height = "0px";
    h3.style.left = "0px";
    h3.style.top = "0px";
    h3.style.visibility = "hidden";
    h3.classList.remove("show");

    h4.style.width = "0px";
    h4.style.height = "0px";
    h4.style.left = "0px";
    h4.style.top = "0px";
    h4.style.visibility = "hidden";
    h4.classList.remove("show");

    h5.style.width = "0px";
    h5.style.height = "0px";
    h5.style.left = "0px";
    h5.style.top = "0px";
    h5.style.visibility = "hidden";
    h5.classList.remove("show");

    flchange(floornum);
}

function zoomin() {
  setScale(scale + 0.05, display.clientWidth / 2, display.clientHeight / 2);
}

function zoomout() {
  setScale(scale - 0.05, display.clientWidth / 2, display.clientHeight / 2);
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
const display = document.getElementById('display');

// ズームパラメータを一元管理
let scale = 1;
let minScale, maxScale;

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  // iOS
  minScale = 0.5;
  maxScale = 3.0;
} else if (/Android/i.test(navigator.userAgent)) {
  // Android
  minScale = 0.5;
  maxScale = 3.0;
} else {
  // PC
  minScale = 0.95;
  maxScale = 4.0;
}

let origin = { x: 0, y: 0 };
let lastTouchDist = null;
let lastCenter = null;

// ボタン用ズーム関数も統一
function setScale(newScale, centerX, centerY) {
  // centerX, centerY はオプション
  const clampedScale = Math.max(minScale, Math.min(newScale, maxScale));

  if (centerX !== undefined && centerY !== undefined) {
    const dx = centerX - origin.x;
    const dy = centerY - origin.y;
    origin.x -= dx * (clampedScale / scale - 1);
    origin.y -= dy * (clampedScale / scale - 1);
  }

  scale = clampedScale;
  updateTransform();
}

function zoomin() {
  setScale(scale + 0.05, display.clientWidth/2, display.clientHeight/2);
}

function zoomout() {
  setScale(scale - 0.05, display.clientWidth/2, display.clientHeight/2);
}

function updateTransform() {
  const containerWidth = 1651 * scale;
  const containerHeight = 1350 * scale;

  const displayWidth = display.clientWidth;
  const displayHeight = display.clientHeight;

  const minX = Math.min(0, displayWidth - containerWidth);
  const minY = Math.min(0, displayHeight - containerHeight);
  const maxX = 0;
  const maxY = 0;

  origin.x = Math.min(maxX, Math.max(minX, origin.x));
  origin.y = Math.min(maxY, Math.max(minY, origin.y));

  container.style.transform = `translate(${origin.x}px, ${origin.y}px) scale(${scale})`;
}

function getTouchCenter(touches) {
  const rect = display.getBoundingClientRect();
  const x = (touches[0].clientX + touches[1].clientX) / 2 - rect.left + display.scrollLeft;
  const y = (touches[0].clientY + touches[1].clientY) / 2 - rect.top + display.scrollTop;
  return { x, y };
}

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

display.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    lastTouchDist = getTouchDistance(e.touches);
    lastCenter = getTouchCenter(e.touches);
    isDragging = false; // 2本指ならパンは無効
  } else if (e.touches.length === 1) {
    isDragging = true;
    lastDragPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}, { passive: false });

display.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const newDist = getTouchDistance(e.touches);
    const newCenter = getTouchCenter(e.touches);

    const scaleChange = newDist / lastTouchDist;
    setScale(scale * scaleChange, newCenter.x, newCenter.y);

    lastTouchDist = newDist;
    lastCenter = newCenter;
  }
}, { passive: false });

display.addEventListener('touchend', (e) => {
  if (e.touches.length < 2) {
    lastTouchDist = null;
    lastCenter = null;
  }
});

display.addEventListener("wheel", (e) => {
  e.preventDefault();

  // ホイールの回転量で倍率を決定（上に回すと拡大、下で縮小）
  const zoomIntensity = 0.1; // 感度
  const scaleChange = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;

  // ホイール位置を基準にズームする
  const rect = display.getBoundingClientRect();
  const centerX = e.clientX - rect.left + display.scrollLeft;
  const centerY = e.clientY - rect.top + display.scrollTop;

  setScale(scale * scaleChange, centerX, centerY);
}, { passive: false });

// --- パン（ドラッグ）用変数 ---
let isDragging = false;
let lastDragPos = { x: 0, y: 0 };

// --- マウス対応パン ---
display.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastDragPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.clientX - lastDragPos.x;
    const dy = e.clientY - lastDragPos.y;
    origin.x += dx;
    origin.y += dy;
    lastDragPos = { x: e.clientX, y: e.clientY };
    updateTransform();
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

// --- タッチ対応パン ---
display.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastDragPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}, { passive: false });

display.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1 && isDragging) {
    const dx = e.touches[0].clientX - lastDragPos.x;
    const dy = e.touches[0].clientY - lastDragPos.y;
    origin.x += dx;
    origin.y += dy;
    lastDragPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    updateTransform();
  }
}, { passive: false });

display.addEventListener('touchend', (e) => {
  if (e.touches.length === 0) {
    isDragging = false;
  }
});
