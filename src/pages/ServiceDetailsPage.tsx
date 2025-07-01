
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Mail, ArrowLeft, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

// This would come from an API call in a real application
const serviceDetails = {
  plumbing: {
    id: 'plumbing',
    name: 'Plumbing Services',
    description: 'Professional plumbing services for residential and commercial properties. Our experienced plumbers can handle everything from minor repairs to major installations.',
    longDescription: 'Our team of certified plumbers provides quality service for all your plumbing needs. We specialize in leak detection and repair, pipe installation and replacement, drain cleaning, water heater services, bathroom and kitchen fixture installation, sewer line repair and replacement, and emergency plumbing services.',
    pricing: 'Starting from $50/hour',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [1, 2, 3],
    faqs: [
      {
        question: 'How quickly can you respond to emergencies?',
        answer: 'We offer 24/7 emergency services and aim to reach your location within 1-2 hours for urgent cases.'
      },
      {
        question: 'Do you offer warranties on your work?',
        answer: 'Yes, all our plumbing work comes with a standard 90-day workmanship warranty, and many parts carry manufacturer warranties.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, cash, checks, and various digital payment options like PayPal and Venmo.'
      }
    ]
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical Services',
    description: 'Comprehensive electrical services for homes and businesses. From installations to repairs, our licensed electricians ensure safety and quality.',
    longDescription: 'Our electrical services include panel upgrades, wiring installation and repair, lighting installation, outlet and switch replacement, ceiling fan installation, home safety inspections, surge protection, and emergency electrical services. All our electricians are licensed, insured, and thoroughly trained.',
    pricing: 'Starting from $60/hour',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [3, 4],
    faqs: [
      {
        question: 'Are your electricians licensed?',
        answer: 'Yes, all our electricians are fully licensed, insured, and have undergone thorough background checks.'
      },
      {
        question: 'How do I know if my electrical panel needs an upgrade?',
        answer: 'Signs include frequently tripping breakers, flickering lights, burning smells from outlets, or if your home is over 25 years old with the original panel.'
      },
      {
        question: 'Can you install smart home electrical systems?',
        answer: 'Absolutely! We specialize in smart home installations including lighting, thermostats, security systems, and whole-home automation.'
      }
    ]
  },
  cleaning: {
    id: 'cleaning',
    name: 'Home Cleaning Services',
    description: 'Thorough cleaning services for homes of all sizes. Regular maintenance, deep cleaning, and specialized services available.',
    longDescription: 'Our professional cleaning team provides comprehensive cleaning services for residential properties. Services include regular maintenance cleaning, deep cleaning, move-in/move-out cleaning, spring cleaning, and specialized services such as carpet cleaning, window cleaning, and upholstery cleaning.',
    pricing: 'Starting from $25/hour',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [2, 5],
    faqs: [
      {
        question: 'Do I need to provide cleaning supplies?',
        answer: 'No, our cleaning professionals bring all necessary equipment and eco-friendly cleaning supplies.'
      },
      {
        question: 'How long does a typical cleaning service take?',
        answer: 'A standard cleaning for a 2-bedroom home typically takes 2-3 hours, but times vary based on home size and service type.'
      },
      {
        question: 'Is it safe to leave my home during cleaning?',
        answer: "Yes, all our cleaners are background-checked and insured. Many clients prefer to be out during cleaning, but you're welcome to stay if you prefer."
      }
    ]
  },
  landscaping: {
    id: 'landscaping',
    name: 'Landscaping Services',
    description: 'Professional landscaping services to transform your outdoor spaces. Lawn care, garden design, and maintenance services.',
    longDescription: 'Our landscaping services cover everything your outdoor space needs, including lawn mowing and maintenance, garden design and installation, tree and shrub pruning, fertilization and weed control, irrigation system installation and repair, hardscape design and installation, and seasonal clean-up services.',
    pricing: 'Starting from $40/hour',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [5],
    faqs: [
      {
        question: 'How often should I schedule lawn maintenance?',
        answer: 'For most lawns, weekly maintenance during growing season and bi-weekly during slower growth periods is recommended.'
      },
      {
        question: 'Do you offer eco-friendly landscaping options?',
        answer: 'Yes, we offer sustainable landscaping practices including native plant installation, water-efficient irrigation, and organic fertilization methods.'
      },
      {
        question: 'Can you help with outdoor lighting design?',
        answer: 'Absolutely! We provide comprehensive outdoor lighting design and installation to enhance the beauty and security of your property.'
      }
    ]
  },
  painting: {
    id: 'painting',
    name: 'Painting Services',
    description: 'Interior and exterior painting services for residential properties. Quality workmanship and attention to detail.',
    longDescription: 'Our painting services include interior and exterior painting, cabinet refinishing, deck and fence staining, wallpaper removal and installation, color consultation, drywall repair, trim and molding installation, and commercial painting services. We use premium paints and materials for lasting results.',
    pricing: 'Starting from $35/hour',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [1, 4],
    faqs: [
      {
        question: 'How long will it take to paint my home?',
        answer: 'An average 3-bedroom interior typically takes 3-5 days, while exterior painting may take 5-7 days depending on home size and condition.'
      },
      {
        question: 'Do I need to move my furniture before you arrive?',
        answer: 'We recommend removing small items and artwork, but our team can help move larger furniture and will cover all items to protect them.'
      },
      {
        question: 'What type of paint do you use?',
        answer: 'We use premium low-VOC or zero-VOC paints from leading manufacturers like Benjamin Moore and Sherwin-Williams.'
      }
    ]
  },
  repair: {
    id: 'repair',
    name: 'Home Repair Services',
    description: 'General home repairs and maintenance services. Furniture assembly, fixture installation, and minor renovations.',
    longDescription: 'Our handyman and repair services cover a wide range of home maintenance needs, including furniture assembly, TV mounting, shelf and fixture installation, door repair and installation, window repair, drywall repair, tile repair, caulking and weatherproofing, and small renovation projects.',
    pricing: 'Starting from $45/hour',
    image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providers: [3, 5],
    faqs: [
      {
        question: 'Can you handle multiple small projects in one visit?',
        answer: 'Absolutely! Our handymen are skilled in multiple areas and can efficiently handle a variety of small projects during a single appointment.'
      },
      {
        question: 'Do I need to provide tools or materials?',
        answer: 'Our team brings professional-grade tools for all jobs. For materials, we can either use what you provide or purchase them for you with a receipt (plus a small procurement fee).'
      },
      {
        question: 'How do you ensure quality work?',
        answer: 'All our handymen are experienced professionals who undergo background checks and skills testing. We also back our work with a satisfaction guarantee.'
      }
    ]
  }
};

const ServiceDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'providers' | 'faqs'>('overview');
  
  // Check if serviceId exists and is a valid key in serviceDetails
  const service = serviceId && Object.prototype.hasOwnProperty.call(serviceDetails, serviceId)
    ? serviceDetails[serviceId as keyof typeof serviceDetails]
    : serviceDetails.plumbing;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative bg-cover bg-center h-64 md:h-80"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${service.image})` 
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <Link to="/services" className="inline-flex items-center text-white mb-4 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Services
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.name}</h1>
            <p className="text-lg text-white max-w-2xl">{service.description}</p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'providers', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'overview' | 'providers' | 'faqs')}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm
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
          
          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Overview</h2>
                  <p className="text-gray-700 mb-6">{service.longDescription}</p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Included</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Professional assessment and consultation</li>
                    <li>Quality workmanship and attention to detail</li>
                    <li>Licensed and insured professionals</li>
                    <li>Cleanup after service completion</li>
                    <li>Follow-up quality assurance</li>
                  </ul>
                  
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Pricing</h3>
                    <p className="text-gray-700">{service.pricing}</p>
                    <p className="text-sm text-gray-500 mt-2">* Actual pricing may vary based on job complexity and materials required.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Service</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-brand-600 mr-2" />
                      <span className="text-gray-700">Available 7 days a week</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-brand-600 mr-2" />
                      <span className="text-gray-700">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-brand-600 mr-2" />
                      <span className="text-gray-700">Service available in your area</span>
                    </div>
                  </div>
                  <Link to={`/booking/${service.id}`}>
                    <Button className="w-full mb-4">Book Now</Button>
                  </Link>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Need assistance?</p>
                    <div className="flex justify-center space-x-4">
                      <a href="tel:1234567890" className="flex items-center text-brand-600 hover:text-brand-800">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>Call us</span>
                      </a>
                      <a href="mailto:help@localheroes.com" className="flex items-center text-brand-600 hover:text-brand-800">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'providers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Service Providers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((provider) => (
                    <div key={provider} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <img 
                            src={`https://randomuser.me/api/portraits/${provider % 2 === 0 ? 'women' : 'men'}/${20 + provider}.jpg`}
                            alt={`Provider ${provider}`}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Professional Provider {provider}</h3>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < 4.5 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">4.8 (120 reviews)</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">Specialized in {service.name.toLowerCase()} with over 5 years of experience. Certified and insured professional.</p>
                        <Link to={`/providers/${provider}`}>
                          <Button variant="outline" className="w-full">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'faqs' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
