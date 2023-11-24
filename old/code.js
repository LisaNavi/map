var pictures = new Array("img/1F.png","img/2F.png","img/3F.png","img/4F.png");
var colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
h1 = document.getElementById("highlight");
// position database load 今jsonファイルが読み込めない

// detect map position
var map = document.getElementById("image");
var clientRect = map.getBoundingClientRect();
var map_origin_width = 1651;
var map_scale = 1;
var wny = clientRect.top;
var wnx = clientRect.left;


h1.onanimationend = () => {
    h1.classList.remove("show");
};
// floor buttons function
function pick(num){ 
    var roomnum = document.getElementById("input").value;
    document.getElementById("image").src=pictures[num];
    document.getElementById("floorid").style.background=colors[num];
    document.getElementById("floorid").textContent= (num+1) + "F"
    if (!(roomnum[0] - 1 == num)){
        h1.style.visibility = "hidden";
    }
    else{
        h1.style.visibility = "visible";
    }
}

//search button function
function search(){
    var mapsize = map.clientWidth;
    map_scale = mapsize / map_origin_width;
    console.log(parseFloat(map_scale));
    var roomnum = document.getElementById("input").value;
    if (Number.isInteger(roomnum)){
    alert("部屋番号を入力してください。");
    }
    else if (!(roomnum > 100 && roomnum < 1000)) {
    alert("3桁である必要があります。");
    }
    else if (!(roomnum[0] < 5 && roomnum[0] > 0))
    {
    alert(roomnum[0] + "階は存在しません。");
    }
    else {
        if (typeof data[roomnum] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            // changing floor
            var floor = roomnum[0] - 1
            document.getElementById("image").src=pictures[floor];
            document.getElementById("floorid").style.background=colors[floor];
            document.getElementById("floorid").textContent= (floor+1) + "F"

            // move and show highlight
            // lefttop x - rightbottom x = width
            h1.style.width = ( data[roomnum][2] - data[roomnum][0] ) * map_scale + "px";
            // lefttop y - rightbottom y = height
            h1.style.height = ( data[roomnum][3] - data[roomnum][1] ) * map_scale + "px";

            h1.style.left = data[roomnum][0] * map_scale - parseInt(wnx);
            h1.style.top = data[roomnum][1] * map_scale + parseInt(wny);
            h1.style.zIndex = 1;
            h1.style.visibility = "visible";
            h1.classList.add("show");
        }
    }

}
