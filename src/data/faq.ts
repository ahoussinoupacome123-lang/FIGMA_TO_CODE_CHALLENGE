export interface FAQItem {
  question: string;
  answer: string;
  category: 'eligibilite' | 'deroulement' | 'sante' | 'pratique' | 'idees_recues';
}

export const faqItems: FAQItem[] = [
  {
    question: "Le don de sang est-il douloureux ?",
    answer:
      "La piqûre ressemble à une petite pincette qui dure une fraction de seconde. Pendant le prélèvement lui-même (environ 10 minutes), la plupart des donneurs ne ressentent aucune douleur. L'équipe médicale est présente en permanence pour vous rassurer et intervenir si besoin. Le inconfort, s'il y en a, est très temporaire et largement supportable.",
    category: 'idees_recues',
  },
  {
    question: "Combien de temps dure un don de sang ?",
    answer:
      "Comptez environ 45 minutes au total : l'accueil et l'entretien médical prennent 20 à 25 minutes, le prélèvement lui-même dure 8 à 12 minutes, et un temps de repos de 15 minutes est obligatoire après le don. Prévoyez environ 1 heure sur place pour être tranquille.",
    category: 'deroulement',
  },
  {
    question: "Peut-on donner son sang si l'on prend un traitement ?",
    answer:
      "Cela dépend du traitement. Certains médicaments sont compatibles avec le don, d'autres constituent une contre-indication temporaire ou définitive. Lors de l'entretien médical pré-don, le médecin évaluera votre situation personnelle. N'hésitez pas à venir avec la liste de vos traitements.",
    category: 'eligibilite',
  },
  {
    question: "Y a-t-il un risque d'attraper une maladie en donnant son sang ?",
    answer:
      "Absolument pas. Le matériel utilisé est strictement à usage unique : aiguille, tubes, poches. Tout est ouvert devant vous et jeté après le don dans des conteneurs de sécurité. Il n'y a aucun risque de contamination.",
    category: 'sante',
  },
  {
    question: "Combien de sang préleve-t-on lors d'un don ?",
    answer:
      "On prélève environ 450 ml de sang, soit moins de 10 % du volume sanguin total d'un adulte. Votre organisme reconstitue ce volume en 24 à 48 heures grâce à l'hydratation. Les globules rouges sont renouvelés en quelques semaines.",
    category: 'pratique',
  },
  {
    question: "Peut-on donner son sang après un tatouage ou un piercing ?",
    answer:
      "Après un tatouage ou un piercing, un délai d'attente de 4 mois est nécessaire avant de pouvoir donner votre sang. Ce délai permet de s'assurer qu'aucune infection n'est présente. Une fois ce délai passé, vous êtes à nouveau éligible.",
    category: 'eligibilite',
  },
  {
    question: "Faut-il être à jeun pour donner son sang ?",
    answer:
      "Non, au contraire ! Il est fortement recommandé de manger un repas léger avant le don. Arriver à jeun peut provoquer un malaise. Prévoyez également de bien vous hydrater dans les heures qui précèdent votre venue.",
    category: 'pratique',
  },
  {
    question: "Est-ce que je peux reprendre le travail ou conduire après le don ?",
    answer:
      "Oui, dans la très grande majorité des cas. Un repos de 15 minutes est obligatoire sur place, avec une collation. Évitez toutefois les efforts physiques intenses et les manœuvres dangereuses dans les heures qui suivent. Si vous ne vous sentez pas bien, signalez-le à l'équipe.",
    category: 'sante',
  },
  {
    question: "Les donneurs de sang sont-ils rémunérés ?",
    answer:
      "Au Bénin, le don de sang est strictement bénévole, volontaire et anonyme. Il n'y a aucune rémunération. Le don repose sur l'engagement citoyen et la solidarité. Les collations offertes après le don sont la seule \"contrepartie\".",
    category: 'pratique',
  },
  {
    question: "Je suis végétarien(ne), puis-je donner mon sang ?",
    answer:
      "Oui, être végétarien n'est pas une contre-indication au don de sang. Votre régime alimentaire n'affecte pas votre capacité à donner, tant que vous n'êtes pas carencé en fer. Un petit bilan sanguin peut être réalisé lors de l'entretien médical pour vérifier votre taux d'hémoglobine.",
    category: 'idees_recues',
  },
  {
    question: "À quelle fréquence peut-on donner son sang ?",
    answer:
      "Au Bénin, les hommes peuvent donner tous les 3 mois (soit 4 fois par an) et les femmes tous les 4 mois (soit 3 fois par an). Ces délais permettent à l'organisme de reconstituer ses réserves en fer. L'entretien médical permettra de confirmer que vous êtes en mesure de donner à chaque visite.",
    category: 'pratique',
  },
  {
    question: "Le don de sang fait-il grossir ou maigrir ?",
    answer:
      "Non. Le prélèvement de 450 ml ne modifie en rien votre poids de manière durable. Vous perdez temporairement le poids du liquide prélevé, mais votre organisme le reconstitue en 24 à 48 heures grâce à l'hydratation et à l'alimentation.",
    category: 'idees_recues',
  },
];

export const faqCategories: { id: FAQItem['category']; label: string }[] = [
  { id: 'eligibilite', label: 'Éligibilité' },
  { id: 'deroulement', label: 'Déroulement' },
  { id: 'sante', label: 'Santé' },
  { id: 'pratique', label: 'Pratique' },
  { id: 'idees_recues', label: 'Idées reçues' },
];
