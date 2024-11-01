let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid"); 
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let tutorial = document.getElementById("tutorial");

// クッキーから読み込み
let userdata = {};
if (Cookies.get("data") != undefined)
{
    userdata = JSON.parse(Cookies.get("data"));
}

var now = new Date();
var nowtime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
var floornum = 0;
var classtime = 1;
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
            floornum = num[0] - 1;
            map.contentWindow.flchange(num-1);
            map.contentWindow.showup(num);
            dis_number.textContent = num[0] + "F";
            dis_number.style.background=colors[num[0] - 1];
            if (data[num][4] != undefined)
                document.getElementById("info").style.visibility = "hidden";
            if (data[num][4] != undefined)
                document.getElementById("info-btn").style.visibility = "visible"
            else
                document.getElementById("info-btn").style.visibility = "none";
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

function inf(){

    
        alert("部屋番号を入力してください。");
    

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
        dis_number.textContent = (floornum+1) + "F  次の授業教室:" + userdata["schedule"][classday + "-" + classtime];
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




// CSV関係
let csvformat = [["講時/曜日","月","火","水","木","金"],
                        ["1","","","","",""],
                        ["2","","","","",""],
                        ["3","","","","",""],
                        ["4","","","","",""],
                        ["5","","","","",""],
                        ["6","","","","",""]];
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

        if (lines.length < 7) {
            csvReadError = "wrongformat";
        }
        else {
                // 1行ごとに処理
                for (let i = 0; i < lines.length; ++i) {
                    let cells = lines[i].split(",");
                    for (let i=0 ;i < 6;i++) {
                        if (typeof cells[i] == "undefined") {
                            cells[i] = "";
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
                    for (let t=1; t<7; t++) {
                        // 存在しない部屋はスキップ
                        if (typeof data[csvArray[t][d]] == "undefined") {
                            document.getElementById("cls" + d + "-" + t).value =  "";
                            skippedroom++;
                        } else {
                            document.getElementById("cls" + d + "-" + t).value = csvArray[t][d];
                        }
                    }
                }
                if (skippedroom != 0) {
                    alert(skippedroom + "個の部屋は存在しないため読み込みませんでした。");
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
        for(let t=1; t<7; t++) {
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
    for (let t=0; t<7; t++) {
        exportTmp[t] = exportArray[t].join(',');
    }
    let exportStr = exportTmp.join("\r\n");
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    let blob = new Blob([bom, exportStr],{type:"text/csv"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "週程表.csv";
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
            for (let time=1;time<=6;time++) {
                if (typeof userdata["schedule"][day + "-" + time] != "undefined") {
                    document.getElementById("cls" + day + "-" + time).value = userdata["schedule"][day + "-" + time];
                }
            }}
    }
    


    

    // 1秒ごとに実行
    setInterval(() => {
        var now = new Date();
        // 一日内時間を整数化 (0:00の場合0, 12:00の場合43200が返される)
        nowtime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();

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

