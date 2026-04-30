"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '../data/articles';
import { cn } from '../lib/utils';

export const NewsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredArticles = articles.slice(0, 3);
  const gridArticles = articles.slice(3, 12); // 9 articles for the grid

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isDarkMode ? "bg-[#0A1224] text-white" : "bg-white text-[#1A1A1A]")}>
      <main className="flex-grow pt-[140px]">
        <div className="max-w-7xl mx-auto px-6 pb-24">
          
          {/* Hero Featured Article Slider */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-16 group">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute inset-0"
              >
                <img src={featuredArticles[currentSlide].image} alt={featuredArticles[currentSlide].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
                  className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 z-10"
                >
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${featuredArticles[currentSlide].color}1A`,
                      borderColor: `${featuredArticles[currentSlide].color}33`, 
                      color: featuredArticles[currentSlide].color
                    }}
                  >
                    {featuredArticles[currentSlide].category}
                  </span>
                  <Link href={`/news/${featuredArticles[currentSlide].id}`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-4 hover:text-[var(--color-accent-green)] transition-colors">
                      {featuredArticles[currentSlide].title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <span>{featuredArticles[currentSlide].date}</span>
                    <span>•</span>
                    <span>{featuredArticles[currentSlide].readTime}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-3 z-20">
              {featuredArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    currentSlide === idx ? "w-8 bg-white" : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length)}
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)}
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Blog Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-medium mb-2">News & Insights</h1>
              <p className={cn("text-lg", isDarkMode ? "text-white/60" : "text-[#1A1A1A]/60")}>
                Here, we share market insights, fund updates, and stories that inspire sustainable growth.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4 text-sm font-medium overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <button className={cn("whitespace-nowrap", isDarkMode ? "text-white" : "text-[#1A1A1A]")}>All</button>
                <button className={cn("whitespace-nowrap", isDarkMode ? "text-white/50 hover:text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]")}>Market Insights</button>
                <button className={cn("whitespace-nowrap", isDarkMode ? "text-white/50 hover:text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]")}>Fund Updates</button>
                <button className={cn("whitespace-nowrap", isDarkMode ? "text-white/50 hover:text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]")}>Impact Report</button>
              </div>
              <div className="flex items-center gap-4 border-l pl-6 border-gray-200 dark:border-white/10">
                <span className={cn("text-sm whitespace-nowrap", isDarkMode ? "text-white/50" : "text-[#1A1A1A]/50")}>Sort by: Newest</span>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={cn("p-2 rounded-full border transition-colors shrink-0", isDarkMode ? "border-white/10 text-white/60 hover:text-[var(--color-accent-green)]" : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[var(--color-accent-green)]")}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
            {gridArticles.map(article => (
              <Link href={`/news/${article.id}`} key={article.id} className="group flex flex-col">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${article.color}1A`,
                        borderColor: `${article.color}33`, 
                        color: article.color
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className={cn("flex items-center gap-2 text-xs font-medium mb-3", isDarkMode ? "text-white/50" : "text-[#1A1A1A]/50")}>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className={cn("text-xl font-medium leading-snug mb-3 transition-colors", isDarkMode ? "group-hover:text-[var(--color-accent-green)]" : "group-hover:text-[var(--color-accent-green)]")}>
                  {article.title}
                </h3>
                <p className={cn("text-sm line-clamp-2 leading-relaxed", isDarkMode ? "text-white/70" : "text-[#1A1A1A]/70")}>
                  {article.deck}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mb-24">
            <button className={cn("w-10 h-10 rounded-full flex items-center justify-center border", isDarkMode ? "border-white/10 text-white/50 hover:bg-white/5" : "border-gray-200 text-gray-500 hover:bg-gray-50")}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className={cn("w-10 h-10 rounded-full flex items-center justify-center font-medium", isDarkMode ? "bg-white text-black" : "bg-[#1A1A1A] text-white")}>1</button>
            <button className={cn("w-10 h-10 rounded-full flex items-center justify-center font-medium", isDarkMode ? "text-white/70 hover:bg-white/5" : "text-[#1A1A1A]/70 hover:bg-gray-50")}>2</button>
            <button className={cn("w-10 h-10 rounded-full flex items-center justify-center font-medium", isDarkMode ? "text-white/70 hover:bg-white/5" : "text-[#1A1A1A]/70 hover:bg-gray-50")}>3</button>
            <span className={cn("px-2", isDarkMode ? "text-white/50" : "text-gray-400")}>...</span>
            <button className={cn("w-10 h-10 rounded-full flex items-center justify-center border", isDarkMode ? "border-white/10 text-white/50 hover:bg-white/5" : "border-gray-200 text-gray-500 hover:bg-gray-50")}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (2 stacked blocks) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Dark Block */}
              <div className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col justify-between h-[240px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-green)]/10 rounded-full blur-3xl" />
                <div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2 leading-tight">Invest in the Future of Clean Energy</h3>
                </div>
                <Link href="/#invest" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium w-fit hover:bg-[var(--color-accent-green)] hover:text-white transition-colors">
                  Investor Portal <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Image Stat Block */}
              <div className="rounded-2xl overflow-hidden h-[240px] relative group">
                <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop" alt="Solar panels" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-sm font-medium text-white/80 mb-1">Active Projects</p>
                  <p className="text-4xl font-medium">24</p>
                </div>
              </div>
            </div>
            {/* Right Column (Large Image Block) */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden h-[504px] relative group">
              <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop" alt="Wind turbines" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-12 text-center">
                <h3 className="text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl mx-auto">
                  Beyond returns, creating sustainable impact for generations
                </h3>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
