"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  const steps = [
    {
      number: "01",
      icon: "💡",
      title: "Share Your Idea",
      description: "Post your innovative idea with detailed description, category, and tags. Let the community discover your vision.",
      color: "from-emerald-400 to-teal-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800"
    },
    {
      number: "02",
      icon: "🤝",
      title: "Get Feedback",
      description: "Receive comments, suggestions, and validation from fellow innovators. Collaborate to refine your idea.",
      color: "from-blue-400 to-purple-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      number: "03",
      icon: "🚀",
      title: "Build & Launch",
      description: "Connect with like-minded people, find collaborators, and turn your idea into a reality with community support.",
      color: "from-orange-400 to-pink-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Turn Your Ideas Into
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> Reality</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Three simple steps to bring your innovative ideas to life with the power of community
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-400 opacity-30"></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-500 ${
                activeStep === index ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={`relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border ${step.borderColor} hover:border-opacity-100 ${
                activeStep === index ? 'shadow-emerald-500/10 dark:shadow-emerald-500/5' : ''
              }`}>
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`text-5xl mb-4 ${activeStep === index ? 'animate-bounce' : ''}`}>
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 flex gap-1">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === index ? 'w-8 bg-emerald-500' : 'w-4 bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Glow on active */}
              {activeStep === index && (
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-2xl opacity-20 blur-xl -z-10`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border ${step.borderColor}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Step {step.number}</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === index 
                    ? 'w-8 h-2 bg-emerald-500' 
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href={'/addidea'}>
            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform inline-flex items-center gap-3">
              <span>Start Your Journey</span>
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

export default HowItWorks;