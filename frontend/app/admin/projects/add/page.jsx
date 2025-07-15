"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { post } from "@/data/api";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
];

export default function page() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pic: null, // صورة فعلية
    timeToFinish: "",
    client: "",
    status: "pending",
    cost: "",
    timeSpend: "",
    category: "",
    scope: [],
    stack: [],
    industry: [],
    live: "",
    github: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      setForm({ ...form, pic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleArrayChange = (field, value) => {
    setForm({ ...form, [field]: value.split(",").map((item) => item.trim()) });
  };

  const validate = () => {
    const errs = {};
    if (!form.title || form.title.length < 3 || form.title.length > 100)
      errs.title = "Title must be 3-100 chars";
    if (!form.description || form.description.length < 10)
      errs.description = "Description at least 10 chars";
    if (
      !form.timeToFinish ||
      form.timeToFinish.length < 2 ||
      form.timeToFinish.length > 50
    )
      errs.timeToFinish = "Time to finish must be 2-50 chars";
    if (
      !form.client ||
      form.client.length < 2 ||
      form.client.length > 50 ||
      !/^[a-zA-Z0-9\s]+$/.test(form.client)
    )
      errs.client = "Client must be 2-50 chars and alphanumeric";
    if (
      !["pending", "in progress", "review", "completed"].includes(form.status)
    )
      errs.status = "Invalid status";
    if (!form.pic) errs.pic = "Image is required";
    if (
      !form.category ||
      form.category.length < 2 ||
      form.category.length > 50 ||
      !/^[a-zA-Z0-9\s]+$/.test(form.category)
    )
      errs.category = "Invalid category";
    if (!form.cost || isNaN(form.cost)) errs.cost = "Cost must be number";
    if (!form.timeSpend) errs.timeSpend = "Time spend is required";
    if (form.scope.length === 0) errs.scope = "Scope is required";
    if (form.stack.length === 0) errs.stack = "Stack is required";
    if (form.industry.length === 0) errs.industry = "Industry is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("pic", form.pic); // صورة فعلية
      formData.append("timeToFinish", form.timeToFinish);
      formData.append("client", form.client);
      formData.append("status", form.status);
      formData.append("cost", form.cost);
      formData.append("timeSpend", form.timeSpend);
      formData.append("category", form.category);
      formData.append("live", form.live);
      formData.append("github", form.github);

      form.scope.forEach((item) => formData.append("scope[]", item));
      form.stack.forEach((item) => formData.append("stack[]", item));
      form.industry.forEach((item) => formData.append("industry[]", item));

      await post("/api/projects", formData); // غيّر الرابط حسب API

      // Reset
      setForm({
        title: "",
        description: "",
        pic: null,
        timeToFinish: "",
        client: "",
        status: "pending",
        cost: "",
        timeSpend: "",
        category: "",
        scope: [],
        stack: [],
        industry: [],
        live: "",
        github: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  return (
    <div className="w-full p-5">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className=" grid grid-cols-3 gap-5">
              <div className="gap-1 flex flex-col">
                <Label>Title</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Client</Label>
                <Input
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                />
                {errors.client && (
                  <p className="text-red-500 text-sm">{errors.client}</p>
                )}
              </div>
              <div className="gap-1 flex flex-col">
                <Label>Category</Label>
                <Input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>
              <div className="gap-1 flex flex-col">
                <Label>Time to Finish</Label>
                <Input
                  name="timeToFinish"
                  value={form.timeToFinish}
                  onChange={handleChange}
                />
                {errors.timeToFinish && (
                  <p className="text-red-500 text-sm">{errors.timeToFinish}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Cost</Label>
                <Input
                  name="cost"
                  type="number"
                  value={form.cost}
                  onChange={handleChange}
                />
                {errors.cost && (
                  <p className="text-red-500 text-sm">{errors.cost}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Time Spent</Label>
                <Input
                  name="timeSpend"
                  value={form.timeSpend}
                  onChange={handleChange}
                />
                {errors.timeSpend && (
                  <p className="text-red-500 text-sm">{errors.timeSpend}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Scope (comma separated)</Label>
                <Input
                  name="scope"
                  value={form.scope.join(", ")}
                  onChange={(e) => handleArrayChange("scope", e.target.value)}
                />
                {errors.scope && (
                  <p className="text-red-500 text-sm">{errors.scope}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Stack (comma separated)</Label>
                <Input
                  name="stack"
                  value={form.stack.join(", ")}
                  onChange={(e) => handleArrayChange("stack", e.target.value)}
                />
                {errors.stack && (
                  <p className="text-red-500 text-sm">{errors.stack}</p>
                )}
              </div>

              <div className="gap-1 flex flex-col">
                <Label>Industry (comma separated)</Label>
                <Input
                  name="industry"
                  value={form.industry.join(", ")}
                  onChange={(e) =>
                    handleArrayChange("industry", e.target.value)
                  }
                />
                {errors.industry && (
                  <p className="text-red-500 text-sm">{errors.industry}</p>
                )}
              </div>
              <div className="gap-1 flex flex-col">
                <Label>Live URL</Label>
                <Input name="live" value={form.live} onChange={handleChange} />
              </div>

              <div className="gap-1 flex flex-col">
                <Label>GitHub URL</Label>
                <Input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <Label>Status</Label>
                <Select
                  options={statusOptions}
                  defaultValue={statusOptions.find(
                    (o) => o.value === form.status
                  )}
                  onChange={(e) => setForm({ ...form, status: e.value })}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col w-[66%] gap-1">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="flex"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="flex flex-col  gap-1">
                <Label>Image</Label>
                <Input
                  name="pic"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {errors.pic && (
                  <p className="text-red-500 text-sm">{errors.pic}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
