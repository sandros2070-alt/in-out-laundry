import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our services or need assistance with an order? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-600">+971 50 123 4567</p>
                <p className="text-gray-500 text-sm mt-1">Mon-Sun 8am-8pm</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-600">hello@inandout.ae</p>
                <p className="text-gray-500 text-sm mt-1">24/7 Support</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-600">Dubai Marina</p>
                <p className="text-gray-500 text-sm mt-1">Dubai, UAE</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Working Hours</h3>
                </div>
                <p className="text-gray-600">Daily: 08:00 - 22:00</p>
                <p className="text-gray-500 text-sm mt-1">Friday: 14:00 - 22:00</p>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="bg-slate-200 rounded-xl h-64 w-full flex items-center justify-center relative overflow-hidden">
               <img src="https://picsum.photos/800/400?blur" className="absolute inset-0 w-full h-full object-cover opacity-50" />
               <div className="relative z-10 bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
                 <MapPin className="text-red-500" />
                 <span className="font-bold text-gray-800">We are here</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                <p className="font-bold">Message Sent!</p>
                <p>We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" id="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
