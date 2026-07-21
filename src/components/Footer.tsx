import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="text-xl font-bold text-primary">Discussions</span>
          <p className="mt-3 text-sm text-secondary max-w-sm">
            A place to work through mathematics together — one branch, one
            operation, one idea at a time.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link to="/discussions" className="hover:text-primary">Discussions</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/login" className="hover:text-primary">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><a href="mailto:hello@discussions.app" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-secondary">
          © {new Date().getFullYear()} Discussions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
