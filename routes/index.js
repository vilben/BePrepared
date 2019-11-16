var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();

app.use(express.static(__dirname));


/* GET home page. */



router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/../public/html/index.html'));
    // res.render('index', { title: 'Express' });
});

app.use('/', router);
app.listen(8080, () =>{
    console.log("test");
});


module.exports = router;
