import React, { useEffect, useState } from "react";
import { Product, Category, Settings } from "../types";
import ProductCard from "../components/ProductCard";
import RequestForm from "../components/RequestForm";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Wrench, Zap } from "lucide-react";

export default function Home({ settings }: { settings: Settings | null }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(setProducts);
    fetch("/api/categories").then(res => res.json()).then(setCategories);
  }, []);

  const services = products.filter(p => p.type === 'service');
  const items = products.filter(p => p.type === 'product');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden" style={{ backgroundColor: settings?.primaryColor ? `${settings.primaryColor}E6` : '#1e293b' }}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-5xl mx-auto z-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Precision Instruments for <br className="hidden sm:block" />
            <span className="text-blue-300" style={{ color: settings?.primaryColor ? '#ffffff' : undefined }}>Industrial Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto font-light"
          >
            {settings?.seoDescription || "Expert calibration, testing, repair, and sales of industrial instruments. Ensuring compliance and precision for your operations."}
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#contact" className="inline-flex items-center justify-center bg-white text-slate-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
              Request Service <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#products" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
              View Products
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600" style={{ color: settings?.primaryColor }}>
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certified Calibration</h3>
              <p className="text-slate-600">ISO compliant testing and calibration for all major instrument brands.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600" style={{ color: settings?.primaryColor }}>
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Repair</h3>
              <p className="text-slate-600">Fast turnaround times with genuine parts and guaranteed workmanship.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600" style={{ color: settings?.primaryColor }}>
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">New Sales</h3>
              <p className="text-slate-600">Authorized dealer for premium industrial sensors and control systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3" style={{ color: settings?.primaryColor }}>What We Do</h2>
          <h3 className="text-4xl font-extrabold text-slate-900">Professional Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ProductCard key={service.id} item={service} settings={settings} />
          ))}
          {services.length === 0 && (
            <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500">No services available yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3" style={{ color: settings?.primaryColor }}>Equipment</h2>
            <h3 className="text-4xl font-extrabold text-slate-900">Products & Instruments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(product => (
              <ProductCard key={product.id} item={product} settings={settings} />
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No products available yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50" style={{ backgroundColor: settings?.primaryColor ? `${settings.primaryColor}20` : undefined }}></div>
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Request Service or Quote</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Fill out the form below with your requirements and our technical team will get back to you within 24 hours.</p>
            </div>
            <RequestForm settings={settings} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
