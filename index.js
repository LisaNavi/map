let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid");
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
const cookie = {};
const now_daystanp = new Date();
now_daystanp.setHours(0);
now_daystanp.setMinutes(0);
now_daystanp.setSeconds(0);
var nowtime = (new Date().valueOf() - now_daystanp[Symbol.toPrimitive]('number'))/1000;
var classtime = 1;
var classday = new Date().getDay();

if (document.cookie != "") {
    cookie = JSON.parse(document.cookie);
}

function floor(num)
{
    dis_number.textContent = (num+1) + "F";
    dis_number.style.background=colors[num];
    map.contentWindow.flchange(num);
}

function search(num)
{
    
    if (Number.isInteger(num)){
        alert("部屋番号を入力してください。");
    }
    else if (!(num > 100 && num < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(num[0] < 5 && num[0] > 0))
    {
        alert(num[0] + "階は存在しません。");
    }
    else {
        if (typeof data[num] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            map.contentWindow.room = num;
            map.contentWindow.flchange(num-1);
            map.contentWindow.showup(num);
            dis_number.textContent = num[0] + "F";
            dis_number.style.background=colors[num[0] - 1];
            if (data[num][4] != undefined)
                document.getElementById("info-btn").style.visibility = "visible";
            else
                document.getElementById("info-btn").style.visibility = "hidden";
        }
    }
}

function info(num)
{
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    var desk_num = document.getElementById("desk-num");
    info_pane.style.visibility = "visible";
    if (data[num][4] != undefined) {
        desk_num.textContent = num + " 教室";
        desk.textContent = data[num][4];
    } else {
        desk.textContent = "この教室のインフォメーションはありません";
    }
}

function cls_close() {
    var day = 1;
    var time = 1;
    if (typeof cookie["schedule"] == "undefined")
        cookie["schedule"] = {};
    for (day=1;day<=5;day++) {
        for (time=1;time<=6;time++) {
            temp = document.getElementById("cls" + day + "-" + time).value;
            if (typeof data[temp] != "undefined") {
                cookie["schedule"][day + "-" + time] = temp;
            }

        }
    }
}

function info_close()
{
    var info_pane = document.getElementById("information");
    info_pane.style.visibility = "hidden";
}

function TimelineChange()
{
    if (typeof cookie["schedule"] != "undefined" && typeof cookie["schedule"][classday + "-" + classtime] != "undefined") //その時間に教室配置が登録されていれば
    {
        map.contentWindow.clschange(cookie["schedule"][classday + "-" + classtime]);
        // 週程ハイライトの教室番号を変更
    }
    
}

window.onload = function() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth - 5;
    frame.style.width = sitewidth;
}
window.addEventListener('DOMContentLoaded', function(){
    // 1秒ごとに実行
    setInterval(() => {
        const now_daystanp = new Date();
        now_daystanp.setHours(0);
        now_daystanp.setMinutes(0);
        now_daystanp.setSeconds(0);
        nowtime = (new Date().valueOf() - now_daystanp[Symbol.toPrimitive]('number'))/1000;
        if (nowtime == 0 && classday != new Date().getDay()) { //日付変更=曜日変更
            classday = new Date().getDay();
            TimelineChange();
        }
        else if (nowtime >= 54000) {
            classtime = 6;
            TimelineChange();
        }
        else if (nowtime >= 45300) {
            classtime = 5;
            TimelineChange();
        }
        else if (nowtime >= 41700) {
            classtime = 4;
            TimelineChange();
        }
        else if (nowtime >= 38400) {
            classtime = 3;
            TimelineChange();
        }
        else if (nowtime >= 34800) {
            classtime = 2;
            TimelineChange();
        }
        else if (classtime != 1) {
            classtime = 1;
            TimelineChange();
        }
    }, 1000);
});
panel.addEventListener("click", function() {panel.style.visibility = "hidden";});
