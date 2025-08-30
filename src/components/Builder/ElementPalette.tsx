import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { ElementTemplate } from '../../types';

const elementTemplates: ElementTemplate[] = [
  {
    type: 'text',
    label: 'Text',
    icon: '📝',
    defaultProperties: {
      content: 'Sample Text',
      fontSize: '16px',
      color: '#000000',
    },
  },
  {
    type: 'image',
    label: 'Image',
    icon: '🖼️',
    defaultProperties: {
      src: 'https://via.placeholder.com/200x100',
      alt: 'Sample Image',
    },
  },
  {
    type: 'button',
    label: 'Button',
    icon: '🔘',
    defaultProperties: {
      text: 'Button',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
    },
  },
  {
    type: 'container',
    label: 'Container',
    icon: '📦',
    defaultProperties: {
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
    },
  },
];

interface DraggableElementProps {
  template: ElementTemplate;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ template }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { type: 'element', elementType: template.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={drag}
      className={`p-3 sm:p-4 border-2 border-secondary-200 rounded-lg cursor-move transition-all duration-200 hover:border-primary-500 hover:shadow-md ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-xl sm:text-2xl">{template.icon}</div>
        <div className="text-xs sm:text-sm font-medium text-secondary-700 text-center">
          {template.label}
        </div>
      </div>
    </motion.div>
  );
};

const ElementPalette: React.FC = () => {
  return (
    <div className="w-full lg:w-64 bg-white lg:border-r border-secondary-200 p-4">
      <h3 className="text-lg font-semibold text-secondary-800 mb-4">
        Elements
      </h3>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-2 gap-3">
        {elementTemplates.map((template) => (
          <DraggableElement key={template.type} template={template} />
        ))}
      </div>
      
      {/* Instructions - Hidden on mobile */}
      <div className="mt-6 hidden lg:block">
        <h4 className="text-md font-medium text-secondary-700 mb-3">
          Instructions
        </h4>
        <div className="text-sm text-secondary-600 space-y-2">
          <div>• Drag elements to canvas</div>
          <div>• Tap to select & edit</div>
          <div>• Use tabs to navigate</div>
        </div>
      </div>
    </div>
  );
};

export default ElementPalette;
