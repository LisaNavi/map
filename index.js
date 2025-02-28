let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid"); 
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let tutorial = document.getElementById("tutorial");
let notify_text = document.getElementById("notify-text");
let route_panel = document.getElementById('route-panel')
let inputS = document.getElementById("input-start");
let inputG = document.getElementById("input-goal");
var Sx = [];
var Sy = [];
var Gx = [];
var Gy = [];

// クッキーから読み込み
let userdata = {};
if (Cookies.get("data") != undefined)
{
    userdata = JSON.parse(Cookies.get("data"));
}

var now = new Date();
var nowtime = 0;
var floornum = 0;
var classtime = 0;
var classday = new Date().getDay();

function floor(num)
{
    floornum = num;
    dis_number.textContent = (floornum+1) + "F";
    dis_number.style.background=colors[floornum];
    map.contentWindow.flchange(floornum);
}

function search(num){
    if (Number.isInteger(num)){
        alert("部屋番号を入力してください。");
    } else {
        if (typeof data[num] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            if (data[num]["info"] != undefined){
                document.getElementById("info").style.visibility = "hidden";}
            if (data[num]["info"] != undefined){
                document.getElementById("info-btn").style.visibility = "visible"
                document.getElementById("info-btn").style.visibility = "none";}

            map.contentWindow.room = num;
            floors = data[num]["floor"];
            
            map.contentWindow.showup(num);
        
            dis_number.textContent = (floors[0]+1) + "F";
            dis_number.style.background=colors[data[num]["floor"]];
           
        }
        
    }
}


function info(num) {
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    var desk_num = document.getElementById("desk-num");
    var img = document.getElementById("png");
    info_pane.style.visibility = "visible";
    if (data[num]["info"] != undefined) {
        desk_num.textContent = num + " 教室";
        desk.textContent = data[num]["info"];
        img.src=data[num]["img"];
    } else {
        desk.textContent = "この教室のインフォメーションはありません";
    }
}



function inf(){

    
        alert("部屋番号を入力してください。");
    

}


function cls_close() {
    if (typeof userdata["schedule"] == "undefined")
         userdata["schedule"] = {};
    for (var day=1;day<=5;day++) {
        for (var time=1;time<=4;time++) {
            if (time == 4){
                if (day==1 || day==2 || day==3){
                    continue;
                }
            }
            temp = document.getElementById("cls" + day + "-" + time).value;
            if (typeof data[temp] != "undefined") { //教室データに存在する場合登録
                userdata["schedule"][day + "-" + time] = temp;
            }
            else if (temp == "" && typeof userdata["schedule"][day + "-" + time] != "undefined") {
                delete userdata["schedule"][day + "-" + time];
            }
        }
    delete day, time;
    }
    Cookies.set("data",JSON.stringify(userdata), {expires: 180});
    schedulebox.style.visibility = "hidden";
}

function cls_open() {
    schedulebox.style.visibility = "visible";
}

function info_close() {
    var info_pane = document.getElementById("information");
    info_pane.style.visibility = "hidden";
}

function TimelineChange() {
    if (typeof userdata["schedule"][classday + "-" + classtime] != "undefined") //その時間に教室配置が登録されていれば
    {
        map.contentWindow.clschange(userdata["schedule"][classday + "-" + classtime]);
        // 週程ハイライトの教室番号を変更
        notify_text.textContent = "次の授業教室は " + userdata["schedule"][classday + "-" + classtime] + " です";
        Notify_Toggle(true);
        dis_number.style.background=colors[floornum];
    }
    
}

//tutorial
function cls_tutorialopen(){
    tutorial.style.visibility = "visible";
}

function cls_tutorialclose() {
    tutorial.style.visibility = "hidden";
}


//経路検索
function open_route(){
    var route_pane = document.getElementById("route-panel");
    route_pane.style.visibility = "visible";
    
}

function close_route(){
    var close_pane = document.getElementById("route-panel");
    close_pane.style.visibility = "hidden";
}


