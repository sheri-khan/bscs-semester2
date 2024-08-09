const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/past-papers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'past-papers.html'));
});

app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reviews.html'));
});

app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faq.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/rating', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rating.html'));
});

// Handle contact form submissions
app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;
    const contactEntry = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
    fs.appendFile(path.join(__dirname, 'data', 'contact.txt'), contactEntry, (err) => {
        if (err) {
            console.error('Error writing to contact.txt:', err);
            res.status(500).json({ success: false, message: 'Error submitting contact form' });
            return;
        }
        res.json({ success: true, message: 'Contact form submitted successfully' });
    });
});

// Handle review form submissions
app.post('/submit-review', (req, res) => {
    const { name, rating, review } = req.body;
    const reviewEntry = `Name: ${name}\nRating: ${rating}\nReview: ${review}\n\n`;
    fs.appendFile(path.join(__dirname, 'data', 'reviews.txt'), reviewEntry, (err) => {
        if (err) {
            console.error('Error writing to reviews.txt:', err);
            res.status(500).json({ success: false, message: 'Error submitting review' });
            return;
        }
        res.json({ success: true, message: 'Review submitted successfully' });
    });
});

// Handle rating form submissions
app.post('/submit-rating', (req, res) => {
    const { name, rating } = req.body;
    const ratingEntry = `Name: ${name}\nRating: ${rating}\n\n`;
    fs.appendFile(path.join(__dirname, 'data', 'rating.txt'), ratingEntry, (err) => {
        if (err) {
            console.error('Error writing to rating.txt:', err);
            res.status(500).json({ success: false, message: 'Error submitting rating' });
            return;
        }
        res.json({ success: true, message: 'Rating submitted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
