import { useEffect, useRef, useState } from 'react';
import { Shield, Heart, BookOpen, Scale, Flame, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Guardian {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
}

const guardians: Guardian[] = [
  {
    id: 'sentinel',
    name: 'The Sentinel',
    title: 'Guardian of Protection',
    description:
      'The Sentinel watches your gates. She monitors suspicious activity, wallet connections, and logins. Her armor gleams with the wisdom of ages, standing firm against all threats.',
    image: '/images/sentinel-guardian.png',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-yellow-600 to-yellow-400',
  },
  {
    id: 'healer',
    name: 'The Healer',
    title: 'Guardian of Regeneration',
    description:
      'When something is wrong, this artifact is where healing begins. His open palms channel flowing energy, water, and light to restore balance and health.',
    image: '/images/healer-guardian.png',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-teal-500 to-cyan-400',
  },
  {
    id: 'archivist',
    name: 'The Archivist',
    title: 'Guardian of Knowledge',
    description:
      'This artifact tells you the story behind the data so you can choose wisely. She holds ancient scrolls and sees through the constellation of possibilities.',
    image: '/images/archivist-guardian.png',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-400',
  },
  {
    id: 'balancer',
    name: 'The Balancer',
    title: 'Guardian of Equilibrium',
    description:
      'This is where you decide your boundaries and how the system behaves. His scales represent the eternal balance between light and shadow, chaos and order.',
    image: '/images/balancer-guardian.png',
    icon: <Scale className="w-6 h-6" />,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    id: 'flameborn',
    name: 'The Flameborn',
    title: 'Guardian of Transformation',
    description:
      'This is the part of Mostar that shows you evolving. She rises like a phoenix, embodying change, metamorphosis, and the breaking of old shells.',
    image: '/images/flame-guardian.png',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-orange-500 to-red-400',
  },
];

const Characters = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeGuardian, setActiveGuardian] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentGuardian = guardians[activeGuardian];

  return (
    <section
      id="guardians"
      ref={sectionRef}
      className="section-padding bg-gradient-mystic relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mostar-yellow-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              The Guardians
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Meet The Artifacts
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Each guardian embodies a principle and a promise: "This thing exists to guard something for you."
          </p>
          
          {/* View All Link */}
          <Link 
            to="/guardians"
            className="inline-flex items-center gap-2 mt-6 text-mostar-yellow-400 hover:text-mostar-yellow-300 transition-colors"
          >
            <span className="font-cinzel text-sm tracking-wider">View All Guardians</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Character Image */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${currentGuardian.color} opacity-20 blur-[60px] transition-all duration-500`}
              />
              
              {/* Character image */}
              <div className="relative character-pedestal">
                <img
                  src={currentGuardian.image}
                  alt={currentGuardian.name}
                  className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/50 to-transparent" />
            </div>
          </div>

          {/* Character Info */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="mb-8">
              <span className="font-cinzel text-sm tracking-wider text-mostar-yellow-400 uppercase mb-2 block">
                {currentGuardian.title}
              </span>
              <h3 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-white mb-4">
                {currentGuardian.name}
              </h3>
              <div className="ornate-divider w-full mb-6" />
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                {currentGuardian.description}
              </p>
              
              {/* View Detail Link */}
              <Link 
                to={`/guardian/${currentGuardian.id}`}
                className="inline-flex items-center gap-2 btn-primary group"
              >
                <span>Enter Realm</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Guardian Selector */}
            <div className="space-y-3">
              <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase">
                Select Guardian
              </span>
              <div className="flex flex-wrap gap-3">
                {guardians.map((guardian, index) => (
                  <button
                    key={guardian.id}
                    onClick={() => setActiveGuardian(index)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm border transition-all duration-300 ${
                      activeGuardian === index
                        ? `bg-gradient-to-r ${guardian.color} border-transparent text-white shadow-glow-yellow`
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {guardian.icon}
                    <span className="font-cinzel text-sm hidden sm:inline">
                      {guardian.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guardian Cards Grid */}
        <div
          className={`grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {guardians.map((guardian, index) => (
            <Link
              key={guardian.id}
              to={`/guardian/${guardian.id}`}
              className={`group relative p-6 rounded-sm border transition-all duration-300 text-left card-hover ${
                activeGuardian === index
                  ? 'bg-white/10 border-mostar-yellow-500/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${guardian.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="text-white">{guardian.icon}</div>
              </div>
              <h4 className="font-cinzel text-lg font-semibold text-white mb-1">
                {guardian.name}
              </h4>
              <p className="text-sm text-white/50">{guardian.title}</p>
              
              {/* Active indicator */}
              {activeGuardian === index && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-mostar-yellow-400 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Characters;

