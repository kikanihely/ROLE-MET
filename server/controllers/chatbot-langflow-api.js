const LANGFLOW_API_URL = "https://api.langflow.astra.datastax.com/lf/8ded5825-8746-44f2-b978-5816d6f72c9f/api/v1/run/6b381684-754f-4598-a8ca-1af8c8e74996?stream=false";

const AUTH_TOKEN = "Bearer AstraCS:iFviiqhvWCOrmeHbWOJZxbEP:17937e305b8a6821e8b88b7164cdf8a6b421c61f810d5e31d83bdacc9555539c";

const chatBotResponse = async (data) => {
    try {
      const response = await fetch(LANGFLOW_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": AUTH_TOKEN,
        },
        body: JSON.stringify({
          input_value: data,
          output_type: "chat",
          input_type: "chat",
          tweaks: {
            "ChatInput-jhfhH": {
              sender: "User",
              sender_name: "User",
              should_store_message: true,
            },
            "Prompt-kjp9U": {
              template: "Answer the user as if you were a GenAI expert, enthusiastic about helping them get started building something fresh.",
            },
            "ChatOutput-HPxfa": {
              clean_data: true,
              data_template: "{text}",
              sender: "Machine",
              sender_name: "AI",
              should_store_message: true,
            },
            "HuggingFaceModel-smXCj": {
              huggingfacehub_api_token: "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",
              model_id: "mistralai/Mistral-7B-Instruct-v0.3",
              task: "text-generation",
              max_new_tokens: 512,
              stream: false,
              temperature: 0.8,
              top_p: 0.95,
              typical_p: 0.95,
            },
          },
        }),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Langflow error response:", text, response);
        return { status: 400, message: "Langflow API error" };
      }
  
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Unexpected Langflow response:", text);
        return { status: 400, message: "Invalid response format from Langflow" };
      }
  
      const result = await response.json();
  
      if (result.outputs?.length > 0) {
        return {
          status: 200,
          data: result.outputs[0].outputs[0].artifacts.message,
        };
      } else {
        return { status: 400, message: "No valid response from AI" };
      }
    } catch (error) {
      console.error("Langflow Error:", error.message);
      return { status: 400, message: "Error calling Langflow API" };
    }
  };
  

module.exports = chatBotResponse;
