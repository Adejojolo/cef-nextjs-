import fs from "fs";

const appComponentsContent = fs.readFileSync("src/components/AppComponents.tsx", "utf-8");

const startIdx = appComponentsContent.indexOf("export const Navbar = () => {");
const endIdx = appComponentsContent.indexOf("export const Home = () => {");

if (startIdx !== -1 && endIdx !== -1) {
    const navbarCode = appComponentsContent.substring(startIdx, endIdx);
    
    const topImportsCode = appComponentsContent.substring(0, appComponentsContent.indexOf("// --- Components ---") + 22);

    const newNavbarContent = `"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lock, X, Menu, Download } from "lucide-react";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { portfolioData } from "../data/projects";

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

` + navbarCode;

    fs.writeFileSync("src/components/Navbar.tsx", newNavbarContent);

    // Remove Navbar from AppComponents.tsx
    const newAppCompContent = appComponentsContent.substring(0, startIdx) + "\n\n" + appComponentsContent.substring(endIdx);
    fs.writeFileSync("src/components/AppComponents.tsx", newAppCompContent);
}

// Modify layout to import from Navbar
const layoutContent = fs.readFileSync("src/app/layout.tsx", "utf-8");
const newLayoutContent = layoutContent.replace('import { Navbar } from "../components/AppComponents";', 'import { Navbar } from "../components/Navbar";');
fs.writeFileSync("src/app/layout.tsx", newLayoutContent);

