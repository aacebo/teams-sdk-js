# Samples: Assistants

A bot that demonstrates usage of the [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview/agents).

## Set up the environment
In the root folder of the sample, create an `.env` file:

```
CLIENT_ID=
CLIENT_SECRET=

OPENAI_KEY=
ASSISTANT_ID=
THREAD_ID=
```

Populate the `CLIENT_ID`, `CLIENT_SECRET`, and `OPENAI_KEY` variables.

## Create the assistant and thread
```bash
$: npm run create-assistant
```

This will output the `ASSISTANT_ID` and `THREAD_ID` to the console. Populate the `.env` file with those values.

## Run

```bash
$: npm run dev
```
