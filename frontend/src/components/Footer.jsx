import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div>
            <h3 className="text-2xl font-bold mb-4">NearbyHero</h3>
            <p className="text-gray-400">
              Connecting neighbors to build stronger, more caring communities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>How It Works</li>
              <li>Browse Requests</li>
              <li>Create Request</li>
              <li>Safety Center</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          © 2024 NearbyHero. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
