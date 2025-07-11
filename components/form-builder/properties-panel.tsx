'use client';

import { useFormBuilderStore } from '@/components/form-builder/store-provider';
import { FormElements } from './form-elements';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ElementType, FormElementInstance } from './types';

export default function PropertiesPanel({
  elementId,
  onClose
}: {
  elementId: string;
  onClose: () => void;
}) {
  const { elements } = useFormBuilderStore();
  const element = elements.find((el: FormElementInstance) => el.id === elementId);

  if (!element) return null;

  const PropertiesComponent = FormElements[element.type as ElementType].propertiesComponent;

  return (
    <div className='flex flex-col p-2'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-foreground/70'>Element Properties</p>
        <Button size='icon' variant='ghost' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>
      <PropertiesComponent element={element} />
    </div>
  );
}
