import { MoreVertical, Calendar, Edit, Eye, User2, Code } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Project } from '../App';

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  onViewDetail: () => void;
  onEdit: () => void;
}

export function ProjectCard({ project, viewMode, onViewDetail, onEdit }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold">
              {project.projectName.slice(0, 2).toUpperCase()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg">{project.projectName}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Client: {project.clientName}</p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div>
                <p>Created</p>
                <p>{project.createdAt}</p>
              </div>
              <div>
                <p>Due</p>
                <p>{project.dueDate}</p>
              </div>
              <div>
                <p>Developer</p>
                <p>{project.developer}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onViewDetail}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onViewDetail}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-lg font-semibold">
            {project.projectName.slice(0, 2).toUpperCase()}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewDetail(); }}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3>{project.projectName}</h3>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Client</p>
              <p>{project.clientName}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Developer</p>
              <p className="inline-flex items-center gap-1"><User2 className="w-3 h-3" />{project.developer}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Created</p>
              <p className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{project.createdAt}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Due</p>
              <p className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{project.dueDate}</p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
