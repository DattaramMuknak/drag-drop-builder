import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ContainerFormProps {
  element: ElementData;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ element }) => {
  const { updateElement } = useBuilder();
  const { register, watch, setValue } = useForm({
    defaultValues: element.properties,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateElement(element.id, { properties: watchedValues });
  }, [watchedValues, element.id, updateElement]);

  const presetStyles = [
    {
      name: 'Card',
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e2e8f0',
      }
    },
    {
      name: 'Hero Section',
      style: {
        backgroundColor: '#1f2937',
        borderRadius: '0px',
        padding: '48px',
        border: 'none',
      }
    },
    {
      name: 'Sidebar',
      style: {
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e2e8f0',
      }
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Background Color
        </label>
        <input
          type="color"
          {...register('backgroundColor')}
          className="w-full h-10 border border-secondary-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Border Radius
        </label>
        <select
          {...register('borderRadius')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="0px">None</option>
          <option value="4px">Small</option>
          <option value="8px">Medium</option>
          <option value="12px">Large</option>
          <option value="16px">Extra Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Padding
        </label>
        <select
          {...register('padding')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="8px">Small</option>
          <option value="16px">Medium</option>
          <option value="24px">Large</option>
          <option value="32px">Extra Large</option>
          <option value="48px">2X Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Border
        </label>
        <input
          type="text"
          {...register('border')}
          placeholder="1px solid #e2e8f0"
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Preset Styles
        </label>
        <div className="space-y-2">
          {presetStyles.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                Object.entries(preset.style).forEach(([key, value]) => {
                  setValue(key as any, value);
                });
              }}
              className="w-full px-3 py-2 text-sm text-left border border-secondary-300 rounded-lg hover:border-primary-500 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-secondary-200">
        <h4 className="text-sm font-medium text-secondary-700 mb-3">Layout</h4>
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Display
          </label>
          <select
            {...register('display')}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="block">Block</option>
            <option value="flex">Flex</option>
            <option value="grid">Grid</option>
            <option value="inline-block">Inline Block</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs text-secondary-600 mb-1">Width</label>
            <input
              type="number"
              value={element.size.width}
              onChange={(e) => updateElement(element.id, {
                size: { ...element.size, width: parseInt(e.target.value) }
              })}
              className="w-full px-2 py-1 text-sm border border-secondary-300 rounded focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs text-secondary-600 mb-1">Height</label>
            <input
              type="number"
              value={element.size.height}
              onChange={(e) => updateElement(element.id, {
                size: { ...element.size, height: parseInt(e.target.value) }
              })}
              className="w-full px-2 py-1 text-sm border border-secondary-300 rounded focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerForm;
