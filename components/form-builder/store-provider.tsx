'use client';

import { type ReactNode, createContext, useRef } from 'react';
import { create } from 'zustand';

import { immer } from 'zustand/middleware/immer';

import type { FormElementInstance } from './types';

export type FormBuilderStore = {
  elements: FormElementInstance[];
  addElement: (element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  setElements: (elements: FormElementInstance[]) => void;
};

export const FormBuilderStoreContext = createContext<
  FormBuilderStore | undefined
>(undefined);

export type FormBuilderStoreProviderProps = {
  children: ReactNode;
};

export const FormBuilderStoreProvider = ({
  children
}: FormBuilderStoreProviderProps) => {
  const storeRef = useRef<FormBuilderStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = useFormBuilderStore.getState();
  }

  return (
    <FormBuilderStoreContext.Provider value={storeRef.current}>
      {children}
    </FormBuilderStoreContext.Provider>
  );
};

export const useFormBuilderStore = create<FormBuilderStore>()(
  immer((set) => ({
    elements: [],
    addElement: (element) =>
      set((state) => {
        state.elements.push(element);
      }),
    removeElement: (id) =>
      set((state) => {
        state.elements = state.elements.filter((element: FormElementInstance) => element.id !== id);
      }),
    updateElement: (id, element) =>
      set((state) => {
        const index = state.elements.findIndex((el: FormElementInstance) => el.id === id);
        if (index !== -1) {
          state.elements[index] = element;
        }
      }),
    setElements: (elements) =>
      set((state) => {
        state.elements = elements;
      })
  }))
);
