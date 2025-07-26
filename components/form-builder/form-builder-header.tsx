'use client';

import type { DocumentTemplate, DocumentTemplateField } from './types';
import { MimeTypeEnum } from './enums';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  createGlobalDocumentTemplate,
  updateGlobalDocumentTemplate
} from '@/actions/document-templates';
import { useFormBuilderStore } from '@/components/form-builder/store-provider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileAxis3D, FileText, Loader2, Save, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formBuilderTypesToDbTypes } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import PageHeader from '@/components/ui/page-header';
import FileAttachmentField from '@/components/form-builder/fields/file-attachment-field';
import { OptionsTagInputField } from '@/components/form/options-tag-input-field';

const templateFormSchema = z.object({
  name: z.string().min(1, 'Template name is required').max(255),
  description: z.string().max(1000).optional(),
  version: z.string().min(1, 'Version is required').max(50),
  file: z.instanceof(File).optional(),
  isPublic: z.boolean(),
  tags: z.string(),
  language: z.string().max(10).optional()
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

type FormBuilderHeaderProps = {
  isSuperAdmin: boolean;
  template?: DocumentTemplate;
};

export default function FormBuilderHeader({
  isSuperAdmin,
  template
}: FormBuilderHeaderProps) {
  const { elements } = useFormBuilderStore();
  const router = useRouter();

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: template?.name ?? '',
      description: template?.description ?? '',
      version: template?.version ?? '1.0',
      isPublic: template?.isPublic ?? true,
      tags: template?.tags?.join(', ') ?? '',
      language: template?.language ?? 'en',
      file: undefined
    }
  });

  const showCustomFields = () => {
    toast('Custom Fields', {
      description: (
        <pre className='max-h-16 max-w-46 overflow-auto rounded-md bg-secondary p-4'>
          {JSON.stringify(elements, null, 2)}
        </pre>
      ),
      icon: <FileText className='size-4' />,
      action: {
        label: 'Copy',
        onClick: () => navigator.clipboard.writeText(JSON.stringify(elements, null, 2)),
        type: 'button',
      },
    });
  };

  const showFinalJson = () => {
    const values = form.getValues();
    const templateFields = elements
      .map((el) => {
        const type = formBuilderTypesToDbTypes[el.type];
        if (!type) return null;
        return {
          name: el.id,
          label: el.label,
          type,
          required: el.required || false,
          options: el.options || [],
          description: el.description || ''
        };
      })
      .filter(Boolean);

    let mimeType = 'application/json' as MimeTypeEnum;
    if (values.file) {
      mimeType = values.file.type as MimeTypeEnum;
    } else if (template?.mimeType) {
      mimeType = template.mimeType as MimeTypeEnum;
    }

    const finalJson = {
      name: values.name,
      description: values.description,
      fields: templateFields,
      isPublic: values.isPublic,
      version: values.version,
      mimeType,
      language: values.language,
      tags: values.tags
        ? values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []
    };
    
    toast('Final JSON', {
      description: (
        <pre className='max-h-16 max-w-46 overflow-auto rounded-md bg-secondary p-4'>
          {JSON.stringify(finalJson, null, 2)}
        </pre>
      ),
      icon: 
        <FileText className='size-4' />
      ,
      action: {
        label: 'Copy',
        type: 'button',
        onClick: () => navigator.clipboard.writeText(JSON.stringify(finalJson, null, 2)),
      },
    });
  }

  const handleSave = async (values: TemplateFormValues) => {
    if (!isSuperAdmin) {
      toast.error('You do not have permission to create/update templates.');
      return;
    }

    const templateFields = elements
      .map((el) => {
        const type = formBuilderTypesToDbTypes[el.type];
        if (!type) return null;
        return {
          name: el.id,
          label: el.label,
          type,
          required: el.required || false,
          options: el.options || [],
          description: el.description || ''
        };
      })
      .filter(Boolean);

    let mimeType = 'application/json' as MimeTypeEnum;
    if (values.file) {
      mimeType = values.file.type as MimeTypeEnum;
    } else if (template?.mimeType) {
      mimeType = template.mimeType as MimeTypeEnum;
    }

    const commonData = {
      name: values.name,
      description: values.description,
      fields: templateFields,
      isPublic: values.isPublic,
      version: values.version,
      mimeType,
      language: values.language,
      tags: values.tags
        ? values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []
    };

    try {
      if (template) {
        // Update
        const {updated} = await updateGlobalDocumentTemplate(template.id.toString(), {
          ...commonData,
          fields: templateFields as DocumentTemplateField[]
        });
        toast.success(`Template "${updated.name}" updated successfully.`);
        router.push('/account/documents/templates');
      } else {
        // Create
        const {template: created} = await createGlobalDocumentTemplate({
          ...(commonData as DocumentTemplate),
          fields: templateFields as DocumentTemplateField[]
        });
        toast.success(`Template "${created.name}" created successfully.`);
        router.push('/account/documents/templates');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save template.'
      );
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        heading='Create New Document Form Template'
        subheading='Build a new form template for your personal use. You can share the form with anyone via publishable links.'
        classNames={{
          container: 'items-center'
        }}
        rightElement={
          <div className="flex justify-end gap-4 flex-wrap">
            <Button type="button" variant="outline" onClick={showCustomFields}>
              Show Custom Fields
            </Button>
            <Button type="button" variant="outline" onClick={showFinalJson}>
              Show Final JSON
            </Button>
            <Button
              type='button'
              onClick={form.handleSubmit(handleSave)}
              disabled={form.formState.isSubmitting || true} // yes this is intentional lol
              className='gap-2'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <Save className='size-4' />
              )}
              {template ? 'Update' : 'Save'} Template
            </Button>
          </div>
        }
      />

      <div className='rounded-lg border border-border bg-card p-4 lg:p-6'>
      <div className='flex flex-row flex-wrap items-center justify-start gap-4'>
              <div className='relative size-16 overflow-hidden rounded-lg bg-primary/10 xs:size-20'>
                <FileAxis3D
                  className='size-full p-3.5 text-primary'
                  strokeWidth={1.5}
                />
              </div>
              <div className=''>
                <h2 className=' text-2xl font-semibold'>
                  Basic Details
                </h2>
                <p className='text-sm text-muted-foreground'>
                  Fill out the basic details for your new template.
                </p>
              </div>
            </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className='mt-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='e.g., New Client Onboarding'
                        className='bg-secondary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='A brief description of the template (optional)'
                        className='max-h-14 resize-none bg-secondary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='version'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., 1.0, 2.1.0'
                        {...field}
                        className='bg-secondary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <OptionsTagInputField
                        placeholder='E.g., legal, confidential, draft'
                        styleClasses={{
                          inlineTagsContainer: 'bg-secondary',
                          tag: {
                            body: 'bg-primary text-background border-none hover:bg-primary/90',
                            closeButton:
                              'text-background hover:text-background/90'
                          }
                        }}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col justify-between'>
                <FormField
                  control={form.control}
                  name='isPublic'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border bg-secondary p-3 shadow-sm'>
                      <div className='space-y-1'>
                        <FormLabel className='text-sm'>Public</FormLabel>
                        <FormDescription className='text-xs'>
                          Allow any organization to use this template.
                        </FormDescription>
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
              </div>
              <FileAttachmentField
                field={{
                  name: 'file',
                  label: 'Template File (Optional PDF background)',
                  type: 'file',
                  required: false,
                  options: [],
                  description: ''
                }}
                className='bg-secondary h-full'
                innerContainer={
                  <div className='flex h-full flex-col items-center justify-center min-h-fit'>
                    <UploadCloud className='size-8 text-muted-foreground' />
                    <p className='mt-2 text-sm text-muted-foreground'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      (PDF, max 1MB)
                    </p>
                  </div>
                }
                allowedFileTypes={['application/pdf']}
                form={form}
                isImage={false}
              />
            </div>
          </form>
        </Form>
        
      </div>
    </div>
  );
}
