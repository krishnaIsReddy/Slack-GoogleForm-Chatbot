# Google Form → ChatGPT → Slack Automation

This project automates the process of capturing Google Form responses, summarizing them using Google's GEMINI API, and posting the summary to a Slack channel using a webhook.

---

## Features

- Triggered automatically on Google Form submission
- Uses Google Apps Script to:
  - Extract responses
  - Format a prompt for summarization
  - Send the prompt to GEMINI (via API)
  - Post the summarized result to Slack
- Lightweight and fully serverless

---

---

## Tools & Technologies

- **Google Forms** – for collecting responses
- **Google Apps Script** – backend automation
- **GEMINI API (ChatGPT)** – for text summarization
- **Slack Webhooks** – to send the final message

---

## Workflow Overview

1. **User submits a Google Form**
2. **Apps Script `onFormSubmit` trigger** activates
3. Script sends form data to **GEMINI API**
4. Summarized response is sent to **Slack channel**

---
