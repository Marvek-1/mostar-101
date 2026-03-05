import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    guardians: [
      { label: 'The Sentinel', href: '#guardians' },
      { label: 'The Healer', href: '#guardians' },
      { label: 'The Archivist', href: '#guardians' },
      { label: 'The Balancer', href: '#guardians' },
      { label: 'The Flameborn', href: '#guardians' },
    ],
    doctrine: [
      { label: 'Guardianship', href: '#doctrine' },
      { label: 'Balance', href: '#doctrine' },
      { label: 'Ancestral Wisdom', href: '#doctrine' },
      { label: 'Artifacts', href: '#doctrine' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Press Kit', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-mostar-dark-900 relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-mostar-yellow-600/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-mostar-yellow-500 rounded-sm rotate-45 flex items-center justify-center group-hover:border-mostar-gold-400 transition-colors">
                  <span className="font-cinzel-decorative text-xl text-mostar-yellow-400 -rotate-45 group-hover:text-mostar-gold-400 transition-colors">
                    M
                  </span>
                </div>
              </div>
              <div>
                <span className="font-cinzel text-2xl font-semibold tracking-wider text-white block">
                  Mostar
                </span>
                <span className="font-cinzel text-xs tracking-wider text-white/40">
                  INDUSTRIES
                </span>
              </div>
            </a>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              A myth-tech civilization that builds intelligent guardians for human life. 
              We turn ancient African wisdom into AI systems.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-mostar-yellow-500/20 hover:border-mostar-yellow-500/50 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Guardians Links */}
          <div>
            <h4 className="font-cinzel text-sm tracking-wider text-white uppercase mb-6">
              Guardians
            </h4>
            <ul className="space-y-3">
              {footerLinks.guardians.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-mostar-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Shield className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Doctrine Links */}
          <div>
            <h4 className="font-cinzel text-sm tracking-wider text-white uppercase mb-6">
              Doctrine
            </h4>
            <ul className="space-y-3">
              {footerLinks.doctrine.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-mostar-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Shield className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-cinzel text-sm tracking-wider text-white uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-mostar-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Shield className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Spine */}
        <div className="py-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="ornate-divider-center w-16">
                <div className="ornate-diamond" />
              </div>
            </div>
            <p className="font-cinzel text-lg text-white/80 mb-2">
              Guardianship over extraction. Balance over extremes.
            </p>
            <p className="font-cinzel text-lg text-white/80">
              Ancestral wisdom, modern execution. Artifacts, not features.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {currentYear} Mostar Industries. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

