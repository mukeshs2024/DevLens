import os
from groq import AsyncGroq

class AIModelUnavailableError(RuntimeError):
    pass

class GroqClient:
    def __init__(self, api_key: str | None = None, model: str = "llama-3.3-70b-versatile") -> None:
        self.api_key = api_key or os.getenv("GROQ_API_KEY", "")
        if not self.api_key:
            raise AIModelUnavailableError("GROQ_API_KEY is not configured")
        self.client = AsyncGroq(api_key=self.api_key)
        self.model = model

    async def generate(self, prompt: dict[str, str]) -> str:
        print("✅ Using Groq")
        combined_prompt = f"{prompt['system_prompt']}\n\n{prompt['user_prompt']}"

        try:
            chat_completion = await self.client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": combined_prompt,
                    }
                ],
                model=self.model,
                response_format={"type": "json_object"},
                temperature=0.2,
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            print("========== GROQ ERROR ==========")
            print("Exception:", e)
            raise AIModelUnavailableError(f"AI model unavailable: {str(e)}")
