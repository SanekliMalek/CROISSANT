'use client';

import { useState, FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { TeamMember } from '@/types';

interface AdminTeamModalProps {
  member: Partial<TeamMember>;
  setMember: (member: Partial<TeamMember>) => void;
  onUploadImage: (file: File) => Promise<string>;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export default function AdminTeamModal({ member, setMember, onUploadImage, onClose, onSubmit }: AdminTeamModalProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      setMember({ ...member, avatar: url });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 font-normal backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-3xl border border-stone-800 bg-zinc-950 p-6 shadow-2xl scrollbar-none">
        <h3 className="border-b border-stone-900 pb-2 text-sm font-black font-display text-white">
          {member.id ? 'MODIFIER LA FICHE VOLONTAIRE' : 'CREER UNE FICHE VOLONTAIRE'}
        </h3>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-xs">
          <Field label="Nom Complet">
            <input
              type="text"
              value={member.name || ''}
              onChange={(event) => setMember({ ...member, name: event.target.value })}
              placeholder="Ex: Sonia Mansour"
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <Field label="Role / Affectation">
            <input
              type="text"
              value={member.role || ''}
              onChange={(event) => setMember({ ...member, role: event.target.value })}
              placeholder="Ex: Secretaire Generale"
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
              required
            />
          </Field>

          <Field label="Pole d'Appartenance">
            <select
              value={member.category || 'field'}
              onChange={(event) => setMember({ ...member, category: event.target.value as TeamMember['category'] })}
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 focus:outline-none focus:border-red-500"
            >
              <option value="board">Conseil d'Administration (Board)</option>
              <option value="coordination">Coordination Regionale</option>
              <option value="medical">Secteur Medical</option>
              <option value="field">Secouristes d'Intervention (Terrain)</option>
            </select>
          </Field>

          <Field label="Email (Optionnel)">
            <input
              type="email"
              value={member.email || ''}
              onChange={(event) => setMember({ ...member, email: event.target.value })}
              placeholder="nom@crm-gafsa.org"
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <Field label="Telephone (Optionnel)">
            <input
              type="tel"
              value={member.phone || ''}
              onChange={(event) => setMember({ ...member, phone: event.target.value })}
              placeholder="+216 ..."
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <Field label="Photo de Profil">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 focus:outline-none focus:border-red-500"
            />
            <p className="font-mono text-[10px] text-stone-500">
              {uploading ? 'Téléversement...' : 'Upload optionnel. Vous pouvez aussi coller un lien direct ci-dessous.'}
            </p>
          </Field>

          <Field label="URL de l'image">
            <input
              type="text"
              value={member.avatar || ''}
              onChange={(event) => setMember({ ...member, avatar: event.target.value })}
              placeholder="https://... ou lien direct vers l'image"
              className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </Field>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-stone-400 hover:bg-stone-850 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 font-bold font-mono uppercase tracking-wider text-white shadow-md hover:bg-red-700"
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
      <label className="text-[10px] font-bold font-mono uppercase text-stone-400">{label}</label>
      {children}
    </div>
  );
}
