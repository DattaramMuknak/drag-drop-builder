import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface TextFormProps {
  element: ElementData;
}

const TextForm: React.FC<TextFormProps> = ({ element }) => {
  const { updateElement } = useBuilder();
  const { register, watch, setValue } = useForm({
    defaultValues: element.properties,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateElement(element.id, { properties: watchedValues });
  }, [watchedValues, element.id, updateElement]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Content
        </label>
        <textarea
          {...register('content')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Font Size
        </label>
        <select
          {...register('fontSize')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Color
        </label>
        <input
          type="color"
          {...register('color')}
          className="w-full h-10 border border-secondary-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Font Weight
        </label>
        <select
          {...register('fontWeight')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Text Align
        </label>
        <select
          {...register('textAlign')}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  );
};

export default TextForm;
