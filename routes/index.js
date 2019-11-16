var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const fs = require("fs");
const projectRoot = path.resolve(__dirname, '../');
const publicRoute = path.resolve(projectRoot + '/public');

app.use('public', express.static(publicRoute));
app.use('/', express.static(projectRoot));

const FoodRecognition = require(publicRoute + '/FoodRecognition');

<<<<<<< HEAD
router.get('/', function (req, res, next) {
=======
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');

router.get('/', function(req, res, next) {
>>>>>>> d541971f091a56b5dd9776ceaa728e162b34ba02
    res.sendFile(path.join(publicRoute + '/html/index.html'));
});
router.get('/dashboard', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/dashboard.html'));
});
router.get('/userOverview', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/userOverview.html'));
});
router.get('/foodOverView', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/foodOverView.html'));
});

<<<<<<< HEAD
router.get('/checkFood', (req, res, next) => {
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    foodRecognition.checkFood(pathToBanana).then((data) => {
=======
router.get('/getFood', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/foodDummy.json'));
    // res.render('index', { title: 'Express' });
});

router.get('/checkFood', (req, res, next) =>{
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    foodRecognition.checkFood(pathToBanana).then((data)=>{

        console.log(data);



>>>>>>> d541971f091a56b5dd9776ceaa728e162b34ba02
        res.send(data);

        //Todo HACK
        let foodItemName = data.images[0]["classifiers"][0]["classes"][0]["class"];

        console.log(foodItemName);
    });
});


app.use('/', router);
app.listen(8080, () => {
    console.log("test");
});
module.exports = router;
