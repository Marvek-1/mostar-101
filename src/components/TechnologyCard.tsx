import React from 'react';
import { motion } from 'framer-motion';

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  status?: string;
  subtitle?: string;
  delay?: number;
}

const colorClasses: Record<string, { iconBg: string; border: string; dot: string; statusClass: string }> = {
  blue: { iconBg: 'bg-mostar-blue/10', border: 'border-mostar-blue/30', dot: 'bg-mostar-light-blue', statusClass: 'bg-mostar-blue/15 text-mostar-light-blue border-mostar-blue/30' },
  cyan: { iconBg: 'bg-mostar-cyan/10', border: 'border-mostar-cyan/30', dot: 'bg-mostar-cyan', statusClass: 'bg-mostar-cyan/15 text-mostar-cyan border-mostar-cyan/30' },
  green: { iconBg: 'bg-mostar-green/10', border: 'border-mostar-green/30', dot: 'bg-mostar-green', statusClass: 'bg-mostar-green/15 text-mostar-green border-mostar-green/30' },
  magenta: { iconBg: 'bg-mostar-magenta/10', border: 'border-mostar-magenta/30', dot: 'bg-mostar-magenta', statusClass: 'bg-mostar-magenta/15 text-mostar-magenta border-mostar-magenta/30' },
  purple: { iconBg: 'bg-mostar-purple/10', border: 'border-mostar-purple/30', dot: 'bg-mostar-purple', statusClass: 'bg-mostar-purple/15 text-mostar-purple border-mostar-purple/30' },
};

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  title,
  description,
  icon,
  features,
  color = 'blue',
  status = 'LIVE',
  subtitle,
}) => {
  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 p-7 transition-all duration-500 hover:border-white/20 hover:translate-y-[-6px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
      style={{ background: 'rgba(10, 14, 23, 0.6)', backdropFilter: 'blur(16px)' }}
    >
      {/* Hover sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className={`p-3 rounded-xl ${classes.iconBg} ${classes.border} border`}>
          {icon}
        </div>
        <span className={`font-mono text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border font-bold ${classes.statusClass}`}>
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-mostar-light-blue transition-colors duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-white/40 font-medium mb-3">{subtitle}</p>
        )}
        <p className="text-[13px] text-white/55 mb-5 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border bg-black/20 ${classes.border}`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${classes.dot}`} />
              <span className="text-[11px] text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling code bg */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="font-mono text-[9px] text-white/30">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="my-0.5">
              {`> ${title.split(' ')[0].toLowerCase()}_module.init();`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyCard;
