'use client';

import { useRef, useState, useEffect } from 'react';
import { TagInput, type Tag, type TagInputStyleClassesProps } from 'emblor';
import { v4 as getRandomUUID } from 'uuid';

const baseClasses = {
  inlineTagsContainer:
    'rounded-md border border-input shadow-sm bg-transparent focus-within:border-primary transition-[color,box-shadow] outline-none p-2 gap-1',
  input: 'w-full min-w-[80px] shadow-none px-2 h-7 bg-transparent',
  tag: {
    body: 'h-7 relative bg-secondary/50 border border-secondary/60 hover:bg-secondary/30 rounded-md font-medium text-xs ps-2 pe-7',
    closeButton:
      'absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground'
  }
};

export const TagsInputField = ({
  value,
  onChange,
  placeholder,
  styleClasses
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  styleClasses?: Partial<TagInputStyleClassesProps>;
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const formValue = value || '';
    const componentValue = tags.map((t) => t.text).join(',');
    if (formValue !== componentValue) {
      setTags(
        formValue
          .split(',')
          .filter(Boolean)
          .map((text) => ({ id: getRandomUUID(), text }))
      );
    }
  }, [value, tags]);

  useEffect(() => {
    const newTagsValue = tags.map((t) => t.text).join(',');
    if (newTagsValue !== value) {
      onChange(newTagsValue);
    }
  }, [tags, value, onChange]);

  return (
    <TagInput
      tags={tags}
      setTags={setTags}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      inputRef={inputRef}
      placeholder={
        placeholder ?? 'Enter tags separated by commas or press Enter'
      }
      styleClasses={
        styleClasses
          ? {
              ...baseClasses,
              ...styleClasses
            }
          : {
              inlineTagsContainer:
                'rounded-md border border-input shadow-sm bg-transparent focus-within:border-primary transition-[color,box-shadow] outline-none p-2 gap-1',
              input: 'w-full min-w-[80px] shadow-none px-2 h-7 bg-transparent',
              tag: {
                body: 'h-7 relative bg-secondary/50 border border-secondary/60 hover:bg-secondary/30 rounded-md font-medium text-xs ps-2 pe-7',
                closeButton:
                  'absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground'
              }
            }
      }
    />
  );
};
