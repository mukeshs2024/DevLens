import os

import httpx

print("gemini_client.py loaded")


class AIModelUnavailableError(RuntimeError):
    pass


class GeminiClient:
    def __init__(self, api_key: str | None = None, model: str = "gemini-2.0-flash") -> None:
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "")
        self.model = model
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"

    async def generate(self, prompt: dict[str, str]) -> str:
        if not self.api_key:
            raise AIModelUnavailableError("GEMINI_API_KEY is not configured")

        combined_prompt = f"{prompt['system_prompt']}\n\n{prompt['user_prompt']}"
        payload = {
            "contents": [{"parts": [{"text": combined_prompt}]}],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json",
            },
        }

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.post(
                    f"{self.base_url}/{self.model}:generateContent?key={self.api_key}",
                    json=payload,
                )

                print("Status:", response.status_code)
                print(response.text)
                print("========== GEMINI RESPONSE ==========")
                print("Status:", response.status_code)
                print("Body:")
                print(response.text)

                if response.status_code in {429, 500, 502, 503, 504}:
                    raise AIModelUnavailableError("AI model unavailable")
                response.raise_for_status()
                data = response.json()
        except Exception as exc:
            print("========== GEMINI ERROR ==========")
            print("Exception:", exc)

            if "response" in locals():
                print("Status Code:", response.status_code)
                print("Response Body:")
                print(response.text)

            raise

        if not data.get("candidates"):
            raise AIModelUnavailableError("AI model unavailable")

        try:
            return data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError) as exc:
            raise AIModelUnavailableError("AI model unavailable") from exc
