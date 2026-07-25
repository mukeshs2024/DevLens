import asyncio
import os
import unittest

from ai.services.gemini_client import GeminiClient


class GeminiClientTest(unittest.TestCase):
    def test_gemini_model_smoke(self) -> None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            self.skipTest("GEMINI_API_KEY is not set")

        client = GeminiClient(api_key=api_key)
        prompt = {
            "system_prompt": "You are a helpful assistant.",
            "user_prompt": "Reply with exactly: OK",
        }

        response = asyncio.run(client.generate(prompt))

        self.assertIsInstance(response, str)
        self.assertTrue(response.strip())


if __name__ == "__main__":
    unittest.main()
