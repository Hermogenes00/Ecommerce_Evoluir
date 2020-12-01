const fs = require("fs");
const { google } = require('googleapis');


function fileUpload(fileName, fileExt, filePath, callback) {
    require("./gdrive-auth")((auth) => {
        const fileMetadata = {
            name: fileName
        };

        const media = {
            mimeType: fileExt,
            body: fs.createReadStream(filePath)
        }

        const drive = google.drive({ version: 'v3', auth });
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                callback(file);
            }
        });
    });
}

function fileDownload(fileId, filePath, fileName, fileExt) {

    let dest = fs.createWriteStream(`${filePath}/${fileName}.${fileExt}`)


    require("./gdrive-auth")(async (auth) => {

        const drive = google.drive({ version: 'v3', auth });

        try {
            let result = await drive.files.get({
                fileId: fileId,
                alt: 'media'
            }, { responseType: 'stream' })

            if (result) {
                result.data.pipe(dest)
            }

        } catch (error) {
            console.log(err);
        }

    })

}


function createFolder() {

    let fileMetadata = {
        title: 'invoices',
        mimeType: 'application/vnd.google-apps.folder'
    }

    require('./gdrive-auth')((auth) => {
        const drive = google.drive({ version: 'v3', auth })

        drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    })
}


module.exports = { fileUpload, fileDownload, createFolder }