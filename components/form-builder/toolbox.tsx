'use client';

import { FormElements } from './form-elements';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export function ToolboxElementOverlay({
  formElement,
  isButton = true
}: {
  formElement: (typeof FormElements)[keyof typeof FormElements];
  isButton?: boolean;
}) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant='light'
      className={cn(
        'flex cursor-grab  w-full h-auto text-foreground flex-row gap-3 items-center justify-start',
        isButton && ''
      )}
    >
      <Icon className='size-5 min-h-5 min-w-5 text-primary' />
      <p className='text-sm'>{label}</p>
    </Button>
  );
}

function ToolboxElement({
  formElement
}: {
  formElement: (typeof FormElements)[keyof typeof FormElements];
}) {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: formElement.type,
    data: {
      type: formElement.type,
      isToolboxElement: true
    }
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant='default'
      className={cn(
        'flex cursor-grab bg-card text-foreground flex-row gap-3 items-center justify-start hover:bg-card/90',
        draggable.isDragging && 'ring-1 ring-primary bg-primary/10'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='size-5 min-h-5 min-w-5 text-primary' />
      <p className='text-md font-medium'>{label}</p>
    </Button>
  );
}

export function Toolbox() {
  return (
    <div>
      <div className={cn('flex md:flex-col flex-row flex-wrap gap-2')}>
        {Object.values(FormElements).map((element) => (
          <ToolboxElement key={element.type} formElement={element} />
        ))}
      </div>
    </div>
  );
}
