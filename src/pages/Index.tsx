// import React, { useState, useEffect } from 'react';
// import { Shield, Phone, Mail, MapPin, Clock, Users, Eye, CheckCircle, Star, Lock, Camera, AlertTriangle, Car, Dog, Search, Flame, UserCheck, Target, Heart } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { supabase } from '@/integrations/supabase/client';
// import { Session } from '@supabase/supabase-js';
// import ContactForm from '@/components/ContactForm';
// import QuoteRequestForm from '@/components/QuoteRequestForm';
// import AuthForm from '@/components/AuthForm';
// import AdminDashboard from '@/components/AdminDashboard';

// const Index = () => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [showContactForm, setShowContactForm] = useState(false);
//   const [showQuoteForm, setShowQuoteForm] = useState(false);
//   const [showAuth, setShowAuth] = useState(false);

//   useEffect(() => {
//     // Set up auth state listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session);
//         if (session?.user) {
//           // Fetch user role
//           const { data: profile } = await supabase
//             .from('profiles')
//             .select('role')
//             .eq('id', session.user.id)
//             .single();
//           setUserRole(profile?.role || 'user');
//         } else {
//           setUserRole(null);
//         }
//       }
//     );

//     // Check for existing session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);


//   /// NEW ADDED
//   useEffect(() => {
//   if (session && userRole === 'admin') {
//     window.location.href = '/admin-dashboard'; // Change this to match your route
//   }
// }, [session, userRole]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setShowAuth(false);
//   };

//   // If user is admin, show dashboard
//   if (session && userRole === 'admin') {
//     return <AdminDashboard onLogout={handleLogout} />;
//   }

//   // If showing auth form
//   if (showAuth) {
//     return <AuthForm onSuccess={() => setShowAuth(false)} />;
//   }

//   const services = [
//     {
//       category: "Manned Guarding Services",
//       icon: <Shield className="w-8 h-8" />,
//       items: [
//         "Residential and Estate Security",
//         "Commercial and Industrial Premises", 
//         "Construction Site Security",
//         "Shopping Malls and Retail Security"
//       ]
//     },
//     {
//       category: "Event Security Management", 
//       icon: <Users className="w-8 h-8" />,
//       items: [
//         "Weddings, Corporate Events & Concerts",
//         "Crowd Control and VIP Protection"
//       ]
//     },
//     {
//       category: "24/7 Response Services",
//       icon: <Clock className="w-8 h-8" />,
//       items: [
//         "Alarm Response and 24/7 Patrols",
//         "Rapid Response Units",
//         "Mobile Patrol Services"
//       ]
//     },
//     {
//       category: "CCTV & Surveillance",
//       icon: <Camera className="w-8 h-8" />,
//       items: [
//         "CCTV Surveillance and Monitoring",
//         "Installation and Remote Monitoring",
//         "Control Room Setup & Maintenance"
//       ]
//     },
//     {
//       category: "Access Control Systems",
//       icon: <Lock className="w-8 h-8" />,
//       items: [
//         "Biometric Systems",
//         "Card Readers and Intercom Solutions"
//       ]
//     },
//     {
//       category: "Professional Security Officers",
//       icon: <UserCheck className="w-8 h-8" />,
//       items: [
//         "Armed and Unarmed Security Officers",
//         "Licensed and Professionally Trained Guards",
//         "Escort Services for High-Value Cargo"
//       ]
//     },
//     {
//       category: "K9 Dog Unit Services",
//       icon: <Dog className="w-8 h-8" />,
//       items: [
//         "Trained Guard Dogs and Handlers"
//       ]
//     },
//     {
//       category: "Investigation Services",
//       icon: <Search className="w-8 h-8" />,
//       items: [
//         "Private Investigations & Intelligence Gathering",
//         "Corporate Investigations",
//         "Fraud Detection and Prevention"
//       ]
//     },
//     {
//       category: "Emergency Services",
//       icon: <Flame className="w-8 h-8" />,
//       items: [
//         "Fire Safety and Emergency Evacuation Services",
//         "Fire Marshals & First Aid Personnel"
//       ]
//     },
//     {
//       category: "VIP Protection",
//       icon: <Star className="w-8 h-8" />,
//       items: [
//         "VIP Close Protection Services",
//         "Executive and Diplomatic Security"
//       ]
//     }
//   ];

