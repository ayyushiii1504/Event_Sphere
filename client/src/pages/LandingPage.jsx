import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-light font-sans">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f0c1a 0%, #1C1C2E 40%, #2a1f0e 75%, #1C1C2E 100%)' }}
        >
          {/* Radial gold glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(184,134,11,0.13) 0%, transparent 70%)' }}
          />



          {/* Corner ornaments */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-accent/30 pointer-events-none" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-accent/30 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-accent/30 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-accent/30 pointer-events-none" />

          {/* Scattered gold dots */}
          {[
            { top: '18%', left: '12%' }, { top: '72%', left: '8%' },
            { top: '25%', right: '10%' }, { top: '65%', right: '14%' },
            { top: '45%', left: '5%' }, { top: '50%', right: '5%' },
          ].map((pos, i) => (
            <div key={i} className="absolute w-1 h-1 bg-accent/40 rounded-full pointer-events-none" style={pos} />
          ))}

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto fade-up">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-accent mb-8">
              ✦ &nbsp; The Premier Event Platform &nbsp; ✦
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-white leading-none mb-4">
              Where Moments
            </h1>
            <h1 className="font-display text-6xl md:text-8xl font-semibold italic leading-none mb-10"
              style={{ color: '#D4AF37' }}>
              Become Movements
            </h1>
            <div className="w-20 h-px mx-auto mb-10" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }} />
            <p className="font-sans text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light"
              style={{ color: 'rgba(232,224,208,0.75)' }}>
              Discover curated events, connect with like-minded people, and craft experiences that linger long after the lights go down.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-gold text-sm tracking-widest uppercase px-10 py-4">
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center text-sm tracking-widest uppercase px-10 py-4 border transition-all duration-300 font-sans font-medium"
                style={{ borderColor: 'rgba(232,224,208,0.3)', color: 'rgba(232,224,208,0.85)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,224,208,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Bottom fade into page bg */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #FAF8F5, transparent)' }} />
        </section>

        

        {/* ── Features ── */}
        <section className="py-28 bg-light">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-4">Platform Features</p>
              <h2 className="font-display text-5xl font-light text-dark">The Sphere of Connection</h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: '01',
                  title: 'Smart Discovery',
                  desc: 'Explore events by city, category, or keyword. Tailored filters surface experiences that match your exact taste and schedule.'
                },
                {
                  number: '02',
                  title: 'Live Connection',
                  desc: 'Every event has a dedicated chat room. Meet attendees, build anticipation, and keep the conversation alive long after the event ends.'
                },
                {
                  number: '03',
                  title: 'Effortless Creation',
                  desc: 'From concept to crowd-ready in minutes. Our streamlined creation tools give organisers everything needed to launch professionally.'
                }
              ].map(({ number, title, desc }) => (
                <div key={number} className="group relative border border-stone bg-white p-10 hover:border-primary transition-all duration-300"
                  style={{ boxShadow: '0 2px 20px rgba(28,28,46,0.05)' }}
                >
                  <div className="absolute top-8 right-8 font-display text-5xl font-light text-stone group-hover:text-accent/30 transition-colors duration-300">
                    {number}
                  </div>
                  <div className="w-8 h-px bg-primary mb-7" />
                  <h3 className="font-display text-2xl font-semibold text-dark mb-4">{title}</h3>
                  <p className="text-sm font-sans text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-28 bg-cream border-y border-stone">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-4">The Process</p>
              <h2 className="font-display text-5xl font-light text-dark">Three Steps to Your Next Experience</h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-stone" />

              {[
                { step: 'I', label: 'Discover', desc: 'Browse our curated catalogue of events happening near you and across the country.' },
                { step: 'II', label: 'Connect', desc: 'Join the event community, chat with fellow attendees, and get excited together.' },
                { step: 'III', label: 'Experience', desc: 'Show up, be present, and create memories that will stay with you long after.' },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 border-2 border-primary bg-white flex items-center justify-center mb-8">
                    <span className="font-display text-xl font-semibold text-primary">{step}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-dark mb-3 tracking-wider uppercase">{label}</h3>
                  <p className="text-sm font-sans text-muted leading-relaxed max-w-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Organiser Section ── */}
        <section className="py-28 bg-light">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-4">For Organisers</p>
              <h2 className="font-display text-5xl font-light text-dark leading-tight mb-6">
                Bring Your Vision <br /><em className="font-display font-semibold italic">to Life</em>
              </h2>
              <div className="w-12 h-px bg-primary mb-8" />
              <p className="text-sm font-sans text-muted leading-relaxed mb-10">
                EventSphere isn't just for discovering events — it's for creating them. Powerful tools make event creation, management, and audience engagement simple, secure, and successful.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  'Intuitive creation with full control over title, date, city, and category',
                  'Update or remove events any time with secure authorisation',
                  'Built-in real-time chat to keep your audience engaged',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-5 h-5 border border-primary flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <p className="text-sm font-sans text-charcoal leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/signup" className="btn-gold text-sm tracking-widest uppercase px-8 py-3.5">
                Start Creating
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-stone" />
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Event organiser"
                className="relative w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="bg-dark py-28 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-12 left-12 w-32 h-32 border border-white/5 rotate-45" />
          <div className="absolute bottom-12 right-12 w-48 h-48 border border-white/5 rotate-12" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-accent/5 rounded-full" />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <p className="text-xs font-sans tracking-widest uppercase text-accent mb-6">✦ &nbsp; Begin Today &nbsp; ✦</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Ready to Connect, Create,<br />
              <em className="font-semibold italic text-accent">and Experience More?</em>
            </h2>
            <p className="text-sm font-sans text-stone/70 mb-12 leading-relaxed">
              Join thousands of event-goers and organisers who have made EventSphere their home for extraordinary experiences.
            </p>
            <Link to="/signup" className="btn-gold text-sm tracking-widest uppercase px-12 py-4">
              Join EventSphere — Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
