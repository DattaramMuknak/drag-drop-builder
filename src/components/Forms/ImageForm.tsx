import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilder } from '../../context/BuilderContext';
import { ElementData } from '../../types';

interface ImageFormProps {
  element: ElementData;
}

const ImageForm: React.FC<ImageFormProps> = ({ element }) => {
  const { updateElement } = useBuilder();
  const { register, watch, setValue } = useForm({
    defaultValues: element.properties,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateElement(element.id, { properties: watchedValues });
  }, [watchedValues, element.id, updateElement]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue('src', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Image Source
        </label>
        <input
          type="url"
          {...register('src')}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Alt Text
        </label>
        <input
          type="text"
          {...register('alt')}
          placeholder="Describe the image"
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Sample Images
        </label>
        <div className="grid grid-cols-2 gap-2">
          {sampleImages.map((src, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('src', src)}
              className="aspect-square rounded-lg overflow-hidden border-2 border-secondary-200 hover:border-primary-500 transition-colors"
            >
              <img src={src} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-secondary-200">
        <h4 className="text-sm font-medium text-secondary-700 mb-3">Size & Position</h4>
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

export default ImageForm;
