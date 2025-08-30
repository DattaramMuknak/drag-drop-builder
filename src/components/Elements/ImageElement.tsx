import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ImageElementProps {
  element: ElementData;
  isSelected: boolean;
  onSelect: () => void;
}

const ImageElement: React.FC<ImageElementProps> = ({ element, isSelected, onSelect }) => {
  const { moveElement } = useBuilder();
  
  const [{ isDragging }, drag] = useDrag({
    type: 'existing-element',
    item: { type: 'existing-element', id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      ref={drag}
      className={`absolute cursor-move select-none ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
      }}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      layout
    >
      <img
        src={element.properties.src}
        alt={element.properties.alt}
        className="w-full h-full object-cover rounded-lg border border-secondary-200"
        draggable={false}
      />
      
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
          Image
        </div>
      )}
      
      {isSelected && (
        <>
          {/* Resize handles */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white cursor-se-resize"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white cursor-ne-resize"></div>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white cursor-nw-resize"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white cursor-sw-resize"></div>
        </>
      )}
    </motion.div>
  );
};

export default ImageElement;