//   const companyValues = [
//     {
//       icon: <Shield className="w-6 h-6 text-accent" />,
//       title: "Professionalism",
//       description: "Maintaining the highest standards in all our security services"
//     },
//     {
//       icon: <Users className="w-6 h-6 text-accent" />,
//       title: "Team work and Continuous Improvement",
//       description: "Collaborative approach with ongoing development"
//     },
//     {
//       icon: <Phone className="w-6 h-6 text-accent" />,
//       title: "Communication",
//       description: "Clear and effective communication at all levels"
//     },
//     {
//       icon: <Heart className="w-6 h-6 text-accent" />,
//       title: "Customer Satisfaction",
//       description: "Dedicated to exceeding client expectations"
//     },
//     {
//       icon: <Target className="w-6 h-6 text-accent" />,
//       title: "Passion",
//       description: "Committed to excellence in everything we do"
//     }
//   ];

//   const whyChooseUs = [
//     {
//       icon: <CheckCircle className="w-6 h-6 text-accent" />,
//       title: "Highly trained and disciplined personnel"
//     },
//     {
//       icon: <Clock className="w-6 h-6 text-accent" />,
//       title: "24/7 customer support & rapid response"
//     },
//     {
//       icon: <Shield className="w-6 h-6 text-accent" />,
//       title: "Licensed and insured by regulatory authorities"
//     },
//     {
//       icon: <Star className="w-6 h-6 text-accent" />,
//       title: "Affordable, flexible packages for individuals and institutions"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background relative">
//       {/* Background Image */}
//       <div 
//         className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
//         style={{
//           backgroundImage: `url('/lovable-uploads/15b00a44-5776-44b7-b1d4-1663f5f57bca.png')`
//         }}
//       />
      
//       {/* Content overlay */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <img 
//                   src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
//                   alt="Scorpion Security Guards Ltd Logo" 
//                   className="w-12 h-12 object-contain"
//                 />
//                 <div>
//                   <h1 className="text-2xl font-bold text-primary">Scorpion Security Guards Ltd</h1>
//                   <p className="text-sm text-muted-foreground font-medium">Integrity and Vigilance</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="hidden md:flex items-center space-x-2">
//                   <Phone className="w-4 h-4 text-primary" />
//                   <span className="text-sm">+254 721 106 100</span>
//                 </div>
                
//                 {/* Prominent Quote Button */}
//                 <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
//                   <DialogTrigger asChild>
//                     <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 text-base shadow-lg">
//                       Get Free Quote
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle>Request a Security Quote</DialogTitle>
//                     </DialogHeader>
//                     <QuoteRequestForm />
//                   </DialogContent>
//                 </Dialog>
                
//                 {/* Prominent Admin Login Button */}
//                 <Button 
//                   variant="outline" 
//                   size="lg"
//                   onClick={() => setShowAuth(true)}
//                   className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 text-base shadow-lg"
//                 >
//                   Admin Login
//                 </Button>
//               </div>
//             </div>

//             {/* Mobile buttons */}
//             <div className="md:hidden mt-4 flex flex-col space-y-3">
//               <div className="flex items-center justify-center space-x-2">
//                 <Phone className="w-4 h-4 text-primary" />
//                 <span className="text-sm">+254 721 106 100</span>
//               </div>
//               <div className="flex space-x-3">
//                 <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
//                   <DialogTrigger asChild>
//                     <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
//                       Get Free Quote
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle>Request a Security Quote</DialogTitle>
//                     </DialogHeader>
//                     <QuoteRequestForm />
//                   </DialogContent>
//                 </Dialog>
                
