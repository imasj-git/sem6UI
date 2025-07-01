
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const providers = [
  {
    id: 1,
    name: 'John Smith',
    service: 'Plumbing',
    serviceId: 'plumbing',
    rating: 4.9,
    reviews: 127,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Cleaning',
    serviceId: 'cleaning',
    rating: 4.8,
    reviews: 94,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Anderson',
    service: 'Electrical',
    serviceId: 'electrical',
    rating: 4.7,
    reviews: 78,
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    verified: true,
  },
  {
    id: 4,
    name: 'Jessica Lee',
    service: 'Painting',
    serviceId: 'painting',
    rating: 4.9,
    reviews: 112,
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    verified: true,
  },
];

const FeaturedProviders = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top-Rated Service Providers</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Meet our highest-rated professionals with proven track records of excellence
            </p>
          </div>
          <Link to="/providers">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Providers
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                    <Link to={`/services/${provider.serviceId}`} className="text-brand-600 hover:underline">
                      {provider.service} Expert
                    </Link>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-gray-700">{provider.rating}</span>
                      <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {provider.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ThumbsUp className="h-3 w-3 mr-1" /> Verified
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <MessageSquare className="h-3 w-3 mr-1" /> Quick Replies
                  </span>
                </div>
                
                <Link to={`/providers/${provider.id}`}>
                  <Button variant="default" className="w-full">View Profile</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
