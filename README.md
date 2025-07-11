# Document Form Builder

This is a side project of a highly extensible document form builder built with Next.js, TypeScript, and Tailwind CSS. It allows users to create custom form templates by dragging and dropping various field elements.

## Features

- **Drag-and-Drop Form Builder:** Easily create complex forms by dragging and dropping different field types onto a canvas.
- **Customizable Fields:** Each form element has its own properties that can be customized, such as labels, placeholders, required status, and options for select fields.
- **Variety of Field Types:** Supports a wide range of field types including:
  - Text Input
  - Text Area
  - Number Input
  - Date Picker
  - Checkbox
  - Select
  - Multi-Select
  - File Upload
  - Image Upload
  - Signature
  - Boolean (Switch)
- **State Management with Zustand:** Uses Zustand for efficient and predictable state management of the form elements.
- **Real-time JSON Output:** View the JSON representation of the custom fields and the final form structure in real-time.
- **Toast Notifications:** Provides feedback to the user with toast notifications, including options to copy data to the clipboard.
- **Built with Shadcn/UI:** Utilizes the beautiful and accessible components from Shadcn/UI.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HarjjotSinghh/document-form-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd document-form-builder
   ```
3. Install the dependencies:
   ```bash
   bun install
   ```

### Running the Development Server

To start the development server, run:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1.  Navigate to the "Create Template" page.
2.  Fill in the basic details for the template, such as the name, description, and version.
3.  On the left side, you'll find a toolbox with various form elements.
4.  Drag any element from the toolbox and drop it into the drop area on the right.
5.  Click on the dropped element to open the properties panel on the right, where you can customize its attributes.
6.  You can reorder the elements by dragging them within the drop area.
7.  Use the "Show Custom Fields" button to see the JSON output of the elements you've added.
8.  Use the "Show Final JSON" button to see the complete template structure, including the basic details and the custom fields.
9.  Click "Save Template" to save your form template. (Note: The save action is a placeholder and does not currently persist data to a database).