//                 <Button 
//                   variant="outline" 
//                   size="lg"
//                   onClick={() => setShowAuth(true)}
//                   className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
//                 >
//                   Admin Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <section className="hero-gradient text-white py-20 relative">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-5xl md:text-6xl font-bold mb-6">
//                 Protecting What Matters Most
//               </h2>
//               <p className="text-xl md:text-2xl mb-8 text-blue-100">
//                 Professional, reliable, and efficient security services tailored to meet your safety needs
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
//                   <Phone className="w-5 h-5 mr-2" />
//                   Call Now: +254 721 106 100
//                 </Button>
//                 <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
//                   <DialogTrigger asChild>
//                     <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg shadow-xl">
//                       Get Free Consultation
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle>Contact Us</DialogTitle>
//                     </DialogHeader>
//                     <ContactForm />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission, Vision & Values Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Mission */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <Target className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Mission</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     To provide our clients with total peace of mind knowing that their security and well-being 
//                     is in the hands of our company totally driven and focussed on excellence.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Vision */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <Eye className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Vision</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Achieving excellence by not waving from their core values; Integrity, 
//                     Vigilance and Determination to protect and serve.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Task */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <CheckCircle className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Task</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Regulate to zero percent insecurity cases to our clients. 
//                     Protection of properties of our clients and inform the area 
//                     civil police incase of any incident/accident to our clients.
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* Our Values Section */}
//         <section className="py-16 bg-white/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h3>
//               <p className="text-lg text-muted-foreground">The principles that guide our commitment to excellence</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//               {companyValues.map((value, index) => (
//                 <Card key={index} className="border-0 shadow-lg service-card-hover bg-white/95 backdrop-blur-sm">
//                   <CardContent className="p-6">
//                     <div className="flex items-start space-x-4">
//                       <div className="p-3 bg-primary/10 rounded-lg">
//                         {value.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
//                         <p className="text-sm text-muted-foreground">{value.description}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* About Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <h3 className="text-3xl md:text-4xl font-bold mb-6">About Scorpion Security Guards Ltd</h3>
//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 At Scorpion Security Guards Ltd, we provide reliable, professional, and efficient security services 
//                 tailored to meet your safety needs. With a reputation built on trust, discipline, and experience, 
//                 our mission is to protect what matters most—your property, people, and peace of mind.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section className="py-16 bg-white/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Security Services</h3>
//               <p className="text-lg text-muted-foreground">Comprehensive security solutions for all your needs</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {services.map((service, index) => (
//                 <Card key={index} className="service-card-hover border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                   <CardContent className="p-6">
//                     <div className="flex items-center mb-4">
//                       <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                         {React.cloneElement(service.icon, { className: "w-8 h-8 text-primary" })}
//                       </div>
//                       <h4 className="text-lg font-semibold">{service.category}</h4>
//                     </div>
//                     <ul className="space-y-2">
//                       {service.items.map((item, itemIndex) => (
//                         <li key={itemIndex} className="flex items-start">
//                           <CheckCircle className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
//                           <span className="text-sm text-muted-foreground">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h3>
//               <p className="text-lg text-muted-foreground">Experience the difference with our professional security services</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {whyChooseUs.map((item, index) => (
//                 <div key={index} className="flex items-center p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-md">
//                   {item.icon}
//                   <span className="ml-4 text-lg font-medium">{item.title}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section className="py-16 bg-primary text-white">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us Today</h3>
//               <p className="text-xl text-blue-100">For customized security solutions, reach us at:</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <Phone className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Phone</h4>
//                 <p>+254 721 106 100</p>
//                 <p>+254 732 086 479</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <Mail className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Email</h4>
//                 <p>scorpionguardltd@gmail.com</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <MapPin className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Postal Address</h4>
//                 <p>P.O. Box 6483-01000</p>
//                 <p>Thika</p>
//               </div>
//             </div>
            
//             <div className="text-center mt-12">
//               <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
//                 <DialogTrigger asChild>
//                   <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
//                     <Mail className="w-5 h-5 mr-2" />
//                     Get Free Security Assessment
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Contact Us</DialogTitle>
//                   </DialogHeader>
//                   <ContactForm />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="flex items-center space-x-3 mb-4 md:mb-0">
//                 <img 
//                   src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
//                   alt="Scorpion Security Guards Ltd Logo" 
//                   className="w-8 h-8 object-contain"
//                 />
//                 <div>
//                   <h5 className="font-bold">Scorpion Security Guards Ltd</h5>
//                   <p className="text-sm text-gray-400">Professional Security Services</p>
//                 </div>
//               </div>
//               <div className="text-center md:text-right">
//                 <p className="text-sm text-gray-400">
//                   Licensed and insured by regulatory authorities
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   © 2024 Scorpion Security Guards Ltd. All rights reserved.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Powered by <span className="font-medium">NganaB web solutions</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Index;


