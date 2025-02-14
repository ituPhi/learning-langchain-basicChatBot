# Web Content Analysis Chatbot 🤖

A Node.js application that scrapes web content and uses LangChain with GPT-4 to analyze and provide responses in Spanish.

## Features ✨

- Web scraping using Axios and Cheerio
- Content analysis including headers, paragraphs, links, images, and metadata
- Integration with OpenAI's GPT-4 through LangChain
- Responses always provided in Spanish
- Environment variable support for secure API key management

## Prerequisites 📋

- Node.js (v18 or higher)
- OpenAI API key
- npm or yarn

## Installation 🚀

1. Clone the repository:

bash
git clone this repo
cd directory

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory and add your OpenAI API key:

OPENAI_API_KEY=your_openai_api_key

- add your openai api key
- add url you want to summarize

## Usage 🛠️

1. Start the application:

npm run dev
