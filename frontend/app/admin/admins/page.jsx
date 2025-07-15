"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Search, Mail, Shield, User } from "lucide-react";

const page = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@devercrowd.com",
      role: "Super Admin",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@devercrowd.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@devercrowd.com",
      role: "Editor",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingAdmin, setEditingAdmin] = useState(null);

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const handleSave = (admin) => {
    if (admin.id) {
      setAdmins(admins.map((a) => (a.id === admin.id ? admin : a)));
    } else {
      const newAdmin = { ...admin, id: Date.now() };
      setAdmins([newAdmin, ...admins]);
    }
    setEditingAdmin(null);
  };

  const toggleStatus = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "active" ? "inactive" : "active",
            }
          : admin
      )
    );
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return "bg-red-100 text-red-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "editor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-muted-foreground">
            Manage system administrators and their permissions
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingAdmin({
              id: 0,
              name: "",
              email: "",
              role: "Editor",
              status: "active",
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          New Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {editingAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAdmin.id ? "Edit Admin" : "New Admin"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Full name"
              value={editingAdmin.name}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, name: e.target.value })
              }
            />
            <Input
              placeholder="Email address"
              type="email"
              value={editingAdmin.email}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, email: e.target.value })
              }
            />
            <select
              className="w-full p-2 border rounded-md"
              value={editingAdmin.role}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, role: e.target.value })
              }
            >
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            <div className="flex space-x-2">
              <Button onClick={() => handleSave(editingAdmin)}>
                Save Admin
              </Button>
              <Button variant="outline" onClick={() => setEditingAdmin(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdmins.map((admin) => (
          <Card key={admin.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={admin.avatar} />
                  <AvatarFallback>
                    {admin.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{admin.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {admin.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getRoleColor(admin.role)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {admin.role}
                </Badge>
                <Badge
                  variant={admin.status === "active" ? "default" : "secondary"}
                >
                  {admin.status}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingAdmin(admin)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(admin.id)}
                >
                  <User className="h-4 w-4 mr-1" />
                  {admin.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
