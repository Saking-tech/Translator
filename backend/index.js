const express = require("express");
const fetch = require("node-fetch"); // Import node-fetch to use fetch in Node.js
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  console.log("POST /translate route hit"); // Debug: Check if the route is hit

  const { text, srcLang, destLang } = req.body;

  console.log("Request received with the following data:"); // Debug: Log request data
  console.log("Text:", text);
  console.log("Source Language:", srcLang);
  console.log("Destination Language:", destLang);

  try {
    // Make a POST request to the LibreTranslate API
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: srcLang,
        target: destLang,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Parse the response from the API
    const data = await response.json();
    console.log(data);
    console.log("Translation successful:", data.translatedText); // Debug: Log the translated text

    // Send the translated text back to the frontend
    res.json({ translatedText: data.translatedText });
  } catch (error) {
    console.error("Translation failed:", error.message); // Debug: Log the error message
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Debug: Confirm the server is running
});
