import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { serviceIcons, services } from '@/types/services';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFilters from '@/components/services/ServiceFilters';
import ServicesList from '@/components/services/ServicesList';

const ServicesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Update search query when URL changes
  useEffect(() => {
    const newSearch = searchParams.get('search') || '';
    setSearchQuery(newSearch);
  }, [location.search]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay for better UX
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };
  
  // Helper function to extract price from price range string
  const extractPrice = (priceString: string) => {
    const match = priceString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
  
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || service.type === selectedType;
    
    const servicePrice = extractPrice(service.price);
    const matchesPrice = servicePrice >= priceRange[0] && servicePrice <= priceRange[1];
    
    const matchesRating = !selectedRating || service.rating >= selectedRating;
    
    return matchesSearch && matchesType && matchesPrice && matchesRating;
  });

  const clearAllFilters = () => {
    setSelectedType(null);
    setPriceRange([0, 200]);
    setSelectedRating(null);
  };

  const hasActiveFilters = selectedType || priceRange[0] > 0 || priceRange[1] < 200 || selectedRating;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-50 via-white to-purple-50">
      <Navbar />
      <main className="flex-grow">
        <ServiceHero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Results Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'All Services'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isSearching ? 'Searching...' : `${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''} found`}
                </p>
              </div>
              
              {hasActiveFilters && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
            
            {/* Active Filters Display */}
            {(selectedType || selectedRating) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedType && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Type: {selectedType}
                    <button
                      onClick={() => setSelectedType(null)}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedRating && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Rating: {selectedRating}+ stars
                    <button
                      onClick={() => setSelectedRating(null)}
                      className="ml-2 hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ServiceFilters 
              serviceIcons={serviceIcons} 
              selectedType={selectedType} 
              setSelectedType={setSelectedType}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
            
            <div className="lg:col-span-3">
              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No services match your search for "${searchQuery}". Try adjusting your search terms or filters.`
                      : 'No services available with the current filters. Try adjusting your criteria.'
                    }
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <ServicesList 
                  services={filteredServices} 
                  serviceIcons={serviceIcons}
                  setSearchQuery={setSearchQuery}
                  setSelectedType={setSelectedType}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
