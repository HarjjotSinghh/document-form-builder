import { MimeTypeEnum } from "./enums";

export type ElementType =
  // Layout elements
  // | 'title'
  // | 'subtitle'
  // | 'paragraph'
  // | 'separator'
  // | 'spacer'
  // Form elements
  | 'string'
  | 'number'
  | 'date'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'image'
  | 'file'
  | 'signature';

export type FormElement = {
  type: ElementType;
  construct: () => Omit<FormElementInstance, 'id'>;
  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    element: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    element: FormElementInstance;
  }>;
  formComponent: React.FC<{
    element: FormElementInstance;
  }>;
};

export const formBuilderTypesToDbTypes: Record<
  ElementType,
  DocumentTemplateField['type'] | null
> = {
  // title: null,
  // subtitle: null,
  // paragraph: null,
  // separator: null,
  // spacer: null,
  'string': 'string',
  'number': 'number',
  'date': 'date',
  'boolean': 'boolean',
  'select': 'select',
  'multi-select': 'multi-select',
  'image': 'image',
  'file': 'file',
  'signature': 'signature'
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  height?: number;
};

export type FormBuilderStore = {
  elements: FormElementInstance[];
  pdfFile: File | null;
  addElement: (element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: Partial<FormElementInstance>) => void;
  setPdfFile: (file: File | null) => void;
};

export type DocumentTemplateField = {
  name: string;
  label: string;
  type:
    | 'string'
    | 'number'
    | 'date'
    | 'boolean'
    | 'select'
    | 'multi-select'
    | 'image'
    | 'file'
    | 'signature';
  required: boolean;
  options?: string[]; // For select fields
  defaultValue?: string | number | boolean | null;
  description?: string;
};

export type DocumentTemplate = {
  id: bigint;
  name: string;
  description: string | null;
  hash: string | null;
  content: Record<string, unknown>;
  fields: DocumentTemplateField[] | null;
  category: string;
  version: string;
  status: "ACTIVE" | "INACTIVE" | "FROZEN" | "RESTRICTED" | "SUSPENDED" | "BLACKLISTED";
  isActive: boolean;
  metadata: Record<string, unknown>;
  mimeType: MimeTypeEnum;
  fileSize: bigint;
  storageLocation: string | null;
  tags: string[] | null;
  language: string;
  isPublic: boolean | null;
  createdBy: bigint | null;
  updatedBy: bigint | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}