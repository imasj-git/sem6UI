
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, User, CalendarCheck, CreditCard } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

const BookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [step, setStep] = useState(1);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Final submission
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment has been scheduled for ${date ? format(date, 'MMMM d, yyyy') : ''} at ${timeSlot}. Check your email for details.`,
    });
    
    // In a real app, you would submit to an API here
    console.log("Booking submitted:", { 
      service: serviceId,
      date,
      timeSlot,
      ...formData
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Service</h1>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center flex-grow">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    step >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div className={`h-1 flex-grow mx-2 ${
                    step >= 2 ? 'bg-brand-600' : 'bg-gray-200'
                  }`}></div>
                </div>
                
                <div className="flex items-center flex-grow">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    step >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div className={`h-1 flex-grow mx-2 ${
                    step >= 3 ? 'bg-brand-600' : 'bg-gray-200'
                  }`}></div>
                </div>
                
                <div className="flex items-center">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    step >= 3 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <div className="border border-gray-300 rounded-md p-2">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md"
                            disabled={(date) => {
                              // Disable past dates and Sundays
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              return date < now || date.getDay() === 0;
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Time Slots
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`py-2 px-4 text-center rounded-md text-sm ${
                                timeSlot === time
                                  ? 'bg-brand-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              onClick={() => setTimeSlot(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => setStep(2)}
                        disabled={!date || !timeSlot}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Service Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setStep(3)}
                        disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Service Details</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <CalendarCheck className="h-5 w-5 text-brand-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Date & Time</p>
                            <p className="text-gray-600">
                              {date ? format(date, 'MMMM d, yyyy') : 'Not selected'} at {timeSlot || 'Not selected'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-brand-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Customer</p>
                            <p className="text-gray-600">{formData.name}</p>
                            <p className="text-gray-600">{formData.email}</p>
                            <p className="text-gray-600">{formData.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-brand-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Service Location</p>
                            <p className="text-gray-600">{formData.address}</p>
                            <p className="text-gray-600">{formData.city}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Details</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Payment will be collected after the service is completed to your satisfaction.
                        </p>
                        
                        <div className="flex justify-between items-center font-medium">
                          <span>Service Fee</span>
                          <span>To be determined</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit">
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
