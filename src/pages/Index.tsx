
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { FilterPanel } from '@/components/FilterPanel';
import { ResourceCard } from '@/components/ResourceCard';
import { Spinner } from '@/components/Spinner';
import { SearchBar } from '@/components/SearchBar';
import { NoResults } from '@/components/NoResults';

const Index = () => {
  // State for resources and loading status
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResources, setTotalResources] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [selectedPopulations, setSelectedPopulations] = useState([]);
  const [selectedResourceTypes, setSelectedResourceTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(25);

  // Available filter options
  const counties = ["Philadelphia", "Berks", "Bucks", "Chester", "Delaware", "Lancaster", "Montgomery", "Schuylkill"];
  const populations = ["Men", "Women", "Children", "Adolescents"];
  const resourceTypes = ["Recovery Support", "Family Support", "Housing", "Transportation"];
  const categories = [
    "Single County Authority", "Center of Excellence", "Regional Recovery Hub", "Recovery Community Organization", 
    "Warm Handoff", "Treatment with RSS", "Family Counseling", "Family Peer Support", "Family Assistance Program", 
    "Family Education Program", "Family Resources", "Recovery House", "Halfway House", "Housing Assistance", 
    "Affordable Public Transportation", "Carpool Service", "Medical Assistance Transportation", 
    "Recovery Transportation Services", "Vehicle Purchase Assistance", "Government", "Other"
  ];

  // Function to fetch resources based on current filters
  const fetchResources = async () => {
    setLoading(true);
    try {
      // Construct URL with query parameters
      const url = new URL('https://hubresourcedatabase.crodican.workers.dev/');
      
      // Add pagination parameters
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', resultsPerPage.toString());
      
      // Add filter parameters
      selectedCounties.forEach(county => {
        url.searchParams.append('County', county);
      });
      
      selectedPopulations.forEach(population => {
        url.searchParams.append('Populations', population);
      });
      
      selectedResourceTypes.forEach(type => {
        url.searchParams.append('Resource Type', type);
      });
      
      selectedCategories.forEach(category => {
        url.searchParams.append('Category', category);
      });
      
      // Add search term if present
      if (searchTerm) {
        url.searchParams.append('search', searchTerm);
      }

      // Make the API request
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setResources(data.list || []);
      setTotalResources(data.pageInfo?.totalRows || 0);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch resources when filters or pagination changes
  useEffect(() => {
    fetchResources();
  }, [
    currentPage, 
    selectedCounties, 
    selectedPopulations, 
    selectedResourceTypes, 
    selectedCategories,
    searchTerm
  ]);

  // Handle filter changes
  const handleCountyChange = (county, isChecked) => {
    setSelectedCounties(prev => 
      isChecked 
        ? [...prev, county] 
        : prev.filter(c => c !== county)
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePopulationChange = (population, isChecked) => {
    setSelectedPopulations(prev => 
      isChecked 
        ? [...prev, population] 
        : prev.filter(p => p !== population)
    );
    setCurrentPage(1);
  };

  const handleResourceTypeChange = (type, isChecked) => {
    setSelectedResourceTypes(prev => 
      isChecked 
        ? [...prev, type] 
        : prev.filter(t => t !== type)
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories(prev => 
      isChecked 
        ? [...prev, category] 
        : prev.filter(c => c !== category)
    );
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Panel */}
        <div className="lg:w-1/4">
          <FilterPanel 
            title="Filter Resources"
            counties={counties}
            populations={populations}
            resourceTypes={resourceTypes}
            categories={categories}
            selectedCounties={selectedCounties}
            selectedPopulations={selectedPopulations}
            selectedResourceTypes={selectedResourceTypes}
            selectedCategories={selectedCategories}
            onCountyChange={handleCountyChange}
            onPopulationChange={handlePopulationChange}
            onResourceTypeChange={handleResourceTypeChange}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <SearchBar 
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for resources by name, organization or category..."
            />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {resources.length} of {totalResources} resources
          </div>

          {loading && <Spinner />}

          {!loading && resources.length === 0 && (
            <NoResults />
          )}

          <div className="grid grid-cols-1 gap-6">
            {resources.map((resource) => (
              <ResourceCard 
                key={resource.id}
                resource={resource}
              />
            ))}
          </div>

          {resources.length < totalResources && (
            <div className="mt-6 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