// import React, { useState, useEffect } from 'react';
// import { Shield, Phone, Mail, MapPin, Clock, Users, Eye, CheckCircle, Star, Lock, Camera, AlertTriangle, Car, Dog, Search, Flame, UserCheck, Target, Heart } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { supabase } from '@/integrations/supabase/client';
// import { Session } from '@supabase/supabase-js';
// import ContactForm from '@/components/ContactForm';
// import QuoteRequestForm from '@/components/QuoteRequestForm';
// import AuthForm from '@/components/AuthForm';
// import AdminDashboard from '@/components/AdminDashboard';

// const Index = () => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [showContactForm, setShowContactForm] = useState(false);
//   const [showQuoteForm, setShowQuoteForm] = useState(false);
//   const [showAuth, setShowAuth] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for existing session first
//     const checkSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setSession(session);
      
//       if (session?.user) {
//         // Fetch user role
//         const { data: profile } = await supabase
//           .from('profiles')
//           .select('role')
//           .eq('id', session.user.id)
//           .single();
//         setUserRole(profile?.role || 'user');
//       }
//       setLoading(false);
//     };

//     checkSession();

//     // Set up auth state listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session);
//         if (session?.user) {
//           // Fetch user role
//           const { data: profile } = await supabase
//             .from('profiles')
//             .select('role')
//             .eq('id', session.user.id)
//             .single();
//           setUserRole(profile?.role || 'user');
//         } else {
//           setUserRole(null);
//         }
//         setLoading(false);
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await supabase.auth.signOut();
//       setSession(null);
//       setUserRole(null);
//       setShowAuth(false);
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleAuthSuccess = () => {
//     setShowAuth(false);
//     // Don't reload the page, let the auth state change handle the update
//   };

//   // Show loading while checking auth state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // If user is admin, show dashboard
//   if (session && userRole === 'admin') {
//     return <AdminDashboard onLogout={handleLogout} />;
//   }

//   // If showing auth form
//   if (showAuth) {
//     return <AuthForm onSuccess={handleAuthSuccess} />;
//   }

//   const services = [
//     {
//       category: "Manned Guarding Services",
//       icon: <Shield className="w-8 h-8" />,
//       items: [
//         "Residential and Estate Security",
//         "Commercial and Industrial Premises", 
//         "Construction Site Security",
//         "Shopping Malls and Retail Security"
//       ]
//     },
//     {
//       category: "Event Security Management", 
//       icon: <Users className="w-8 h-8" />,
//       items: [
//         "Weddings, Corporate Events & Concerts",
//         "Crowd Control and VIP Protection"
//       ]
//     },
//     {
//       category: "24/7 Response Services",
//       icon: <Clock className="w-8 h-8" />,
//       items: [
//         "Alarm Response and 24/7 Patrols",
//         "Rapid Response Units",
//         "Mobile Patrol Services"
//       ]
//     },
//     {
//       category: "CCTV & Surveillance",
//       icon: <Camera className="w-8 h-8" />,
//       items: [
//         "CCTV Surveillance and Monitoring",
//         "Installation and Remote Monitoring",
//         "Control Room Setup & Maintenance"
//       ]
//     },
//     {
//       category: "Access Control Systems",
//       icon: <Lock className="w-8 h-8" />,
//       items: [
//         "Biometric Systems",
//         "Card Readers and Intercom Solutions"
//       ]
//     },
//     {
//       category: "Professional Security Officers",
//       icon: <UserCheck className="w-8 h-8" />,
//       items: [
//         "Armed and Unarmed Security Officers",
//         "Licensed and Professionally Trained Guards",
//         "Escort Services for High-Value Cargo"
//       ]
//     },
//     {
//       category: "K9 Dog Unit Services",
//       icon: <Dog className="w-8 h-8" />,
//       items: [
//         "Trained Guard Dogs and Handlers"
//       ]
//     },
//     {
//       category: "Investigation Services",
//       icon: <Search className="w-8 h-8" />,
//       items: [
//         "Private Investigations & Intelligence Gathering",
//         "Corporate Investigations",
//         "Fraud Detection and Prevention"
//       ]
//     },
//     {
//       category: "Emergency Services",
//       icon: <Flame className="w-8 h-8" />,
//       items: [
//         "Fire Safety and Emergency Evacuation Services",
//         "Fire Marshals & First Aid Personnel"
//       ]
//     },
//     {
//       category: "VIP Protection",
//       icon: <Star className="w-8 h-8" />,
//       items: [
//         "VIP Close Protection Services",
//         "Executive and Diplomatic Security"
//       ]
//     }
//   ];

//   const companyValues = [
//     {
//       icon: <Shield className="w-6 h-6 text-accent" />,
//       title: "Professionalism",
//       description: "Maintaining the highest standards in all our security services"
//     },
//     {
//       icon: <Users className="w-6 h-6 text-accent" />,
//       title: "Team work and Continuous Improvement",
//       description: "Collaborative approach with ongoing development"
//     },
//     {
//       icon: <Phone className="w-6 h-6 text-accent" />,
//       title: "Communication",
//       description: "Clear and effective communication at all levels"
//     },
//     {
//       icon: <Heart className="w-6 h-6 text-accent" />,
//       title: "Customer Satisfaction",
//       description: "Dedicated to exceeding client expectations"
//     },
//     {
//       icon: <Target className="w-6 h-6 text-accent" />,
//       title: "Passion",
//       description: "Committed to excellence in everything we do"
//     }
//   ];

//   const whyChooseUs = [
//     {
//       icon: <CheckCircle className="w-6 h-6 text-accent" />,
//       title: "Highly trained and disciplined personnel"
//     },
//     {
//       icon: <Clock className="w-6 h-6 text-accent" />,
//       title: "24/7 customer support & rapid response"
//     },
//     {
//       icon: <Shield className="w-6 h-6 text-accent" />,
//       title: "Licensed and insured by regulatory authorities"
//     },
//     {
//       icon: <Star className="w-6 h-6 text-accent" />,
//       title: "Affordable, flexible packages for individuals and institutions"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background relative">
//       {/* Background Image */}
//       <div 
//         className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
//         style={{
//           backgroundImage: `url('/lovable-uploads/15b00a44-5776-44b7-b1d4-1663f5f57bca.png')`
//         }}
//       />
      
//       {/* Content overlay */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <img 
//                   src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
//                   alt="Scorpion Security Guards Ltd Logo" 
//                   className="w-12 h-12 object-contain"
//                 />
//                 <div>
//                   <h1 className="text-2xl font-bold text-primary">Scorpion Security Guards Ltd</h1>
//                   <p className="text-sm text-muted-foreground font-medium">Integrity and Vigilance</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="hidden md:flex items-center space-x-2">
//                   <Phone className="w-4 h-4 text-primary" />
//                   <span className="text-sm">+254 721 106 100</span>
//                 </div>
                
//                 {/* Show logout button if user is logged in */}
//                 {session ? (
//                   <Button 
//                     variant="outline" 
//                     size="lg"
//                     onClick={handleLogout}
//                     className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold px-6 py-3 text-base shadow-lg"
//                   >
//                     Logout
//                   </Button>
//                 ) : (
//                   <>
//                     {/* Prominent Quote Button */}
//                     <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
//                       <DialogTrigger asChild>
//                         <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 text-base shadow-lg">
//                           Get Free Quote
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
//                         <DialogHeader>
//                           <DialogTitle>Request a Security Quote</DialogTitle>
//                         </DialogHeader>
//                         <QuoteRequestForm />
//                       </DialogContent>
//                     </Dialog>
                    
//                     {/* Prominent Admin Login Button */}
//                     <Button 
//                       variant="outline" 
//                       size="lg"
//                       onClick={() => setShowAuth(true)}
//                       className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 text-base shadow-lg"
//                     >
//                       Admin Login
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Mobile buttons */}
//             <div className="md:hidden mt-4 flex flex-col space-y-3">
//               <div className="flex items-center justify-center space-x-2">
//                 <Phone className="w-4 h-4 text-primary" />
//                 <span className="text-sm">+254 721 106 100</span>
//               </div>
//               {!session && (
//                 <div className="flex space-x-3">
//                   <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
//                     <DialogTrigger asChild>
//                       <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
//                         Get Free Quote
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
//                       <DialogHeader>
//                         <DialogTitle>Request a Security Quote</DialogTitle>
//                       </DialogHeader>
//                       <QuoteRequestForm />
//                     </DialogContent>
//                   </Dialog>
                  
