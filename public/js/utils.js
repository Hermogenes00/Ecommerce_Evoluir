
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function getMoney(str) {
    return parseInt(str.replace(/[\D]+/g, ''));
}

function formatReal(str) {

    let valor = getMoney(str)
    var tmp = valor + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    //take the number without dot and comma, for validation as number
    let convertNumber  = tmp.replace('.','').replace(',','')
    return isNaN(convertNumber) ? 0 : tmp
}
