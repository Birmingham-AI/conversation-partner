# Conversation Partner

## Overview

The purpose of this repository is to create demo use cases for AI tools that can act as conversation partners. More
importantly, these agents open the door for the automation and feedback of common scenarios wherein the dependency of a
knowledgeable individual is too taxing or inaccessible for the user. This includes:

- Learning languages
- Learning how to perform conversational tasks (patient histories, interviews, etc.)
- Any problem-solving tasks where question and answer is necessary

## Prerequisites

You'll need the following to use this repository:

- An [OpenAI API](https://platform.openai.com/docs/quickstart) key with credits
- [Docker](https://docs.docker.com/engine/install/)

## Installation

Clone the repository:

```bash
git clone https://github.com/Birmingham-AI/conversation-partner.git
```

Add a new `.env` in the `core/src/core` directory for your API key. You can copy and paste this command with your key's
value to instantly create the file:

```bash
echo 'OPENAI_API_KEY=<YOUR_KEY>' > core/.env
```

## Usage

Start the services by running the following from the root of the project:

```bash
docker compose up -d
```

Once all services are up, you can check the health of your server by running:

```bash
curl localhost:3000/healthcheck
```

You should receive a response like this:

```json
{ "message": "I'm alive you fools!" }
```

Navigate to the below URL to use the streamlit UI:


http://localhost:8501/


## Exploration

You can use this Postman collection to explore the API; select the `Language Bot` collection after opening:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/mission-observer-40442015/workspace/bhm-ai-engineering)
