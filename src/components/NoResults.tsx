
import React from 'react';
import { FileSearch } from 'lucide-react';

export const NoResults: React.FC = () => {
  return (
    <div className="text-center py-12">
      <FileSearch className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No resources found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filter criteria to find what you're looking for.
      </p>
    </div>
  );
};
