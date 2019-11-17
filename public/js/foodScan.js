$(document).ready(() => {
    $('#scanFoodButton').click(() => {
        // $.get(baseUrl + "/takePicture").done((response) =>{
        //     console.log(response);
        // })
        let $mainContent = $('#mainContent');
        let baseUrl = window.location.origin;

        var width = 320;
        var height = 0;

        var streaming = false;

        let photo = document.createElement("img");
        let video = document.createElement("video");
        let canvas = document.createElement("canvas");
        let startButton = document.createElement("button");


        $mainContent.append(photo);
        $mainContent.append(video);
        $mainContent.append(canvas);
        $mainContent.append(startButton);

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);


        function stream() {
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (err) {
                    console.log("An error occurred: " + err);
                });
        }


        function clearPhoto() {
            var context = canvas.getContext('2d');
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        function takeShot() {
            var context = canvas.getContext('2d');
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
                $(canvas).remove();
                $(video).replaceWith(photo);

                function Base64EncodeUrl(str) {
                    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
                }

                data = Base64EncodeUrl(data);

                console.log(data);


                $.ajax({
                    type: "POST",
                    url: baseUrl + '/savePicture',
                    data: data,
                    dataType: 'text'
                });


            } else {
                clearPhoto();
            }
        }

        stream();


        $(startButton).click(() => {
            takeShot();
        });
    });

})
