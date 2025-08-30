import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ButtonFormProps {
  element: ElementData;
}

const ButtonForm: React.FC<ButtonFormProps> = ({ element }) => {
  const { updateElement } = useBuilder();
  const { register, watch, setValue } = useForm({
    defaultValues: element.properties,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateElement(element.id, { properties: watchedValues });
  }, [watchedValues, element.id, updateElement]);

  const presetColors = [
    { name: 'Primary', bg: '#3b82f6', text: '#ffffff' },
    { name: 'Secondary', bg: '#6b7280', text: '#ffffff' },
    { name: 'Success', bg: '#10b981', text: '#ffffff' },
    { name: 'Warning', bg: '#f59e0b', text: '#ffffff' },
    { name: 'Danger', bg: '#ef4444', text: '#ffffff' },
    { name: 'Light', bg: '#f8fafc', text: '#374151' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Button Text
        </label>
        <input
          type="text"
          {...register('text')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

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
          Text Color
        </label>
        <input
          type="color"
          {...register('textColor')}
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
          <option value="9999px">Full</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Button Link
        </label>
        <input
          type="url"
          {...register('href')}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Preset Styles
        </label>
        <div className="grid grid-cols-2 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                setValue('backgroundColor', preset.bg);
                setValue('textColor', preset.text);
              }}
              className="px-3 py-2 text-sm rounded-lg border border-secondary-300 hover:border-primary-500 transition-colors"
              style={{
                backgroundColor: preset.bg,
                color: preset.text,
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-secondary-200">
        <h4 className="text-sm font-medium text-secondary-700 mb-3">Size</h4>
        <div className="grid grid-cols-2 gap-3">
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

export default ButtonForm;
