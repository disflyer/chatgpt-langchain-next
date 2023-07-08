# GPT & LangChain - Create a ChatGPT Chatbot base on LangChain DocumentLoader

## Development

1. Clone the repo or download the ZIP

```
git clone [github https url]
```

2. Install packages

First run `npm install pnpm -g` to install pnpm globally (if you haven't already).

Then run:

```
pnpm install
```

After installation, you should now see a `node_modules` folder.

3. Set up your `.env` file

- Copy `.env.example` into `.env`
  Your `.env` file should look like this:

```
OPENAI_API_KEY=
PINECONE_INDEX=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=

```

4. Run your server

```
pnpm run dev

```

- Visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Visit [pinecone](https://pinecone.io/) to create and retrieve your API keys, and also retrieve your environment and index name from the dashboard.

## Credit

Frontend of this repo is inspired by [ai-chatbot](https://github.com/vercel-labs/ai-chatbot)
