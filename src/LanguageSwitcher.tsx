import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  te: { nativeName: 'తెలుగు' }
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          className={`px-3 py-1 text-sm rounded-md font-semibold transition-colors ${i18n.resolvedLanguage === lng ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng as keyof typeof lngs].nativeName}
        </button>
      ))}
    </div>
  );
}
