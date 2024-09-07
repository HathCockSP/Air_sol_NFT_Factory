const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const API_PORT = 3001;
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const cors = require('cors')

const GenerateController = require('./controllers/generate');
const PreviewController = require('./controllers/preview');
const AuthController = require("./controllers/auth");
const ProductionController = require("./controllers/production"); 
const JobviewController = require("./controllers/jobview")

const config = require("./config/key");

// connects our back end code with the database
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

let db = mongoose.connection;

db.once("open", () => console.log("MongoDB connected"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/generate', GenerateController);
app.use('/api/preview', PreviewController);
app.use('/api/auth', AuthController);
app.use('/api/production', ProductionController);
app.use('/api/jobview', JobviewController)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

io.on('connection', socket => {
  console.log('new client connected');
  socket.emit('connection', null);
});
