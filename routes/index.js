var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const projectRoot = path.resolve(__dirname, '../');
const publicRoute = path.resolve(projectRoot + '/public');

app.use('public', express.static(publicRoute));
app.use('/', express.static(projectRoot));

const FoodRecognition = require(publicRoute + '/FoodRecognition.js');

const fs = require('fs');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/index.html'));
});
router.get('/dashboard', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/dashboard.html'));
});
router.get('/userOverview', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/userOverview.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/foodOverView', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/foodOverView.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/checkFood', (req, res, next) =>{
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    let result = foodRecognition.checkFood(pathToBanana);
    res.send({result: result});
});


app.use('/', router);
app.listen(8080, () =>{
    console.log("test");
});
module.exports = router;