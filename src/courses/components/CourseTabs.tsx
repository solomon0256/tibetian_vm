import React from 'react';

export type CoursesTab = 'language' | 'scenic';

export default function CourseTabs({
  active,
  onChange,
}: {
  active: CoursesTab;
  onChange: (tab: CoursesTab) => void;
}) {
  const base =
    'px-4 py-2 text-sm font-medium rounded-md border transition';
  const activeCls =
    'bg-black text-white border-black';
  const inactiveCls =
    'bg-white text-black border-gray-300 hover:bg-gray-50';

  return (
    <div className="flex gap-2">
      <button
        className={`${base} ${active === 'language' ? activeCls : inactiveCls}`}
        onClick={() => onChange('language')}
      >
        Language & Culture
      </button>
      <button
        className={`${base} ${active === 'scenic' ? activeCls : inactiveCls}`}
        onClick={() => onChange('scenic')}
      >
        Scenic & History
      </button>
    </div>
  );
}
