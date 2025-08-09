const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Replace with your Gemini API key
const GEMINI_API_KEY = 'AIzaSyBahqbkfXJa_6ZsREbOgXdHL3XEoK_o5sk';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: userMessage }] }]
        });
        res.json({ text: response.text });
    } catch (err) {
        res.status(500).json({ text: "Error: " + err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

fetch('/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Hello, AI!' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));