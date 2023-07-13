/* eslint-disable */
export function popSearchWindow(formId, dataSelectorUrl, fields, colIndexs, backFieldIds) {
    var left = (screen.width / 2) - (750 / 2);
    var top = (screen.height / 2) - (650 / 2);
    var w = (backFieldIds)?window.open(dataSelectorUrl + '?formId=' + formId + '&fields=' + fields.join(",") + "&colIndexs=" + colIndexs.join(",")+"&backFieldIds="+encodeURIComponent(backFieldIds.join(",")), "Picker", "width=950,height=450,resizable=no,scrollbars=yes,menubar=no,location=no,status=yes,screenX=0,screenY=0,left=" + left + "," + "top=" + top)
    : window.open(dataSelectorUrl + '?formId=' + formId + '&fields=' + fields.join(",") + "&colIndexs=" + colIndexs.join(","), "Picker", "width=950,height=450,resizable=no,scrollbars=yes,menubar=no,location=no,status=yes,screenX=0,screenY=0,left=" + left + "," + "top=" + top);
    w.focus();
}
  