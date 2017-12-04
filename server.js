'use strict';
//libs
const
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'),
    expressValidator = require('express-validator'),
    fs = require('fs');

//config libs
const config = [
    express.static(path.join(__dirname, 'public')),
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    expressValidator()
].forEach(option=>app.use(option));

/*------------------*/
/*------ Data ------*/
/**/let data = Object.assign({}, require('./config'));/**/
/*------------------*/

const drivelist = require('drivelist');

drivelist.list((error, drives) => {
    if (error) throw error;
    data.drives = drives;
});



/*     End Data     */
/*------------------*/

//loads all route files in route folder
let routes = [], cache = [];
fs.readdirSync(__dirname + '/routes').forEach(file=> routes.push(require(__dirname + '/routes/' + file)));

//load each route
routes.forEach(route => {
    //save cache
    if(route.cache)
        cache[route.path] = route.render();
    //create route
    app.route('/'+route.path).get((req, res) => {
        const item = route.cache ? cache[route.path] : route.render(data, req.query);
        if(typeof item === 'object')
            res.sendFile(item.file);
        else
            res.send(item);
    });
});

//image loader
app.route('/img').get((req, res) => {
    const params = req.query;
    res.sendFile(params.path.replace(/\//g, '\\'));
});

//message loader
const chatRoute = routes.find(route=>route.path==='chat');
app.route('/msg').get((req, res) => {
    const params = req.query;
    data.chat = data.chat || [];
    data.chat.push(params.msg);
    data = data; // todo:data
    res.send(chatRoute.render(data));
});

//start Server
const server = app.listen(80, ()=>console.log(`Listening to port ${server.address().port}`));

