"use client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Users,
  CheckSquare,
  LogOut,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog", href: "/admin/blogs", icon: FileText },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Settings },
    { name: "Admins", href: "/admin/admins", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: CheckSquare },
  ];
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center px-6 py-4 border-b">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text ml-2">
              DeverCrowd
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">email</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">plaplapla</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">{children}</div>
    </div>
  );
};

export default DashboardLayout;
