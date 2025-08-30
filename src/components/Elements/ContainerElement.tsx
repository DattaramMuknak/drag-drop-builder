import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ContainerElementProps {
  element: ElementData;
  isSelected: boolean;
  onSelect: () => void;
}

const ContainerElement: React.FC<ContainerElementProps> = ({ element, isSelected, onSelect }) => {
  const { moveElement, addElement } = useBuilder();
  
  const [{ isDragging }, drag] = useDrag({
    type: 'existing-element',
    item: { type: 'existing-element', id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ['element'],
    drop: (item: any, monitor) => {
      if (item.elementType && monitor.isOver({ shallow: true })) {
        // Add element to container (simplified implementation)
        const containerRect = {
          x: element.position.x,
          y: element.position.y,
          width: element.size.width,
          height: element.size.height,
        };
        
        addElement(item.elementType, {
          x: containerRect.x + 20,
          y: containerRect.y + 20,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`absolute cursor-move select-none border-2 border-dashed transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isSelected ? 'ring-2 ring-primary-500 border-primary-300' : 'border-secondary-300'} ${
        isOver ? 'border-primary-400 bg-primary-50' : ''
      }`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        backgroundColor: element.properties.backgroundColor,
        borderRadius: element.properties.borderRadius,
        padding: element.properties.padding,
      }}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: isSelected ? 1 : 1.01 }}
      layout
    >
      {!element.children?.length && !isOver && (
        <div className="flex items-center justify-center h-full text-secondary-400 text-sm">
          Drop elements here
        </div>
      )}
      
      {isOver && (
        <div className="flex items-center justify-center h-full text-primary-600 text-sm font-medium">
          Release to add element
        </div>
      )}
      
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
          Container
        </div>
      )}
    </motion.div>
  );
};

export default ContainerElement;
