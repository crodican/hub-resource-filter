
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Phone, MapPin } from 'lucide-react';

interface ResourceCardProps {
  resource: any;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="flex">
        {/* Left sidebar with action buttons */}
        <div className="flex flex-col bg-primary w-[70px]">
          {resource.Website && (
            <a
              href={resource.Website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-[70px] text-white hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Globe size={24} />
            </a>
          )}
          
          {resource['Phone URL'] && (
            <a
              href={`tel:${resource['Phone URL']}`}
              className="flex items-center justify-center h-[70px] text-white hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Phone size={24} />
            </a>
          )}
          
          {resource['FULL ADDRESS'] && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource['FULL ADDRESS'])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-[70px] text-white hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <MapPin size={24} />
            </a>
          )}
        </div>
        
        {/* Main card content */}
        <CardContent className="flex-1 p-6">
          <div className="flex justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-normal text-secondary mb-1">
                {resource['Location Name'] || 'No Name'}
              </h3>
              <h5 className="text-md font-light text-muted-foreground">
                {resource.Organization || 'No Organization'}
              </h5>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {resource['Resource Type'] && (
                  <Badge variant="outline" className="bg-accent text-accent-foreground">
                    {resource['Resource Type']}
                  </Badge>
                )}
                {resource.Category && (
                  <Badge variant="outline" className="bg-accent text-accent-foreground">
                    {resource.Category}
                  </Badge>
                )}
              </div>
            </div>
            
            {resource.Image && (
              <div className="ml-4">
                <img 
                  src={resource.Image} 
                  alt="Organization Logo" 
                  className="max-w-[200px] max-h-[120px] object-contain"
                />
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <p><strong>Phone:</strong> {resource.PHONE || 'N/A'}</p>
            <p>
              <strong>Address:</strong><br />
              {resource.City || 'N/A'}, {resource.State || 'N/A'} {resource['ZIP CODE'] || 'N/A'}
            </p>
          </div>
          
          {resource['Populations Served'] && (
            <div className="mt-3">
              <strong>Populations Served:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {resource['Populations Served'].split(',').map((pop: string) => (
                  <Badge key={pop.trim()} variant="outline" className="bg-accent text-accent-foreground">
                    {pop.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {resource.COUNTY && (
            <div className="mt-3">
              <strong>Counties Served:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="bg-accent text-accent-foreground">
                  {resource.COUNTY}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
