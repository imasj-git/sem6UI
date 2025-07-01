import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Mail, Star, Award, Check, ArrowLeft, MessageSquare, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// This would come from an API in a real application
const providersData = [
  {
    id: '1',
    name: 'John Smith',
    title: 'Master Plumber',
    services: ['plumbing', 'repair'],
    rating: 4.9,
    reviews: 127,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
    about: 'John has over 15 years of experience in residential and commercial plumbing. He specializes in leak detection, pipe replacement, and fixture installation. John is known for his punctuality and clean workmanship.',
    certifications: ['Licensed Master Plumber', 'Water Conservation Specialist', 'Backflow Prevention Certified'],
    servicesOffered: [
      'Leak detection and repair',
      'Pipe installation and replacement',
      'Drain cleaning',
      'Water heater services',
      'Bathroom and kitchen fixture installation',
      'Sewer line repair'
    ],
    serviceAreas: ['Downtown', 'North Side', 'West End', 'East Side'],
    availability: 'Available Mon-Fri, 8AM-6PM',
    testimonials: [
      { 
        name: 'Emma Wilson', 
        rating: 5, 
        comment: 'John was incredibly professional and fixed our leak quickly. He explained everything he was doing and provided tips to prevent future issues.',
        date: '2023-04-15'
      },
      { 
        name: 'Robert Brown', 
        rating: 5, 
        comment: 'Excellent service! Arrived on time, diagnosed the problem immediately, and had it fixed within the hour.',
        date: '2023-03-22'
      },
      { 
        name: 'Sarah Miller', 
        rating: 4, 
        comment: 'Good work replacing our kitchen faucet. Left the area clean and gave us a fair price.',
        date: '2023-02-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Professional Cleaner',
    services: ['cleaning', 'repair'],
    rating: 4.8,
    reviews: 94,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
    about: 'Sarah leads a team of cleaning professionals with attention to detail and eco-friendly practices. She has worked with both residential and commercial clients for over 8 years.',
    certifications: ['Certified Cleaning Professional', 'Green Cleaning Specialist', 'OSHA Workplace Safety Certified'],
    servicesOffered: [
      'Regular maintenance cleaning',
      'Deep cleaning',
      'Move-in/move-out cleaning',
      'Spring cleaning',
      'Carpet cleaning',
      'Window cleaning'
    ],
    serviceAreas: ['Downtown', 'Suburbs', 'West End', 'Central'],
    availability: 'Available 7 days a week, 8AM-8PM',
    testimonials: [
      { 
        name: 'David Williams', 
        rating: 5, 
        comment: 'Sarah and her team do an amazing job every time. My house has never looked better!',
        date: '2023-05-01'
      },
      { 
        name: 'Jennifer Adams', 
        rating: 5, 
        comment: 'Very thorough cleaning service. They pay attention to all the details and use eco-friendly products as requested.',
        date: '2023-04-12'
      },
      { 
        name: 'Michael Johnson', 
        rating: 4, 
        comment: 'Good service, reliable and professional. Would recommend for regular home cleaning.',
        date: '2023-03-15'
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Anderson',
    title: 'Master Electrician',
    services: ['electrical', 'repair', 'plumbing'],
    rating: 4.7,
    reviews: 78,
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    verified: true,
    about: 'Mike is a licensed master electrician with experience in residential, commercial, and industrial electrical systems. He specializes in troubleshooting complex electrical problems and home automation.',
    certifications: ['Licensed Master Electrician', 'Commercial Electrical Inspector', 'Smart Home Technology Specialist'],
    servicesOffered: [
      'Panel upgrades',
      'Wiring installation and repair',
      'Lighting installation',
      'Outlet and switch replacement',
      'Home automation installation',
      'Electrical safety inspections'
    ],
    serviceAreas: ['North Side', 'East Side', 'Central', 'Industrial District'],
    availability: 'Available Mon-Sat, 7AM-7PM',
    testimonials: [
      { 
        name: 'Linda Thomas', 
        rating: 5, 
        comment: 'Mike rewired our entire home and installed new lighting fixtures. His work was excellent and priced fairly.',
        date: '2023-04-22'
      },
      { 
        name: 'James Wilson', 
        rating: 4, 
        comment: 'Professional service upgrading our circuit panel. Mike explained everything and completed the work on schedule.',
        date: '2023-03-10'
      },
      { 
        name: 'Patricia Garcia', 
        rating: 5, 
        comment: 'Mike installed smart home lighting throughout our house. The system works perfectly and he provided great instructions on how to use it.',
        date: '2023-02-15'
      }
    ]
  }
];

const ProviderDetailsPage = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');
  
  // Find provider by ID or default to first provider
  const provider = providerId ? providersData.find(p => p.id === providerId) || providersData[0] : providersData[0];

  const handleBookNow = () => {
    navigate(`/booking/${provider.id}`);
  };

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: "You can reach out via phone or email. We'll connect you with the provider shortly.",
    });
  };

  const handleCheckAvailability = () => {
    toast({
      title: "Checking Availability",
      description: `${provider.name} is available ${provider.availability}. You can proceed with booking.`,
    });
  };

  const handleRequestQuote = () => {
    toast({
      title: "Quote Request Sent",
      description: `Your quote request has been sent to ${provider.name}. They will contact you within 24 hours.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {/* Provider Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/services" className="inline-flex items-center text-gray-600 mb-6 hover:text-brand-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Services
            </Link>
            
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <img 
                src={provider.image} 
                alt={provider.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mr-6 mb-4 md:mb-0"
              />
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {provider.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ThumbsUp className="h-3 w-3 mr-1" /> Verified
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <MessageSquare className="h-3 w-3 mr-1" /> Quick Replies
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{provider.name}</h1>
                <p className="text-lg text-gray-600 mb-2">{provider.title}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(provider.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{provider.rating}</span>
                  <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button onClick={handleBookNow}>Book Now</Button>
                <Button variant="outline" onClick={handleContact}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['about', 'services', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'about' | 'services' | 'reviews')}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'about' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About {provider.name}</h2>
                  <p className="text-gray-700 mb-6">{provider.about}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.certifications.map((cert, index) => (
                      <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Award className="h-3.5 w-3.5 mr-1 text-brand-600" />
                        {cert}
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Service Areas</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.serviceAreas.map((area, index) => (
                      <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-brand-600" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'services' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h2>
                  <ul className="space-y-3 mb-6">
                    {provider.servicesOffered.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(provider.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{provider.rating}</span>
                      <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {provider.testimonials.map((testimonial, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <span className="text-sm text-gray-500">{testimonial.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{testimonial.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book this Provider</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-brand-600 mr-2" />
                    <span className="text-gray-700">{provider.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-600 mr-2" />
                    <span className="text-gray-700">Responds within 1 hour</span>
                  </div>
                </div>
                <Button className="w-full mb-2" onClick={handleCheckAvailability}>Check Availability</Button>
                <Button variant="outline" className="w-full" onClick={handleRequestQuote}>Request Quote</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {provider.name}</h3>
                <div className="space-y-4">
                  <a href="tel:1234567890" className="flex items-center text-brand-600 hover:text-brand-800">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>(123) 456-7890</span>
                  </a>
                  <button 
                    onClick={handleContact}
                    className="flex items-center text-brand-600 hover:text-brand-800"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderDetailsPage;
