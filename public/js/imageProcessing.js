<script src="https://unpkg.com/merge-images"></script>

function showMergeImage(img1, img2) {
    mergeImages([img1, img2]).then(response => {
        return response
    }).catch(err => {
        return err
    })
}