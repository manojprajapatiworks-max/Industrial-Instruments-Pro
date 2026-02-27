import React, { useEffect, useState } from "react";
import { Product, Category, Settings } from "../types";
import ProductCard from "../components/ProductCard";
import RequestForm from "../components/RequestForm";
import { motion } from "motion/react";

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
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: settings?.primaryColor ? `${settings.primaryColor}E6` : '#1e293b' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Industrial Instrument Calibration & Sales
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
            {settings?.seoDescription || "Expert calibration, testing, repair, and sales of industrial instruments. Ensuring compliance and precision for your operations."}
          </p>
          <a href="#contact" className="inline-block bg-white text-slate-900 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-slate-100 transition-colors">
            Request Service
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ProductCard key={service.id} item={service} settings={settings} />
          ))}
          {services.length === 0 && <p className="text-slate-500 col-span-full text-center">No services available yet.</p>}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100 rounded-3xl mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Products & Instruments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(product => (
            <ProductCard key={product.id} item={product} settings={settings} />
          ))}
          {items.length === 0 && <p className="text-slate-500 col-span-full text-center">No products available yet.</p>}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Request Service or Quote</h2>
          <p className="text-slate-600 text-center mb-8">Fill out the form below and our team will get back to you shortly.</p>
          <RequestForm settings={settings} />
        </div>
      </section>
    </motion.div>
  );
}
