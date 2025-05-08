const langFlowGetScore = async (data) => {
  try {
    const response = await fetch(process.env.LANGFLOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "ChatInput-7sPYp": {
                  "background_color": "",
                  "chat_icon": "",
                  "files": "",
                  "input_value": data,
                  "sender": "User",
                  "sender_name": "User",
                  "session_id": "",
                  "should_store_message": true,
                  "text_color": ""
          },
          "Prompt-ZGVpn": {
                  "template": "You are an AI assistant that evaluates resumes against job descriptions to determine a candidate’s suitability. Your goal is to provide a resume match score (out of 100%) and five strong improvement suggestions based on the job description.  \n\n---\n\n### Step 1: Convert Resume to Structured Format  \nExtract structured data from the following resume text:  \n\"\"\"  \n{resume_data}  \n\"\"\"  \nEnsure the format includes:  \n- Name  \n- Contact Information  \n- Education  \n- Work Experience  \n- Skills  \n- Certifications  \n- Projects  \n- Additional Information  \n\nProvide the extracted resume data in JSON format.  \n\n---\n\n### Step 2: Extract Job Description  \nIdentify and extract relevant details from the section that starts after \"Job Description:\" in the provided input.  \n\n---\n\n### Step 3: Resume Fit Analysis (Scoring & Comparison)  \nCompare the extracted resume data with the job description and provide a structured JSON response make sure that later on i can convert to string to json please no extra things as follows:\n{output}",
                  "tool_placeholder": "",
                  "resume_data": "DAVE PREM\nCONTACT Phone: +91 74050-21420 Address: 29-B, Rima park society, behind\nEmail: premdave3705@gmial.com Medico hospital, near Visat circle, Chandkheda\nAhmedabad, 382424,\n\nPROFESSIONAL EXPERIENCE\nViavi Web | DEC 2022- APR 2023\nAndroid Intern\nDeveloped advanced Android applications using Java, improving app performance\nand user experience.\nLearned industry best practices in UI/UX, API integration, and database\nmanagement.\nConducted rigorous testing and debugging, ensuring optimal app stability and\nefficiency.\nExtended knowledge by independently learning Flutter up to API integration,\nenhancing cross-platform development skills.\n\nCERTIFICATES\nLevel Supermind Hackathon | 2025\nLevel Supermind\nHack The Spring | 2024\nGEC Gandhinagar\n\nEDUCATION\nModi School | 2019-2020\nSSC Examination | GSEB Board\nPercentage : 73.33\nPercentile : 92.32\n\nRK University | 2020-2023\nDiploma Computer Engineering\nCGPA: 8.35\n\nVishwakarma Govt. Eng. College | 2023-2026\nBE Computer Engineering\nCGPA: 6.98\n\nSKILLS\nC, C++, HTML, CSS, JS\nOperating System\nNetworking\nAndroid / SQ Light\nDBMS using SQL",
                  "output": "{\"resume_match_score\": <numeric value between 0-100>,\n  \"analysis\": {\n    \"skills_match\": \"<brief evaluation of skill match>\",\n    \"experience_relevance\": \"<evaluation of work experience fit>\",\n    \"education_fit\": \"<assessment of education qualification>\",\n    \"certifications_projects\": \"<evaluation of certifications and projects>\",\n    \"overall_strengths\": [\"<list of key strengths>\"],\n    \"overall_weaknesses\": [\"<list of key weaknesses>\"]\n  },\n  \"improvement_suggestions\": [\n    \"<Suggestion 1>\",\n    \"<Suggestion 2>\",\n    \"<Suggestion 3>\",\n    \"<Suggestion 4>\",\n    \"<Suggestion 5>\"\n  ]\n}"
          },
          "ChatOutput-8jm0K": {
                  "background_color": "",
                  "chat_icon": "",
                  "clean_data": true,
                  "data_template": "{text}",
                  "input_value": "",
                  "sender": "Machine",
                  "sender_name": "AI",
                  "session_id": "",
                  "should_store_message": true,
                  "text_color": ""
          },
          "OpenAIModel-eN2Ci": {
                  "api_key": "",
                  "input_value": "",
                  "json_mode": false,
                  "max_retries": 5,
                  "max_tokens": null,
                  "model_kwargs": {},
                  "model_name": "gpt-4o-mini",
                  "openai_api_base": "",
                  "seed": 1,
                  "stream": false,
                  "system_message": "",
                  "temperature": 0.1,
                  "timeout": 700
          },
          "HuggingFaceModel-zq7jy": {
                  "huggingfacehub_api_token": "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",
                  "inference_endpoint": "https://api-inference.huggingface.co/models/",
                  "input_value": "",
                  "max_new_tokens": 512,
                  "model_id": "mistralai/Mistral-7B-Instruct-v0.3",
                  "model_kwargs": {},
                  "repetition_penalty": null,
                  "retry_attempts": 1,
                  "stream": false,
                  "system_message": "",
                  "task": "text-generation",
                  "temperature": 0.8,
                  "top_k": null,
                  "top_p": 0.95,
                  "typical_p": 0.95
          }
  }
      }),
    });
    const result = await response.json();
let langflowOutput = result?.outputs?.[0]?.outputs?.[0]?.artifacts?.message;

if (!langflowOutput || typeof langflowOutput !== "string") {
  console.error("Langflow output is missing or invalid:", langflowOutput);
  throw new Error("Invalid Langflow response: missing message.");
}

// Optional: remove weird prefix like 'json'
const cleaned = langflowOutput.replace(/^json\s*/i, '').trim();

// Extract match score
const matchScore = cleaned.match(/"resume_match_score"\s*:\s*(\d+)/);
const score = matchScore ? parseInt(matchScore[1]) : null;

// Extract improvement suggestions
const suggestionsMatch = cleaned.match(/"improvement_suggestions"\s*:\s*\[(.*?)\]/s);
let suggestions = [];

if (suggestionsMatch) {
  suggestions = suggestionsMatch[1]
    .split('\n')
    .map(line => line.trim().replace(/^"|"$/, '').replace(/",?$/, ''))
    .filter(line => line.length > 0);
}

// Extract skills_match text
const skillsMatch = cleaned.match(/"skills_match"\s*:\s*"([^"]+)"/);
const skills = skillsMatch ? skillsMatch[1] : null;

console.log("Score:", score);
console.log("Suggestions:", suggestions);
console.log("Skills Match:", skills);

return {
  score: score,
  suggestions: suggestions,
};

  } catch (error) {
    console.error("Error calling Langflow API:", error);
    throw error;
  }
};

module.exports = langFlowGetScore;