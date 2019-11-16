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

const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');

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
router.get('/userOverview', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/userOverview.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/foodOverView', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/foodOverView.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/getFood', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/foodDummy.json'));
    // res.render('index', { title: 'Express' });
});

router.get('/checkFood', (req, res, next) =>{
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    foodRecognition.checkFood(pathToBanana).then((data)=>{

        console.log(data);



        res.send(data);

        //Todo HACK
        let foodItemName = data.images[0]["classifiers"][0]["classes"][0]["class"];

        console.log(foodItemName);
    });
});


app.use('/', router);
app.listen(8080, () =>{
    console.log("test");
});
module.exports = router;
