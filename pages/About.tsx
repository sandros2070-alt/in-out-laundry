import React from 'react';
import { Award, CheckCircle, Clock, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb8f?q=80&w=2071&auto=format&fit=crop"
            alt="Laundry Facility Background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About In & Out Laundry</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Professional care for your garments, delivered with speed and precision.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 order-2 md:order-1">
               <div className="relative">
                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-tl-3xl -z-10"></div>
                 <img
                   src="https://images.unsplash.com/photo-1517677208171-0bc5e25bb3ca?q=80&w=2070&auto=format&fit=crop"
                   alt="Clean Towels and Laundry"
                   className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                 />
                 <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-br-3xl -z-10"></div>
               </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h4 className="text-blue-600 font-bold uppercase tracking-wide mb-2">Who We Are</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Redefining Laundry Service in Dubai</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                In & Out Laundry is more than just a cleaning service. We are a team of fabric care experts dedicated to preserving the life and beauty of your clothes. Founded on the principles of quality, convenience, and reliability, we have established ourselves as the preferred laundry partner for households and businesses across the city.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">State-of-the-art Machinery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Eco-friendly Detergents</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Expert Stain Removal</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Free Pickup & Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">5k+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">120k+</div>
              <div className="text-blue-100">Items Cleaned</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">24h</div>
              <div className="text-blue-100">Fast Turnaround</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">100%</div>
              <div className="text-blue-100">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We operate with transparency and integrity, ensuring your garments are treated with the utmost care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Quality */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Award className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
               <p className="text-gray-600">
                 We use premium detergents and advanced finishing equipment to ensure your clothes look brand new.
               </p>
             </div>
             
             {/* Speed */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Clock className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Speed & Convenience</h3>
               <p className="text-gray-600">
                 With our optimized logistics, we offer same-day collection and next-day delivery for most items.
               </p>
             </div>

             {/* Eco-Friendly */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Leaf className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
               <p className="text-gray-600">
                 We are committed to sustainability, using biodegradable products and energy-efficient machines.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Image Gallery / Facility Peek */}
      <section className="py-20">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900">Inside Our Facility</h2>
               <p className="text-gray-600 mt-4">We are transparent about where and how your clothes are cleaned.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="group overflow-hidden rounded-xl">
                 <img 
                   src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop" 
                   alt="Clothes Hanging" 
                   className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                 />
               </div>
               <div className="group overflow-hidden rounded-xl">
                 <img 
                   src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=2070&auto=format&fit=crop" 
                   alt="Washing Machines" 
                   className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                 />
               </div>
               <div className="group overflow-hidden rounded-xl">
                 <img 
                   src="https://images.unsplash.com/photo-1489274495757-95c7c83700c0?q=80&w=2070&auto=format&fit=crop" 
                   alt="Folded Laundry" 
                   className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                 />
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Ready to give your clothes the care they deserve? Book a pickup today and let us handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/booking"
              className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent border border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
