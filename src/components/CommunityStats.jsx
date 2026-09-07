"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CommunityStats = () => {
  const [counts, setCounts] = useState({
    ideas: 0,
    users: 0,
    comments: 0,
    collaborations: 0
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "AI Researcher",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&size=60",
      content: "IdeaVault helped me validate my AI startup idea with real feedback from experts. I found my co-founder here!",
      rating: 5,
      idea: "AI-Powered Healthcare Assistant"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Designer",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff&size=60",
      content: "The community feedback transformed my rough concept into a detailed product plan. This platform is a game-changer.",
      rating: 5,
      idea: "Sustainable Fashion Marketplace"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Entrepreneur",
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff&size=60",
      content: "I found investors and collaborators through IdeaVault. The discussions helped me refine my pitch and business model.",
      rating: 5,
      idea: "VR Education Platform"
    }
  ];

  // Animated counter
  useEffect(() => {
    const targetCounts = {
      ideas: 1247,
      users: 856,
      comments: 4289,
      collaborations: 342
    };

    const duration = 2000;
    const steps = 60;
    const increment = {
      ideas: targetCounts.ideas / steps,
      users: targetCounts.users / steps,
      comments: targetCounts.comments / steps,
      collaborations: targetCounts.collaborations / steps
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounts(prev => ({
        ideas: Math.min(Math.floor(increment.ideas * currentStep), targetCounts.ideas),
        users: Math.min(Math.floor(increment.users * currentStep), targetCounts.users),
        comments: Math.min(Math.floor(increment.comments * currentStep), targetCounts.comments),
        collaborations: Math.min(Math.floor(increment.collaborations * currentStep), targetCounts.collaborations)
      }));
      if (currentStep >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"></div>
      
      {/* Animated particles background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {[
            { icon: "💡", label: "Ideas Shared", value: counts.ideas },
            { icon: "👥", label: "Community Members", value: counts.users },
            { icon: "💬", label: "Comments", value: counts.comments },
            { icon: "🤝", label: "Collaborations", value: counts.collaborations }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:border-white/30"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                {stat.value.toLocaleString()}+
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
              
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What Our Community Says
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real stories from innovators who turned their ideas into reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:border-white/30"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-emerald-400 transition-colors">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                "{testimonial.content}"
              </p>

              {/* Idea Tag */}
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                💡 {testimonial.idea}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/addidea">
            <button className="group px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105 transform inline-flex items-center gap-3">
              <span>Join the Community</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;