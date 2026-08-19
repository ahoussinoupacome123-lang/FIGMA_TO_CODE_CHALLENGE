export interface EligibilityInput {
  age: number | null;
  weight: number | null;
  gender: 'homme' | 'femme' | '';
  lastDonationDate: string | null; // ISO date string or null
}

export type EligibilityStatus = 'eligible' | 'not_eligible' | 'next_date';

export interface EligibilityResult {
  status: EligibilityStatus;
  reasons: string[];
  nextEligibleDate: string | null;
}

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  // Age check
  if (input.age === null) {
    return { status: 'not_eligible', reasons: ['Veuillez entrer votre âge.'], nextEligibleDate: null };
  }
  if (input.age < 18) {
    return { status: 'not_eligible', reasons: [`Vous devez avoir au moins 18 ans. Âge actuel : ${input.age} ans.`], nextEligibleDate: null };
  }
  if (input.age > 65) {
    return { status: 'not_eligible', reasons: [`L'âge maximum pour donner est de 65 ans révolus. Âge actuel : ${input.age} ans.`], nextEligibleDate: null };
  }

  // Weight check
  if (input.weight === null) {
    return { status: 'not_eligible', reasons: ['Veuillez entrer votre poids.'], nextEligibleDate: null };
  }
  if (input.weight < 50) {
    return { status: 'not_eligible', reasons: [`Le poids minimum requis est de 50 kg. Poids saisi : ${input.weight} kg.`], nextEligibleDate: null };
  }

  // Gender check
  if (!input.gender) {
    return { status: 'not_eligible', reasons: ['Veuillez sélectionner votre genre.'], nextEligibleDate: null };
  }

  // Delay check
  if (input.lastDonationDate) {
    const lastDonation = new Date(input.lastDonationDate);
    const now = new Date();
    const delayMonths = input.gender === 'femme' ? 4 : 3;

    const nextDate = new Date(lastDonation);
    nextDate.setMonth(nextDate.getMonth() + delayMonths);

    if (now < nextDate) {
      const formattedDate = nextDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return {
        status: 'next_date',
        reasons: [
          `Un délai de ${delayMonths} mois est requis entre deux dons (${input.gender === 'femme' ? 'femmes' : 'hommes'}).`,
          `Votre prochain don sera possible à partir du ${formattedDate}.`,
        ],
        nextEligibleDate: formattedDate,
      };
    }
  }

  return {
    status: 'eligible',
    reasons: [
      "Vous semblez éligible au don de sang d'après les critères de base.",
    ],
    nextEligibleDate: null,
  };
}
