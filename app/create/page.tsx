import type { Metadata, Viewport } from 'next';
import FormTemplateBuilder from './form-template-builder';

export const metadata: Metadata = {
  title: 'Create Document Form',
  description: 'Create a new document form.',
  creator: 'Harjot Singh Rana',
  keywords: [
    'Harjot Singh Rana',
    'Document Form Builder',
    'Global Templates'
  ],
  authors: [
    {
      name: 'Harjot Singh Rana',
      url: process.env.NEXT_PUBLIC_SITE_URL
    }
  ],
  robots: 'index, follow',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`
  },
  openGraph: {
    title: 'Create Document Form',
    description: 'Create a new form template.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/create`,
    siteName: 'Harjot Singh Rana',
    locale: 'en-US',
    type: 'website',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og.jpg`]
  },
  twitter: {
    title: 'Create Document Form',
    description: 'Create a new form template.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og.jpg`],
    creator: '@HarjjotSinghh',
    site: process.env.NEXT_PUBLIC_SITE_URL,
    card: 'summary_large_image'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  themeColor: '#5e46ef'
};

export default async function CreateFormTemplatePage() {

  return (
    <div className="flex flex-col gap-6 w-full h-full font-mono max-w-4xl mx-auto md:py-16 py-8 md:px-0 px">
      <FormTemplateBuilder isSuperAdmin={true}/>
    </div>
  );
}
