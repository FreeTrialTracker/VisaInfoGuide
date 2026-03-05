import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InternalLink {
  title: string;
  description: string;
  href: string;
}

interface InternalLinksSectionProps {
  title?: string;
  links: InternalLink[];
}

export default function InternalLinksSection({
  title = 'Related Resources',
  links
}: InternalLinksSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid gap-4">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="group">
            <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-900 group-hover:text-teal-700 transition-colors flex items-center gap-2">
                  {link.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
