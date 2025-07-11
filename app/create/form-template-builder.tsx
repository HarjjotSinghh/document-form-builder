'use client';

import type { DocumentTemplate } from '@/components/form-builder/types';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent
} from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import { FormElements } from '@/components/form-builder/form-elements';
import { type FormElementInstance } from '@/components/form-builder/types';
import {
  Toolbox,
  ToolboxElementOverlay
} from '@/components/form-builder/toolbox';
import {
  FormBuilderStoreProvider,
  useFormBuilderStore
} from '@/components/form-builder/store-provider';
import FormBuilderHeader from '@/components/form-builder/form-builder-header';
import DropArea from '@/components/form-builder/drop-area';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { SpanHighlight } from '@/components/ui/span-highlight';
import { FileAxis3D, FormInputIcon } from 'lucide-react';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

type FormTemplateBuilderProps = {
  isSuperAdmin: boolean;
  template?: DocumentTemplate;
};

export default function FormTemplateBuilder({
  isSuperAdmin,
  template
}: FormTemplateBuilderProps) {
  const { elements, addElement, setElements } = useFormBuilderStore();
  const [activeElement, setActiveElement] =
    useState<FormElementInstance | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (!active) return;
    const isToolboxElement = active.data.current?.isToolboxElement as boolean;
    if (isToolboxElement) {
      const type = active.id as keyof typeof FormElements;
      const newElement = FormElements[type].construct();
      setActiveElement({
        id: uuid(),
        ...newElement
      });
    } else {
      const element = elements.find((el) => el.id === active.id);
      if (element) {
        setActiveElement(element);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveElement(null);
    const { active, over } = event;
    if (!active || !over) return;

    const isToolboxElement = active.data.current?.isToolboxElement;
    const isDroppingOverCanvas = over.id === 'canvas-drop-area';

    // 1. Dragging from toolbox to canvas
    if (isToolboxElement) {
      const type = active.id as keyof typeof FormElements;
      const newElement = FormElements[type].construct();

      if (isDroppingOverCanvas) {
        // Dropped on canvas drop area
        addElement({ id: uuid(), ...newElement });
      } else {
        // Dropped on another element
        const overId = over.id;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          console.error('Could not find over element');
          return;
        }

        const newElements = [...elements];
        newElements.splice(overElementIndex, 0, { id: uuid(), ...newElement });
        setElements(newElements);
      }
      return;
    }

    // 2. Sorting existing elements
    const isSortingElement = active.data.current?.isCanvasElement;
    if (isSortingElement && !isDroppingOverCanvas) {
      const activeId = active.id as string;
      const overId = over.id as string;

      if (activeId === overId) return;

      const activeIndex = elements.findIndex((el) => el.id === activeId);
      const overIndex = elements.findIndex((el) => el.id === overId);

      setElements(arrayMove(elements, activeIndex, overIndex));
    }
  };

  return (
    <FormBuilderStoreProvider>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <FormBuilderHeader
          isSuperAdmin={isSuperAdmin}
          template={template}
        />
        <div className='flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:gap-6 lg:p-6'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row flex-wrap items-center justify-between gap-4'>
              <div className='relative size-16 overflow-hidden rounded-lg bg-primary/10 xs:size-20'>
                <FileAxis3D
                  className='size-full p-3.5 text-primary'
                  strokeWidth={1.5}
                />
              </div>
              <div className=''>
                <h2 className=' text-2xl font-semibold'>
                  Template Field Elements
                </h2>
                <p className='text-sm text-muted-foreground'>
                  Drag and drop the field elements to your new template.
                </p>
              </div>
            </div>
            {elements.length > 0 && (
              <SpanHighlight
                size='xs'
                padding='default'
                iconPosition='left'
                icon={<FormInputIcon className='mr-1 size-4' />}
              >
                {elements.length} Field{elements.length === 1 ? '' : 's'} Added
              </SpanHighlight>
            )}
          </div>
          <div className='flex flex-col gap-4 md:flex-row'>
            <aside className='flex h-full flex-col gap-2 overflow-y-auto rounded-lg bg-secondary p-4 lg:w-[280px]'>
              <Toolbox />
            </aside>
            <DropArea />
          </div>
        </div>
        <DragOverlay modifiers={[restrictToWindowEdges]} dropAnimation={null}>
          {activeElement && (
            <ToolboxElementOverlay
              formElement={FormElements[activeElement.type]}
            />
          )}
        </DragOverlay>
      </DndContext>
    </FormBuilderStoreProvider>
  );
}
