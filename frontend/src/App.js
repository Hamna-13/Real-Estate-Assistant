import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, X, Send, Menu, Home, Building2, Briefcase, Users, Mail, ChevronRight } from 'lucide-react';
import '@/App.css';
import axios from 'axios';

const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/real-estate-assistant';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Welcome to our luxury real estate agency. How may I assist you in finding your dream property today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(N8N_WEBHOOK_URL, {
        message: userMessage,
        timestamp: new Date().toISOString()
      });

      const botResponse = response.data?.response || response.data?.message || 'Thank you for your inquiry. Our team will get back to you shortly.';
      
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us directly.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const properties = [
    {
      image: 'https://images.pexels.com/photos/8143677/pexels-photo-8143677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'PENTHOUSE SUITE',
      location: 'Upper East Side',
      price: '$12,500,000',
      details: '5 BD | 6 BA | 6,500 SQ FT'
    },
    {
      image: 'https://images.unsplash.com/photo-1718838096786-a14845a3287e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwbWFuc2lvbnxlbnwwfHx8YmxhY2tfYW5kX3doaXRlfDE3NzQ4MTMwOTd8MA&ixlib=rb-4.1.0&q=85',
      title: 'MODERN ESTATE',
      location: 'Beverly Hills',
      price: '$18,900,000',
      details: '7 BD | 9 BA | 12,000 SQ FT'
    },
    {
      image: 'https://images.pexels.com/photos/26886881/pexels-photo-26886881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'WATERFRONT VILLA',
      location: 'Miami Beach',
      price: '$9,750,000',
      details: '6 BD | 7 BA | 8,200 SQ FT'
    },
    {
      image: 'https://images.pexels.com/photos/26886877/pexels-photo-26886877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'LUXURY RESIDENCE',
      location: 'Manhattan',
      price: '$15,200,000',
      details: '4 BD | 5 BA | 5,800 SQ FT'
    }
  ];

  const services = [
    {
      title: 'PROPERTY ACQUISITION',
      description: 'Expert guidance through every step of acquiring your dream property, from initial search to final closing.',
      image: 'https://images.unsplash.com/photo-1602167775612-11ba283b0bd6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwbWFuc2lvbnxlbnwwfHx8YmxhY2tfYW5kX3doaXRlfDE3NzQ4MTMwOTd8MA&ixlib=rb-4.1.0&q=85',
      span: 'md:col-span-8'
    },
    {
      title: 'INVESTMENT ADVISORY',
      description: 'Strategic real estate investment consulting for portfolio diversification.',
      span: 'md:col-span-4'
    },
    {
      title: 'PROPERTY MANAGEMENT',
      description: 'Comprehensive property management services for luxury estates.',
      span: 'md:col-span-4'
    },
    {
      title: 'INTERIOR DESIGN',
      description: 'Curated interior design services to transform your property into a masterpiece of elegance and comfort.',
      image: 'https://images.unsplash.com/photo-1707292993068-277b499f1f4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxlbGVnYW50JTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzc0ODEzMDk5fDA&ixlib=rb-4.1.0&q=85',
      span: 'md:col-span-8'
    }
  ];

  const testimonials = [
    {
      name: 'CATHERINE MORRISON',
      role: 'CEO, Morrison Holdings',
      content: 'The level of professionalism and attention to detail exceeded all expectations. They found us the perfect property that matched our exact requirements.',
      image: 'https://images.pexels.com/photos/4687544/pexels-photo-4687544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'JAMES WELLINGTON',
      role: 'Investment Director',
      content: 'Outstanding service from start to finish. Their market knowledge and negotiation skills saved us significantly on our investment property.',
      image: 'https://images.pexels.com/photos/4687549/pexels-photo-4687549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
  ];

  return (
    <div className="App bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-black/60 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            <span className="text-xl font-serif tracking-wider">MAISON</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-[0.2em] text-white/70">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors" data-testid="nav-home">Home</button>
            <button onClick={() => scrollToSection('properties')} className="hover:text-white transition-colors" data-testid="nav-properties">Properties</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors" data-testid="nav-services">Services</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors" data-testid="nav-testimonials">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors" data-testid="nav-contact">Contact</button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            data-testid="mobile-menu-button"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <nav className="flex flex-col space-y-4 px-6 py-6 text-sm uppercase tracking-[0.2em]">
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-white/70 transition-colors">Home</button>
              <button onClick={() => scrollToSection('properties')} className="text-left hover:text-white/70 transition-colors">Properties</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-white/70 transition-colors">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left hover:text-white/70 transition-colors">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-white/70 transition-colors">Contact</button>
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center pt-20" data-testid="hero-section">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.pexels.com/photos/9150621/pexels-photo-9150621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Luxury Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-[5rem] font-light tracking-tighter leading-none mb-6"
          >
            DEFINING LUXURY
            <br />
            REAL ESTATE
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-light text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Curating exceptional properties for discerning clientele. Experience unparalleled service in luxury real estate acquisition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-black hover:bg-white/90 px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              data-testid="hero-chat-cta"
            >
              <MessageCircle className="w-4 h-4" />
              CHAT WITH AI ASSISTANT
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection('properties')}
              className="bg-transparent text-white border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center justify-center gap-2"
              data-testid="explore-properties-button"
            >
              EXPLORE PROPERTIES
            </button>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section id="properties" className="py-24 sm:py-32 bg-background" data-testid="properties-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-light text-muted-foreground uppercase tracking-[0.2em] mb-4">FEATURED LISTINGS</p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">Exclusive Properties</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-500 bg-card"
                data-testid={`property-card-${index}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{property.location}</p>
                  <h3 className="text-2xl font-serif font-light mb-2">{property.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{property.details}</p>
                  <p className="text-xl font-light">{property.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-32 bg-[#0a0a0a]" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-light text-muted-foreground uppercase tracking-[0.2em] mb-4">OUR EXPERTISE</p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">Comprehensive Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${service.span} bg-card p-12 border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[400px] relative overflow-hidden group`}
                data-testid={`service-card-${index}`}
              >
                {service.image && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                    <img src={service.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-tight mb-4">{service.title}</h3>
                  <p className="text-base font-light text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 sm:py-32 bg-background" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm font-light text-muted-foreground uppercase tracking-[0.2em] mb-4">CLIENT TESTIMONIALS</p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-12 border border-white/10"
                data-testid={`testimonial-card-${index}`}
              >
                <p className="text-lg font-light text-secondary-foreground leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 object-cover border border-white/20"
                  />
                  <div>
                    <p className="text-sm font-light uppercase tracking-[0.2em]">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground tracking-wide">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32 bg-[#0a0a0a]" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-light text-muted-foreground uppercase tracking-[0.2em] mb-4">GET IN TOUCH</p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight mb-6">Start Your Journey</h2>
            <p className="text-lg font-light text-muted-foreground leading-relaxed mb-12">
              Ready to find your dream property? Our team is here to assist you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-black hover:bg-white/90 px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center justify-center gap-2"
                data-testid="contact-chat-button"
              >
                <MessageCircle className="w-4 h-4" />
                CHAT WITH US
              </button>
              
              <a
                href="mailto:contact@maison.com"
                className="bg-transparent text-white border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center justify-center gap-2"
                data-testid="contact-email-button"
              >
                <Mail className="w-4 h-4" />
                EMAIL US
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              <span className="text-lg font-serif tracking-wider">MAISON</span>
            </div>
            
            <p className="text-sm text-muted-foreground tracking-wide">
              © 2026 Maison. Luxury Real Estate Agency.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-50 h-16 w-16 bg-white text-black flex items-center justify-center hover:scale-110 shadow-lg transition-transform duration-300"
          data-testid="chat-trigger"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50 w-[calc(100vw-2rem)] md:w-full max-w-[400px] h-[600px] bg-card border border-white/20 shadow-2xl flex flex-col overflow-hidden"
          data-testid="chat-modal"
        >
          {/* Chat Header */}
          <div className="p-6 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <div>
                <p className="text-sm font-light uppercase tracking-[0.15em]">AI ASSISTANT</p>
                <p className="text-xs text-muted-foreground">Property Consultant</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              data-testid="chat-close-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505] chat-scrollbar" data-testid="chat-messages">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 ${
                    message.role === 'bot'
                      ? 'bg-[#1a1a1a] text-white border border-white/5'
                      : 'bg-white text-black'
                  }`}
                  data-testid={`chat-message-${message.role}`}
                >
                  <p className="text-sm font-light leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#1a1a1a] text-white p-4 border border-white/5">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your dream property..."
              className="flex-1 bg-[#1a1a1a] text-white px-4 py-3 text-sm border border-white/10 focus:border-white/30 outline-none transition-colors placeholder:text-muted-foreground"
              disabled={isLoading}
              data-testid="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-white text-black hover:bg-white/90 px-4 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="chat-send-button"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;