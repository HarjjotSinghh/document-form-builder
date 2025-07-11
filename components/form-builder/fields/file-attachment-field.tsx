import type { DocumentTemplateField } from '../types';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import type { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

export default function FileAttachmentField({
  field,
  form,
  isImage,
  allowedFileTypes,
  innerContainer,
  className
}: {
  field: DocumentTemplateField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: ReturnType<typeof useForm<any>>;
  isImage: boolean;
  allowedFileTypes?: string[];
  innerContainer?: React.ReactNode;
  className?: string;
}) {
  const onDrop = (acceptedFiles: File[]) => {
    form.setValue(field.name, acceptedFiles[0], { shouldValidate: true });
  };

  const accept = isImage
    ? { 'image/*': [] }
    : allowedFileTypes
      ? { [allowedFileTypes.join(',')]: [] }
      : undefined;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: 1 * 1024 * 1024, // 1MB
    multiple: false,
    onError: (error) => {
      // console.error('File upload error:', error);
      toast.error(error.message || 'File upload failed. Please try again.');
    }
  });

  const file = form.watch(field.name);

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem className='space-y-0.5'>
          <FormLabel>
            {field.label}
            {field.required && <span className='text-destructive'>*</span>}
          </FormLabel>
          {field.description && (
            <FormDescription className='text-xs text-muted-foreground'>
              {field.description}
            </FormDescription>
          )}
          <FormControl className=''>
            <div
              {...getRootProps()}
              className={cn(
                '!mt-2 cursor-pointer rounded-md border-2 border-dashed p-4 text-center',
                isDragActive ? 'border-primary' : '',
                className
              )}
            >
              {innerContainer && innerContainer}
              <input {...getInputProps()} />
              {file ? (
                <div>
                  <p className='text-sm text-muted-foreground'>
                    {isImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={URL.createObjectURL(file)}
                        alt='Preview'
                        className='mx-auto max-h-64 max-w-64 object-contain'
                      />
                    )}
                    {file.name}
                  </p>
                  <Button
                    variant='link'
                    onClick={(e) => {
                      e.stopPropagation();
                      form.setValue(field.name, null, {
                        shouldValidate: true
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p
                  className={cn(
                    'text-sm text-muted-foreground',
                    innerContainer && 'hidden'
                  )}
                >
                  {isDragActive
                    ? `Drop the ${isImage ? 'image' : 'file'} here ...`
                    : `Drag 'n' drop ${
                        isImage ? 'an image' : 'a file'
                      } here, or click to select ${isImage ? 'image' : 'file'}`}
                </p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
