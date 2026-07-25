import httpx
from app.core.config import settings
from app.core.exceptions import GitHubAPIError

class GithubService:
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {settings.GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }

    async def _make_request(self, method: str, endpoint: str, **kwargs):
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.request(
                    method=method,
                    url=f"{self.base_url}{endpoint}",
                    headers=self.headers,
                    **kwargs
                )
            except httpx.RequestError as exc:
                raise GitHubAPIError(
                    f"Connection to GitHub failed or timed out: {exc}",
                    status_code=503
                )
            
            if response.status_code in [401, 403]:
                raise GitHubAPIError("GitHub API authorization failed. Check your token.", status_code=401)
            elif response.status_code == 404:
                raise GitHubAPIError("GitHub repository not found.", status_code=404)
            elif response.status_code == 429:
                raise GitHubAPIError("GitHub API rate limit exceeded.", status_code=429)
            elif response.status_code >= 400:
                raise GitHubAPIError(f"GitHub API error: {response.text}", status_code=response.status_code)
                
            return response.json()

    async def get_latest_commit(self, owner: str, repo: str, branch: str = "main"):
        endpoint = f"/repos/{owner}/{repo}/commits/{branch}"
        return await self._make_request("GET", endpoint)

    async def get_latest_pull_request(self, owner: str, repo: str):
        endpoint = f"/repos/{owner}/{repo}/pulls?state=all&sort=updated&direction=desc&per_page=1"
        return await self._make_request("GET", endpoint)

    async def get_changed_files(self, owner: str, repo: str, base: str, head: str):
        endpoint = f"/repos/{owner}/{repo}/compare/{base}...{head}"
        return await self._make_request("GET", endpoint)
