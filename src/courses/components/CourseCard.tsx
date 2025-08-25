import React from 'react';

export default function CourseCard({
  title,
  code,
  category,
  onEnter,
}: {
  title: string;
  code?: string;
  category?: string;
  onEnter?: () => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {code ? (
          <span className="text-xs px-2 py-1 rounded bg-gray-100">{code}</span>
        ) : null}
      </div>
      {category ? (
        <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">
          {category}
        </p>
      ) : null}
      <button
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90"
        onClick={onEnter}
      >
        Enter course
      </button>
    </div>
  );
}
