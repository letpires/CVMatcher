import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">CV Matcher</h3>
            <p className="text-gray-400">Match, prepare, and apply with confidence</p>
          </div>
          <div className="flex space-x-8">
            <div>
              <h4 className="font-medium mb-2">Product</h4>
              <ul className="text-sm text-gray-400">
                <li className="mb-1">Features</li>
                <li className="mb-1">Pricing</li>
                <li className="mb-1">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Company</h4>
              <ul className="text-sm text-gray-400">
                <li className="mb-1">About Us</li>
                <li className="mb-1">Contact</li>
                <li className="mb-1">Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CV Matcher. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 