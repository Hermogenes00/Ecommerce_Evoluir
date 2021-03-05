
//take printers from api
function getPrinters(callback) {
    let printers = undefined
    axios.get('/api/printers').then(response => {
        printers = response.data
        callback(printers)
    }).catch(err => {
        callback([])
    })
}

function buscarImpressoras() {
    window.location.href = `http://localhost:${CONSTANTS().PORT}/admin/printers/${document.getElementById('buscar').value}`
}