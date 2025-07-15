"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { post, get, put } from "@/data/api"; // تأكد إن دالة post بتدعم method="PUT"
import { useParams } from "next/navigation";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
];

export default function Page() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [form, setForm] = useState({
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    get(`/api/projects/${id}`)
      .then((res) => {
        const proj = res.data.data.project;
        setProject(proj);
        setForm({
          title: proj.title || "",
          description: proj.description || "",
          pic: null, // عشان لو عايز تغير الصورة لازم ترفع واحدة جديدة
          timeToFinish: proj.timeToFinish || "",
          client: proj.client || "",
          status: proj.status || "pending",
          cost: proj.cost || "",
          timeSpend: proj.timeSpend || "",
          category: proj.category || "",
          scope: proj.scope || [],
          stack: proj.stack || [],
          industry: proj.industry || [],
          live: proj.live || "",
          github: proj.github || "",
        });
      })
      .catch(() => {
        console.error("Failed to load project");
      });
  }, [id]);

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
    if (!form.timeToFinish || form.timeToFinish.length < 2)
      errs.timeToFinish = "Time to finish must be 2-50 chars";
    if (!form.client || form.client.length < 2)
      errs.client = "Client must be 2-50 chars";
    if (!["pending", "in progress", "review", "completed"].includes(form.status))
      errs.status = "Invalid status";
    if (!form.category || form.category.length < 2)
      errs.category = "Invalid category";
    if (!form.cost || isNaN(form.cost)) errs.cost = "Cost must be a number";
    if (!form.timeSpend) errs.timeSpend = "Time spend is required";
    if ((form.scope || []).length === 0) errs.scope = "Scope is required";
    if ((form.stack || []).length === 0) errs.stack = "Stack is required";
    if ((form.industry || []).length === 0) errs.industry = "Industry is required";

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
      if (form.pic) formData.append("pic", form.pic);
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

      await put(`/api/projects/${id}`, formData); // استخدم method PUT هنا

      alert("Project updated successfully");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  if (!project) return <p className="p-4">Loading...</p>;

  return (
    <div className="w-full p-5">
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: "Title", name: "title" },
                { label: "Client", name: "client" },
                { label: "Category", name: "category" },
                { label: "Time to Finish", name: "timeToFinish" },
                { label: "Cost", name: "cost", type: "number" },
                { label: "Time Spent", name: "timeSpend" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="gap-1 flex flex-col">
                  <Label>{label}</Label>
                  <Input name={name} value={form[name]} onChange={handleChange} type={type} />
                  {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                </div>
              ))}

              {[
                { label: "Scope", name: "scope" },
                { label: "Stack", name: "stack" },
                { label: "Industry", name: "industry" },
              ].map(({ label, name }) => (
                <div key={name} className="gap-1 flex flex-col">
                  <Label>{label} (comma separated)</Label>
                  <Input
                    name={name}
                    value={(form[name] || []).join(", ")}
                    onChange={(e) => handleArrayChange(name, e.target.value)}
                  />
                  {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                </div>
              ))}

              <div className="gap-1 flex flex-col">
                <Label>Live URL</Label>
                <Input name="live" value={form.live} onChange={handleChange} />
              </div>
              <div className="gap-1 flex flex-col">
                <Label>GitHub URL</Label>
                <Input name="github" value={form.github} onChange={handleChange} />
              </div>
              <div className="gap-1 flex flex-col">
                <Label>Status</Label>
                <Select
                  options={statusOptions}
                  defaultValue={statusOptions.find((o) => o.value === form.status)}
                  onChange={(e) => setForm({ ...form, status: e.value })}
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-[66%] gap-1">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <Label>Image</Label>
                {project.pic && !form.pic && (
                  <img
                    src={project.pic}
                    alt="current"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}
                <Input
                  name="pic"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
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
