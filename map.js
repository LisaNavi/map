let pictures = new Array("https://venicck.github.io/lisanv/img/1F.png","https://venicck.github.io/lisanv/img/2F.png","https://venicck.github.io/lisanv/img/3F.png","https://venicck.github.io/lisanv/img/4F.png");
let img_height = 1350;
let img_width = 1651;
var img = document.getElementById("image");
var room = "";
var h1 = document.getElementById("highlight");

h1.onanimationend = function () {
    h1.classList.remove("show");
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
function flchange(floornum)
{
    img.src=pictures[floornum];
    // ハイライトと同じ階になったら表示
    if (room != "" && room[0] == floornum+1)
    {
        // 大きさを計算して座標配置
        h1.style.width = ( data[room][2] - data[room][0] ) + "px";
        h1.style.height = ( data[room][3] - data[room][1] ) + "px";
        h1.style.left = data[room][0] + "px";
        h1.style.top = data[room][1] + "px";
        h1.style.visibility = "visible";
        h1.classList.add("show");
        h1.style.zIndex = 1;
    }
    // 別の階になったら非表示
    else
    {
        h1.classList.remove("show");
        h1.style.visibility = "hidden";

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