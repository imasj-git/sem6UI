
import { useState } from 'react';
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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  // Helper function to extract price from price range string
  const extractPrice = (priceString: string) => {
    const match = priceString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
  
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || service.type === selectedType;
    
    const servicePrice = extractPrice(service.price);
    const matchesPrice = servicePrice >= priceRange[0] && servicePrice <= priceRange[1];
    
    const matchesRating = !selectedRating || service.rating >= selectedRating;
    
    return matchesSearch && matchesType && matchesPrice && matchesRating;
  });

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
            
            <ServicesList 
              services={filteredServices} 
              serviceIcons={serviceIcons}
              setSearchQuery={setSearchQuery}
              setSelectedType={setSelectedType}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
