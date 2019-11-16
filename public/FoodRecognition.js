class FoodRecognition {

    VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
    token = {
        "apikey": "KyOUAHDG1AbTmQq5azfaDAjtbxCp1e2AjSaTDdMx_QqD",
        "iam_apikey_description": "Auto-generated for key f612b90a-3b73-4d0c-be87-ca65c917e151",
        "iam_apikey_name": "Auto-generated service credentials",
        "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
        "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/b35f9a9988514e3989d5f23ac6cb4cd5::serviceid:ServiceId-e2a28e8a-1667-4ee2-a146-7cd9a2544f54",
        "url": "https://gateway.watsonplatform.net/visual-recognition/api"
    };
    version = '2018-03-19';
    visualRecognition = new this.VisualRecognitionV3({
        version: this.version,
        iam_apikey: this.token.apikey
    });




    checkFood = (pathToImage) => {
        return new Promise((resolve, reject)=>{

            let params = {
                url: pathToImage
            };

            this.visualRecognition.classify(params, function (err, response) {
                if (err) {

                    console.log(err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    };
}
module.exports = FoodRecognition;
