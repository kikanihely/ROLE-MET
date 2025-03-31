const express = require('express');
const multer = require('multer');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Extract PDF text
const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Error extracting text from PDF');
  }
};

// API to handle file upload and scoring
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  const { description } = req.body;

  if (!req.file || !description) {
    return res.status(400).json({ error: 'Resume PDF and job description are required' });
  }

  try {
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // Send data to Python API for scoring
    const response = await axios.post('http://localhost:5001/score', {
      resume: resumeText,
      description,
    });

    return res.json({ score: response.data.score });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing the resume' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
