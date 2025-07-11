'use client';

import { useCallback, useState } from 'react';
import type { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { UploadCloud, X } from 'lucide-react';

type FileUploadProps = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: ReturnType<typeof useForm<any>>;
  accept?: Record<string, string[]>;
  existingFileName?: string | null;
};

export function FileUpload({
  name,
  label,
  form,
  accept,
  existingFileName: initialExistingFileName
}: FileUploadProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFile, setCurrentFile] = useState<File | null>(
    form.getValues(name)
  );
  const [existingFileName, setExistingFileName] = useState<string | null>(
    initialExistingFileName ?? null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setCurrentFile(file);
        form.setValue(name, file, { shouldValidate: true });
        setExistingFileName(null);
      }
    },
    [form, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: accept ?? { 'application/pdf': ['.pdf'] }
  });

  const handleRemoveFile = () => {
    setCurrentFile(null);
    form.setValue(name, undefined, { shouldValidate: true });
    setExistingFileName(null);
  };

  const file = form.watch(name);
  const fieldState = form.getFieldState(name);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div
          {...getRootProps()}
          className={`flex h-32 w-full cursor-pointer appearance-none flex-col items-center justify-center rounded-md border-2 border-dashed bg-secondary px-4 transition hover:border-primary focus:outline-none ${
            isDragActive ? 'border-primary' : 'border-input'
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className='text-center'>
              <p className='truncate font-medium'>{file.name}</p>
              <p className='text-xs text-muted-foreground'>
                Type: {file.type}, Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : existingFileName ? (
            <div className='text-center'>
              <p className='truncate font-medium'>
                Current file: {existingFileName}
              </p>
              <p className='text-xs text-muted-foreground'>
                Drop a new file here to replace it.
              </p>
            </div>
          ) : isDragActive ? (
            <p className='text-muted-foreground'>Drop the file here ...</p>
          ) : (
            <div className='flex flex-col items-center'>
              <UploadCloud className='size-8 text-muted-foreground' />
              <p className='mt-2 text-sm text-muted-foreground'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-muted-foreground'>(PDF, max 1MB)</p>
            </div>
          )}
        </div>
      </FormControl>
      {(file || existingFileName) && (
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='mt-2'
          onClick={handleRemoveFile}
        >
          <X className='mr-2 size-4' />
          Remove file
        </Button>
      )}
      {fieldState.error && (
        <FormMessage>{fieldState.error.message}</FormMessage>
      )}
    </FormItem>
  );
}
