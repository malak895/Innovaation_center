const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./route/routes');
const admin = require('./route/admin'); 
const user = require('./route/user'); 
const message = require('./route/message');
const conversation = require('./route/conversation');
const event = require('./route/event');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = express.Router();
const multer = require('multer');

const fs = require('fs');

require('dotenv').config(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const http = require('http');
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

mongoose.connect('mongodb://127.0.0.1:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
app.use(upload.single('imageFile'));

app.use('/', routes); 
app.use('/', admin);
app.use('/', user);
app.use('/', message);
app.use('/', conversation);
app.use('/', event);


