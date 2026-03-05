import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const GetInvolved = () => {
  const [email, setEmail] = useState('');
  const [audienceType, setAudienceType] = useState('health-worker');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    toast({ title: "Request Received", description: "We will contact you soon.", variant: "default" });
    setEmail('');
  };

  const audiences = [
    { value: 'health-worker', label: 'Health Worker' },
    { value: 'developer', label: 'Developer' },
    { value: 'data-partner', label: 'Data Partner' },
    { value: 'community-leader', label: 'Community Leader' },
  ];

  const roles = [
    { num: '1', title: 'Health Workers', desc: 'Ground-level integration with disease surveillance tools.', color: 'mostar-blue' },
    { num: '2', title: 'African Developers', desc: 'Build on the Grid — African computational logic.', color: 'mostar-cyan' },
    { num: '3', title: 'Data Partners', desc: 'WHO, ministries, NGOs — integrate your data streams.', color: 'mostar-green' },
    { num: '4', title: 'Community Leaders', desc: 'Local deployment partners for health sovereignty.', color: 'mostar-magenta' },
  ];

  return (
    <section id="get-involved" className="min-h-[80vh] flex items-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mostar-blue/10 via-mostar-dark to-mostar-purple/10 z-0" />
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5 z-0" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-green/10 text-mostar-green font-mono text-xs tracking-[3px] uppercase mb-4">
            Join the Revolution
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-blue-green-gradient text-gradient">
            Get Involved
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg">
            Whether you're a health worker, developer, or community leader — there's a place for you.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="glassmorphism rounded-2xl border border-white/8 p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-display font-bold mb-8 text-white">How You Can Join</h3>
                <div className="space-y-6">
                  {roles.map((r) => (
                    <div key={r.num} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${r.color}/10 border border-${r.color}/30 text-${r.color} font-bold text-sm shrink-0`}>
                        {r.num}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white mb-1">{r.title}</h4>
                        <p className="text-white/50 text-sm">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-8 text-white">Register Interest</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/50 text-xs mb-3 font-mono uppercase tracking-wider">I am interested as a:</label>
                    <div className="flex flex-wrap gap-2">
                      {audiences.map((t) => (
                        <div
                          key={t.value}
                          onClick={() => setAudienceType(t.value)}
                          className={`px-4 py-2 rounded-full border cursor-pointer transition-all duration-300 text-sm ${
                            audienceType === t.value
                              ? 'bg-mostar-blue/20 border-mostar-blue/50 text-mostar-light-blue'
                              : 'border-white/10 text-white/40 hover:border-white/25'
                          }`}
                        >
                          {t.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs mb-3 font-mono uppercase tracking-wider">Email Address:</label>
                    <input
                      type="email"
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-mostar-blue/50 transition-all"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" className="button-cyber shadow-neon-blue py-4 flex items-center justify-center gap-2 flex-grow">
                      <span>Get Early Access</span>
                      <span>→</span>
                    </button>
                    <Link to="/hub" className="button-cyber shadow-neon-blue py-4 flex items-center justify-center gap-2 flex-grow">
                      <Zap className="h-4 w-4" />
                      <span>MoStar AI</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GetInvolved;
