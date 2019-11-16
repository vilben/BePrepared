var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const publicBasePath = path.join(__dirname + '/../public/');
app.use(express.static(path.join(__dirname)));

router.get('/', function(req, res, next) {
    res.sendFile(path.join(publicBasePath + 'html/index.html'));
    // res.render('index', { title: 'Express' });
});

router.get('/userOverview', function(req, res, next) {
    res.sendFile(path.join(publicBasePath + 'html/userOverview.html'));
});

router.get('/controls.js', function(req, res, next) {
    res.sendFile(path.join(publicBasePath + 'controls.js'));
});

router.get('/userOverview.js', function(req, res, next) {
    res.sendFile(path.join(publicBasePath + 'userOverview.js'));
});

app.use('/', router);


app.listen(8080, () =>{
    console.log("test");
});


module.exports = router;
