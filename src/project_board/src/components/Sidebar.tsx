import type { ElementType } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Users, Settings, ChevronsLeft, ChevronsRight, Plus, Bell, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Project, ViewMode } from '../App';

type MenuItem = {
  id: ViewMode | 'reports' | 'transcripts' | 'settings';
  label: string;
  icon: ElementType;
};

const primaryMenuItems: MenuItem[] = [
  { id: 'dashboard' as ViewMode, label: 'Projects', icon: Users },
];

type SidebarProps = {
  onViewChange: (view: ViewMode, projectId?: string) => void;
  currentView: ViewMode;
  projects: Project[];
};

const mockUser = {
  name: 'Jieun Kim',
  company: 'Work Hub',
  avatar: '/logo.png',
};

export function Sidebar({ onViewChange, currentView, projects }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showProjectList, setShowProjectList] = useState(false);
  useEffect(() => {
    if (!isCollapsed) {
      setShowProjectList(false);
    }
  }, [isCollapsed]);

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-60';
  const mainColor = '#2563eb';

  const activeIds = useMemo(() => new Set<ViewMode | string>([currentView]), [currentView]);

  const handleViewChange = (itemId: MenuItem['id']) => {
    if (itemId === 'dashboard' || itemId === 'add') {
      onViewChange(itemId);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
  };

  return (
    <div className={`${sidebarWidth} bg-card border-r border-border flex flex-col transition-all duration-300 relative font-pretendard tracking-normal pt-16`}>
      <div className={`flex items-center justify-between ${isCollapsed ? 'px-2 py-6' : 'p-6'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} overflow-hidden transition-all duration-300 w-full`}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={mockUser.avatar} alt="avatar" className="w-6 h-6" />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <p className="text-sm font-semibold text-foreground font-pretendard tracking-normal">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground font-pretendard tracking-normal">{mockUser.company}</p>
            </div>
          )}
        </div>
      </div>
      <div className={`${isCollapsed ? 'px-2 py-3' : 'px-4 py-4'} space-y-3`}>
        <Button
          className={`w-full justify-center ${isCollapsed ? 'h-10' : 'justify-start'}`}
          variant="default"
          onClick={() => handleViewChange('add')}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2 text-sm font-medium">Add Project</span>}
        </Button>
        <Button
          className={`w-full justify-center ${isCollapsed ? 'h-10' : 'justify-start'}`}
          variant="outline"
          onClick={() => console.log('Notifications clicked')}
        >
          <Bell className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2 text-sm font-medium">Notifications</span>}
        </Button>
      </div>

      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 -right-3 w-8 h-8 rounded-full bg-white border border-border shadow-sm flex items-center justify-center z-40"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? <ChevronsRight className="w-4 h-4 text-muted-foreground" /> : <ChevronsLeft className="w-4 h-4 text-muted-foreground" />}
      </button>

      <div className="flex-1 py-5 relative">
        <nav className="space-y-2">

          <div
            className="relative"
            onMouseEnter={() => setHoveredId('projects')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              className={`group w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-3' : 'justify-start pl-8 pr-3'} py-3 rounded-md transition-all duration-300 text-sm font-medium font-pretendard tracking-normal leading-relaxed`}
              onClick={() => {
                if (isCollapsed) {
                  setShowProjectList((prev) => !prev);
                } else {
                  setShowProjectList(false);
                  handleViewChange('dashboard');
                }
              }}
            >
              <Users
                className={`w-5 h-5 transition-colors duration-150 ${isCollapsed ? 'text-gray-500' : activeIds.has('dashboard') ? 'text-blue-600' : 'text-muted-foreground'} group-hover:text-blue-600`}
              />
              {!isCollapsed && (
                <span className={`text-sm font-medium transition-colors duration-150 ${activeIds.has('dashboard') ? 'text-blue-600' : 'text-muted-foreground'} group-hover:text-blue-600 font-pretendard tracking-normal leading-relaxed`}>
                  Projects
                </span>
              )}
            </button>
          </div>
        </nav>

        {isCollapsed && showProjectList && (
          <div className="absolute left-full top-0 ml-4 w-64 max-h-[80vh] bg-white border border-border shadow-xl p-4 z-40 rounded-lg transition-all space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Projects</h3>
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setShowProjectList(false)}
              >
                X
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => {
                    setShowProjectList(false);
                    onViewChange('detail', project.id);
                  }}
                >
                  {project.projectName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`${isCollapsed ? 'px-2 py-3' : 'px-4 py-4'} space-y-2`}>
        <Button
          variant="ghost"
          className={`w-full justify-center ${isCollapsed ? 'h-10' : 'justify-start text-sm font-medium'} `}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-center ${isCollapsed ? 'h-10' : 'justify-start text-sm font-medium'} `}
          onClick={() => console.log('Settings')}
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Button>
      </div>
    </div>
  );
}
