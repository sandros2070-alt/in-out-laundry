
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Truck, Clock, ShieldCheck, DollarSign, Star, 
  MessageCircle, Shirt, CheckCircle2, Sparkles, MoveRight,
  Waves, Tag
} from 'lucide-react';
import { TESTIMONIALS, SERVICES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { t, dir } = useLanguage();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const popularItems = [
    { name: 'T-Shirt (Folded)', price: 'AED 20', category: 'tops', service: 'wash-fold' },
    { name: 'Trousers', price: 'AED 23', category: 'bottoms', service: 'wash-iron' },
    { name: '2-Piece Suit', price: 'AED 75', category: 'suits', service: 'dry-clean' },
    { name: 'Dress', price: 'AED 45', category: 'dresses', service: 'dry-clean' },
  ];

  const arrowClass = dir === 'rtl' ? "ml-0 mr-2 rotate-180" : "ml-2";

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        .bubble {
          position: absolute;
          bottom: -50px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          animation: floatUp infinite linear;
          z-index: 1;
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: floatIcon 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatIcon 5s ease-in-out infinite 1s;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white min-h-[600px] flex items-center overflow-hidden">
        {/* Animated Bubbles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-start pt-12 md:pt-0">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400/30">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-blue-100">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 rtl:md:mr-0">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/booking"
                className="group relative px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {t.hero.ctaPrimary}
                  <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${arrowClass}`} />
                </span>
              </Link>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-semibold rounded-xl transition-all hover:bg-white/10 flex items-center justify-center backdrop-blur-sm"
              >
                <MessageCircle className="mx-2 h-5 w-5" />
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Hero Visuals */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center mt-12 md:mt-0">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
               <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
               <img 
                 src="https://images.unsplash.com/photo-1545173168-9f1947eebb8f?auto=format&fit=crop&q=80&w=800" 
                 alt="Laundry Basket" 
                 className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-700"
               />
               
               <div className="absolute -top-6 -right-6 rtl:-left-6 rtl:right-auto bg-white p-4 rounded-2xl shadow-xl animate-float z-20">
                 <Shirt className="h-8 w-8 text-blue-600" />
               </div>
               <div className="absolute -bottom-6 -left-6 rtl:-right-6 rtl:left-auto bg-white p-4 rounded-2xl shadow-xl animate-float-delayed z-20">
                 <Waves className="h-8 w-8 text-blue-400" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: t.features.sameDay, desc: t.features.sameDayDesc, color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: Truck, title: t.features.pickup, desc: t.features.pickupDesc, color: 'text-green-600', bg: 'bg-green-100' },
              { icon: ShieldCheck, title: t.features.care, desc: t.features.careDesc, color: 'text-purple-600', bg: 'bg-purple-100' },
              { icon: Tag, title: t.features.price, desc: t.features.priceDesc, color: 'text-orange-600', bg: 'bg-orange-100' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group hover:-translate-y-1">
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.steps.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.steps.subtitle}</p>
          </div>

          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0 mx-20"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: t.steps.s1, desc: t.steps.s1desc },
                { step: '02', title: t.steps.s2, desc: t.steps.s2desc },
                { step: '03', title: t.steps.s3, desc: t.steps.s3desc },
                { step: '04', title: t.steps.s4, desc: t.steps.s4desc },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-20 h-20 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 mb-6 shadow-sm group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.nav.services}</h2>
             </div>
             <Link to="/services" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 group">
                {t.nav.services} <MoveRight className={`h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-6">
                   <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Shirt className="h-8 w-8" />
                   </div>
                   <div className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.priceStart}
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-8 line-clamp-2">{service.description}</p>
                <button 
                  onClick={() => navigate(`/booking?service=${service.id}`)}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {t.hero.ctaPrimary}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{t.features.price}</h2>
              <p className="text-gray-600 mt-2">{t.features.priceDesc}</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {popularItems.map((item, idx) => (
                 <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all border border-gray-100 cursor-pointer group"
                      onClick={() => navigate(`/booking?service=${item.service}&item=${item.name}`)}>
                    <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                       <Tag className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-blue-600 font-bold mb-4">{item.price}</p>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">{t.nav.book}</span>
                 </div>
              ))}
           </div>

           <div className="text-center mt-12">
              <Link to="/pricing" className="inline-flex items-center text-gray-600 font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all pb-1">
                 {t.nav.pricing} <ArrowRight className={`h-4 w-4 ${arrowClass}`} />
              </Link>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
             <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full">
                   <MessageCircle className="h-6 w-6" />
                </div>
                
                <div className="text-center">
                   <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`h-6 w-6 ${i < TESTIMONIALS[activeTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                      ))}
                   </div>
                   <p className="text-xl md:text-2xl text-gray-700 italic font-medium mb-8 leading-relaxed">
                      "{TESTIMONIALS[activeTestimonial].comment}"
                   </p>
                   <div>
                      <h4 className="text-lg font-bold text-gray-900">{TESTIMONIALS[activeTestimonial].name}</h4>
                      <p className="text-blue-600 text-sm">{TESTIMONIALS[activeTestimonial].role}</p>
                   </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                   {TESTIMONIALS.map((_, idx) => (
                      <button
                         key={idx}
                         onClick={() => setActiveTestimonial(idx)}
                         className={`w-3 h-3 rounded-full transition-all ${idx === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-blue-400'}`}
                      />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 bg-blue-600 overflow-hidden">
         {/* Background Bubbles for CTA */}
         <div className="absolute inset-0 pointer-events-none opacity-20">
             {[...Array(10)].map((_, i) => (
               <div
                 key={i}
                 className="absolute rounded-full bg-white animate-float"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   width: `${Math.random() * 40 + 10}px`,
                   height: `${Math.random() * 40 + 10}px`,
                   animationDuration: `${Math.random() * 5 + 5}s`
                 }}
               />
             ))}
         </div>
         
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.hero.headline}</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
               {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link
                 to="/booking"
                 className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center"
               >
                 {t.nav.book}
               </Link>
               <Link
                 to="/contact"
                 className="px-10 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg border border-blue-500 flex items-center justify-center"
               >
                 {t.nav.contact}
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
