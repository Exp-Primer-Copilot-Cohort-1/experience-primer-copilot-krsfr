// Create web server

// Import module
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { Comment } = require('./model');
const { response } = require('express');

// Create express app
const app = express();

// Use static file
app.use(express.static(path.join(__dirname, 'public')));

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine
app.set('view engine', 'ejs');

// Set view
app.set('views', path.join(__dirname, 'views'));

// Show form
app.get('/', (req, res) => {
    res.render('index');
});

// Show comment
app.get('/comments', (req, res) => {
    Comment.find()
        .then(result => {
            res.render('comments', { comments: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// Handle post request
app.post('/comments', [
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('comment').not().isEmpty().withMessage('Please enter your comment')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('index', {
            errors: errors.array()
        });
    } else {
        const comment = new Comment({
            name: req.body.name,
            comment: req.body.comment
        });
        comment.save()
            .then(result => {
                res.redirect('/comments');
            })
            .catch(err => {
                console.log(err);
            });
    }
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});