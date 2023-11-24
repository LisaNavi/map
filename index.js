let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid");

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
        }
    }
}

function info()
{
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    info_pane.style.visibility = "visible";
    desk.textContent = "このオプションは現在ご利用できません";

}
function info_close()
{
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    info_pane.style.visibility = "hidden";
}
window.onload = function() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth - 5;
    frame.style.width = sitewidth;
}