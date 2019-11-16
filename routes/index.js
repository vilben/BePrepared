var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const projectRoot = path.resolve(__dirname, '../');
const publicRoute = path.resolve(projectRoot + '/public');
app.use('public', express.static(publicRoute));
app.use('/', express.static(projectRoot));
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
app.use('/', router);
app.listen(8080, () =>{
    console.log("test");
});
module.exports = router;