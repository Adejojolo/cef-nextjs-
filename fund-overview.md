const FundOverviewSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="overview" className="py-24 lg:py-32 bg-[#F4F4F6] text-[#0A1224] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized 2-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-7/12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Fund Overview
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">Strategic Focus &</span><br />
              <span className="text-gray-400">Value Creation</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-gray-600 leading-relaxed max-w-md md:text-right">
              The Clean Energy Local Currency Fund provides institutional investors with risk-adjusted returns through strategic investments in Nigeria's renewable energy transition.
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-5/12 flex flex-col justify-start"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-md">
              Structured to mitigate currency risk and ensure capital preservation, the fund bridges the gap between commercial capital and high-impact climate infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto bg-[#0A1224] text-white hover:bg-[var(--color-accent)] px-8 py-4 rounded text-sm font-medium transition-colors">
                Download Fact Sheet
              </button>
              <a href="#downloads" className="text-[#0A1224] hover:text-[var(--color-accent-green)] text-sm font-medium transition-colors flex items-center gap-2">
                View All Downloads <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
