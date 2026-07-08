'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { adhesionApi } from '@/services/api';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  profession: string;
  interests: string[];
  preferredSlots: string[];
}

export function useAdhesion() {
  const [activeItem, setActiveItem] = useState<string | undefined>('1');
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    city: 'Gafsa Ville',
    profession: '',
    interests: [],
    preferredSlots: []
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    "Secourisme d'Urgence",
    "Aide Sociale & Distribution",
    "Logistique & Transport",
    "Sensibilisation & Santé",
    "Soutien Psychologique",
    "Activités Jeunesse & Culture"
  ];

  const slotOptions = [
    "Matins en semaine (8h - 12h)",
    "Après-midis en semaine (14h - 18h)",
    "Week-end (Samedi / Dimanche)"
  ];

  const cities = [
    'Gafsa Ville',
    'Metlaoui',
    'Redeyef',
    'Moulares',
    'Mdhilla',
    'El Guettar',
    'Sened',
    'Sidi Aïch',
    'Belkhir',
    'El Ksar'
  ];

  const isSection1Complete = !!(
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.birthDate &&
    formData.profession
  );
  const isSection2Complete = formData.interests.length > 0;
  const isSection3Complete = formData.preferredSlots.length > 0;

  useEffect(() => {
    if (activeItem) {
      const timer = setTimeout(() => {
        const element = itemRefs.current[activeItem];
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeItem]);

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSlotToggle = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredSlots: prev.preferredSlots.includes(slot)
        ? prev.preferredSlots.filter((s) => s !== slot)
        : [...prev.preferredSlots, slot]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Veuillez remplir tous les champs obligatoires d'identité.");
      return;
    }

    if (formData.interests.length === 0) {
      setError("Veuillez cocher au moins un domaine d'intérêt.");
      return;
    }

    if (formData.preferredSlots.length === 0) {
      setError("Veuillez cocher au moins un créneau horaire préféré pour l'entretien.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resData = await adhesionApi.create(formData);

      if (resData.success) {
        setSuccess(true);
      } else {
        setError(resData.message || "Une erreur s'est produite lors de la soumission.");
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de joindre le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      city: 'Gafsa Ville',
      profession: '',
      interests: [],
      preferredSlots: []
    });
  };

  return {
    activeItem,
    setActiveItem,
    itemRefs,
    formData,
    setFormData,
    loading,
    success,
    error,
    interestOptions,
    slotOptions,
    cities,
    isSection1Complete,
    isSection2Complete,
    isSection3Complete,
    handleInterestToggle,
    handleSlotToggle,
    handleSubmit,
    handleReset
  };
}
