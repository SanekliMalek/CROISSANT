'use client';

export default function AdhesionHeader() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-4 w-full flex flex-col gap-3 relative z-10">
      <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md w-fit">
        CAMPAGNE DE RECRUTEMENT DE VOLONTAIRES 2026
      </div>
      <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-stone-900 leading-[1.05]">
        Rejoignez le <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-red-500 to-amber-500">Mouvement Humanitaire</span>
      </h1>
      <p className="text-lg text-stone-500 max-w-2xl leading-relaxed font-light italic">
        Vous souhaitez agir concrètement, acquérir des compétences de secourisme d'urgence et participer à la vie sociale du gouvernorat de Gafsa ? Candidatez en remplissant notre formulaire d'adhésion en quelques minutes.
      </p>
    </section>
  );
}
