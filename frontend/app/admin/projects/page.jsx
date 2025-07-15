"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink, Github, Search } from "lucide-react";
import { del, get, post, put } from "@/data/api";
import Link from "next/link";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("/api/projects")
      .then((res) => {
        setProjects(res.data.data.projects);
      })
      .catch(() => {
        console.error("Failed to load projects");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await del(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filtered = projects.filter(
    (p) =>
      (p.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.description?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.client?.toLowerCase() || "").includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 mx-auto border-b-2 border-primary rounded-full" />
        <p className="text-muted-foreground mt-4">Loading Projects...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">Manage your client projects</p>
        </div>
        <Link
          href="/admin/projects/add"
          className="bg-black p-1 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, description, client..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Showing {filtered.length} of {projects.length} projects
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Card key={project._id}>
            <CardHeader className="p-0">
              <img
                src={project.pic}
                alt={project.title}
                className="w-full h-40 object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <div className="flex justify-between items-start">
                <Badge>{project.status}</Badge>
                <div className="flex gap-1">
                  <div className="flex">
                    <Link
                      href={`/admin/projects/${project._id}`}
                      className=" items-center justify-center  flex"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardTitle className="text-base font-semibold">
                {project.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>

              <p className="text-xs text-muted-foreground">
                Client: {project.client} • Category: {project.category}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
