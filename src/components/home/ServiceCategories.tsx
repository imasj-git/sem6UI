
import { useState, useEffect, useRef } from 'react';
import { 
  Droplet, 
  Zap, 
  Home, 
  Wrench,
  Star,
  Users,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Droplet,
    description: 'Expert leak repairs, installations, and emergency drain cleaning services.',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    providers: '250+',
    avgTime: '2 hrs',
    rating: 4.8,
    popular: true,
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: Zap,
    description: 'Licensed electricians for wiring, installations, repairs, and safety inspections.',
    color: 'bg-gradient-to-br from-amber-500 to-orange-500',
    providers: '180+',
    avgTime: '3 hrs',
    rating: 4.9,
    popular: true,
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: Home,
    description: 'Deep cleaning, regular maintenance, and specialized cleaning services.',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    providers: '400+',
    avgTime: '3 hrs',
    rating: 4.8,
    popular: true,
  },
  {
    id: 'repair',
    name: 'Home Repair',
    icon: Wrench,
    description: 'General repairs, maintenance, and home improvement solutions.',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    providers: '200+',
    avgTime: '2 hrs',
    rating: 4.5,
    popular: true,
  },
];

const ServiceCategories = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const serviceCards = containerRef.current?.querySelectorAll('.service-card');
    serviceCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-4">
            ⚡ Professional Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover top-rated professionals ready to transform your home with expert services
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <Link 
              key={service.id}
              to={`/services/${service.id}`}
              className={`service-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-full'
              }`}
              data-index={index}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: visibleItems.includes(index) ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                Popular
              </div>
              
              <div className="p-6 lg:p-8">
                <div className={`${service.color} inline-flex items-center justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="h-8 w-8 lg:h-10 lg:w-10" />
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-base">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{service.providers}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{service.avgTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{service.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-brand-600 font-semibold text-base group-hover:text-brand-700 transition-colors">
                    Find Pros
                  </span>
                  <svg className="ml-2 w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-brand-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Services
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
