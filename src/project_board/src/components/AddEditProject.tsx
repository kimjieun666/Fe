import { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Project } from '../App';

interface AddEditProjectProps {
  project?: Project;
  onSave: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export function AddEditProject({ project, onSave, onCancel, isEdit }: AddEditProjectProps) {
  const [formData, setFormData] = useState({
    projectName: project?.projectName || '',
    clientName: project?.clientName || '',
    developer: project?.developer || '',
    createdAt: project?.createdAt || new Date().toISOString().split('T')[0],
    dueDate: project?.dueDate || new Date().toISOString().split('T')[0],
    status: project?.status || 'active' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.developer.trim()) newErrors.developer = 'Developer is required';
    if (!formData.createdAt) newErrors.createdAt = 'Created date is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(formData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl">{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
          <p className="text-muted-foreground">Manage project summary fields</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Project Details</CardTitle>
            <p className="text-sm text-muted-foreground">Basic information about the project</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Enter project name"
              />
              {errors.projectName && <p className="text-sm text-red-500">{errors.projectName}</p>}
            </div>
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Client"
              />
              {errors.clientName && <p className="text-sm text-red-500">{errors.clientName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Developer</Label>
              <Input
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                placeholder="Developer name"
              />
              {errors.developer && <p className="text-sm text-red-500">{errors.developer}</p>}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as typeof formData.status })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Created At</Label>
              <Input
                type="date"
                value={formData.createdAt}
                onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
              />
              {errors.createdAt && <p className="text-sm text-red-500">{errors.createdAt}</p>}
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
              {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Save className="w-4 h-4 mr-2" />
          Save Project
        </Button>
      </div>
    </div>
  );
}
