import { Metadata } from 'next';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const metadata: Metadata = {
  title: 'Visa & Travel Blog | Expert Guides & Checklists | VisaInfoGuide',
  description: 'In-depth visa guides, application checklists, and travel tips from expert writer Matthew Lin. Schengen visas, cover letters, flight reservations, and more.',
  alternates: {
    canonical: 'https://visainfoguide.com/blog',
  },
  openGraph: {
    title: 'Visa & Travel Blog | VisaInfoGuide',
    description: 'In-depth visa guides, application checklists, and travel tips from expert writer Matthew Lin.',
    type: 'website',
    url: 'https://visainfoguide.com/blog',
    siteName: 'VisaInfoGuide',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Visa & Travel Blog
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              In-depth guides, application checklists, and expert advice to help you navigate visa requirements with confidence.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BlogListingClient />
        </div>
      </div>
    </div>
  );
}
