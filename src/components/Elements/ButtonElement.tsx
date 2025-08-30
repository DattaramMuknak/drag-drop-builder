import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ButtonElementProps {
  element: ElementData;
  isSelected: boolean;
  onSelect: () => void;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ element, isSelected, onSelect }) => {
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
      <button
        className="w-full h-full font-medium transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: element.properties.backgroundColor,
          color: element.properties.textColor,
          borderRadius: element.properties.borderRadius,
        }}
        onClick={(e) => e.preventDefault()}
      >
        {element.properties.text}
      </button>
      
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
          Button
        </div>
      )}
    </motion.div>
  );
};

export default ButtonElement;
