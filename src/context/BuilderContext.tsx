import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { BuilderState, ElementData } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BuilderContextType {
  state: BuilderState;
  addElement: (elementType: string, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<ElementData>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, position: { x: number; y: number }) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

type Action = 
  | { type: 'ADD_ELEMENT'; payload: ElementData }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<ElementData> } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'MOVE_ELEMENT'; payload: { id: string; position: { x: number; y: number } } };

const initialState: BuilderState = {
  elements: {},
  selectedElementId: null,
  canvas: {
    width: 1200,
    height: 800,
  },
};

function builderReducer(state: BuilderState, action: Action): BuilderState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.id]: action.payload,
        },
        selectedElementId: action.payload.id,
      };
    
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.id]: {
            ...state.elements[action.payload.id],
            ...action.payload.updates,
          },
        },
      };
    
    case 'DELETE_ELEMENT':
      const newElements = { ...state.elements };
      delete newElements[action.payload];
      return {
        ...state,
        elements: newElements,
        selectedElementId: state.selectedElementId === action.payload ? null : state.selectedElementId,
      };
    
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElementId: action.payload,
      };
    
    case 'MOVE_ELEMENT':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.id]: {
            ...state.elements[action.payload.id],
            position: action.payload.position,
          },
        },
      };
    
    default:
      return state;
  }
}

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const addElement = (elementType: string, position: { x: number; y: number }) => {
    const id = uuidv4();
    const defaultProperties = getDefaultProperties(elementType);
    
    const newElement: ElementData = {
      id,
      type: elementType as any,
      position,
      size: { width: 200, height: 100 },
      properties: defaultProperties,
    };

    dispatch({ type: 'ADD_ELEMENT', payload: newElement });
  };

  const updateElement = (id: string, updates: Partial<ElementData>) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } });
  };

  const deleteElement = (id: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: id });
  };

  const selectElement = (id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: id });
  };

  const moveElement = (id: string, position: { x: number; y: number }) => {
    dispatch({ type: 'MOVE_ELEMENT', payload: { id, position } });
  };

  return (
    <BuilderContext.Provider value={{
      state,
      addElement,
      updateElement,
      deleteElement,
      selectElement,
      moveElement,
    }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}

function getDefaultProperties(elementType: string) {
  switch (elementType) {
    case 'text':
      return {
        content: 'Sample Text',
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'normal',
        textAlign: 'left',
      };
    case 'image':
      return {
        src: 'https://via.placeholder.com/200x100',
        alt: 'Sample Image',
      };
    case 'button':
      return {
        text: 'Button',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        borderRadius: '8px',
      };
    case 'container':
      return {
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '16px',
      };
    default:
      return {};
  }
}
