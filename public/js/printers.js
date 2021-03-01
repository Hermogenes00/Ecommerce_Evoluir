
function getPrinters(callback) {
    let printers = undefined
    axios.get('/api/printers').then(response => {
        printers = response.data
        callback(printers)
    }).catch(err => {
        callback([])
    })
}