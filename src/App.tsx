import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BuilderProvider } from './context/BuilderContext';
import Layout from './components/Layout/Layout';
import ElementPalette from './components/Builder/ElementPalette';
import Canvas from './components/Builder/Canvas';
import PropertyPanel from './components/Builder/PropertyPanel';
import Toolbar from './components/Builder/Toolbar';

// Detect touch device
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const dndBackend = isTouchDevice ? TouchBackend : HTML5Backend;

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'elements' | 'properties' | 'canvas'>('canvas');

  return (
    <DndProvider backend={dndBackend}>
      <BuilderProvider>
        <Layout>
          {/* Desktop Layout */}
          <div className="hidden lg:flex h-full">
            <ElementPalette />
            <div className="flex-1 flex flex-col">
              <Toolbar />
              <div className="flex-1 overflow-auto p-4 bg-secondary-50">
                <Canvas />
              </div>
            </div>
            <PropertyPanel />
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden flex flex-col h-full">
            <Toolbar />
            
            {/* Mobile Tab Navigation */}
            <div className="bg-white border-b border-secondary-200 flex">
              {[
                { key: 'elements', label: 'Elements', icon: '🧩' },
                { key: 'canvas', label: 'Canvas', icon: '🎨' },
                { key: 'properties', label: 'Properties', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePanel(tab.key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                    activePanel === tab.key
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-secondary-600 hover:text-secondary-800'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Panel Content */}
            <div className="flex-1 overflow-hidden">
              {activePanel === 'elements' && (
                <div className="h-full p-4 bg-white">
                  <ElementPalette />
                </div>
              )}
              {activePanel === 'canvas' && (
                <div className="h-full overflow-auto p-4 bg-secondary-50">
                  <div className="min-w-max">
                    <Canvas />
                  </div>
                </div>
              )}
              {activePanel === 'properties' && (
                <div className="h-full bg-white">
                  <PropertyPanel />
                </div>
              )}
            </div>
          </div>
        </Layout>
      </BuilderProvider>
    </DndProvider>
  );
};

export default App;
