import { ExternalLink, BookOpen } from 'lucide-react';

interface Source {
  name: string;
  url: string;
}

interface SourcesBlockProps {
  sources: Source[];
}

export default function SourcesBlock({ sources }: SourcesBlockProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-900">Sources</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Information compiled from official government sources and verified data:
      </p>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:underline group"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{source.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
