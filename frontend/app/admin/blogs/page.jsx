'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const limit = 6;
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (post) => {
    try {
      const method = post.id ? 'PUT' : 'POST';
      const url = post.id
        ? `https://jsonplaceholder.typicode.com/posts/${post.id}`
        : 'https://jsonplaceholder.typicode.com/posts';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (post.id) {
        setPosts(posts.map(p => p.id === post.id ? data : p));
      } else {
        setPosts([data, ...posts]);
      }

      setEditingPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / limit);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <Button onClick={() => setEditingPost({ id: 0, title: '', body: '', userId: 1 })}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Post title"
              value={editingPost?.title || ''}
              onChange={(e) => setEditingPost((p) => ({ ...p, title: e.target.value }))}
            />
            <MarkdownEditor
              value={editingPost?.body || ''}
              style={{ height: '300px' }}
              onChange={({ text }) => setEditingPost((p) => ({ ...p, body: text }))}
              config={{ view: { menu: true, md: true, html: true }, canView: ['menu', 'md', 'html'] }}
            />
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button onClick={() => handleSave(editingPost)}>Save</Button>
              <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">Post #{post.id}</Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingPost(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {post.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => router.push(`?page=${currentPage - 1}`)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => router.push(`?page=${currentPage + 1}`)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
