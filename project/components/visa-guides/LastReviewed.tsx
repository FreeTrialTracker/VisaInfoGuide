import { Calendar } from 'lucide-react';

interface LastReviewedProps {
  date: string;
}

export default function LastReviewed({ date }: LastReviewedProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
      <Calendar className="w-4 h-4" />
      <span>Last reviewed: {date}</span>
    </div>
  );
}
