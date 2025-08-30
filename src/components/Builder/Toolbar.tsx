import React from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';

const Toolbar: React.FC = () => {
  const { state } = useBuilder();
  const elementCount = Object.keys(state.elements).length;

  const toolbarActions = [
    { icon: '↶', label: 'Undo', action: () => console.log('Undo') },
    { icon: '↷', label: 'Redo', action: () => console.log('Redo') },
    { icon: '📋', label: 'Copy', action: () => console.log('Copy') },
    { icon: '📌', label: 'Paste', action: () => console.log('Paste') },
  ];

  return (
    <div className="bg-white border-b border-secondary-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Actions - Responsive */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {toolbarActions.slice(0, window.innerWidth < 640 ? 2 : 4).map((action, index) => (
            <motion.button
              key={index}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors text-sm"
              onClick={action.action}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={action.label}
            >
              {action.icon}
            </motion.button>
          ))}
        </div>

        {/* Stats - Responsive */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-secondary-600">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="hidden sm:inline">Elements:</span>
            <span className="sm:hidden">📊</span>
            <span className="font-medium text-primary-600">{elementCount}</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span>Canvas:</span>
            <span className="font-medium">
              {state.canvas.width} × {state.canvas.height}
            </span>
          </div>
        </div>

        {/* Device Preview - Desktop Only */}
        <div className="hidden lg:flex items-center space-x-2">
          <motion.button
            className="px-3 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Desktop
          </motion.button>
          <motion.button
            className="px-3 py-1 text-xs text-secondary-500 rounded-lg hover:bg-secondary-100 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Tablet
          </motion.button>
          <motion.button
            className="px-3 py-1 text-xs text-secondary-500 rounded-lg hover:bg-secondary-100 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Mobile
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