function search_route(Snum, Gnum) {
    if (Number.isInteger(Snum)){
        alert("部屋番号を入力してください。");
    }
    else if (!(Snum > 100 && Snum < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(Snum[0] < 5 && Snum[0] > 0))
    {
        alert(Snum[0] + "階は存在しません。");
    }
    else {
        if (typeof data[Snum] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            if (Number.isInteger(Gnum)){
                alert("部屋番号を入力してください。");
            }
            else if (!(Gnum > 100 && Gnum < 1000)) {
                alert("3桁である必要があります。");
            }
            else if (!(Gnum[0] < 5 && Gnum[0] > 0))
            {
                alert(Gnum[0] + "階は存在しません。");
            }
            else {
                if (typeof data[Gnum] == "undefined"){
                    alert("指定された部屋番号は登録されていません。");
                }
                else {
                    var fl = "";
                    var Sx0 = path[Snum][0];
                    var Sy0 = path[Snum][1];
                    var Gx0 = path[Gnum][0];
                    var Gy0 = path[Gnum][1];
                    var floor1 = 0;
                    for (let i = 0; i < 4; i++){
                        if ((i+1)*100 < Snum && Snum < (i+2)*100){
                            Sf = i;
                        }
                        if ((i+1)*100 < Gnum && Gnum < (i+2)*100){
                            Gf = i;
                        }
                    }
                    var fn = Sf;
                    var work = [];
                    if(Gx0 < Sx0){
                        work = Gx0;
                        Gx0 = Sx0;
                        Sx0 = work;

                        work = Gy0;
                        Gy0= Sy0;
                        Sy0 = work;

                        work = Gf;
                        Gf = Sf;
                        Sf = work;
                    }
                    //同じ階で移動するとき
                    if (Sf == Gf) {
                        for (let i = 0; i < 4; i++) {
                            Sx[i] = Sx0;
                            Sy[i] = Sy0;
                            Gx[i] = Gx0;
                            Gy[i] = Gy0;
                            fl = i;
                            if (i == 1)
                                floor1 = 1;
                            if (i == Sf){
                                continue;
                            }
                            else{
                                Sx[i] = 330;
                                Gx[i] = 330;
                                Sy[i] = 220;
                                Gy[i] = 220;
                                
                            }
                        }
                    }
                    //異なる階で移動するとき
                    else if (fl != 1 || 2 || 3 || 4){
                        //東棟から移動するとき
                        if(Sy0 == 181){
                            if(Gy0 == Sy0){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            else if(Gy0 == 658){
                                if(Sx0 < 366){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                                else{
                                    if(Math.abs(1182 - Sx0) + 477 + Math.abs(1182 -Gx0) < Math.abs(Sx0 - 366) + 477 + Math.abs(Gx0 - 366)){
                                        if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                            if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                                if (Sf == 0 || Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                                if (Sf == 0 || Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                            if (Sf == 0 || Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                    }
                                    else{
                                        if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                            if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                                if (Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                                if (Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                            if (Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                    }
                                }
                            }
                            //117,118へ移動するとき
                            else if(Gx0 == 366){
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                            //一般教室へ移動するとき
                            else if(Gx0 == 1131){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            //事務室へ移動するとき
                            else if(Gy0 == 300){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            //校長室側へ移動するとき
                            else if(Gy0 == 256){
                                if(Math.abs(938 - Sx) < Math.abs(1182 - Sx)){
                                    if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                        if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                        }
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                    }
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                            }
                        }
                        //西棟から移動するとき
                        else if(Sy0 == 658){
                            if(Gy0 == Sy0){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else if(Gf != 3){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                }
                            }
                            else if(Gy0 == 181){
                                if(Sx0 < 366){
                                    if(Gf != 3){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else if(1182 < Gx0){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                            if (Sf == 0 || Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                            if (Sf == 0 || Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                    }
                                    else {
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                        if (Sf == 0 || Gf == 0){
                                            floor1 = 1;
                                        }
                                    }
                                }
                                else{
                                    if(Math.abs(1182 - Sx0) + 477 + Math.abs(1182 -Gx0) < Math.abs(Sx0 - 366) + 477 + Math.abs(Gx0 - 366)){
                                        if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                            if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                                if (Sf == 0 || Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                                if (Sf == 0 || Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                        }
                                        else {
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                            if (Sf == 0 || Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                    }
                                    else{
                                        if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                            if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                                if (Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                                if (Gf == 0){
                                                    floor1 = 1;
                                                }
                                            }
                                        }
                                        else {
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                            if (Gf == 0){
                                                floor1 = 1;
                                            }
                                        }
                                    }
                                }
                            }
                            //117,118へ移動するとき
                            else if(Gx0 == 366){
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                            }
                            //一般教室へ移動するとき
                            else if(Gx0 == 1131){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                            }
                            //事務室へ移動するとき
                            else if(Gy0 == 300){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                            }
                            //校長室側へ移動するとき
                            else if(Gy0 == 256){
                                if(Math.abs(366 - Sx0) + 572 + Math.abs(Gx0 - 938) < Math.abs(1182 - Sx0) + Math.abs(1182 - Gx0)){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                        }
                                    }
                                    else {
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                }
                            }
                        }
                        //117,118から移動するとき
                        else if(Sx0 == 366){
                            if(Gy0 != 256){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                            if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                            }
                                            else{
                                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                            }
                                        }
                                        else {
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                        }
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            else{
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                        }
                        //一般教室から移動するとき
                        else if(Sx0 == 1131){
                            if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                        }
                                        else{
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                        }
                                    }
                                    else {
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                                else{
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                }
                            }
                            else {
                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                        }
                        //事務室から移動するとき
                        else if(Sy0 == 300){
                            if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                }
                            }
                            else {
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                        }
                        //校長室側から移動するとき
                        else if(Sy0 == 256){
                            if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1131) + Math.abs(Gx0 - 1131)){
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                            }
                            else{
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                            }
                        }
                    }
                    map.contentWindow.clearhighlight();
                    map.contentWindow.download(Sx,Sy,Gx,Gy,Sf,Gf,floor1);
                    map.contentWindow.Sroom = Snum;
                    map.contentWindow.showupS(Snum);
                    map.contentWindow.Groom = Gnum;
                    map.contentWindow.showupG(Gnum);
                    map.contentWindow.flchange(fn);
                    dis_number.textContent = Snum[0] + "F";
                    dis_number.style.background=colors[Snum[0] - 1];
                }
            }
        }
    }
}

//階段時の挙動
function stairs(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y2;
        }
        else{
            Gy[i] = y1;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = y1;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
}
//階段例外用1
function stairs2(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y1;
        }
        else{
            Gy[i] = 181;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = 181;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
}
//階段例外用2
function stairs3(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y1;
        }
        else{
            Gy[i] = y2;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = y2;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
}


// CSV関係
let csvformat = [["講時/曜日","月","火","水","木","金"],
                        ["1","","","","",""],
                        ["2","","","","",""],
                        ["3","","","","",""],
                        ["4","","","","",""],];
let upload = document.getElementById("csvupload");
upload.addEventListener("change", importCSV);

function importCSV() {
    if (upload.files.length == 0) {
        console.log("No file selected");
        return;
    }
    else if (upload.files.length > 1) {
        console.log("Uploaded too many files");
        return;
    }

    // 配列を定義
    let csvArray = [];
    let csvReadError = "";
    

    // CSVファイルへのパス
    const file = upload.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        let csv = reader.result;
        console.log(reader.result);

        // 改行ごとに配列化
        let lines = csv.split("\r\n");
        let skippedroom = 0;

        if (lines.length < 5) {
            csvReadError = "wrongformat";
        }
        else {
                // 1行ごとに処理
                for (let i = 0; i < lines.length; ++i) {
                    let cells = lines[i].split(",");
                    for (let j=0 ;j < 5;j++) {
                        if (typeof cells[j] == "undefined") {
                            cells[j] = "";
                        }
                    }
                    csvArray.push(cells);
                }
                if (csvArray[0][0] != "講時/曜日") {
                    csvReadError = "対応していないファイル内容です。";
                }

            }
            
            if (csvReadError != "") {
                alert("エラーが発生しました: " + csvReadError);
            } else {
                for (let d=1; d<6; d++) {
                    for (let t=1; t<5; t++) {
                        // 存在しない部屋はスキップ
                        if (t == 4){
                            if (d==1 || d==2 || d==3){
                                continue;
                            }
                        }
                        if (typeof data[csvArray[t][d]] == "undefined") {
                            document.getElementById("cls" + d + "-" + t).value =  "";
                            skippedroom++;
                        } else {
                            document.getElementById("cls" + d + "-" + t).value = csvArray[t][d];
                        }
                    }
                }
                if (skippedroom != 0) {
                    alert(skippedroom + "この部屋は存在しないため読み込みませんでした。");
                }
            }
        }
    reader.readAsText(file);
}

function exportCSV() {
    let exportArray = csvformat;
    let cell = "";
    let skippedroom = 0;
    for (let d=1; d<6; d++) {
        for(let t=1; t<5; t++) {
            if (t == 4){
                if (d==1 || d==2 || d==3){
                    continue;
                }
            }
            cell = document.getElementById("cls" + d + "-" + t).value;
            if (typeof data[cell] == "undefined") {
                exportArray[t][d] = "";
                skippedroom++;
            } else {
                exportArray[t][d] = cell;
            }
        }
    }
    if (skippedroom != 0) {
        alert("存在しない教室が"+ skippedroom + "個あったためスキップされました。");
    }
    let exportTmp = [];
    for (let t=0; t<5; t++) {
        exportTmp[t] = exportArray[t].join(',');
    }
    let exportStr = exportTmp.join("\r\n");
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    let blob = new Blob([bom, exportStr],{type:"text/csv"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "lisanavi_schedule.csv";
    link.click();
}

function ResizeFrame() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth;
    frame.style.width = sitewidth;
}

function Menu_Toggle() {
    let menu_panel = document.getElementById("menu");
    if (menu_panel.style.display == "none") {
        menu_panel.style.display = "flex";
    } else {
        menu_panel.style.display = "none";
    }
}

function Notify_Toggle(which) {
    let notify = document.getElementById("notify");
    if (which == true) {
        notify.style.display = "flex";
    } else if (which == false){
        notify.style.display = "none";
    }
}

window.onload = function() {
    ResizeFrame();
}
window.onresize = function() {
    ResizeFrame();
}






window.addEventListener('DOMContentLoaded', function() {
    //クッキーのスケジュールを表の枠に代入する
    if (typeof userdata["schedule"] != "undefined") {
        for (let day=1;day<=5;day++) {
            for (let time=1;time<=4;time++) {
                if (time == 4){
                    if (day==1 || day==2 || day==3){
                        continue;
                    }
                }
                if (typeof userdata["schedule"][day + "-" + time] != "undefined") {
                    document.getElementById("cls" + day + "-" + time).value = userdata["schedule"][day + "-" + time];
                }
            }}
    }


    

    // 1秒ごとに実行
    setInterval(() => {
        var now = new Date();
        var tmp = classtime + " " + classday;
        // 一日内時間を整数化 (0:00の場合0, 12:00の場合43200が返される)
        nowtime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();

        if (classday != new Date().getDay()) { 
            classday = new Date().getDay(); //日付変更=曜日変更
        }
        else if (nowtime >= 54000) {
            classtime = 4;
        }
        else if (nowtime >= 45300) {
            classtime = 3;
        }
        else if (nowtime >= 38400) {
            classtime = 2;
        }
        else {
            classtime = 1;
        }
        
        if (tmp != classtime + " " + classday) TimelineChange(); /* 変更があったら表示 */
    }, 1000);
});

panel.addEventListener("click", function() {panel.style.visibility = "hidden";});

