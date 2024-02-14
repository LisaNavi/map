let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid");
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let cookie = {};
if (document.cookie != "")
{
    cookie = JSON.parse(document.cookie);
}
const now_daystamp = new Date();
now_daystamp.setHours(0);
now_daystamp.setMinutes(0);
now_daystamp.setSeconds(0);
var nowtime = (new Date().valueOf() - now_daystamp[Symbol.toPrimitive]('number'))/1000;
var floornum = 0;
var classtime = 1;
var classday = new Date().getDay();

function floor(num)
{
    floornum = num;
    dis_number.textContent = (num+1) + "F";
    dis_number.style.background=colors[num];
    map.contentWindow.flchange(num);
}

function search(num){
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

function info(num) {
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
    if (typeof userdata["schedule"] == "undefined")
         userdata["schedule"] = {};
    for (var day=1;day<=5;day++) {
        for (var time=1;time<=6;time++) {
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
    document.cookie = JSON.stringify(userdata);
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
    if (typeof userdata["schedule"] != "undefined" && typeof userdata["schedule"][classday + "-" + classtime] != "undefined") //その時間に教室配置が登録されていれば
    {
        map.contentWindow.clschange(userdata["schedule"][classday + "-" + classtime]);
        // 週程ハイライトの教室番号を変更
        dis_number.textContent = (floornum+1) + "F  次の授業教室:" + userdata["schedule"][classday + "-" + classtime];
        dis_number.style.background=colors[floornum];
    }
    
}

window.onload = function() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth - 5;
    frame.style.width = sitewidth;
}

window.addEventListener('DOMContentLoaded', function() {
    //クッキーのスケジュールを表の枠に代入する
    if (typeof userdata["schedule"] != "undefined") {
        for (var day=1;day<=5;day++) {
            for (var time=1;time<=6;time++) {
                if (typeof userdata["schedule"][day + "-" + time] != "undefined") {
                    document.getElementById("cls" + day + "-" + time).value = userdata["schedule"][day + "-" + time];
                }
            }}
    }
    
    // 1秒ごとに実行
    setInterval(() => {
        let now_daystamp = new Date();
        now_daystamp.setHours(0);
        now_daystamp.setMinutes(0);
        now_daystamp.setSeconds(0);
        nowtime = (new Date().valueOf() - now_daystamp[Symbol.toPrimitive]('number'))/1000;
        if (classday != new Date().getDay()) { 
            classday = new Date().getDay(); //日付変更=曜日変更
        }
        else if (nowtime >= 54000) {
            classtime = 6;
        }
        else if (nowtime >= 45300) {
            classtime = 5;
        }
        else if (nowtime >= 41700) {
            classtime = 4;
        }
        else if (nowtime >= 38400) {
            classtime = 3;
        }
        else if (nowtime >= 34800) {
            classtime = 2;
        }
        else {
            classtime = 1;
        }
        TimelineChange();
    }, 1000);
});

panel.addEventListener("click", function() {panel.style.visibility = "hidden";});
