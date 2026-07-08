'use client';

import { ShieldAlert, FileText } from 'lucide-react';

interface LegalContentProps {
  pageId: 'conditions' | 'confidentialite' | 'mentions-legales';
}

export default function LegalContent({ pageId }: LegalContentProps) {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] border border-white shadow-sm text-xs md:text-sm text-stone-700 leading-relaxed flex flex-col gap-6 font-normal">
      {pageId === 'conditions' && (
        <>
          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              1. Objet des CGU
            </h2>
            <p>
              Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités d'accès et de navigation sur le portail du Comité Régional de Gafsa du Croissant-Rouge Tunisien (CRM Gafsa). En naviguant sur ce site, vous acceptez sans réserve les présentes clauses de responsabilité.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              2. Adhésions et Volontariat
            </h2>
            <p>
              La soumission du formulaire de demande d'adhésion en tant que bénévole ne confère pas de statut automatique de membre actif. Chaque candidature fait l'objet d'un examen par la coordination de jeunesse de Gafsa et nécessite la validation d'un entretien physique au bureau régional, ainsi que le suivi de notre cursus de formation de base de niveau 1.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              3. Collectes de dons et transparence
            </h2>
            <p>
              Toutes les transactions financières ou engagements affichés sur le site sont gérés conformément à la législation tunisienne sur les associations à but non lucratif. Le comité régional s'engage à assurer la transparence budgétaire et à allouer les fonds collectés exclusivement aux programmes humanitaires de terrain désignés.
            </p>
          </section>
        </>
      )}

      {pageId === 'confidentialite' && (
        <>
          <div className="bg-red-50/50 border border-red-150 p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="text-red-600 shrink-0" size={18} />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-red-800 font-display text-xs">Conformité Réglementaire INPDP</span>
              <p className="text-[11px] text-red-700 font-normal">
                Le présent traitement de données à caractère personnel est régi par la loi organique tunisienne n° 2004-63 du 27 juillet 2004 relative à la protection des données à caractère personnel, sous le contrôle de l'INPDP.
              </p>
            </div>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              1. Collecte des données de candidature
            </h2>
            <p>
              Lors de votre demande d'adhésion en tant que bénévole, les données suivantes sont collectées et stockées dans notre registre numérique local sécurisé : Nom, Prénom, Email, Téléphone, Date de naissance, Ville de résidence, Profession, Domaines d'intérêt et créneaux de disponibilité.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              2. Finalité du traitement et Droits d'Accès
            </h2>
            <p>
              Ces informations sont exclusivement destinées au secrétariat permanent du Comité Régional de Gafsa pour organiser les entretiens de recrutement, planifier les formations d'urgence et coordonner les équipes d'intervention de terrain. Aucun partage commercial ou transfert externe n'est pratiqué.
            </p>
            <p className="mt-1">
              Conformément à la réglementation tunisienne, vous disposez d'un droit absolu d'accès, de rectification, et de suppression de vos données personnelles sur simple demande par email à : <span className="font-bold">contact@croissantrouge-gafsa.org.tn</span>.
            </p>
          </section>
        </>
      )}

      {pageId === 'mentions-legales' && (
        <>
          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              1. Édition du Site
            </h2>
            <p>
              Le présent site internet est édité officiellement par le Comité Régional du Croissant-Rouge Tunisien de Gafsa (CRT Gafsa).
            </p>
            <ul className="list-disc pl-5 mt-1 flex flex-col gap-1 text-stone-600">
              <li><span className="font-bold text-stone-800">Directeur de la Publication :</span> Dr. Ahmed Belkacem (Président du Comité Régional)</li>
              <li><span className="font-bold text-stone-800">Rédaction administrative :</span> Sonia Mansour (Secrétaire Générale)</li>
              <li><span className="font-bold text-stone-800">Adresse de l'association :</span> Avenue de la République, Bureau Régional Gafsa 2100, Tunisie</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-stone-900 font-bold font-display text-base flex items-center gap-1.5">
              <FileText size={16} className="text-red-500" />
              2. Hébergement
            </h2>
            <p>
              Ce site internet et sa base de données sont hébergés et exécutés en environnement conteneurisé cloud sur des infrastructures hautement disponibles, surveillées par l'équipe technique de développement d'AI Studio Build.
            </p>
          </section>
        </>
      )}

      <div className="pt-6 border-t border-stone-200/30 flex items-center justify-between text-stone-400 text-[9px] font-mono uppercase tracking-wider font-bold">
        <span>Dernière mise à jour : Juillet 2026</span>
        <span>Comité Régional CRM Gafsa</span>
      </div>
    </div>
  );
}
