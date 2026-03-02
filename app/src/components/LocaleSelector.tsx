'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const LOCALES = [
  { value: '', label: 'All Locales' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja-JP', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
];

export default function LocaleSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = searchParams.get('locale') || '';

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (locale) {
      params.set('locale', locale);
    } else {
      params.delete('locale');
    }
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <label htmlFor="locale-select" className="block text-sm font-medium mb-2">
        Filter by Locale:
      </label>
      <select
        id="locale-select"
        value={currentLocale}
        onChange={handleLocaleChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {LOCALES.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
}

