'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { useFormBuilderStore } from '@/components/form-builder/store-provider';
import FieldWrapper from './field-wrapper';
import { Plus } from 'lucide-react';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { FormElementInstance } from './types';

export default function DropArea() {
  const { elements } = useFormBuilderStore();
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-area'
  });

  return (
    <div
      className={cn(
        'flex h-full flex-col items-start rounded-lg overflow-y-auto lg:max-w-3xl w-full max-w-2xl max-h-[calc(100vh-200px)]',
        elements.length > 0 && 'border-2 border-dashed bg-secondary py-4',
        isOver && 'border-primary'
      )}
    >
      <div
        ref={setNodeRef}
        className={cn('flex grow flex-col gap-4 transition-colors w-full')}
      >
        <SortableContext
          items={elements.map((el: FormElementInstance) => el.id)}
          strategy={verticalListSortingStrategy}
        >
          {elements.length > 0 ? (
            elements.map((element: FormElementInstance) => (
              <FieldWrapper
                key={element.id}
                element={element}
                className='mx-4'
              />
            ))
          ) : (
            <div
              className={cn(
                'flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-center transition-colors',
                !elements.length && 'bg-secondary',
                isOver && 'border-primary'
              )}
            >
              <div className='px-4 py-16 md:py-32'>
                <Plus className='mx-auto size-8 text-muted-foreground/50' />
                <div>
                  <p className='text-lg font-medium text-muted-foreground/80'>
                    Drag & Drop Form Elements Here
                  </p>
                  <p className='text-sm text-muted-foreground/60'>
                    Select fields from the toolbox to get started.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
