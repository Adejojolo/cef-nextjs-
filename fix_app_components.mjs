import fs from 'fs';

let content = fs.readFileSync('src/components/AppComponents.tsx', 'utf-8');

// Fix paths since we moved from src/ to src/components/
content = content.replace(/from "\.\/components\//g, 'from "./');
content = content.replace(/from "\.\/pages\//g, 'from "../pages/');
content = content.replace(/from "\.\/data\//g, 'from "../data/');
content = content.replace(/from "\.\/lib\//g, 'from "../lib/');

// Remove react-router-dom Router elements
content = content.replace(/<Router>[\s\S]*?<ScrollToTop \/>/, '');
content = content.replace(/<Routes>[\s\S]*?<\/Routes>/, '{children}');
content = content.replace(/<Navbar \/>/, '');
content = content.replace(/<Footer \/>/, '');
content = content.replace(/<\/div>\s*<\/Router>/, '</div>');

// Remove import BrowserRouter
content = content.replace(/import { BrowserRouter as Router, Routes, Route } from "react-router-dom";/, '');
fs.writeFileSync('src/components/AppComponents.tsx', content);

// Also need to fix app/layout.tsx to import Navbar correctly
let layout = fs.readFileSync('app/layout.tsx', 'utf-8');
layout = layout.replace('from "../src/components/Navbar"', 'from "../src/components/AppComponents"');
fs.writeFileSync('app/layout.tsx', layout);
