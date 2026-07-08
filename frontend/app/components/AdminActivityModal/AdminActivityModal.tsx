'use client';

import { useState, FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { Activity } from '@/types';

interface AdminActivityModalProps {
  activity: Partial<Activity>;
  setActivity: (activity: Partial<Activity>) => void;
  onUploadImage: (file: File) => Promise<string>;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export default function AdminActivityModal({
  activity,
  setActivity,
  onUploadImage,
  onClose,
  onSubmit,
}: AdminActivityModalProps) {
  const [uploading, setUploading] = useState(false);
  const galleryValue = (activity.gallery ?? []).join('\n');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      setActivity({ ...activity, image: url });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 font-normal">
      <div className="w-full max-w-lg glass-dark p-6 rounded-3xl border border-stone-800 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto scrollbar-none">
        <h3 className="text-sm font-black font-display text-white border-b border-stone-900 pb-2">
          {activity.id ? 'MODIFIER LA CAMPAGNE' : 'CREER UNE NOUVELLE CAMPAGNE'}
        </h3>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-xs">
          <Field label="Titre">
            <input
              type="text"
              value={activity.title || ''}
              onChange={(event) => setActivity({ ...activity, title: event.target.value })}
              placeholder="Ex: Distribution d'aide humanitaire"
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Secteur / Categorie">
              <select
                value={activity.category || 'Sante et Prevention'}
                onChange={(event) => setActivity({ ...activity, category: event.target.value })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
              >
                <option value="Sante et Prevention">Sante et Prevention</option>
                <option value="Aide Humanitaire">Aide Humanitaire</option>
                <option value="Aide Sociale">Aide Sociale</option>
                <option value="Formation & Jeunesse">Formation & Jeunesse</option>
              </select>
            </Field>

            <Field label="Lieu (Secteur Gafsa)">
              <input
                type="text"
                value={activity.location || ''}
                onChange={(event) => setActivity({ ...activity, location: event.target.value })}
                placeholder="Ex: Redeyef"
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Budget Target (TND)">
              <input
                type="number"
                value={activity.targetAmount ?? 0}
                onChange={(event) => setActivity({ ...activity, targetAmount: Number(event.target.value) })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
            <Field label="Collecte (TND)">
              <input
                type="number"
                value={activity.raisedAmount ?? 0}
                onChange={(event) => setActivity({ ...activity, raisedAmount: Number(event.target.value) })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
            <Field label="Beneficiaires">
              <input
                type="number"
                value={activity.beneficiaries ?? 0}
                onChange={(event) => setActivity({ ...activity, beneficiaries: Number(event.target.value) })}
                className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
                required
              />
            </Field>
          </div>

          <Field label="Image de couverture">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
            />
            <p className="text-[10px] text-stone-500 font-mono">
              {uploading ? 'Téléversement...' : activity.image ? 'Image enregistrée sur le serveur.' : 'Choisissez une image depuis votre appareil.'}
            </p>
          </Field>

          <Field label="URL de l'image">
            <input
              type="text"
              value={activity.image || ''}
              onChange={(event) => setActivity({ ...activity, image: event.target.value })}
              placeholder="https://... ou lien direct vers l'image"
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <Field label="Galerie (une URL par ligne)">
            <textarea
              value={galleryValue}
              onChange={(event) => {
                const gallery = event.target.value
                  .split('\n')
                  .map((item) => item.trim())
                  .filter(Boolean);
                setActivity({ ...activity, gallery });
              }}
              placeholder="https://images.unsplash.com/...\nhttps://images.unsplash.com/..."
              rows={4}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <Field label="Statut d'Action">
            <select
              value={activity.status || 'active'}
              onChange={(event) => setActivity({ ...activity, status: event.target.value as Activity['status'] })}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-red-500"
            >
              <option value="active">Active (En Cours)</option>
              <option value="completed">Bouclee (Completee)</option>
              <option value="draft">Brouillon</option>
            </select>
          </Field>

          <Field label="Resume Descriptif">
            <textarea
              value={activity.description || ''}
              onChange={(event) => setActivity({ ...activity, description: event.target.value })}
              placeholder="Bref resume de la campagne..."
              rows={2}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <Field label="Rapport / Details de Terrain">
            <textarea
              value={activity.details || ''}
              onChange={(event) => setActivity({ ...activity, details: event.target.value })}
              placeholder="Rapport complet de l'operation..."
              rows={4}
              className="px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
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