//                   <Button 
//                     variant="outline" 
//                     size="lg"
//                     onClick={() => setShowAuth(true)}
//                     className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
//                   >
//                     Admin Login
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Rest of your component remains the same... */}
//         {/* Hero Section */}
//         <section className="hero-gradient text-white py-20 relative">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-5xl md:text-6xl font-bold mb-6">
//                 Protecting What Matters Most
//               </h2>
//               <p className="text-xl md:text-2xl mb-8 text-blue-100">
//                 Professional, reliable, and efficient security services tailored to meet your safety needs
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
//                   <Phone className="w-5 h-5 mr-2" />
//                   Call Now: +254 721 106 100
//                 </Button>
//                 <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
//                   <DialogTrigger asChild>
//                     <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg shadow-xl">
//                       Get Free Consultation
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle>Contact Us</DialogTitle>
//                     </DialogHeader>
//                     <ContactForm />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission, Vision & Values Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Mission */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <Target className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Mission</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     To provide our clients with total peace of mind knowing that their security and well-being 
//                     is in the hands of our company totally driven and focussed on excellence.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Vision */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <Eye className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Vision</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Achieving excellence by not waving from their core values; Integrity, 
//                     Vigilance and Determination to protect and serve.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Task */}
//               <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <div className="flex items-center mb-6">
//                     <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                       <CheckCircle className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-primary">Task</h3>
//                   </div>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Regulate to zero percent insecurity cases to our clients. 
//                     Protection of properties of our clients and inform the area 
//                     civil police incase of any incident/accident to our clients.
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* Our Values Section */}
//         <section className="py-16 bg-white/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h3>
//               <p className="text-lg text-muted-foreground">The principles that guide our commitment to excellence</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//               {companyValues.map((value, index) => (
//                 <Card key={index} className="border-0 shadow-lg service-card-hover bg-white/95 backdrop-blur-sm">
//                   <CardContent className="p-6">
//                     <div className="flex items-start space-x-4">
//                       <div className="p-3 bg-primary/10 rounded-lg">
//                         {value.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
//                         <p className="text-sm text-muted-foreground">{value.description}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* About Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <h3 className="text-3xl md:text-4xl font-bold mb-6">About Scorpion Security Guards Ltd</h3>
//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 At Scorpion Security Guards Ltd, we provide reliable, professional, and efficient security services 
//                 tailored to meet your safety needs. With a reputation built on trust, discipline, and experience, 
//                 our mission is to protect what matters most—your property, people, and peace of mind.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section className="py-16 bg-white/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Security Services</h3>
//               <p className="text-lg text-muted-foreground">Comprehensive security solutions for all your needs</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {services.map((service, index) => (
//                 <Card key={index} className="service-card-hover border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//                   <CardContent className="p-6">
//                     <div className="flex items-center mb-4">
//                       <div className="p-3 bg-primary/10 rounded-lg mr-4">
//                         {React.cloneElement(service.icon, { className: "w-8 h-8 text-primary" })}
//                       </div>
//                       <h4 className="text-lg font-semibold">{service.category}</h4>
//                     </div>
//                     <ul className="space-y-2">
//                       {service.items.map((item, itemIndex) => (
//                         <li key={itemIndex} className="flex items-start">
//                           <CheckCircle className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
//                           <span className="text-sm text-muted-foreground">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us Section */}
//         <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h3>
//               <p className="text-lg text-muted-foreground">Experience the difference with our professional security services</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {whyChooseUs.map((item, index) => (
//                 <div key={index} className="flex items-center p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-md">
//                   {item.icon}
//                   <span className="ml-4 text-lg font-medium">{item.title}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section className="py-16 bg-primary text-white">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us Today</h3>
//               <p className="text-xl text-blue-100">For customized security solutions, reach us at:</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <Phone className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Phone</h4>
//                 <p>+254 721 106 100</p>
//                 <p>+254 732 086 479</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <Mail className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Email</h4>
//                 <p>scorpionguardltd@gmail.com</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                   <MapPin className="w-8 h-8" />
//                 </div>
//                 <h4 className="text-lg font-semibold mb-2">Postal Address</h4>
//                 <p>P.O. Box 6483-01000</p>
//                 <p>Thika</p>
//               </div>
//             </div>
            
