"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Search, Lock, X, Menu, Download, Zap, Leaf, TrendingUp, Users, ShieldCheck, ArrowUpRight, CheckCircle2, Building2, Globe2, Sun, Wind, Battery, Droplets, ChevronRight, Layers, Aperture, Lightbulb } from "lucide-react";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { portfolioData } from "../data/projects";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const megaMenuContainer = {
  hidden: { opacity: 0, y: -10, pointerEvents: "none" as const },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as const,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, pointerEvents: "none" as const, transition: { duration: 0.2 } },
};

const megaMenuColumn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const, staggerChildren: 0.08 } },
};

const megaMenuItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const megaMenuCard = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" as const } },
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const location = typeof window !== "undefined" ? window.location : null;

  const searchResults = portfolioData.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sector.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const isArticlePage = (location?.pathname || pathname || "").startsWith("/news");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolidDark = isArticlePage;
  const isHoveringMegaMenu = activeMegaMenu !== null;
  const isSolidWhiteNav = (!isSolidDark && scrolled) || isHoveringMegaMenu;
  const useDarkText = isSolidWhiteNav || (!isSolidDark && scrolled);

  const closeMegaMenu = () => setActiveMegaMenu(null);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        isHoveringMegaMenu
          ? "bg-white border-gray-200 py-3 shadow-sm"
          : isSolidDark
            ? scrolled
              ? "bg-[var(--color-background)] border-white/10 py-2 shadow-md"
              : "bg-[var(--color-background)] border-transparent py-3"
            : scrolled
              ? "bg-white border-gray-200 py-3 shadow-sm"
              : "bg-transparent border-transparent py-5",
      )}
      onMouseLeave={closeMegaMenu}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center z-50 shrink-0"
          onClick={closeMegaMenu}
        >
          <img
            src={
              useDarkText
                ? "https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/03/Clean-Energy-Logo-1.svg"
                : "https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/09/Clean-Energy-Logo-1-2.svg"
            }
            alt="Clean Energy Local Currency Fund"
            className="h-10 w-auto transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav - Center */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {/* About Mega Menu */}
          <div
            className="group h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu("about")}
          >
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1 h-full py-2 cursor-pointer",
                useDarkText
                  ? "text-gray-800 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white",
              )}
            >
              About
            </Link>
          </div>

          <div
            className="group h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu("portfolio")}
          >
            <Link
              href="/portfolio"
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1 h-full py-2 cursor-pointer",
                useDarkText
                  ? "text-gray-800 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white",
              )}
            >
              Portfolio
            </Link>
          </div>

          <Link
            href="/impact"
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1",
              useDarkText
                ? "text-gray-800 hover:text-[var(--color-accent)]"
                : "text-white/90 hover:text-white",
            )}
            onMouseEnter={closeMegaMenu}
          >
            Impact
          </Link>

          <Link
            href="/investor-relations"
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1",
              useDarkText
                ? "text-gray-800 hover:text-[var(--color-accent)]"
                : "text-white/90 hover:text-white",
            )}
            onMouseEnter={closeMegaMenu}
          >
            Investor Relations
          </Link>

          <Link
            href="/eligibility"
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1",
              useDarkText
                ? "text-gray-800 hover:text-[var(--color-accent)]"
                : "text-white/90 hover:text-white",
            )}
            onMouseEnter={closeMegaMenu}
          >
            Eligibility Criteria
          </Link>

          {/* Media Center Mega Menu */}
          <div
            className="group h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu("news")}
          >
            <Link
              href="/resources"
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1 h-full py-2 cursor-pointer",
                useDarkText
                  ? "text-gray-800 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white",
              )}
            >
              Media Center
            </Link>
          </div>

          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1",
              useDarkText
                ? "text-gray-800 hover:text-[var(--color-accent)]"
                : "text-white/90 hover:text-white",
            )}
            onMouseEnter={closeMegaMenu}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Nav - Right */}
        <div className="hidden md:flex items-center justify-end gap-5 shrink-0 z-[110] relative">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "transition-colors flex items-center p-1 cursor-pointer",
              useDarkText
                ? "text-gray-800 hover:text-[var(--color-accent)]"
                : "text-white hover:text-white/80",
            )}
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="group/login flex items-center">
            <div
              className={cn(
                "transition-colors flex items-center p-1 cursor-pointer",
                useDarkText
                  ? "text-gray-800 hover:text-[var(--color-accent)]"
                  : "text-white hover:text-white/80",
              )}
            >
              <Lock className="w-5 h-5 stroke-[1.5]" />
            </div>

            <div className="absolute right-0 top-[40px] pt-4 w-48 opacity-0 invisible group-hover/login:opacity-100 group-hover/login:visible transition-all duration-300">
              <div className="bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden transform origin-top-right group-hover/login:translate-y-0 translate-y-2">
                <div className="py-2 flex flex-col">
                  <a
                    href="#"
                    className="px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[var(--color-accent)] transition-colors text-left flex items-center"
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[var(--color-accent)] transition-colors text-left flex items-center"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden z-50 transition-colors",
            useDarkText ? "text-black" : "text-white",
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mega Menu Dropdowns Overlay (Flush to nav and full width) */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            variants={megaMenuContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-xl z-[100] top-full"
          >
            {activeMegaMenu === "about" && (
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12 text-left">
                <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div variants={megaMenuColumn}>
                    <Link
                      href="/about"
                      onClick={closeMegaMenu}
                      className="block text-xs font-bold tracking-widest uppercase text-[#0A1224] hover:text-[var(--color-accent-green)] transition-colors mb-6"
                    >
                      About Us
                    </Link>
                    <div className="flex flex-col gap-4">
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/about#mission"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Our Mission
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/about#approach"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Our Approach
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/about#impact"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Governance & Impact
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div variants={megaMenuColumn}>
                    <Link
                      href="/fund"
                      onClick={closeMegaMenu}
                      className="block text-xs font-bold tracking-widest uppercase text-[#0A1224] hover:text-[var(--color-accent-green)] transition-colors mb-6"
                    >
                      The Fund
                    </Link>
                    <div className="flex flex-col gap-4">
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/fund#overview"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Overview
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/fund#strategy"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Investment Strategy
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/fund#impact"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Impact & SDGs
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div variants={megaMenuColumn}>
                    <Link
                      href="/governance"
                      onClick={closeMegaMenu}
                      className="block text-xs font-bold tracking-widest uppercase text-[#0A1224] hover:text-[var(--color-accent-green)] transition-colors mb-6"
                    >
                      Leadership
                    </Link>
                    <div className="flex flex-col gap-4">
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/governance#board"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Board of Directors
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/governance"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Governance
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  variants={megaMenuCard}
                  className="relative overflow-hidden rounded-xl group/prospectus cursor-pointer border border-gray-100 flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gray-900">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                      alt="Download Prospectus"
                      className="w-full h-full object-cover mix-blend-overlay opacity-40 group-hover/prospectus:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                  <div className="relative p-6 h-full flex flex-col justify-end min-h-[200px]">
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                      Download Prospectus
                    </h4>
                    <p className="text-sm text-white/80 mb-6 line-clamp-2">
                      Get comprehensive details about our fund strategy and
                      performance.
                    </p>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center w-fit gap-2">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {activeMegaMenu === "portfolio" && (
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12 text-left">
                <div className="col-span-1 lg:col-span-1 border-r border-gray-100 pr-8">
                  <motion.div variants={megaMenuColumn}>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
                      SDG Impact Highlights
                    </h4>
                    <div className="flex flex-col gap-4">
                      <motion.div
                        variants={megaMenuItem}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-md bg-[#FCC30B] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            7
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Affordable & Clean Energy
                        </span>
                      </motion.div>
                      <motion.div
                        variants={megaMenuItem}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-md bg-[#3F7E44] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            13
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Climate Action
                        </span>
                      </motion.div>
                      <motion.div
                        variants={megaMenuItem}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-md bg-[#A21942] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            8
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Decent Work & Growth
                        </span>
                      </motion.div>
                      <motion.div variants={megaMenuItem} className="mt-4">
                        <Link
                          href="/portfolio"
                          onClick={closeMegaMenu}
                          className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-green)] transition-colors flex items-center gap-1"
                        >
                          View Impact Stories{" "}
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <div className="col-span-1 lg:col-span-3">
                  <motion.div variants={megaMenuColumn}>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
                      Latest Projects
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {portfolioData.slice(0, 3).map((project, i) => (
                        <motion.div variants={megaMenuItem} key={project.id}>
                          <Link
                            href={`/portfolio/${project.id}`}
                            onClick={closeMegaMenu}
                            className="group/project block"
                          >
                            <div className="h-32 mb-4 overflow-hidden rounded-lg">
                              <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover group-hover/project:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <h5 className="text-sm font-bold text-gray-900 group-hover/project:text-[var(--color-accent)] transition-colors mb-1">
                              {project.name}
                            </h5>
                            <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">
                              {project.sector}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeMegaMenu === "news" && (
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div variants={megaMenuColumn}>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
                      News & Media
                    </h4>
                    <div className="flex flex-col gap-4">
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/news"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          All News
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/resources#press"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Press Releases
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/news"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          In the Media
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div variants={megaMenuColumn}>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
                      Resources
                    </h4>
                    <div className="flex flex-col gap-4">
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/resources#financial-reports"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Annual Reports
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/resources#esg-framework"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          ESG Framework
                        </Link>
                      </motion.div>
                      <motion.div variants={megaMenuItem}>
                        <Link
                          href="/resources#corporate-governance"
                          onClick={closeMegaMenu}
                          className="text-sm font-medium text-gray-600 hover:text-[var(--color-accent-green)] transition-colors"
                        >
                          Corporate Governance
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  variants={megaMenuCard}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-full flex flex-col justify-center"
                >
                  <h4 className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-green)] mb-4">
                    Latest Update
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    The Clean Energy Local Currency Fund successfully closes its
                    Series 2 capital raise, securing ₦15 Billion from domestic
                    institutional investors.
                  </p>
                  <a
                    href="#"
                    className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-green)] transition-colors flex items-center gap-1 mt-auto"
                  >
                    Read Press Release <ArrowUpRight className="w-3 h-3" />
                  </a>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-[var(--color-background)] z-40 flex flex-col items-center justify-start pt-24 pb-8 overflow-y-auto gap-6 transition-transform duration-500 md:hidden",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <Link
          href="/about"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/portfolio"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Portfolio
        </Link>
        <Link
          href="/impact"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Impact
        </Link>
        <Link
          href="/investor-relations"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Investor Relations
        </Link>
        <Link
          href="/eligibility"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Eligibility Criteria
        </Link>
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-medium tracking-widest uppercase text-white/50">
            News & Resources
          </span>
          <Link
            href="/news"
            className="text-lg font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            All News
          </Link>
          <Link
            href="/resources"
            className="text-lg font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resources
          </Link>
        </div>
        <Link
          href="/contact"
          className="text-2xl font-medium tracking-widest uppercase text-white hover:text-[var(--color-accent-green)] transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </Link>
        <div className="flex items-center gap-6 mt-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="text-white bg-white/10 p-3 rounded-none border border-white hover:bg-white/20 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-6 py-3 bg-electric-blue text-black border-2 border-black rounded-none font-bold shadow-[4px_4px_0_0_#ffffff]">
            <Lock className="w-4 h-4" /> Login
          </div>
        </div>
      </div>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-[var(--color-background)]/90 backdrop-blur-md flex flex-col items-center pt-32 px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-3xl relative"
            >
              <Search className="absolute left-6 top-6 w-6 h-6 text-white/50" />
              <input
                type="text"
                autoFocus
                placeholder="Search projects, sectors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-xl md:text-2xl placeholder:text-white/30 rounded-2xl py-5 pl-16 pr-8 focus:outline-none focus:border-white/30 transition-colors shadow-2xl"
              />

              {searchQuery && (
                <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/portfolio/${result.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors group last:border-b-0"
                        >
                          <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                            <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-white font-medium group-hover:text-[var(--color-accent-green)] transition-colors">{result.name}</h4>
                            <p className="text-white/50 text-xs tracking-widest uppercase">{result.sector}</p>
                          </div>
                          <div className="text-white/30 group-hover:text-[var(--color-accent-green)] transition-colors">
                            <ArrowUpRight className="w-5 h-5 mx-2" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-white/50">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      label: "Fund Highlight",
      value: "Series 2 Capital Raise Now Open for Institutional Investors",
      link: "Read Announcement",
      isMetric: false,
    },
    {
      label: "Total Dividends Paid",
      value: "₦730M",
      link: "Across two distributions",
      isMetric: true,
    },
    {
      label: "Series 1 Investors",
      value: "8",
      link: "100% Subscribed",
      isMetric: true,
    },
    {
      label: "Fund Rating",
      value: "BBB(IM)",
      link: "Investment Grade / Stable",
      isMetric: true,
    },
    {
      label: "Green Certification",
      value: "Active",
      link: "Climate Bonds Initiative",
      isMetric: true,
    },
  ];

  // Ensure video plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animations for exit
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.25]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section className="relative h-[100dvh] min-h-[600px] lg:min-h-[800px] flex flex-col justify-end pb-16 overflow-hidden bg-obsidian text-white">
      {/* Video Background Layer */}
      <motion.div
        style={{ opacity: 1 }}
        className="absolute inset-0 z-0 bg-obsidian"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source
            src="https://nolimitlms.com/wp-content/uploads/2026/04/solar_p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Flat dark overlay to guarantee text readability across the whole video */}
        <div className="absolute inset-0 bg-[#050A15]/80 z-10" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-end gap-12 mb-12"
      >
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white mb-6"
          >
            Powering a <br className="hidden md:block" />
            Resilient Future
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed font-light"
          >
            Providing local currency funding to climate-aligned, sustainable,
            and inclusive clean energy infrastructure across Nigeria.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-bold px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--color-accent-green)] hover:text-white"
            >
              Explore Funding Options <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, color: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Investor Relations <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Floating Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-[300px] xl:w-80 h-[160px] bg-obsidian/30 backdrop-blur-sm border border-white/20 border-l-2 border-l-electric-blue relative rounded-lg"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-xs tracking-widest uppercase text-white/60">
                    {slides[currentSlide].label}
                  </h3>
                </div>
                <p
                  className={cn(
                    "text-white font-medium leading-relaxed mb-4",
                    slides[currentSlide].isMetric
                      ? "text-4xl font-light"
                      : "text-sm",
                  )}
                >
                  {slides[currentSlide].value}
                </p>
              </div>
              {!slides[currentSlide].isMetric ? (
                <a
                  href="#"
                  className="text-xs font-medium text-white flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  {slides[currentSlide].link}{" "}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  {slides[currentSlide].link}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
            <motion.div
              key={currentSlide + "-progress"}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Utility Row */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 border-t border-white/20 pt-6 flex justify-between items-center"
      >
        <div className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-white/60">
          Nigeria's First Certified Green Fund
        </div>
        <div className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-white/60 flex items-center gap-2">
          Scroll to Explore
        </div>
      </motion.div>
    </section>
  );
};

export const ImpactStats = () => {
  const stats = [
    { value: "5,324+", label: "New Energy Connections" },
    { value: "21,197", label: "Tonnes CO₂ Avoided" },
    { value: "226+", label: "Jobs Created" },
    { value: "217+", label: "SMEs Supported" },
  ];

  return (
    <section className="py-24 bg-[var(--color-surface)] relative z-20 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Fund Impact
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-border-light)] transition-colors text-center"
              >
                <div className="text-4xl lg:text-5xl font-light text-white mb-4">
                  {stat.value}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section className="py-24 bg-[#F4F4F6] text-[#1A1A1A] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/60">
              About the Fund
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-16 max-w-4xl"
          >
            A specialized alternative asset vehicle providing long-term, Clean
            Energy local currency financing to sustainable infrastructure
            projects across Nigeria.
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="w-full h-[1px] bg-[#1A1A1A]/10 mb-16"
          />

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Context & CTA */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-black/50 mb-6">
                  Strategic Mandate
                </h3>
                <p className="text-lg text-black/80 leading-relaxed mb-8">
                  Managed by FundCo Capital Managers Limited, we utilize a
                  blended finance approach—including guarantees from
                  InfraCredit—to de-risk investments, allowing domestic pension
                  funds and insurance companies to participate safely in the
                  clean energy transition.
                </p>
              </div>
              <button className="bg-electric-blue text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 rounded-none text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#000000] w-fit">
                Discover the Fund <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Column 2: Image Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-none border-2 border-black p-6 flex flex-col shadow-[4px_4px_0_0_#000000]"
            >
              <div className="h-48 rounded-none border-2 border-black overflow-hidden mb-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
                  alt="Local Currency"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-medium mb-3">Local Currency</h4>
              <p className="text-[#1A1A1A]/60 leading-relaxed text-sm">
                Providing long-term Naira financing to eliminate exchange rate
                risks for developers and investors alike.
              </p>
            </motion.div>

            {/* Column 3: Mixed Cards */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <div className="bg-white rounded-none border-2 border-black p-8 flex-1 shadow-[4px_4px_0_0_#000000] flex flex-col justify-center">
                <div className="w-12 h-12 rounded-none border-2 border-black bg-electric-blue flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <h4 className="text-xl font-medium mb-3">Blended Finance</h4>
                <p className="text-[#1A1A1A]/60 leading-relaxed text-sm">
                  De-risking investments through strategic guarantees to
                  mobilize institutional capital.
                </p>
              </div>
              <div className="bg-obsidian text-white rounded-none border-2 border-electric-blue p-8 flex-1 shadow-[4px_4px_0_0_#00f0ff] flex flex-col justify-center relative overflow-hidden">
                <h4 className="text-sm font-medium text-electric-blue uppercase tracking-wider mb-2">
                  Status
                </h4>
                <div className="text-3xl font-bold mb-2">Certified Green</div>
                <p className="text-white/80 text-sm">
                  Climate Bonds Initiative
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { Footer } from "./Footer";


import { CaseStudy } from "./CaseStudy";
import PortfolioArchive from "./PortfolioArchive";

import { ArticlePage } from "./ArticlePage";
import { NewsPage } from "../views/NewsPage";
import { GovernancePage } from "../views/GovernancePage";
import { InvestorRelationsPage } from "../views/InvestorRelationsPage";
import { FundPage } from "../views/FundPage";
import { ImpactPage } from "../views/ImpactPage";
import { EligibilityPage } from "../views/EligibilityPage";
import { ContactPage } from "../views/ContactPage";
import { ResourcesPage } from "../views/ResourcesPage";

