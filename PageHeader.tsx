import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-secondary-600">{description}</p>
            )}
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;