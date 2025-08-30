import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface TextElementProps {
  element: ElementData;
  isSelected: boolean;
  onSelect: () => void;
  scale?: number;
}

const TextElement: React.FC<TextElementProps> = ({ element, isSelected, onSelect, scale = 1 }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'existing-element',
    item: { type: 'existing-element', id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      ref={drag}
      className={`absolute cursor-move select-none touch-none ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
      style={{
        left: element.position.x * scale,
        top: element.position.y * scale,
        width: element.size.width * scale,
        height: element.size.height * scale,
      }}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      layout
    >
      <div
        className="w-full h-full flex items-center justify-start p-2 rounded"
        style={{
          fontSize: `${parseInt(element.properties.fontSize) * scale}px`,
          color: element.properties.color,
          fontWeight: element.properties.fontWeight,
          textAlign: element.properties.textAlign,
        }}
      >
        {element.properties.content}
      </div>
      
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
          Text
        </div>
      )}
    </motion.div>
  );
};

export default TextElement;
