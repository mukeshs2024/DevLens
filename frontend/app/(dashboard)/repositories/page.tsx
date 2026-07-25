"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, GitBranch, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [newRepoBranch, setNewRepoBranch] = useState('main');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const data = await api.getRepositories();
      setRepositories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const handleAddRepository = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoUrl.startsWith('https://github.com/')) {
      setErrorMsg('Please enter a valid GitHub repository URL.');
      return;
    }
    
    try {
      setErrorMsg('');
      const ownerRepo = newRepoUrl.replace('https://github.com/', '').split('/');
      await api.addRepository({
        url: newRepoUrl,
        owner: ownerRepo[0],
        name: ownerRepo[1],
        default_branch: newRepoBranch,
        added_at: new Date().toISOString()
      });
      setNewRepoUrl('');
      setNewRepoBranch('main');
      fetchRepositories();
    } catch (e: any) {
      setErrorMsg(e.message || 'Failed to add repository');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this repository?')) return;
    try {
      await api.deleteRepository(id);
      fetchRepositories();
    } catch (e) {
      console.error('Failed to delete', e);
    }
  };
  
  const handleAnalyze = (repo: any) => {
    // Navigate to upload page with these pre-filled (using query params or just a simple navigation for MVP)
    // Actually, in MVP, users go to upload page to drop a log, but we can just redirect to upload page.
    router.push(`/upload?repo=${encodeURIComponent(repo.url)}&branch=${repo.default_branch}`);
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Repositories</h1>
        <p className="text-slate-500">Manage your connected GitHub repositories.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Repository</CardTitle>
          <CardDescription>Connect a GitHub repository to easily fetch context for log analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddRepository} className="flex gap-4 items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="repoUrl">GitHub URL</Label>
              <Input id="repoUrl" value={newRepoUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRepoUrl(e.target.value)} placeholder="https://github.com/owner/repo" required />
            </div>
            <div className="space-y-2 w-48">
              <Label htmlFor="branch">Default Branch</Label>
              <Input id="branch" value={newRepoBranch} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRepoBranch(e.target.value)} placeholder="main" required />
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </form>
          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center p-8"><p className="text-slate-500">Loading repositories...</p></div>
      ) : repositories.length === 0 ? (
        <Card className="border-dashed bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <GitBranch className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-1">No repositories added</h3>
            <p className="text-slate-500">Add a repository above to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <Card key={repo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <GitBranch className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{repo.name}</h3>
                      <p className="text-sm text-slate-500">{repo.owner}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(repo.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <div>
                    <span className="font-semibold">Branch:</span> {repo.default_branch}
                  </div>
                  <div>
                    <span className="font-semibold">Added:</span> {new Date(repo.added_at).toLocaleDateString()}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => handleAnalyze(repo)}>
                  Analyze Latest Logs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
