'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search } from 'lucide-react';

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('https://your-api/messages'); // ← Replace with your API
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://your-api/messages/${id}`, { method: 'DELETE' });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  const filteredMessages = messages.filter((msg) =>
    [msg.name, msg.email, msg.title, msg.knownBy, msg.requestedServices]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-4">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">View all visitor messages submitted from the Contact page</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, title, etc..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {filteredMessages.length === 0 ? (
        <p className="text-muted-foreground text-center mt-8">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <Card key={msg._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{msg.title}</CardTitle>
                    <CardDescription className="text-sm">
                      From: {msg.name} ({msg.email}) <br />
                      Phone: {msg.phoneNumber}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(msg._id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Known By:</strong> {msg.knownBy}
                  <br />
                  <strong>Requested Services:</strong> {msg.requestedServices}
                </p>
                <p className="text-sm">{msg.message}</p>
                <Badge variant="secondary" className="text-xs">
                  {new Date(msg.createdAt).toLocaleString()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
