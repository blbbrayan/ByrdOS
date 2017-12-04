window.onload = function(){
    //set list container height
    document.getElementById('list-container').style.height = innerHeight - 150 + 'px';

    var input = document.getElementById('file');
    var label = document.getElementById('file-label');

    function upload() {
        var files = input.files;
        var formData = new FormData();
        files.forEach(function(file){
            formData.append('file', file);
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/upload?path='/*todo get path*/);
        xhr.onload = function () {
            //TODO show the progress
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                //TODO success callback
            }
        };

        xhr.upload.onprogress = function (event) {
            //TODO show the progress
        };

        xhr.send(formData);
    }

    input.addEventListener('change', function(e){
        console.log('files', input.files);
    })

};