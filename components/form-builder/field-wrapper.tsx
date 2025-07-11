'use client';

import { useSortable } from '@dnd-kit/sortable';
import type { FormElementInstance } from './types';
import { FormElementExampleLabels, FormElements } from './form-elements';
import { Button } from '@/components/ui/button';
import { Eye, GripVertical, Trash2, EyeOff } from 'lucide-react';
import { useFormBuilderStore } from '@/components/form-builder/store-provider';
import { CSS } from '@dnd-kit/utilities';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import { OptionsTagInputField } from '@/components/form/options-tag-input-field';
import { cn } from '@/lib/utils';

const propertiesSchema = z.object({
  label: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().optional(),
  required: z.boolean().optional(),
  options: z.string().optional()
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export default function FieldWrapper({
  element,
  className
}: {
  element: FormElementInstance;
  className?: string;
}) {
  const { removeElement, updateElement } = useFormBuilderStore();
  const DesignerComponent = FormElements[element.type].designerComponent;
  const [isPreviewing, setIsPreviewing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true
    }
  });

  const { icon: Icon, label: fieldLabel } =
    FormElements[element.type].designerButtonElement;

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.label,
      description: element.description,
      required: element.required
    }
  });

  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.reset({
      label: element.label,
      description: element.description,
      required: element.required,
      options: element.options?.join(',')
    });
    // Enable auto-focus by disabling this
    // if (!element.label && labelInputRef.current) {
    //   labelInputRef.current.focus();
    // }
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      ...values,
      options: values.options?.split(',') ?? []
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn('w-full rounded-lg bg-primary/30', className)}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors',
        className
      )}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div
            {...attributes}
            {...listeners}
            className='cursor-grab rounded-md bg-secondary px-3 py-1.5 transition-all hover:bg-secondary/90'
          >
            <GripVertical className='size-5 min-h-5 min-w-5 text-foreground' />
          </div>
          <div className='flex flex-row items-center gap-2'>
            <Icon className='size-5 min-h-5 min-w-5 text-primary' />
            <p className='text-md inline-flex flex-row gap-1'>
              <span>{fieldLabel}</span>{' '}
              <span className='hidden sm:block'>Field</span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={cn('size-8', isPreviewing && 'border-none')}
                  disabled={form.formState.isDirty}
                  variant={isPreviewing ? 'light' : 'secondary'}
                  size='icon'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPreviewing(!isPreviewing);
                  }}
                >
                  {isPreviewing ? (
                    <EyeOff className='size-4' />
                  ) : (
                    <Eye className='size-4' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPreviewing ? 'Hide preview' : 'Preview field'}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='size-8 bg-destructive/10 hover:bg-destructive/20 focus:bg-destructive/20'
                  variant='light'
                  size='icon'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeElement(element.id);
                  }}
                >
                  <Trash2 className='size-4 text-destructive' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Remove field
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Form {...form}>
        <form
          onBlur={form.handleSubmit(applyChanges)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className='flex flex-col gap-1.5'
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='space-y-0.5'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Name of the ${fieldLabel} field (e.g. ${FormElementExampleLabels[element.type]})`}
                      {...field}
                      ref={labelInputRef}
                      className='bg-secondary'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {element.hasOwnProperty('required') && (
              <FormField
                control={form.control}
                name='required'
                render={({ field }) => (
                  <FormItem className='flex w-full items-center justify-between rounded-lg border bg-secondary px-4 py-2'>
                    <div className=''>
                      <FormLabel className='text-sm'>Required</FormLabel>
                      <FormDescription className='text-xs'>
                        Mark this field as required.
                      </FormDescription>
                    </div>
                    <FormControl className='mt-0'>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          form.handleSubmit(applyChanges)();
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
          {element.hasOwnProperty('options') &&
            (element.type === 'select' || element.type === 'multi-select') && (
              <FormField
                control={form.control}
                name='options'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel>Options</FormLabel>
                    <FormControl>
                      <OptionsTagInputField
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        styleClasses={{
                          inlineTagsContainer: 'bg-secondary'
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          {element.hasOwnProperty('description') && (
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-0.5'>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Help text for the user, displayed below the field name (e.g. "Enter your email address")'
                      {...field}
                      className='max-h-14 min-h-0 resize-none bg-secondary'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>

      {isPreviewing && (
        <div className='flex flex-col gap-2'>
          <h4 className='text-md'>Preview (User view)</h4>
          <div className='pointer-events-none select-none'>
            <DesignerComponent element={element} />
          </div>
        </div>
      )}
    </div>
  );
}
