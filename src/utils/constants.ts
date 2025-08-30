export const ELEMENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
} as const;

export const CANVAS_CONFIG = {
  DEFAULT_WIDTH: 1200,
  DEFAULT_HEIGHT: 800,
  MIN_WIDTH: 800,
  MAX_WIDTH: 1920,
  MIN_HEIGHT: 600,
  MAX_HEIGHT: 1080,
} as const;

export const ELEMENT_DEFAULTS = {
  SIZE: {
    width: 200,
    height: 100,
  },
  TEXT: {
    content: 'Sample Text',
    fontSize: '16px',
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  IMAGE: {
    src: 'https://via.placeholder.com/200x100/3b82f6/ffffff?text=Image',
    alt: 'Sample Image',
  },
  BUTTON: {
    text: 'Click Me',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    borderRadius: '8px',
    href: '#',
  },
  CONTAINER: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    display: 'block',
  },
} as const;

export const DRAG_TYPES = {
  ELEMENT: 'element',
  EXISTING_ELEMENT: 'existing-element',
} as const;

export const KEYBOARD_SHORTCUTS = {
  DELETE: 'Delete',
  COPY: 'c',
  PASTE: 'v',
  UNDO: 'z',
  REDO: 'y',
  SELECT_ALL: 'a',
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
} as const;
