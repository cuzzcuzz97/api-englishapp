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
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
  secure: false
}));

app.use(cookieParser({ sameSite: false }))
app.use(passport.initialize())
//import 

app.use('/app', listRouter);
app.use('/app', vocabRouter);
app.use('/words', inputRouter);
app.use('/', authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
}).on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});
