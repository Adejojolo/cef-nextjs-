"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ArrowUpRight, Zap, Users, Leaf, Briefcase, Globe2 } from 'lucide-react';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const sdgs = [
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  { id: 11, name: "Sustainable Cities and Communities", color: "#FD9D24" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
];

export const SDGMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[var(--color-background)] text-white relative z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#6B80A6]">
                Global Impact
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0 mt-4">
              <span className="text-white">SDG Alignment</span> <span className="text-white/60">Map</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
              Explore our regional impact across Nigeria. Click the highlighted area to view detailed institutional metrics and SDG contributions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="lg:col-span-2 bg-[#0A1224] rounded-lg p-4 border border-white/10 relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 2500, center: [8, 9] }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isNigeria = geo.properties.name === "Nigeria";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => {
                            if (isNigeria) {
                              setSelectedCountry(selectedCountry === "Nigeria" ? null : "Nigeria");
                            }
                          }}
                          style={{
                            default: {
                              fill: isNigeria ? "var(--color-accent-green)" : "#1E293B",
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                              transition: "all 0.3s ease",
                              cursor: isNigeria ? "pointer" : "default",
                            },
                            hover: {
                              fill: isNigeria ? "var(--color-accent-light)" : "#1E293B",
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                              cursor: isNigeria ? "pointer" : "default",
                            },
                            pressed: {
                              fill: isNigeria ? "var(--color-accent)" : "#1E293B",
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
                  <span className="text-sm font-medium text-white">Active Region: Nigeria</span>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-1 flex flex-col gap-4 h-full">
              <AnimatePresence mode="wait">
                {selectedCountry === "Nigeria" ? (
                  <motion.div
                    key="nigeria-sdgs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6 bg-[#0A1224] border border-white/10 rounded-lg p-8 h-full"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60 mb-2">
                        Regional Overview
                      </div>
                      <h3 className="text-3xl font-light text-white mb-6">Nigeria</h3>
                      
                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Zap className="w-5 h-5 text-[var(--color-accent-light)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">150+ MW</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">Capacity</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Briefcase className="w-5 h-5 text-[var(--color-accent-light)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">₦15B+</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">Deployed</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Leaf className="w-5 h-5 text-[var(--color-accent-green)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">21k+</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">CO₂ Avoided</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Users className="w-5 h-5 text-[var(--color-accent-green)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">450+</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">Jobs Created</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                        Primary SDG Contributions
                      </div>
                      <div className="flex flex-col gap-3">
                        {sdgs.map((sdg, idx) => (
                          <motion.div
                            key={sdg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div 
                              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs shadow-lg shrink-0"
                              style={{ backgroundColor: sdg.color, color: sdg.id === 7 ? 'black' : 'white' }}
                            >
                              {sdg.id}
                            </div>
                            <span className="text-sm font-medium text-white/80">{sdg.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-6 border-t border-white/10">
                      <a href="/portfolio" className="flex items-center justify-between group cursor-pointer">
                        <span className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">View Regional Projects</span>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-5 h-5 text-[#0A1224]" />
                        </div>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[600px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/20 rounded-lg bg-[#0A1224]"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Globe2 className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Select a Region</h3>
                    <p className="text-white/50 text-sm max-w-[250px]">Click on highlighted regions on the map to view detailed institutional metrics and SDG alignment data.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
