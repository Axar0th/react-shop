import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Navbar from './components/Navbar'
import Database from './pages/Database'
import Home from './pages/Home'
import ProductUpdate from './pages/Update'
import InsertProduct from './pages/Insertproduct'
import Dashboard from './pages/Dashboad'
import Sell from './pages/Sell'
// const About = React.lazy(() => import("./pages/About"));
// const Dashboard = React.lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/database" element={<Database />} />
        <Route path="/update/:id" element={<ProductUpdate />} />
        <Route path="/create" element={<InsertProduct />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}