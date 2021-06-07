const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./product.db');

const fs = require("fs");

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	db.all('select * from product', (err, rows) => {
		res.render('index', {renderdata: rows});
	});
});

app.get('/login', function (req, res) {
    res.render('login', {});
});

app.get('/signup', function (req, res) {
    res.render('signup', {});
});

app.get('/product/:product_id', function (req, res) {
	query = 'select * from product where product_id=' + String(req.params.product_id).slice(1);
	db.all(query, (err, row) => {
		res.render('detailpage', {data: row});
	});
});

app.post('/product/:product_id', function (req, res) {
	const dataBuffer = fs.readFileSync("comment.json");
	const dataJSON = dataBuffer.toString();
	const comments = JSON.parse(dataJSON);
	const id = parseInt(String(req.params.product_id).slice(1));
	const len = Object.keys(comments[id]).length;
	
	comments[id]["c" + String(len + 1)] = req.body.newComment;

	const commentsJSON = JSON.stringify(comments);
	fs.writeFileSync("comment.json", commentsJSON);
});

const port = 3000;
app.listen(port, function () {
    console.log('server on! https://localhost:' + port);
});
