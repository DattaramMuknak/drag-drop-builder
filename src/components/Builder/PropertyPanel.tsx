import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import TextForm from '../Forms/TextForm';
import ImageForm from '../Forms/ImageForm';
import ButtonForm from '../Forms/ButtonForm';
import ContainerForm from '../Forms/ContainerForm';

const PropertyPanel: React.FC = () => {
  const { state, deleteElement } = useBuilder();
  const selectedElement = state.selectedElementId 
    ? state.elements[state.selectedElementId] 
    : null;

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-secondary-200 p-4">
        <div className="text-center text-secondary-500 mt-8">
          <div className="text-4xl mb-4">⚙️</div>
          <div className="text-lg font-medium mb-2">Properties</div>
          <div className="text-sm">Select an element to edit its properties</div>
        </div>
      </div>
    );
  }

  const renderForm = () => {
    switch (selectedElement.type) {
      case 'text':
        return <TextForm element={selectedElement} />;
      case 'image':
        return <ImageForm element={selectedElement} />;
      case 'button':
        return <ButtonForm element={selectedElement} />;
      case 'container':
        return <ContainerForm element={selectedElement} />;
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-secondary-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary-800">
          Properties
        </h3>
        <button
          onClick={() => deleteElement(selectedElement.id)}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          Delete
        </button>
      </div>
      
      <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
        <div className="text-sm font-medium text-secondary-700">
          {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Element
        </div>
        <div className="text-xs text-secondary-500 mt-1">
          ID: {selectedElement.id.slice(0, 8)}...
        </div>
      </div>

      {renderForm()}
    </div>
  );
};

export default PropertyPanel;
