# DevLens AI Architecture for Hackathon MVP

## 1. AI folder structure

The AI module is isolated under the ai package so it can evolve independently from the rest of the product.

```text
ai/
├── app/
├── prompts/
├── services/
├── models/
├── schemas/
└── scoring/
```

### Folder responsibilities

- ai/app
  - Hosts the FastAPI entrypoint and the AI API surface.
  - Responsible for HTTP request handling, dependency wiring, and response delivery.

- ai/prompts
  - Contains prompt templates, system instructions, and prompt-building logic.
  - Keeps LLM behavior consistent and easier to evolve.

- ai/services
  - Contains Gemini client integration, response parsing, and error handling helpers.
  - Acts as the orchestration layer between the web layer and the model.

- ai/models
  - Defines request and response models used by the AI module.
  - Keeps data contracts explicit and versionable.

- ai/schemas
  - Holds reusable schema definitions and validation helpers.
  - Supports clean separation between internal DTOs and API payloads.

- ai/scoring
  - Implements confidence scoring and severity heuristics.
  - Helps rank the quality and trustworthiness of generated analysis.

---

## 2. Prompt engineering architecture

### System Prompt
The system prompt defines the AI agent’s role, guardrails, and expected output format.

Responsibilities:
- Instruct the model to act as a senior debugging assistant.
- Enforce JSON-only output when possible.
- Encourage evidence-based reasoning and concise summaries.

### User Prompt
The user prompt contains runtime context such as logs, errors, and GitHub context.

Responsibilities:
- Inject structured debugging data into a single prompt.
- Keep the instruction focused on root cause analysis.
- Support a rapid hackathon MVP without over-engineering.

### Prompt Builder
The prompt builder composes the final prompt from:
- a reusable system prompt template,
- a user prompt template,
- runtime request data.

### Prompt Templates
Prompt templates are stored as text files for easy editing and experimentation.

Recommended prompt strategy:
- Keep instructions short and specific.
- Request a strict JSON schema.
- Ask for a confidence score and a suggested fix.

---

## 3. Gemini client architecture

The Gemini client is wrapped in a dedicated service so the AI module can swap providers later if needed.

Recommended components:
- environment-based API key loading,
- model selection configuration,
- request timeout and retry handling,
- response text normalization.

This keeps the rest of the application independent from Gemini-specific implementation details.

---

## 4. AI API

### Endpoint
POST /ai/analyze

### Purpose
Accept debugging context and return an AI-generated analysis payload.

### Example request
```json
{
  "logs": [
    "2026-07-25T10:00:00Z ERROR Connection refused",
    "2026-07-25T10:00:10Z WARN retrying request"
  ],
  "errors": [
    "TimeoutError: upstream service unavailable",
    "500 Internal Server Error"
  ],
  "github_context": "Repository: DevLens, PR #12, deployment logs attached"
}
```

---

## 5. Input schema

### Logs
A list of runtime or deployment log entries.

### Errors
A list of captured exception messages or error signatures.

### GitHub Context
A freeform string containing repository context, PR details, commit numbers, or issue references.

Suggested input contract:
- logs: list of strings
- errors: list of strings
- github_context: string

---

## 6. Output schema

The AI response should return a structured analysis object.

### Fields
- Summary: short explanation of the issue.
- Root Cause: likely underlying cause.
- Severity: low, medium, high, or critical.
- Suggested Fix: concrete remediation actions.
- Confidence: a score between 0.0 and 1.0.

Example:
```json
{
  "summary": "The service is failing because the upstream dependency is timing out.",
  "root_cause": "The downstream API is unreachable during peak traffic.",
  "severity": "high",
  "suggested_fix": "Increase timeout handling and add retry with backoff.",
  "confidence": 0.87
}
```

---

## 7. Response parser

The response parser converts raw Gemini output into a normalized JSON payload.

Responsibilities:
- Extract JSON from markdown code blocks if necessary.
- Validate keys and types.
- Apply fallback defaults if required fields are missing.

This layer protects the API from malformed model output.

---

## 8. Confidence scoring

Confidence should be derived from a combination of:
- the presence of explicit evidence in the logs,
- the clarity of the root cause,
- the completeness of the suggested fix,
- the model output structure.

Suggested heuristic:
- +0.3 if the response identifies a concrete root cause,
- +0.2 if the suggested fix is actionable,
- +0.2 if the output is structurally valid,
- +0.3 if logs and errors align with the diagnosis.

The final score should be clamped between 0.0 and 1.0.

---

## 9. AI workflow

Receive Request
↓
Build Prompt
↓
Gemini
↓
Validate Response
↓
Return JSON

This flow keeps the module simple and deterministic for an MVP.

---

## 10. Error handling

The module should handle:
- missing API keys,
- invalid input payloads,
- Gemini API failures,
- malformed model responses,
- timeout or rate-limit issues.

Recommended behavior:
- return structured error messages,
- avoid exposing internal stack traces to the client,
- log failures with enough context for debugging.

---

## 11. Retry strategy

For MVP, use a lightweight retry policy:
- retry up to 2 times,
- wait with exponential backoff,
- only retry transient failures such as timeout or server errors,
- stop retrying for validation or authentication issues.

Example policy:
- attempt 1: immediate,
- attempt 2: after 1 second,
- attempt 3: after 2 seconds.

---

## 12. Future improvements

Planned improvements for later phases:
- add prompt versioning,
- support multiple AI providers,
- add retrieval from GitHub issues and PR metadata,
- integrate embeddings for contextual similarity search,
- add evaluation datasets for measuring model quality,
- build human-in-the-loop review of AI-generated diagnoses.

---

## 13. Coding standards

- Use Python typing consistently.
- Prefer small, focused modules.
- Keep prompt logic separate from service logic.
- Validate request and response data using Pydantic models.
- Use clear naming and avoid inline business logic inside API handlers.
- Add unit tests for the parser, scorer, and prompt builder.

---

## 14. Production architecture

For production, the AI module should sit behind a lightweight API layer and be deployed independently.

Recommended production shape:
- API gateway or reverse proxy in front of the service,
- environment-based secrets management for Gemini API keys,
- structured logging and metrics,
- rate limiting,
- retry and timeout policies,
- observability for prompt latency and model errors.

For the hackathon MVP, this structure is intentionally simple but scalable.
