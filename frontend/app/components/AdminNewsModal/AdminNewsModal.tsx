'use client';

import { useState, FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { NewsItem } from '@/types';

interface AdminNewsModalProps {
  news: Partial<NewsItem>;
  setNews: (news: Partial<NewsItem>) => void;
  onUploadImage: (file: File) => Promise<string>;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export default function AdminNewsModal({
  news,
  setNews,
  onUploadImage,
  onClose,
  onSubmit,
}: AdminNewsModalProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      setNews({ ...news, image: url });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 font-normal">
      <div className="w-full max-w-lg glass-dark p-6 rounded-3xl border border-stone-800 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto scrollbar-none">
        <h3 className="text-sm font-black font-display text-white border-b border-stone-900 pb-2">
          {news.id ? 'MODIFIER UNE ACTUALITE' : 'PUBLIER UNE NOUVELLE ACTUALITE'}
        </h3>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-xs">
          <Field label="Titre">
            <input
              type="text"
              value={news.title || ''}
              onChange={(event) => setNews({ ...news, title: event.target.value })}
              placeholder="Ex: Nouvelle caravane medicale a Gafsa"
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <Field label="Resume">
            <textarea
              value={news.summary || ''}
              onChange={(event) => setNews({ ...news, summary: event.target.value })}
              placeholder="Courte description qui apparaitra dans les cartes..."
              rows={2}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <Field label="Contenu">
            <textarea
              value={news.content || ''}
              onChange={(event) => setNews({ ...news, content: event.target.value })}
              placeholder="Texte complet de l'actualite..."
              rows={6}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="date"
                value={news.date || ''}
                onChange={(event) => setNews({ ...news, date: event.target.value })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
            <Field label="Vues">
              <input
                type="number"
                min="0"
                value={news.views ?? 0}
                onChange={(event) => setNews({ ...news, views: Number(event.target.value) })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
          </div>

          <Field label="Image">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
            />
            <p className="text-[10px] text-stone-500 font-mono">
              {uploading ? 'Téléversement...' : 'Upload optionnel. Vous pouvez aussi coller un lien direct ci-dessous.'}
            </p>
          </Field>

          <Field label="URL de l'image">
            <input
              type="text"
              value={news.image || ''}
              onChange={(event) => setNews({ ...news, image: event.target.value })}
              placeholder="https://... ou lien direct vers l'image"
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-white rounded-xl border border-stone-800 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold font-mono text-stone-400 uppercase">{label}</label>
      {children}
    </div>
  );
}
