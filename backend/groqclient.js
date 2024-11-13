const express = require("express");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

const app = express();
app.use(express.json());
app.use(cors());

const schema = require("./schema.json");

async function classifyText(inputText) {
  const jsonSchema = JSON.stringify(schema, null, 4);

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a text classification model that categorizes text using JSON schema:\n${jsonSchema}`,
      },
      {
        role: "user",
        content: `Classify the following message: "${inputText}"`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}

app.post("/classify", async (req, res) => {
  try {
    const { inputText } = req.body;
    const classificationResult = await classifyText(inputText);
    res.json(classificationResult);
    console.log(classificationResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in classification");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
