import type { DiseaseClass, DiseaseInfo } from "./types";

export const DISEASE_INFO: Record<DiseaseClass, DiseaseInfo> = {
  Healthy: {
    name: "Healthy",
    scientificName: "Zea mays — no disease symptoms observed",
    healthy: true,
    description:
      "The leaf shows no visible symptoms of the fungal diseases covered by this system. Leaf tissue appears uniform, with normal colouration and intact structure.",
    symptoms: [
      "Uniform green colouration across the leaf blade",
      "No lesions, pustules or necrotic streaks",
      "Firm, upright leaf posture with intact margins",
    ],
    visualCharacteristics: [
      "Even chlorophyll distribution with clear parallel venation",
      "Smooth leaf surface free of raised pustules",
      "No water-soaked or straw-coloured regions",
    ],
    management: [
      "Continue routine field scouting at weekly intervals",
      "Maintain balanced nitrogen and potassium nutrition",
      "Keep records of field observations across the season",
    ],
    prevention: [
      "Use certified, disease-free seed",
      "Maintain recommended plant spacing for airflow",
      "Practise crop rotation and residue management",
    ],
  },
  "Common Rust": {
    name: "Common Rust",
    scientificName: "Puccinia sorghi",
    healthy: false,
    description:
      "A foliar fungal disease that produces powdery pustules on both leaf surfaces. It is favoured by cool temperatures (16–23 °C) and high relative humidity, and can reduce photosynthetic area when severe.",
    symptoms: [
      "Small circular to elongated cinnamon-brown pustules",
      "Pustules on both upper and lower leaf surfaces",
      "Chlorotic halos around older pustules",
      "Pustules darken to brownish-black as the crop matures",
    ],
    visualCharacteristics: [
      "Raised, powdery pustules that rupture the epidermis",
      "Reddish-brown spore masses that rub off onto fingers",
      "Scattered distribution rather than defined lesions",
    ],
    management: [
      "Apply a registered foliar fungicide when pustules appear before tasselling",
      "Prioritise treatment of susceptible hybrids under cool, humid weather",
      "Monitor severity on the ear leaf and leaves above it",
    ],
    prevention: [
      "Plant rust-resistant maize hybrids where available",
      "Avoid excessively late planting in humid seasons",
      "Scout early and often during periods of prolonged leaf wetness",
    ],
  },
  "Gray Leaf Spot": {
    name: "Gray Leaf Spot",
    scientificName: "Cercospora zeae-maydis",
    healthy: false,
    description:
      "A residue-borne fungal disease producing rectangular lesions bounded by leaf veins. It thrives in warm, humid conditions and in fields under continuous maize with heavy surface residue.",
    symptoms: [
      "Narrow, rectangular grey to tan lesions running parallel to veins",
      "Lesions begin on lower leaves and move upward",
      "Lesions coalesce, causing extensive leaf blighting",
      "Premature leaf senescence and stalk weakening in severe cases",
    ],
    visualCharacteristics: [
      "Sharp, vein-limited rectangular margins",
      "Greyish cast on the lesion surface under humid conditions",
      "Lesions appear translucent when held against light",
    ],
    management: [
      "Apply fungicide at the recommended growth stage when disease reaches threshold on lower leaves",
      "Bury or reduce infected residue through tillage where appropriate",
      "Harvest severely affected fields early to limit stalk lodging",
    ],
    prevention: [
      "Rotate maize with non-host crops for at least one season",
      "Select hybrids with documented gray leaf spot tolerance",
      "Avoid dense planting in fields with poor air movement",
    ],
  },
  "Northern Corn Leaf Blight": {
    name: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    healthy: false,
    description:
      "A foliar disease characterised by long, cigar-shaped lesions. It develops under moderate temperatures with extended leaf wetness and can cause significant yield loss when infection occurs before silking.",
    symptoms: [
      "Long elliptical, cigar-shaped grey-green to tan lesions",
      "Lesions 3–15 cm long, not limited by leaf veins",
      "Symptoms start on lower leaves and progress upward",
      "Dark spore production within lesions in humid weather",
    ],
    visualCharacteristics: [
      "Elongated lesions with tapered ends",
      "Straw-coloured lesion centres with darker borders",
      "Sooty appearance on lesion surface when sporulating",
    ],
    management: [
      "Apply a registered fungicide when lesions appear on leaves below the ear before tasselling",
      "Reassess fields 10–14 days after treatment",
      "Reduce infected crop residue after harvest",
    ],
    prevention: [
      "Grow hybrids carrying resistance genes to Exserohilum turcicum",
      "Rotate away from maize for at least one season",
      "Manage volunteer maize and grassy weeds that harbour inoculum",
    ],
  },
};

export const DISEASE_LIST = Object.values(DISEASE_INFO);

export const ACADEMIC_DISCLAIMER =
  "This system is intended as an academic decision-support tool and should not replace professional agricultural diagnosis.";