const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny')); // logs every request in console
// app.use(morgan('dev')); can use different ones

const verifyPassword = (req, res, next) => {
    //console.log(req.query); // get query string
    const { password } = req.query;
    if (password === 'chickennugget') { // every route now needs ?password=chickennugget at end to access
        next();
    } else {
        res.send('You need a password!');
    }
}
// app.use((req, res, next) => {
//     console.log('First Middleware');
//     return next(); // goes onto next middleware/ function in stack
// })

// app.use((req, res, next) => {
//     console.log('Second Middleware');
//     return next(); // goes onto next middleware/ function in stack
// })

app.use((req, res, next) => {  // works on all requests
    // req.method = "GET"; // make every request a get request- would never do this
    req.requestTime = Date.now();
    console.log(req.method, req.path); // show method and path
    next();
})

app.use('/dogs', (req, res, next) => { // works on /dogs only (every verb on /dogs e.g. GET, POST, DELETE)
    console.log('I love dogs');
    next();
})
app.get('/', (req, res) => {
    console.log(`REQUEST TIME ${req.requestTime}`)
    res.send('Home');
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST TIME ${req.requestTime}`)
    res.send('Woof Woof');
})

app.get('/secret', verifyPassword, (req, res) => {
    // verifyPassword is a middleware passed in as a callback
    res.send("My secret is: Sometimes I wear headphones in public so I don't have to talk to anyone")
})


// put this at the end 
app.use((req, res) => {
    res.status(404).send('Not Found!')
})

app.listen(3000, () => {
    console.log('App running on localhost:3000');
})