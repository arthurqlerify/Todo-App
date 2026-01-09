import React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available from shadcn/ui setup

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions, className, ...props }) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4 border-b", className)} {...props}>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;