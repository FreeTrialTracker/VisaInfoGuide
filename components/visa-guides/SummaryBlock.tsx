import { AlertCircle } from 'lucide-react';

interface SummaryBlockProps {
  children: React.ReactNode;
}

export default function SummaryBlock({ children }: SummaryBlockProps) {
  return (
    <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-6 mb-8">
      <div className="flex gap-3">
        <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
        <div className="text-gray-800 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
