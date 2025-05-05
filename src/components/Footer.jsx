// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPaw } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <FaPaw className="text-pink-400" />
          <span>Pet Clinic & Store</span>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
          <a href="/about" className="hover:text-white transition">О нас</a>
          <a href="/services" className="hover:text-white transition">Услуги</a>
          <a href="/contact" className="hover:text-white transition">Контакты</a>
          <a href="/faq" className="hover:text-white transition">FAQ</a>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Pet Clinic & Store. Все права защищены.
      </div>
    </footer>
  );
}
