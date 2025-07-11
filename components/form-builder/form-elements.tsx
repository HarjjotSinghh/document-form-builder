// We can leverage these as a future feature
// import titleField from './fields/title-field';
// import subtitleField from './fields/subtitle-field';
// import paragraphField from './fields/paragraph-field';
// import separatorField from './fields/separator-field';
// import spacerField from './fields/spacer-field';
import type { ElementType, FormElement } from './types';
import booleanField from './fields/boolean-field';
import dateField from './fields/date-field';
import fileField from './fields/file-field';
import imageField from './fields/image-field';
import multiSelectField from './fields/multi-select-field';
import numberField from './fields/number-field';
import selectField from './fields/select-field';
import signatureField from './fields/signature-field';
import textField from './fields/text-field';

export const FormElements: Record<ElementType, FormElement> = {
  // title: titleField,
  // subtitle: subtitleField,
  // paragraph: paragraphField,
  // separator: separatorField,
  // spacer: spacerField,
  'string': textField,
  'number': numberField,
  'date': dateField,
  'boolean': booleanField,
  'select': selectField,
  'multi-select': multiSelectField,
  'image': imageField,
  'file': fileField,
  'signature': signatureField
};

export const FormElementExampleLabels: Record<ElementType, string> = {
  'string': 'First Name',
  'number': 'Age',
  'date': 'Date of Birth',
  'boolean': 'Are you a human?',
  'select': 'Select your gender',
  'multi-select': 'Select hobbies',
  'image': 'Upload your PFP',
  'file': 'Upload your resume',
  'signature': 'Sign a document'
};
