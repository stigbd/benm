var express = require('express'),
http = require('http'),
path = require('path'),
routes = require('./app/routes'),
exphbs = require('express-handlebars'),
mongoose = require('mongoose'),
seeder = require('./app/seeder'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
methodOverride = require('method-override'),
errorHandler = require('errorhandler'),
app = express();

app.set('port', process.env.PORT || 3300);

// Loading some form of ExpressJS middleware:
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(cookieParser('some-secret-value-here'));

routes.initialize(app, new express.Router());

// Setting the public folder to be a static folder, which means
// that Express will serve files in that folder as is:
app.use('/', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// Handlebars templates for serving dynamic HTML pages
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', 'handlebars');

// connect to the db server (if the database doesn't exist,
// one is created automatically):
mongoose.connect('mongodb://localhost/MyApp');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose....");
    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});

// API Routes and Controllers
// routes list
routes.initialize(app, new express.Router());

// finally boot up the server:
http.createServer(app).listen(app.get('port'),
function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
