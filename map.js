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
const panzoomEl = document.getElementById('panzoom');
const instance = panzoom(panzoomEl, {
  smoothScroll: true,
  //transformOrigin: {x: 0.5, y: 0.5}, // change center point of wheel zoom.
  bounds: true,
  boundsPadding: 0.05,
  maxZoom: 2.5,
  minZoom: 0.2,
  initialZoom: 1,
  zoomDoubleClickSpeed: 1 // disable doubleclick zoom
  //beforeWheel: function(e) {return true;} // disable wheel zoom
});

// cancel a-tag event when pan.
let isPan = false;
instance.on('pan', function (e) {
  isPan = true;
});
instance.on('panend', function (e) {
  setTimeout(function () {
    isPan = false;
  }, 1);
});

panzoomEl.addEventListener('click', function (e) {
  if (isPan && e.srcElement.nodeName === 'A') e.preventDefault();
});

// zoom events
const zoomInEl = document.getElementById('zoomIn');
const zoomOutEl = document.getElementById('zoomOut');
const zoomInOut = (isIn) => {
  const tf = instance.getTransform();
  const scale = 1 + 0.25 * (isIn ? 1 : -1);
  instance.zoomTo(panzoomEl.clientWidth / 2, panzoomEl.clientHeight / 2, scale);
};
zoomInEl.addEventListener('click', (e) => {
  e.preventDefault();
  zoomInOut(true);
});

zoomInEl.addEventListener('touchend', () => {
  zoomInOut(true);
});

zoomOutEl.addEventListener('click', (e) => {
  e.preventDefault();
  zoomInOut(false);
});

zoomOutEl.addEventListener('touchend', () => {
  zoomInOut(false);
});

// zoom adjustment after img loaded.
const imgEl = panzoomEl.getElementsByTagName('img')[0];
const image = new Image();
image.onload = function () {
  const dw = panzoomEl.clientWidth / this.naturalWidth;
  const dh = panzoomEl.clientHeight / this.naturalHeight;
  const scale = Math.min(dw, dh);
  instance.zoomAbs(
    panzoomEl.clientWidth / 2,
    panzoomEl.clientHeight / 2,
    scale
  );
  //instance.zoomAbs(dw > dh ? (panzoomEl.clientWidth) / 2 : 0, dw < dh ? panzoomEl.clientHeight / 2 : 0, scale);
};
image.src = imgEl.src;

// output zoom string.
const printZoomEl = document.getElementById('print-zoom');
instance.on('zoom', function (e) {
  printZoomEl.innerText = instance.getTransform().scale;
});