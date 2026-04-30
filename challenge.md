const MacroProblemSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="challenge" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Block A: Editorial Split */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">The Challenge</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-[#0A1224]">The ₦4 Trillion Market Gap. </span>
              <span className="text-slate-400">Nigeria is the country with the largest number of people without energy access in the world.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              Sustainable Development Goal 7 cannot be globally achieved without significant, institutional-level progress in Nigeria.
            </p>
          </div>
        </motion.div>

        {/* Block B: Bento Grid */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {/* Card 1: Image */}
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden h-[280px] lg:h-[320px]">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" 
              alt="Solar installation" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Card 2: 85 Million */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between h-[280px] lg:h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">85M</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">People Unserved</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                People without access to reliable power (43% of the population).
              </p>
            </div>
          </motion.div>

          {/* Card 3: $14 Billion */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between h-[280px] lg:h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">$14B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Capital Drain</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Capital drained annually on fossil fuel generators.
              </p>
            </div>
          </motion.div>

          {/* Card 4: $9.2 Billion (Accent) */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between h-[280px] lg:h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">$9.2B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Market Opportunity</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The immediate, untapped clean energy market opportunity.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Block C: Editorial Split (Solution) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">The Solution</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-[#0A1224]">
              Integrated Investment & Collective Risk Management.
            </h3>
            <div className="flex flex-col gap-4 text-lg text-gray-600 leading-relaxed">
              <p>
                While the demand for clean energy infrastructure is unprecedented, domestic institutional investors have historically been sidelined by foreign exchange (FX) risks and fragmented project structuring.
              </p>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[var(--color-accent-green)] font-medium text-left hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-1 text-base mt-2"
              >
                {isExpanded ? "View less" : "View more"}
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4">
                      The Clean Energy Local Currency Fund (CeF) was engineered to solve this. We utilize an Integrated Investment Approach—structuring transactions around the specific risks of each asset. By providing strictly local currency (₦) funding, we insulate our investors from FX shocks. In collaboration with our development partners, we mobilize blended finance to aggressively de-risk assets, making climate-smart technologies highly lucrative for private capital.
                    </p>
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

