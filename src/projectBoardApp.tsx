import { useState } from 'react';
import './project_board/src/index.css';
import { Sidebar } from './project_board/src/components/Sidebar';
import { ProjectDashboard } from './project_board/src/components/ProjectDashboard';
import { ProjectDetail } from './project_board/src/components/ProjectDetail';
import { AddEditProject } from './project_board/src/components/AddEditProject';

export type Project = {
  id: string;
  projectName: string;
  clientName: string;
  createdAt: string;
  dueDate: string;
  developer: string;
  status: 'active' | 'inactive' | 'graduated';
};

export type ViewMode = 'dashboard' | 'detail' | 'add' | 'edit';

type Props = {
  onRouteChange?: (path: string) => void;
};

export default function ProjectBoardApp({ onRouteChange }: Props) {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      projectName: 'CRM Migration',
      clientName: 'Acme Corp',
      createdAt: '2024-10-01',
      dueDate: '2025-02-15',
      developer: 'Emma Johnson',
      status: 'active'
    },
    {
      id: '2',
      projectName: 'Mobile Redesign',
      clientName: 'Helix Labs',
      createdAt: '2024-11-12',
      dueDate: '2025-03-30',
      developer: 'Michael Chen',
      status: 'active'
    }
  ]);

  const selectedProject = selectedProjectId ? projects.find(s => s.id === selectedProjectId) : null;

  const handleViewChange = (view: ViewMode, projectId?: string) => {
    setCurrentView(view);
    if (view === 'dashboard') {
      onRouteChange?.('/project');
    } else if (view === 'detail') {
      onRouteChange?.('/projectdetail');
    }
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  };

  const handleProjectSave = (projectData: Omit<Project, 'id'>) => {
    if (currentView === 'add') {
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
      };
      setProjects([...projects, newProject]);
    } else if (currentView === 'edit' && selectedProjectId) {
      setProjects(projects.map(s => 
        s.id === selectedProjectId ? { ...projectData, id: selectedProjectId } : s
      ));
    }
    setCurrentView('dashboard');
    setSelectedProjectId(null);
  };

  const handleProjectDelete = (projectId: string) => {
    setProjects(projects.filter(s => s.id !== projectId));
    setCurrentView('dashboard');
    setSelectedProjectId(null);
  };

  return (
    <div className="flex min-h-screen bg-background pt-24">
      <Sidebar onViewChange={handleViewChange} currentView={currentView} projects={projects} />

      <main className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && (
          <ProjectDashboard 
            projects={projects} 
            onViewChange={handleViewChange}
          />
        )}

        {currentView === 'detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject}
            onViewChange={handleViewChange}
            onDelete={handleProjectDelete}
          />
        )}

        {(currentView === 'add' || currentView === 'edit') && (
          <AddEditProject
            project={currentView === 'edit' ? selectedProject : undefined}
            onSave={handleProjectSave}
            onCancel={() => handleViewChange('dashboard')}
            isEdit={currentView === 'edit'}
          />
        )}
      </main>
    </div>
  );
}
