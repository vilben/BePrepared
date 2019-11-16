var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const projectRoot = path.resolve(__dirname, '../');
const publicRoute = path.resolve(projectRoot + '/public');

app.use('public', express.static(publicRoute));
app.use('/', express.static(projectRoot));
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json())

const FoodRecognition = require(publicRoute + '/FoodRecognition');

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

router.get('/getUsers', function(req, res, next) {
    res.sendFile(path.join(publicRoute + '/userDummy.json'));
    // res.render('index', { title: 'Express' });
});

router.post('/getUsers', function(req, res) {
    filePath = path.join(publicRoute + '/userDummy.json');
    fs.writeFile(filePath, JSON.stringify(req.body), function () {
        res.end();
    });
});

router.get('/checkFood', (req, res, next) =>{
    let pathToBanana = "http://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Royalty-Free.png";
    let foodRecognition = new FoodRecognition();
    foodRecognition.checkFood(pathToBanana).then((data)=>{
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
