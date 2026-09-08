"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FaXTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaYoutube, 
  FaDiscord 
} from 'react-icons/fa6';
import { 
  FiMail, 
  FiMapPin, 
  FiClock 
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: 'Explore Ideas', href: '/ideas' },
    { name: 'Submit Idea', href: '/add-idea' },
    { name: 'Categories', href: '/categories' },
    { name: 'Trending', href: '/ideas?sort=trending' },
    { name: 'About Us', href: '/about' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Community Guidelines', href: '/guidelines' },
    { name: 'Report Issue', href: '/report' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: FaXTwitter, href: 'https://twitter.com', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com', color: 'hover:text-white' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com', color: 'hover:text-red-500' },
    { name: 'Discord', icon: FaDiscord, href: 'https://discord.com', color: 'hover:text-indigo-400' },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Glowing orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">💡</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  IdeaVault
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-sm">
              Where innovation meets collaboration. Share, discover, and validate 
              startup ideas with a community of like-minded innovators.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Built with</span>
              <span className="text-xl">❤️</span>
              <span className="text-sm text-gray-500">for innovators</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Connect
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                <FiMail className="text-gray-400" />
                <a href="mailto:hello@ideavault.com" className="hover:text-emerald-400 transition-colors">
                  hello@ideavault.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FiMapPin className="text-gray-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FiClock className="text-gray-400" />
                <span>24/7 Community Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="text-lg text-gray-300 group-hover:text-current transition-colors" />
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-900 dark:bg-black text-gray-600 text-sm">✦</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} IdeaVault. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-emerald-400 transition-colors">
              Cookies
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-gray-600 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;