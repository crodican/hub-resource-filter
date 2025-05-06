
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FilterPanelProps {
  title: string;
  counties: string[];
  populations: string[];
  resourceTypes: string[];
  categories: string[];
  selectedCounties: string[];
  selectedPopulations: string[];
  selectedResourceTypes: string[];
  selectedCategories: string[];
  onCountyChange: (county: string, isChecked: boolean) => void;
  onPopulationChange: (population: string, isChecked: boolean) => void;
  onResourceTypeChange: (type: string, isChecked: boolean) => void;
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  title,
  counties,
  populations,
  resourceTypes,
  categories,
  selectedCounties,
  selectedPopulations,
  selectedResourceTypes,
  selectedCategories,
  onCountyChange,
  onPopulationChange,
  onResourceTypeChange,
  onCategoryChange,
}) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <Accordion type="multiple" defaultValue={["counties", "populations", "resourceTypes"]}>
        <AccordionItem value="counties">
          <AccordionTrigger className="text-md font-medium py-2">Counties</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {counties.map((county) => (
                <div key={county} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`county-${county}`} 
                    checked={selectedCounties.includes(county)}
                    onCheckedChange={(checked) => onCountyChange(county, !!checked)} 
                  />
                  <Label 
                    htmlFor={`county-${county}`}
                    className="text-sm cursor-pointer"
                  >
                    {county}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="populations">
          <AccordionTrigger className="text-md font-medium py-2">Populations Served</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {populations.map((population) => (
                <div key={population} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`population-${population}`} 
                    checked={selectedPopulations.includes(population)}
                    onCheckedChange={(checked) => onPopulationChange(population, !!checked)} 
                  />
                  <Label 
                    htmlFor={`population-${population}`}
                    className="text-sm cursor-pointer"
                  >
                    {population}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="resourceTypes">
          <AccordionTrigger className="text-md font-medium py-2">Resource Types</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {resourceTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`resource-type-${type}`} 
                    checked={selectedResourceTypes.includes(type)}
                    onCheckedChange={(checked) => onResourceTypeChange(type, !!checked)} 
                  />
                  <Label 
                    htmlFor={`resource-type-${type}`}
                    className="text-sm cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger className="text-md font-medium py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => onCategoryChange(category, !!checked)} 
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
