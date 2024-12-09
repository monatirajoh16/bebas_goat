  // app/ui/date-filter.tsx
  "use client"; // Pastikan ini adalah komponen client

  import { useEffect, useRef } from 'react';

  interface DateFilterProps {
    onFilter: (min: string | null, max: string | null) => void;
  }

  const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
    const minDateRef = useRef<HTMLInputElement | null>(null);
    const maxDateRef = useRef<HTMLInputElement | null>(null);

    const handleChange = () => {
      const minDate = minDateRef.current?.value || null;
      const maxDate = maxDateRef.current?.value || null;
      onFilter(minDate, maxDate);
    };

    return (
      <div className="flex items-center gap-4">
        <input
          type="date"
          ref={minDateRef}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
        />
        <span className="text-gray-600">s.d.</span>
        <input
          type="date"
          ref={maxDateRef}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
        />
      </div>
    );
  };

  export default DateFilter;
