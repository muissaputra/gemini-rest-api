**Summary**<br/>
Implementation ChatBot with Gemini AI<br/>
This project using generative AI with models Gemini 2.5 Flash AI

**Installation**
- Install module Node JS

- Minimum V18+
  
  Command :
   
  _npm install express dotenv cors @google/generative-ai_
  
  This setup prepares a Node.js project using Express and integrates the Gemini 2.5 Flash API through the @google/generative-ai package, enabling support for text, audio, image, or document input handling.
  - express: Sets up the REST API.
  - dotenv: Loads the Gemini API key securely from a .env file.
  - @google/generative-ai: Connects to the Gemini API (including Flash 2.5).
  - cors: Allow requests from any origin to access this server’s endpoints.

- Install file .env
- Create File .env and save to root folder
- Open File .env and save content like bellow :
  
  - GEMINI_API_KEY=[get from Gemini AI Studio]
  - PORT_API=5000
  
  
**Running Program**<br/>
Command On Terminal : <br/>
node index.js

Open Browser Chrome and type on address bar : <br/>
http://localhost:5000
