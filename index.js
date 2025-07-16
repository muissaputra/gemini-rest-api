const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();
const dotenv = require("dotenv");
const { error } = require("console");
//const cors = require("cors");
dotenv.config();
app.use(express.json());



const uploads = multer({dest:'uploads/'});



// Initialize Gemini AI
const GEMINI_API_KEY = "AIzaSyCNMuefBV3tojCn9I6auq-wCNO-u9mLY4U"; // Replace with your API Key
//console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

app.get("/", (req, res) => {
    res.send("Server is running. Use the /validate endpoints.");
});
// Function to call Gemini AI for text analysis
async function analyzeWithGemini(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API", error);
        return null;
    }
}

async function analyzeWithGeminiImage(prompt,image) {
    try {
        const result = await model.generateContent([prompt,image]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API", error);
        return null;
    } finally{
        fs.unlinkSync(image);
    }
}

// Validate financial institution

const imageToGenerativePart = (filePath,mimeType) => ({

    inlineData : {
        data : fs.readFileSync(filePath).toString("base64"), 
        mimeType:mimeType

    }
})

app.post("/generate-text", async (req, res) => {
    const { prompt } = req.body;
    const response = await analyzeWithGemini(prompt);
    res.json({
        resonse_text: response
    });
});

app.post("/generate-image", uploads.single("image"),async (req, res) => {
    const  prompt = req.body.prompt;
    const mimeType = req.file.mimetype;
    const  image = imageToGenerativePart(req.file.path,mimeType);
    
    try{
        /*const result = await model.generateContent([prompt,image]);
        const response = await result.response;
        res.json({response_text: response.text()});*/

        
        const result = await model.generateContent([prompt,image]);
        const response = await result.response;
        res.json({response_text: response.text()});

    }catch(error){
        res.status(500).json({ error: error.message });
    }finally{
        fs.unlinkSync(req.file.path);
    }
});


app.post("/generate-from-document", uploads.single("document"),async (req, res) => {
    const  prompt = req.body.prompt;
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString("base64");
    const mimeType = req.file.mimetype;
    
    
    try{
        const documentPart = {
            inlineData : {data : base64, mimeType:mimeType}
        }
        const result = await model.generateContent([prompt,documentPart]);
        const response =  result.response;
        res.json({response_text: response.text()});
    }catch(error){
        res.status(500).json({ error: error.message });
    }finally{
        fs.unlinkSync(req.file.path);
    }
});


app.post("/generate-from-audio", uploads.single("audio"),async (req, res) => {
    const  prompt = req.body.prompt;
    const filePath = req.file.path;
    const audioBuffer = fs.readFileSync(filePath);
    const base64Audio = audioBuffer.toString("base64");
    const mimeType = req.file.mimetype;
    
    
    try{
        const audioPart = {
            inlineData : {data : base64Audio,mimeType:mimeType}
        }
        const result = await model.generateContent([prompt,audioPart]);
        const response = await result.response;
        res.json({response_text: response.text()});
    }catch(error){
        res.status(500).json({ error: error.message });
    }finally{
        fs.unlinkSync(req.file.path);
    }
});

/*
app.post("/validate/institution", async (req, res) => {
    const { institution } = req.body;
    const response = await analyzeWithGemini(`Is '${institution}' a valid financial institution? Reply 'true' or 'false'.`);
    res.json({
        found: !!response,
        institution_name: institution,
        valid: response?.toLowerCase().includes('true')
    });
});
// Validate name in document
app.post("/validate/name", async (req, res) => {
    const { name } = req.body;
    const response = await analyzeWithGemini(`Check if the name '${name}' exists in the document. Reply 'true' or 'false'.`);
    res.json({
        found: !!response,
        valid: response?.toLowerCase().includes('true')
    });
});
// Validate amount in document
app.post("/validate/amount", async (req, res) => {
    const { amount } = req.body;
    const response = await analyzeWithGemini(`Check if the amount '${amount}' exists in the document. Reply 'true' or 'false'.`);
    res.json({
        found: !!response,
        valid: response?.toLowerCase().includes('true')
    });
});

// Validate date within a specific range
app.post("/validate/date", async (req, res) => {
    const { days } = req.body;
    const response = await analyzeWithGemini(`Check if the document contains a date within the last '${days}' days. Reply 'true' or 'false'.`);
    res.json({
        found: !!response,
        valid: response?.toLowerCase().includes('true')
    });
});
*/
// Start the server
const PORT = process.env.PORT_API || 3000
app.listen(PORT, () => {
    console.log(process.env.PORT_API);
    console.log(process.env.GEMINI_API_KEYS);
    console.log(`Server running on port ${PORT}`);
});
