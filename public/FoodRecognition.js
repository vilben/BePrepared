class FoodRecognition {
    constructor() {
        this.VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
        const {IamAuthenticator} = require('ibm-watson/auth');

        const token = {
            "apikey": "KyOUAHDG1AbTmQq5azfaDAjtbxCp1e2AjSaTDdMx_QqD",
            "iam_apikey_description": "Auto-generated for key f612b90a-3b73-4d0c-be87-ca65c917e151",
            "iam_apikey_name": "Auto-generated service credentials",
            "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
            "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/b35f9a9988514e3989d5f23ac6cb4cd5::serviceid:ServiceId-e2a28e8a-1667-4ee2-a146-7cd9a2544f54",
            "url": "https://gateway.watsonplatform.net/visual-recognition/api"
        };

        this.visualRecognition = new this.VisualRecognitionV3({
            version: '2018-03-19',
            authenticator: new IamAuthenticator({
                apikey: token.apikey,
            }),
            url: token.url,
            disableSslVerification: true,
        });

    }


    checkFood(image) {
        return new Promise((resolve, reject) => {

            let params = {
                imagesFile: image,
                classifierIds: ['food']
            };

            this.visualRecognition.classify(params, function (err, response) {
                if (err) {

                    console.log(err);
                    reject(err);
                } else {
                    resolve(response.result);
                }
            });
        });
    };
}

module.exports = FoodRecognition;
