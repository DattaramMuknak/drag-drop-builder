import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <motion.header 
      className="bg-white border-b border-secondary-200 px-4 sm:px-6 py-3 sm:py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-secondary-800">
              Websites.co.in Builder
            </h1>
            <p className="text-sm text-secondary-600">
              Drag & Drop Website Creator
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold text-secondary-800">
              Builder
            </h1>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-secondary-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 bg-secondary-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 bg-secondary-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-secondary-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
        
        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <motion.button
            className="px-4 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Preview
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Actions */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden mt-4 pt-4 border-t border-secondary-200 flex space-x-2"
        >
          <button className="flex-1 px-3 py-2 text-sm font-medium text-secondary-600 bg-secondary-100 rounded-lg">
            Preview
          </button>
          <button className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium">
            Save
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
