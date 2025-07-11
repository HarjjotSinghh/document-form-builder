'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormBuilderStore } from '@/components/form-builder/store-provider';
import type { FormElement, FormElementInstance } from '../types';
import { useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Hash } from 'lucide-react';
import { Label } from '@/components/ui/label';

function DesignerComponent({ element }: { element: FormElementInstance }) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Label>
        {element.label}
        {element.required && <span className='text-destructive'>*</span>}
      </Label>
      <Input
        type='number'
        readOnly
        disabled
        placeholder={element.placeholder}
      />
      {element.description && (
        <p className='text-xs text-muted-foreground'>{element.description}</p>
      )}
    </div>
  );
}

function FormComponent({ element }: { element: FormElementInstance }) {
  // This will be the actual component rendered in the final form
  return <div>{element.label}</div>;
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(100),
  placeholder: z.string().max(50),
  required: z.boolean()
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ element }: { element: FormElementInstance }) {
  const { updateElement } = useFormBuilderStore();
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.label,
      description: element.description,
      placeholder: element.placeholder,
      required: element.required
    }
  });

  useEffect(() => {
    form.reset(element);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    updateElement(element.id, { ...element, ...values });
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className='space-y-3'
      >
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='placeholder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                A short description to help the user.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Required</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const NumberField: FormElement = {
  type: 'number',
  construct: () => ({
    type: 'number',
    label: '',
    required: false,
    placeholder: '0',
    description: ''
  }),
  designerButtonElement: {
    icon: Hash,
    label: 'Number'
  },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent
};

export default NumberField;
