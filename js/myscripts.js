var dataArr = [{ "id": 1, "title": "Thác Yang Bay", "timestart": 7, "timein": 8, "timefree": 0 }, { "id": 2, "title": "Nhà thờ Núi (Nhà thờ chính tòa Kitô Vua)", "timestart": 10, "timein": 2, "timefree": 0 }, { "id": 3, "title": "Tháp Bà Ponagar", "timestart": 10, "timein": 2, "timefree": 0 }, { "id": 4, "title": "Biển Nha Trang", "timestart": 13, "timein": 2, "timefree": 0 }, { "id": 5, "title": "Nhà hát nghệ thuật dân gian Á Châu", "timestart": 15, "timein": 2, "timefree": 0 }, { "id": 6, "title": "XQ Sử Quán", "timestart": 18, "timein": 2, "timefree": 0 }, { "id": 7, "title": "Thác Yang Bay", "timestart": 8, "timein": 5, "timefree": 0 }, { "id": 8, "title": "Nhà thờ Núi (Nhà thờ chính tòa Kitô Vua)", "timestart": 11, "timein": 2, "timefree": 0 }, { "id": 9, "title": "Tháp Bà Ponagar", "timestart": 16, "timein": 2, "timefree": 0 }];

var dayNum = 3;
var dataDayArr = new Array();
var sum = 0, k = 0;
for (i = 0; i < dayNum; i++) {
    var arrTemp = new Array();
    for (j = k; j < dataArr.length; j++) {
        sum += dataArr[j].timein;
        if (sum > 13) {
            k = j;
            sum = 0;
            break;
        } else {
            arrTemp.push(dataArr[j]);
        }
    }
    dataDayArr.push(arrTemp);
    arrTemp = [];
}

UpdateData(dataDayArr, 8);
function UpdateData(data, timestartContainer) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            if (j == 0) {
                data[i][0].timestart = timestartContainer;
            } else {
                data[i][j].timestart = parseInt(data[i][j - 1].timestart) + parseInt(data[i][j - 1].timein);
            }
        }
    }
}





$('#sort-table').empty();
for (i = 0; i < dataDayArr.length; i++) {
    $('#sort-table').append("<ol class='serialization vertical olid" + i + "'></ol>");
    for (j = 0; j < dataDayArr[i].length; j++) {
        $('.olid' + i).append("<li data-id=\"" + dataDayArr[i][j].id + "\" data-title=\"" + dataDayArr[i][j].title + "\" data-timestart=\"" + dataDayArr[i][j].timestart + "\" data-timein=\"" + dataDayArr[i][j].timein + "\" data-timefree=\"" + dataDayArr[i][j].timefree + "\">Nơi đến: " + dataDayArr[i][j].title + ", Thời gian bắt đầu: <input class = \"txtTimeStart\" style=\"width: 40px;\" type=\"number\" value=\"" + dataDayArr[i][j].timestart + "\">h, Thời gian lưu trú: <input class = \"txtTimeIn\" style=\"width: 40px;\" type=\"number\" value=\"" + dataDayArr[i][j].timein + "\">h <button onClick = \"btnSubmit(" + i + "," + j + ")\" type=\"button\">Ok</button></li>");
    }
}
var group = $("ol.serialization").sortable({
    group: 'serialization',
    onDrop: function ($item, container, _super) {
        var data = group.sortable("serialize").get();
        console.log(data);
        UpdateData(data, data[0][0].timein);
        LoadView(data);
        _super($item, container);
    }

});

function LoadView(data) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            var rs = "Nơi đến: " + data[i][j].title + ", Thời gian bắt đầu: <input class = \"txtTimeStart\" style=\"width: 40px;\" type=\"number\" value=\"" + data[i][j].timestart + "\">h, Thời gian lưu trú: <input class = \"txtTimeIn\" style=\"width: 40px;\" type=\"number\" value=\"" + data[i][j].timein + "\">h <button onClick = \"btnSubmit(" + i + "," + j + ")\" type=\"button\">Ok</button>"
            $("li[data-id=" + data[i][j].id + "]").html(rs);
        }
    }
}

function btnSubmit(a, b) {
    data = group.sortable("serialize").get();
    console.log(data);
    for (i = a; i < data.length; i++) {
        for (j = b; j < data[i].length; j++) {
            if (i === a && j === b) {
                data[i][j].timestart = $("li[data-id=" + data[i][j].id + "] > .txtTimeStart").val();
                data[i][j].timein = $("li[data-id=" + data[i][j].id + "] > .txtTimeIn").val();
            } else {
                if (j !== 0) {
                    data[i][j].timestart = parseInt(data[i][j - 1].timestart) + parseInt(data[i][j - 1].timein);
                }
            }
            var rs = "Nơi đến: " + data[i][j].title + ", Thời gian bắt đầu: <input class = \"txtTimeStart\" style=\"width: 40px;\" type=\"number\" value=\"" + data[i][j].timestart + "\">h, Thời gian lưu trú: <input class = \"txtTimeIn\" style=\"width: 40px;\" type=\"number\" value=\"" + data[i][j].timein + "\">h <button onClick = \"btnSubmit(" + i + "," + j + ")\" type=\"button\">Ok</button>"
            $("li[data-id=" + data[i][j].id + "]").html(rs);
        }
    }

}