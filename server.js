const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const listRouter = require('./routes/listRouter');
const inputRouter = require('./routes/inputRecommend');
const vocabRouter = require('./routes/vocabRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser')
const passport = require('passport')

// import passport middle ware
require('./middlewares/passport-middleware')

app.use(bodyParser.json());
app.use(cors());
// {
//   origin: 'http://localhost:3000',
//   credentials: true
// }
app.use(cookieParser())
app.use(passport.initialize())

//import 

app.use('/app', listRouter);
app.use('/app', vocabRouter);
app.use('/words', inputRouter);
app.use('/', authRouter);


const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});
