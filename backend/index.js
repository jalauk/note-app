const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
connectToMongo()

const app = express()
const port = 5000 

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))

app.use(function(req,res,next){ // CORS (read : https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
  })





app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes')) 


app.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
})