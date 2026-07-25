import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional

DATA_DIR = Path(__file__).parent.parent / "data"

class StorageService:
    def __init__(self):
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        self.history_file = DATA_DIR / "history.json"
        self.repositories_file = DATA_DIR / "repositories.json"
        self.settings_file = DATA_DIR / "settings.json"

        self._ensure_file(self.history_file, [])
        self._ensure_file(self.repositories_file, [])
        self._ensure_file(self.settings_file, {
            "github_token": "",
            "repository_url": "",
            "default_branch": "main",
            "backend_url": "http://localhost:8000",
            "theme": "dark"
        })

    def _ensure_file(self, path: Path, default_content: Any):
        if not path.exists():
            with open(path, 'w') as f:
                json.dump(default_content, f, indent=4)

    def _read_json(self, path: Path) -> Any:
        with open(path, 'r') as f:
            return json.load(f)

    def _write_json(self, path: Path, data: Any):
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)

    # History
    def get_history(self) -> List[Dict]:
        return self._read_json(self.history_file)
        
    def get_history_by_id(self, history_id: str) -> Optional[Dict]:
        history = self.get_history()
        for item in history:
            if item.get("id") == history_id or item.get("uuid") == history_id:
                return item
        return None

    def add_history(self, item: Dict):
        history = self.get_history()
        history.insert(0, item)  # Newest first
        self._write_json(self.history_file, history)

    def delete_history(self, history_id: str) -> bool:
        history = self.get_history()
        initial_len = len(history)
        history = [h for h in history if h.get("id") != history_id and h.get("uuid") != history_id]
        if len(history) < initial_len:
            self._write_json(self.history_file, history)
            return True
        return False

    # Repositories
    def get_repositories(self) -> List[Dict]:
        return self._read_json(self.repositories_file)

    def add_repository(self, repo: Dict):
        repos = self.get_repositories()
        repos.append(repo)
        self._write_json(self.repositories_file, repos)

    def delete_repository(self, repo_id: str) -> bool:
        repos = self.get_repositories()
        initial_len = len(repos)
        repos = [r for r in repos if r.get("id") != repo_id]
        if len(repos) < initial_len:
            self._write_json(self.repositories_file, repos)
            return True
        return False

    # Settings
    def get_settings(self) -> Dict:
        return self._read_json(self.settings_file)

    def update_settings(self, settings: Dict):
        current = self.get_settings()
        current.update(settings)
        self._write_json(self.settings_file, current)

storage = StorageService()
