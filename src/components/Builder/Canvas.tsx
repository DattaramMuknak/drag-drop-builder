import React, { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import TextElement from '../Elements/TextElement';
import ImageElement from '../Elements/ImageElement';
import ButtonElement from '../Elements/ButtonElement';
import ContainerElement from '../Elements/ContainerElement';

const Canvas: React.FC = () => {
  const { state, addElement, selectElement } = useBuilder();
  const [scale, setScale] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });

  // Responsive canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      if (containerWidth < 768) { // Mobile
        setCanvasSize({ width: containerWidth - 32, height: 600 });
        setScale(0.8);
      } else if (containerWidth < 1024) { // Tablet
        setCanvasSize({ width: 800, height: 600 });
        setScale(0.9);
      } else { // Desktop
        setCanvasSize({ width: 1200, height: 800 });
        setScale(1);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: ['element', 'existing-element'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasElement = document.querySelector('[data-canvas="true"]');
      
      if (!offset || !canvasElement) return;

      const canvasRect = canvasElement.getBoundingClientRect();
      
      const position = {
        x: (offset.x - canvasRect.left) / scale,
        y: (offset.y - canvasRect.top) / scale,
      };

      if (item.elementType) {
        addElement(item.elementType, position);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const canvasRef = useCallback((node: HTMLDivElement | null) => {
    drop(node);
  }, [drop]);

  const renderElement = (element: any) => {
    const commonProps = {
      key: element.id,
      element,
      isSelected: state.selectedElementId === element.id,
      onSelect: () => selectElement(element.id),
      scale,
    };

    switch (element.type) {
      case 'text':
        return <TextElement {...commonProps} />;
      case 'image':
        return <ImageElement {...commonProps} />;
      case 'button':
        return <ButtonElement {...commonProps} />;
      case 'container':
        return <ContainerElement {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div
        ref={canvasRef}
        data-canvas="true"
        className={`relative bg-white border-2 border-dashed transition-all duration-200 overflow-hidden rounded-lg ${
          isOver ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'
        }`}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        onClick={() => selectElement(null)}
      >
        {isOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-primary-50 bg-opacity-50"
          >
            <div className="text-primary-600 text-lg font-medium">
              Drop element here
            </div>
          </motion.div>
        )}
        
        {Object.values(state.elements).map(renderElement)}
        
        {Object.keys(state.elements).length === 0 && !isOver && (
          <div className="absolute inset-0 flex items-center justify-center text-secondary-500">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-lg font-medium mb-2">Start Building</div>
              <div className="text-sm px-4">
                {window.innerWidth < 768 
                  ? 'Switch to Elements tab to add components'
                  : 'Drag elements from the palette to begin'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
