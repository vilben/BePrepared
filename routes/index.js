var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const projectRoot = path.resolve(__dirname, '../');
const publicRoute = path.resolve(projectRoot + '/public');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use('public', express.static(publicRoute));
app.use('/', express.static(projectRoot));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '20mb',
    })
);
app.use(bodyParser.json());

const FoodRecognition = require(publicRoute + '/FoodRecognition');

router.get('/', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/index.html'));
});
router.get('/dashboard', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/dashboard.html'));
});

router.get('/disaster', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/disaster.html'));
});

router.get('/userOverview', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/userOverview.html'));
    // res.render('index', { title: 'Express' });
});
router.get('/userOverview', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/userOverview.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/foodOverView', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/html/foodOverView.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/getFood', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/foodStock.json'));
    // res.render('index', { title: 'Express' });
});

router.post('/postFood', function (req, res, next) {
    filePath = path.join(publicRoute + '/foodStock.json');
    fs.writeFile(filePath, JSON.stringify(req.body), function () {
        res.end();
    });

});
router.get('/getFoodComposition', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/foodComposition.json'));
});

router.get('/getUsers', function (req, res, next) {
    res.sendFile(path.join(publicRoute + '/userDummy.json'));
    // res.render('index', { title: 'Express' });
});

router.post('/getUsers', function (req, res) {
    filePath = path.join(publicRoute + '/userDummy.json');
    fs.writeFile(filePath, JSON.stringify(req.body), function () {
        res.end();
    });
});

router.post('/savePicture', (req, res) => {
    function Base64DecodeUrl(str){
        str = (str + '===').slice(0, str.length + (str.length % 4));
        return str.replace(/-/g, '+').replace(/_/g, '/');
    }

    let filePath = path.join(publicRoute + '/camera/file.png');
    let baseString = Base64DecodeUrl(Object.keys(req.body)[0]).replace(/^data:image\/\w+;base64,/, "");

    fs.writeFile(filePath, baseString, 'base64', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('File created');
            res.send("success");
        }
    });
});

router.get('/getPicture', (req, res) => {
    res.sendFile(publicRoute+'/camera/file.png');
});

router.get("/test", (rey, res) =>{
    let foodRecognition = new FoodRecognition();

    let file = publicRoute + "/camera/file.png";

    var bitmap = fs.createReadStream(file);

    foodRecognition.checkFood(bitmap).then((data) => {

        //Todo HACK
        let foodItemName = data.images[0]["classifiers"][0]["classes"][0]["class"];

        let foodItems = data.images[0]["classifiers"][0]["classes"];
        let bestFoodItem = {class: 'non-food', score:0};
        foodItems.forEach((foodItem)=>{
            console.log(foodItem);
            if(!bestFoodItem || foodItem.score){
                bestFoodItem = foodItem;
            }
        });


        res.send(bestFoodItem);

    });
});

router.get('/checkFood', (req, res, next) => {
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    foodRecognition.checkFood(pathToBanana).then((data) => {
        res.send(data);

        let foodItemName = data.images[0]["classifiers"][0]["classes"][0]["class"];
        let foodItems = data.images[0]["classifiers"][0]["classes"];
        foodItems.forEach((foodItem)=>{
            console.log(foodItem);
        });




        console.log(foodItemName);
    });
});


app.use('/', router);
app.listen(8080, () => {
    console.log("test");
});
module.exports = router;
