"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const page = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Using blog posts endpoint as placeholder for services
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      const data = await response.json();
      setServices(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {}
  };

  const handleSave = async (service) => {
    try {
      const method = service.id ? "PUT" : "POST";
      const url = service.id
        ? `https://jsonplaceholder.typicode.com/posts/${service.id}`
        : "https://jsonplaceholder.typicode.com/posts";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      const data = await response.json();

      if (service.id) {
        setServices(services.map((s) => (s.id === service.id ? data : s)));
      } else {
        setServices([data, ...services]);
      }

      setEditingService(null);
    } catch (error) {}
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button
          onClick={() =>
            setEditingService({ id: 0, title: "", body: "", userId: 1 })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {editingService && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingService.id ? "Edit Service" : "New Service"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Service title"
              value={editingService.title}
              onChange={(e) =>
                setEditingService({ ...editingService, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Service description"
              value={editingService.body}
              onChange={(e) =>
                setEditingService({ ...editingService, body: e.target.value })
              }
              rows={6}
            />
            <div className="flex space-x-2">
              <Button onClick={() => handleSave(editingService)}>
                Save Service
              </Button>
              <Button variant="outline" onClick={() => setEditingService(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">Service #{service.id}</Badge>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingService(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {service.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
