import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Nainix Updates',
  description: 'Get in touch with the Nainix Updates team.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neu-text-heading mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg text-neu-text font-medium max-w-2xl mx-auto">
          Have a question, feedback, or need assistance? We'd love to hear from you. Fill out the form below or reach us through our contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl shadow-neu-flat p-8 flex items-start gap-5 hover:shadow-neu-pressed transition-shadow">
            <div className="w-14 h-14 shadow-neu-pressed rounded-full flex items-center justify-center text-blue-500 shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neu-text-heading mb-1">Email Us</h3>
              <p className="text-neu-text font-medium">contact@nainixupdates.com</p>
              <p className="text-neu-text/70 text-sm mt-1">We aim to reply within 24 hours.</p>
            </div>
          </div>

          <div className="rounded-3xl shadow-neu-flat p-8 flex items-start gap-5 hover:shadow-neu-pressed transition-shadow">
            <div className="w-14 h-14 shadow-neu-pressed rounded-full flex items-center justify-center text-green-500 shrink-0">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neu-text-heading mb-1">Call Us</h3>
              <p className="text-neu-text font-medium">+91 (123) 456-7890</p>
              <p className="text-neu-text/70 text-sm mt-1">Mon-Fri from 9am to 6pm.</p>
            </div>
          </div>

          <div className="rounded-3xl shadow-neu-flat p-8 flex items-start gap-5 hover:shadow-neu-pressed transition-shadow">
            <div className="w-14 h-14 shadow-neu-pressed rounded-full flex items-center justify-center text-red-500 shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neu-text-heading mb-1">Office</h3>
              <p className="text-neu-text font-medium">Nainix Tech Building<br />New Delhi, India 110001</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl shadow-neu-flat p-8 md:p-10">
            <h2 className="text-2xl font-bold text-neu-text-heading mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neu-text-heading uppercase tracking-wider ml-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full h-14 px-6 rounded-full bg-neu-light shadow-neu-pressed text-neu-text-heading focus:outline-none focus:ring-2 focus:ring-neu-accent/50 transition-all placeholder:text-neu-text/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neu-text-heading uppercase tracking-wider ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full h-14 px-6 rounded-full bg-neu-light shadow-neu-pressed text-neu-text-heading focus:outline-none focus:ring-2 focus:ring-neu-accent/50 transition-all placeholder:text-neu-text/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-neu-text-heading uppercase tracking-wider ml-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full h-14 px-6 rounded-full bg-neu-light shadow-neu-pressed text-neu-text-heading focus:outline-none focus:ring-2 focus:ring-neu-accent/50 transition-all placeholder:text-neu-text/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-neu-text-heading uppercase tracking-wider ml-2">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Write your message here..." 
                  className="w-full p-6 rounded-3xl bg-neu-light shadow-neu-pressed text-neu-text-heading focus:outline-none focus:ring-2 focus:ring-neu-accent/50 transition-all resize-none placeholder:text-neu-text/40"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full h-14 rounded-full bg-neu-light shadow-neu-flat text-neu-accent font-extrabold text-lg flex items-center justify-center gap-2 hover:shadow-neu-pressed active:scale-95 transition-all mt-4"
              >
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
