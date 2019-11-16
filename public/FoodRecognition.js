var token = {
    "apikey": "KyOUAHDG1AbTmQq5azfaDAjtbxCp1e2AjSaTDdMx_QqD",
    "iam_apikey_description": "Auto-generated for key f612b90a-3b73-4d0c-be87-ca65c917e151",
    "iam_apikey_name": "Auto-generated service credentials",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/b35f9a9988514e3989d5f23ac6cb4cd5::serviceid:ServiceId-e2a28e8a-1667-4ee2-a146-7cd9a2544f54",
    "url": "https://gateway.watsonplatform.net/visual-recognition/api"
};

var version = '2018-03-19';
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
    version: version,
    authenticator: new IamAuthenticator({
        apikey: token.apikey,
    }),
    url: token.url,
    disableSslVerification: true,
});


const classifyParams = {
    imagesFile: fs.createReadStream('/public/images/banana.jpg'),
    owners: ['me'],
    threshold: 0.6,
};

test = ()=>{
    visualRecognition.classify(classifyParams)
        .then((response) => {
            const classifiedImages = response.result;

            console.log(JSON.stringify(classifiedImages, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
};

test();
