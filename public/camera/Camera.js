class Camera {
    constructor() {
        const NodeWebcam = require("node-webcam");
        this.opts = {
            width: 1280,
            height: 720,
            quality: 100,
            delay: 0,
            saveShots: true,
            output: "png",
            //Which camera to use
            //Use Webcam.list() for results
            //false for default device
            device: false,
            // [location, buffer, base64]
            // Webcam.CallbackReturnTypes
            callbackReturn: "location",
            verbose: false
        };


//Creates webcam instance

        this.Webcam = NodeWebcam.create(this.opts);

    }


    takeShot() {
        this.Webcam.capture(__dirname + "/test_picture", function (err, data) {
            if(!err){
                console.log("picture should be taken");
            }else{
                console.log("something failed");
            }
            console.log(data);
            return data;
        });

    }

}
module.exports = Camera;


