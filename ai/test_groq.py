import asyncio
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from services.groq_client import GroqClient

async def main():
    print("Loaded API Key:", "YES" if os.getenv("GROQ_API_KEY") else "NO")
    client = GroqClient()
    
    prompt = {
        "system_prompt": "You are a helpful assistant. Please return your response as a JSON object with a single 'status' key.",
        "user_prompt": "Are you working?"
    }
    
    print("Sending request to Groq...")
    response = await client.generate(prompt)
    print("Groq response:")
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
