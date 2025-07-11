'use client';

import { useEffect, useState, useRef } from 'react';
import { type Tag, TagInput, type TagInputStyleClassesProps } from 'emblor';
import { cn, getRandomUUID } from '@/lib/utils';

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

export const OptionsTagInputField = ({
  value,
  onChange,
  placeholder,
  styleClasses
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  styleClasses?: Partial<TagInputStyleClassesProps>;
}) => {
  const [tags, setTags] = useState<Tag[]>(() =>
    (value || '')
      .split(',')
      .filter(Boolean)
      .map((text) => ({ id: getRandomUUID(), text }))
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    onChange(tags.map((t) => t.text).join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <TagInput
      tags={tags}
      setTags={setTags}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      inputRef={inputRef}
      onInputFocus={() => setInputFocused(true)}
      onInputBlur={() => setInputFocused(false)}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (tags.length === 0) {
            e.preventDefault();
          }
          if (activeTagIndex !== null) {
            setTags(tags.filter((_, index) => index !== activeTagIndex));
          } else if (inputFocused && tags.length > 0) {
            setTags(tags.slice(0, -1));
          }
        }
      }}
      placeholder={
        placeholder ??
        'Add options for the user to select from (e.g. "Option 1, Option 2, Option 3")'
      }
      styleClasses={{
        inlineTagsContainer: cn(
          baseClasses.inlineTagsContainer,
          styleClasses?.inlineTagsContainer
        ),
        input: cn(baseClasses.input, styleClasses?.input),
        tag: {
          body: cn(baseClasses.tag.body, styleClasses?.tag?.body),
          closeButton: cn(
            baseClasses.tag.closeButton,
            styleClasses?.tag?.closeButton
          )
        }
      }}
    />
  );
};
