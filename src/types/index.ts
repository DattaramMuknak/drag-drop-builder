export interface ElementData {
  id: string;
  type: 'text' | 'image' | 'button' | 'container';
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  properties: {
    [key: string]: any;
  };
  children?: string[]; // IDs of child elements
  parentId?: string;
}

export interface BuilderState {
  elements: { [key: string]: ElementData };
  selectedElementId: string | null;
  canvas: {
    width: number;
    height: number;
  };
}

export interface DragItem {
  type: string;
  id?: string;
  elementType?: 'text' | 'image' | 'button' | 'container';
}

export interface ElementTemplate {
  type: 'text' | 'image' | 'button' | 'container';
  label: string;
  icon: string;
  defaultProperties: {
    [key: string]: any;
  };
}
