
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ServiceHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const ServiceHero = ({ searchQuery, setSearchQuery, handleSearch }: ServiceHeroProps) => {
  return (
    <div className="theme-gradient-primary py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-8 right-20 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-16 w-16 h-16 bg-yellow-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Find the Perfect 
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Service Provider
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Browse through our extensive list of verified professionals for all your home service needs
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto bg-white/15 backdrop-blur-lg rounded-2xl p-3 border border-white/20">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search services, providers, or keywords..."
                className="pl-12 h-12 w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl focus:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 px-8 whitespace-nowrap bg-white text-brand-600 hover:bg-gray-100 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Search Services
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceHero;
