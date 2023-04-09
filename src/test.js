const { Configuration, OpenAIApi } = require("openai");

const openAIKey = "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";
const resume = "software engineer";
const jobDescription = "slack";

async function main() {
  try {
    const configuration = new Configuration({
      apiKey: openAIKey,
    });
    delete configuration.baseOptions.headers["User-Agent"];
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`,
        },
      ],
    });
    console.log(chatCompletion.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

main();