//             <div className="text-center mt-12">
//               <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
//                 <DialogTrigger asChild>
//                   <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
//                     <Mail className="w-5 h-5 mr-2" />
//                     Get Free Security Assessment
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Contact Us</DialogTitle>
//                   </DialogHeader>
//                   <ContactForm />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="flex items-center space-x-3 mb-4 md:mb-0">
//                 <img 
//                   src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
//                   alt="Scorpion Security Guards Ltd Logo" 
//                   className="w-8 h-8 object-contain"
//                 />
//                 <div>
//                   <h5 className="font-bold">Scorpion Security Guards Ltd</h5>
//                   <p className="text-sm text-gray-400">Professional Security Services</p>
//                 </div>
//               </div>
//               <div className="text-center md:text-right">
//                 <p className="text-sm text-gray-400">
//                   Licensed and insured by regulatory authorities
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   © 2024 Scorpion Security Guards Ltd. All rights reserved.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Powered by <span className="font-medium">NganaB web solutions</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Index;

import React, { useState, useEffect } from 'react';
import { Shield, Phone, Mail, MapPin, Clock, Users, Eye, CheckCircle, Star, Lock, Camera, Dog, Search, Flame, UserCheck, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import ContactForm from '@/components/ContactForm';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          console.log('Index profile check:', { profile, error });

          if (error) {
            console.error('Profile query error:', error.message);
            setLoading(false);
            return;
          }

          if (profile?.role === 'admin') {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          console.log('Auth state change profile check:', { profile, error });

          if (error) {
            console.error('Profile query error:', error.message);
            setLoading(false);
            return;
          }

          if (profile?.role === 'admin') {
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/');
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setShowAuth(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthForm onSuccess={() => setShowAuth(false)} />;
  }

  const services = [
    {
      category: "Manned Guarding Services",
      icon: <Shield className="w-8 h-8" />,
      items: [
        "Residential and Estate Security",
        "Commercial and Industrial Premises",
        "Construction Site Security",
        "Shopping Malls and Retail Security"
      ]
    },
    {
      category: "Event Security Management",
      icon: <Users className="w-8 h-8" />,
      items: [
        "Weddings, Corporate Events & Concerts",
        "Crowd Control and VIP Protection"
      ]
    },
    {
      category: "24/7 Response Services",
      icon: <Clock className="w-8 h-8" />,
      items: [
        "Alarm Response and 24/7 Patrols",
        "Rapid Response Units",
        "Mobile Patrol Services"
      ]
    },
    {
      category: "CCTV & Surveillance",
      icon: <Camera className="w-8 h-8" />,
      items: [
        "CCTV Surveillance and Monitoring",
        "Installation and Remote Monitoring",
        "Control Room Setup & Maintenance"
      ]
    },
    {
      category: "Access Control Systems",
      icon: <Lock className="w-8 h-8" />,
      items: [
        "Biometric Systems",
        "Card Readers and Intercom Solutions"
      ]
    },
    {
      category: "Professional Security Officers",
      icon: <UserCheck className="w-8 h-8" />,
      items: [
        "Armed and Unarmed Security Officers",
        "Licensed and Professionally Trained Guards",
        "Escort Services for High-Value Cargo"
      ]
    },
    {
      category: "K9 Dog Unit Services",
      icon: <Dog className="w-8 h-8" />,
      items: [
        "Trained Guard Dogs and Handlers"
      ]
    },
    {
      category: "Investigation Services",
      icon: <Search className="w-8 h-8" />,
      items: [
        "Private Investigations & Intelligence Gathering",
        "Corporate Investigations",
        "Fraud Detection and Prevention"
      ]
    },
    {
      category: "Emergency Services",
      icon: <Flame className="w-8 h-8" />,
      items: [
        "Fire Safety and Emergency Evacuation Services",
        "Fire Marshals & First Aid Personnel"
      ]
    },
    {
      category: "VIP Protection",
      icon: <Star className="w-8 h-8" />,
      items: [
        "VIP Close Protection Services",
        "Executive and Diplomatic Security"
      ]
    }
  ];

  const companyValues = [
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Professionalism",
      description: "Maintaining the highest standards in all our security services"
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Team work and Continuous Improvement",
      description: "Collaborative approach with ongoing development"
    },
    {
      icon: <Phone className="w-6 h-6 text-accent" />,
      title: "Communication",
      description: "Clear and effective communication at all levels"
    },
    {
      icon: <Heart className="w-6 h-6 text-accent" />,
      title: "Customer Satisfaction",
      description: "Dedicated to exceeding client expectations"
    },
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Passion",
      description: "Committed to excellence in everything we do"
    }
  ];

  const whyChooseUs = [
    {
      icon: <CheckCircle className="w-6 h-6 text-accent" />,
      title: "Highly trained and disciplined personnel"
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "24/7 customer support & rapid response"
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Licensed and insured by regulatory authorities"
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      title: "Affordable, flexible packages for individuals and institutions"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{
          backgroundImage: `url('/lovable-Uploads/15b00a44-5776-44b7-b1d4-1663f5f57bca.png')`
        }}
      />
      <div className="relative z-10">
        <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
                alt="Scorpion Security Guards Ltd Logo" 
                className="w-12 h-12 object-contain"
              />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Scorpion Security Guards Ltd</h1>
                  <p className="text-sm text-muted-foreground font-medium">Integrity and Vigilance</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">+254 721 106 100</span>
                </div>
                {session ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleLogout}
                    className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold px-6 py-3 text-base shadow-lg"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 text-base shadow-lg">
                          Get Free Quote
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Request a Security Quote</DialogTitle>
                        </DialogHeader>
                        <QuoteRequestForm />
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setShowAuth(true)}
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 text-base shadow-lg"
                    >
                      Admin Login
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden mt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+254 721 106 100</span>
              </div>
              {!session && (
                <div className="flex space-x-3">
                  <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                        Get Free Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Request a Security Quote</DialogTitle>
                      </DialogHeader>
                      <QuoteRequestForm />
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowAuth(true)}
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                  >
                    Admin Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="hero-gradient text-white py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Protecting What Matters Most
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Professional, reliable, and efficient security services tailored to meet your safety needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +254 721 106 100
                </Button>
                <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg shadow-xl">
                      Get Free Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Contact Us</DialogTitle>
                    </DialogHeader>
                    <ContactForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide our clients with total peace of mind knowing that their security and well-being 
                    is in the hands of our company totally driven and focussed on excellence.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Achieving excellence by not waving from their core values; Integrity, 
                    Vigilance and Determination to protect and serve.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Task</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Regulate to zero percent insecurity cases to our clients. 
                    Protection of properties of our clients and inform the area 
                    civil police incase of any incident/accident to our clients.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h3>
              <p className="text-lg text-muted-foreground">The principles that guide our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {companyValues.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg service-card-hover bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">About Scorpion Security Guards Ltd</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Scorpion Security Guards Ltd, we provide reliable, professional, and efficient security services 
                tailored to meet your safety needs. With a reputation built on trust, discipline, and experience, 
                our mission is to protect what matters most—your property, people, and peace of mind.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Security Services</h3>
              <p className="text-lg text-muted-foreground">Comprehensive security solutions for all your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="service-card-hover border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg mr-4">
                        {React.cloneElement(service.icon, { className: "w-8 h-8 text-primary" })}
                      </div>
                      <h4 className="text-lg font-semibold">{service.category}</h4>
                    </div>
                    <ul className="space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h3>
              <p className="text-lg text-muted-foreground">Experience the difference with our professional security services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-center p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-md">
                  {item.icon}
                  <span className="ml-4 text-lg font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us Today</h3>
              <p className="text-xl text-blue-100">For customized security solutions, reach us at:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Phone</h4>
                <p>+254 721 106 100</p>
                <p>+254 732 086 479</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <p>scorpionguardltd@gmail.com</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Postal Address</h4>
                <p>P.O. Box 6483-01000</p>
                <p>Thika</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg shadow-xl">
                    <Mail className="w-5 h-5 mr-2" />
                    Get Free Security Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <img 
                src="/lovable-uploads/ec402875-86e8-4443-8b2e-cf8819f68867.png" 
                alt="Scorpion Security Guards Ltd Logo" 
                className="w-12 h-12 object-contain"
              />
                <div>
                  <h5 className="font-bold">Scorpion Security Guards Ltd</h5>
                  <p className="text-sm text-gray-400">Professional Security Services</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  Licensed and insured by regulatory authorities
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  © 2024 Scorpion Security Guards Ltd. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Powered by <span className="font-medium">NganaB web solutions</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;