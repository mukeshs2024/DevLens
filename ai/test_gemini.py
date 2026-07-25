import asyncio
import os
from services.gemini_client import GeminiClient

async def main():
    # Force the key if needed, or rely on .env (assuming python-dotenv isn't loaded by default in scripts, we'll explicitly load it)
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        pass
        
    print(f"Loaded API Key: {'YES' if os.getenv('GEMINI_API_KEY') else 'NO'}")
    
    client = GeminiClient()
    prompt = {
        "system_prompt": "You are a helpful assistant.",
        "user_prompt": "Hello! Are you working? Reply with a short confirmation message."
    }
    
    print("Sending request to Gemini...")
    try:
        response = await client.generate(prompt)
        print("Model Response:")
        print("-" * 40)
        print(response)
        print("-" * 40)
        print("Success! The Gemini model is working.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
