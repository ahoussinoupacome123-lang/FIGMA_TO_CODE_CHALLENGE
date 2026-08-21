export type DonationType = 'sang_total' | 'plasma' | 'plaquettes';

export interface Center {
  id: number;
  name: string;
  nature: string;
  address: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  hours: {
    jours: string;
    horaires: string;
  }[];
  isOpen: boolean;
  donationTypes: DonationType[];
  appointmentRequired: boolean;
}

export const BENIN_CENTER = { lat: 6.4961, lng: 2.6292 } as const;

export const centers: Center[] = [
  {
    id: 1,
    name: "Centre National de Transfusion Sanguine (CNTS)",
    nature: "CNTS - Siège national",
    address: "Avenue Steinmetz, Cotonou",
    city: "Cotonou",
    postalCode: "01 BP",
    lat: 6.3703,
    lng: 2.3912,
    phone: "+229 21 30 05 50",
    email: "cnts-cotonou@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h30 - 17h00" },
      { jours: "Samedi", horaires: "08h00 - 14h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total", "plasma", "plaquettes"],
    appointmentRequired: false,
  },
  {
    id: 2,
    name: "Hôpital de Zone de Parakou - Unité de Transfusion",
    nature: "Unité hospitalière",
    address: "Route de Natitingou, Parakou",
    city: "Parakou",
    postalCode: "04 BP",
    lat: 9.3372,
    lng: 2.6153,
    phone: "+229 23 61 02 13",
    email: "transfusion-parakou@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 15h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total", "plasma"],
    appointmentRequired: false,
  },
  {
    id: 3,
    name: "Centre Hospitalier Universitaire de Porto-Novo",
    nature: "Unité hospitalière",
    address: "Avenue de la Libération, Porto-Novo",
    city: "Porto-Novo",
    postalCode: "03 BP",
    lat: 6.4965,
    lng: 2.6290,
    phone: "+229 22 23 25 10",
    email: "transfusion-portonovo@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h30 - 15h30" },
      { jours: "Samedi", horaires: "Fermé" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total"],
    appointmentRequired: true,
  },
  {
    id: 4,
    name: "Centre Hospitalier Départemental de l'Atlantique",
    nature: "Hôpital régional",
    address: "Zone administrative, Abomey-Calavi",
    city: "Abomey-Calavi",
    postalCode: "01 BP",
    lat: 6.4380,
    lng: 2.3370,
    phone: "+229 21 00 33 77",
    email: "chd-atlantique@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 15h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total"],
    appointmentRequired: false,
  },
  {
    id: 5,
    name: "Hôpital de Zone de Djougou",
    nature: "Unité hospitalière",
    address: "Avenue de l'Indépendance, Djougou",
    city: "Djougou",
    postalCode: "06 BP",
    lat: 9.7070,
    lng: 1.6670,
    phone: "+229 23 72 10 05",
    email: "hz-djougou@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 14h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total"],
    appointmentRequired: false,
  },
  {
    id: 6,
    name: "Centre de Transfusion Sanguine de Ouidah",
    nature: "CNTS - Antenne régionale",
    address: "Avenue de la République, Ouidah",
    city: "Ouidah",
    postalCode: "01 BP",
    lat: 6.3631,
    lng: 2.0845,
    phone: "+229 21 23 10 40",
    email: "cts-ouidah@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h30 - 14h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total", "plasma"],
    appointmentRequired: false,
  },
  {
    id: 7,
    name: "Centre Hospitalier Régional de Kandi",
    nature: "Hôpital régional",
    address: "Avenue de l'Indépendance, Kandi",
    city: "Kandi",
    postalCode: "08 BP",
    lat: 11.1340,
    lng: 2.9380,
    phone: "+229 23 85 10 15",
    email: "chr-kandi@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 14h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total"],
    appointmentRequired: false,
  },
  {
    id: 8,
    name: "Hôpital de Zone de Lokossa",
    nature: "Unité hospitalière",
    address: "Route de Grand-Popo, Lokossa",
    city: "Lokossa",
    postalCode: "05 BP",
    lat: 6.4440,
    lng: 1.7330,
    phone: "+229 23 53 10 20",
    email: "hz-lokossa@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 14h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: false,
    donationTypes: ["sang_total"],
    appointmentRequired: false,
  },
  {
    id: 9,
    name: "Centre Hospitalier Départemental du Zou",
    nature: "Hôpital régional",
    address: "Zone hospitalière, Bohicon",
    city: "Bohicon",
    postalCode: "02 BP",
    lat: 7.1750,
    lng: 2.0660,
    phone: "+229 22 52 13 40",
    email: "chd-zou@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h30 - 15h00" },
      { jours: "Samedi", horaires: "08h00 - 12h00" },
      { jours: "Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total", "plasma"],
    appointmentRequired: false,
  },
  {
    id: 10,
    name: "Hôpital de Zone de Natitingou",
    nature: "Unité hospitalière",
    address: "Avenue de la République, Natitingou",
    city: "Natitingou",
    postalCode: "07 BP",
    lat: 10.3220,
    lng: 1.3770,
    phone: "+229 23 73 30 15",
    email: "hz-natitingou@sante.bj",
    hours: [
      { jours: "Lundi - Vendredi", horaires: "07h00 - 14h00" },
      { jours: "Samedi - Dimanche", horaires: "Fermé" },
    ],
    isOpen: true,
    donationTypes: ["sang_total"],
    appointmentRequired: false,
  },
];

export const donationTypeLabels: Record<DonationType, string> = {
  sang_total: 'Sang total',
  plasma: 'Plasma',
  plaquettes: 'Plaquettes',
};

export const cities = [...new Set(centers.map((c) => c.city))].sort();
export const donationTypes = [...new Set(centers.flatMap((c) => c.donationTypes))].sort() as DonationType[];
