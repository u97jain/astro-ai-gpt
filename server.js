const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/astro', async (req, res) => {
  const { name, dob, time, place, focus } = req.body;

  const prompt = `
You are a deeply wise and symbolic AI astrologer. Based on the following birth details, generate a personalized, gentle, emotionally insightful astrological reading. Avoid generic lines—make it feel true.

- Name: ${name}
- Date of Birth: ${dob}
- Time of Birth: ${time}
- Place of Birth: ${place}
- Focus Area: ${focus}

Include themes like life timing, internal struggles, strengths, and upcoming opportunities in this area.
  `;

  try {
    console.log("Sending prompt to OpenAI:\n", prompt);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch astrological reading." });
  }
});

app.listen(3000, () => {
  console.log("Astro AI server running on http://localhost:3000");
});
