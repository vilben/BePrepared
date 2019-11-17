$(document).ready(() => {


    let modal = $("#scanModal");


    // Get the <span> element that closes the modal
    let close = $("#modalClose");

    // When the user clicks on <span> (x), close the modal
    close.click(() => {
        modal.css("display", "none")
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.css("display", "none")
        }
    };


    $('#scanFoodButton').click(() => {

        $("#flexBox").html("<video id=\"video\"></video>\n" +
            "                <canvas id=\"canvas\" class=\"canvasHidden\"></canvas>\n" +
            "                <img id=\"image\"/>\n" +
            "                <a class=\"iconButton mdi mdi-light mdi-19px btnCreate mdi-camera-wireless-outline\" id=\"submitButton\" type=\"button\">Scan</a>");

        let $modalContent = $("#modalContent");
        modal.css("display", "block");

        let baseUrl = window.location.origin;

        var width = "100%";
        var height = "100%";

        var streaming = false;

        let $photo = $("#image");
        let $video = $("#video");
        let $canvas = $("#canvas");
        let $startButton = $("#submitButton");

        let video = $video.get(0);
        let canvas = $canvas.get(0);
        let photo = $photo.get(0);
        let startButton = $startButton.get(0);

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                width = video.offsetWidth;
                height = video.offsetHeight;
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
                //$photo.width(width / 2);
                //$photo.height(height / 2);

                //$("#flexBox").get(0).className = "flexBoxRow";
                $canvas.remove();
                $video.remove();
                $("#submitButton").remove();

                function Base64EncodeUrl(str) {
                    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
                }

                data = Base64EncodeUrl(data);

                $.ajax({
                    type: "POST",
                    url: baseUrl + '/savePicture',
                    data: data,
                    dataType: 'text',
                })
                    .then((msg) => {
                        $.get("/test")
                            .done((resp) => {
                                $("#flexBox").append("<div id='innerFlexBox' class='flexBoxColumn floatGroup'>" +
                                    "</div>");

                                $.get("getFoodComposition").done((foodCompositionList) => {
                                        let candidates = [];

                                        let $selection = $("<select class='floatControl'>");


                                        foodCompositionList.forEach(foodComposition => {
                                            if (foodComposition.Name.toUpperCase().includes(resp.class.toUpperCase())) {
                                                candidates.push(foodComposition);
                                            }
                                        });

                                        if (candidates.length < 1) {
                                            candidates.push(resp);

                                            console.log(candidates);
                                            for (let i = 0; i < candidates.length; i++) {
                                                $selection.append($('<option>', {
                                                    value: i,
                                                    text: candidates[i]["class"]
                                                }));
                                            }

                                            function createFloatGroup(labelText, control, floatId) {
                                                let pnl = $("<div class='floatGroup'>");
                                                let label = $("<span class='floatLabel label' data-float-id='" + floatId + "'>");
                                                label.html(labelText);
                                                control.attr("data-float-id", floatId);
                                                control.css("width", "100%");

                                                pnl.append(label);
                                                pnl.append(control);

                                                return pnl;
                                            }

                                            $("#innerFlexBox").append(createFloatGroup("Select", $selection, "selectaautomat"));

                                            let $quantityInput = $("<input class='floatControl' type='number'>");
                                            $("#innerFlexBox").append(createFloatGroup("Weight in gramms", $quantityInput, "quantity"));


                                            let button = $("<a class='floatControl iconButton btnCreate mdi mdi-light mdi-19px mdi-plus-circle-outline'  type='button'>add</a>");
                                            $("#innerFlexBox").append(createFloatGroup("", button, ""));

                                            initFloats();

                                            button.click(() => {
                                                let value = $selection.val();
                                                var userChoice = candidates[value];

                                                var foodEntry = new food(userChoice["class"], userChoice["Carbohydrates, available (g)"], userChoice["Fat, total (g)"], userChoice["Protein (g)"], $quantityInput.val(), userChoice["class"]);
                                                $.get("getFood").done((foodStock) => {

                                                        let foodList = foodStock.foodList;

                                                        if (foodList) {
                                                            let filter = foodList.filter(food => food.name === foodEntry.name);
                                                            if (filter.length < 1) {
                                                                foodList.push(foodEntry);
                                                            } else {
                                                                filter[0].weight += foodEntry.weight;
                                                            }
                                                        } else {
                                                            foodList = [];
                                                            foodList.push(foodEntry);
                                                        }

                                                        $.post("postFood", {"foodList": foodList});
                                                        showFoodList();
                                                        modal.hide();
                                                    }
                                                );


                                            });

                                        }
                                    }
                                );
                            });
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

});
