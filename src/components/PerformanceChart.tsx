"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { year: '2019', nav: 100 },
  { year: '2020', nav: 108 },
  { year: '2021', nav: 115 },
  { year: '2022', nav: 124 },
  { year: '2023', nav: 136 },
  { year: '2024', nav: 152 },
];

export const PerformanceChart = () => {
  return (
    <section className="py-24 bg-white text-[#1A1A1A] relative z-20 border-t border-[#1A1A1A]/10">
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#6B80A6]">
                  Fund Performance
                </span>
              </div>
              <h2 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight">
                <span className="text-slate-900">Historical Net Asset Value </span>
                <span className="text-slate-400">(NAV)</span>
              </h2>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex gap-8">
              <div>
                <div className="text-3xl font-light mb-1">15.2%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50">Annualized Return</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-1">₦730M</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50">Total Dividends</div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="h-[400px] w-full bg-[#F4F4F6] rounded-3xl p-6 md:p-8 border border-[#1A1A1A]/10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0085CA" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0085CA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A1A1A" strokeOpacity={0.1} />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1A1A1A', opacity: 0.5, fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1A1A1A', opacity: 0.5, fontSize: 12 }}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    borderRadius: '8px',
                    border: 'none',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: 'white' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="nav" 
                  stroke="#0085CA" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorNav)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
