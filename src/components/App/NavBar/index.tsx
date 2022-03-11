import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function NavBar() {
  return (
    <div className="w-full min-width-screen shadow-sm">
      <nav className="bg-gray-900 px-2 sm:px-4 py-2.5 border-gray-700 border-solid border-b-2">
        <div className="container flex mx-auto">
          <Link to="/" className="nav-link">
            SegWit
          </Link>
          <Link to="/multisig" className="nav-link">
            MultiSig
          </Link>
        </div>
      </nav>
    </div>
  );
}
