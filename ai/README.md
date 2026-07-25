# DevLens AI Module

This directory contains the AI service used by DevLens to analyze deployment issues, errors, and repository context.

## Overview

The AI module exposes a FastAPI endpoint that receives issue-related context and returns:

- a summary of the problem
- the likely root cause
- severity
- a suggested fix
- a confidence score

## Main Components

- app/main.py: FastAPI app and analysis endpoint
- models/: request and response schemas
- prompts/: prompt templates and prompt builder
- services/: Gemini API integration and response parsing
- scoring/: confidence scoring logic

## API Endpoint

POST /ai/analyze

### Request body

The request accepts repository metadata and debugging details such as:

- repository
- branch
- parsed_errors
- stack_traces
- critical_warnings
- latest_commit
- changed_files
- commit_message
- issue_description

### Response

The response includes:

- summary
- root_cause
- severity
- suggested_fix
- confidence

## Setup

1. Install Python dependencies:

   ```bash
   pip install -r ../requirements.txt
   ```

2. Set your Gemini API key:

   ```bash
   set GEMINI_API_KEY=your_api_key_here
   ```

   On PowerShell, you can also use:

   ```powershell
   $env:GEMINI_API_KEY="your_api_key_here"
   ```

3. Run the service:

   ```bash
   uvicorn ai.app.main:app --reload --port 8001
   ```

## Example Request

```bash
curl -X POST http://127.0.0.1:8001/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "example/repo",
    "branch": "main",
    "parsed_errors": ["ModuleNotFoundError: No module named 'x'"],
    "stack_traces": ["File \"app.py\", line 10, in <module>"],
    "critical_warnings": 2,
    "latest_commit": {"sha": "abc123", "message": "Fix auth bug"},
    "changed_files": ["src/app.py"],
    "commit_message": "Fix auth bug",
    "issue_description": "Deployment failed after recent changes"
  }'
```

## Notes

- The AI service depends on a valid Gemini API key.
- If the model is unavailable or the response cannot be parsed, the endpoint returns a 503 error.
- The prompt templates are stored under the prompts folder and can be tuned for different analysis behavior.
