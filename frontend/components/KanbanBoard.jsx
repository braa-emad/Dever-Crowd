import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreHorizontal, Edit, Trash2, User } from "lucide-react";

const KanbanBoard = ({ tasks, onTaskDelete, onEditClick }) => {
  const columns = ["To Do", "In Progress", "Done"];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const getColumnColor = (status) => {
    switch (status) {
      case "To Do":
        return "border-l-blue-500";
      case "In Progress":
        return "border-l-yellow-500";
      case "Done":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const isOverdue = (deadline) => {
    return (
      new Date(deadline) < new Date() &&
      new Date(deadline).toDateString() !== new Date().toDateString()
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((status) => {
        const columnTasks = getTasksByStatus(status);
        return (
          <Card key={status} className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {status}
                <Badge variant="secondary" className="ml-2">
                  {columnTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {columnTasks.map((task) => (
                <Card
                  key={task.id}
                  className={`shadow-sm border-l-4 ${getColumnColor(status)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditClick(task)}>
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onTaskDelete(task.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <User className="h-3 w-3" />
                        <span>{task.assignee}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span
                          className={
                            isOverdue(task.deadline) ? "text-red-600" : ""
                          }
                        >
                          {task.deadline}
                        </span>
                        {isOverdue(task.deadline) && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-1 py-0"
                          >
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No tasks in {status.toLowerCase()}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
