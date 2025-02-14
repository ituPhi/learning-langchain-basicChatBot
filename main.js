import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import axios from 'axios';
import * as cheerio from 'cheerio';

const model = new ChatOpenAI({
  model: 'gpt-4',
  openAIApiKey: process.env.OPENAI_API_KEY
});

async function fetchWebContent(url) {
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const h1 = $('h1').text();
    const h2 = $('h2')
      .map((index, element) => $(element).text())
      .get();
    const h3 = $('h3')
      .map((index, element) => $(element).text())
      .get();
    const h4 = $('h4')
      .map((index, element) => $(element).text())
      .get();
    const content = $('p')
      .map((index, element) => $(element).text())
      .get();
    const links = $('a')
      .map((index, element) => $(element).attr('href'))
      .get();
    const images = $('img')
      .map((index, element) => ({
        src: $(element).attr('src'),
        alt: $(element).attr('alt')
      }))
      .get();
    const lists = $('ul, ol')
      .map((index, element) => $(element).text())
      .get();
    const tables = $('table')
      .map((index, element) => $(element).text())
      .get();
    const meta = {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content'),
      keywords: $('meta[name="keywords"]').attr('content')
    };

    return { h1, h2, h3, h4, content, links, images, lists, tables, meta };
  } catch (error) {
    console.error('Error fetching web content:', error);
    return null;
  }
}

async function generateChatbotResponse(webContent) {
  const webContentString = JSON.stringify(webContent);

  const messages = [
    new SystemMessage(
      'You are a helpful assistant that can answer questions about the web content, you need to decipher the content and tells me what the website is about. YOU MUST ALWAYS REPLY IN SPANISH'
    ),
    new HumanMessage(webContentString)
  ];
  const response = await model.invoke(messages);

  return response;
}

(async () => {
  const url = 'https://neon.tech/';
  try {
    const webContent = await fetchWebContent(url);
    const response = await generateChatbotResponse(webContent);
    console.log(response.content);
  } catch (error) {
    console.error('Error fetching web content:', error);
  }
})();
