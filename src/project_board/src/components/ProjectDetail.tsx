import { Button } from './ui/button';
import { Project, ViewMode } from '../App';

interface ProjectDetailProps {
  project: Project;
  onViewChange: (view: ViewMode, projectId?: string) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectDetail({ project, onViewChange }: ProjectDetailProps) {
  return (
    <div className="flex-1 p-6 flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => onViewChange('dashboard')}
      >
        Back to Projects
      </Button>
      <div className="text-muted-foreground">
        Project detail view has been removed.
      </div>
    </div>
  );
}
