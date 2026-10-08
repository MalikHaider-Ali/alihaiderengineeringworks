// Content taken from the company profile. Replace placeholders once the client confirms details.
export const services = [
  { id: "substations", title: "Substations and power", summary: "Installation of MV and LV substations, DG sets and the panels that keep them running.",
    items: ["MV substation installation", "LV substation installation", "DG set, ATS panel and AMF panel", "Power distribution and cabling"] },
  { id: "protection", title: "Protection and safety", summary: "Systems that protect people and equipment from faults, lightning and fire.",
    items: ["Earthing", "Lightning protection system", "Fire alarms", "Public address system", "Emergency lighting"] },
  { id: "security", title: "Security systems", summary: "Electronic security designed around how your building is used.",
    items: ["CCTV", "Access control", "Biometric scanners"] },
  { id: "lighting", title: "Lighting", summary: "From everyday lighting to building illumination and special effects.",
    items: ["Power and lighting", "Building illumination", "Specialist lighting (special effects)"] },
  { id: "data", title: "Voice and data", summary: "Structured cabling and data systems for offices and facilities.",
    items: ["Voice and data installation", "Computer and data systems"] },
  { id: "design", title: "Maintenance, testing and design", summary: "We keep installations safe after handover, and design them in-house.",
    items: ["Planned maintenance", "Inspection and testing of electrical systems", "Energy saving surveys and reporting", "In-house design with full CAD facilities", "Power, control and mechanical work"] },
];

export const sectors = ["Hotels", "Private and public hospitals", "Schools and universities", "Sports and fitness centers",
  "Commercial and retail complexes", "Showrooms", "Social housing", "Industrial and manufacturing facilities", "Government and municipal buildings", "Residential complexes", "High-rise buildings", "Warehouses and storage facilities"];

export const categories = ["All", "Substation", "Cabling", "Panels", "Transmission", "Lighting"] as const;

export const projects = [
  { title: "132 kV bus bar stringing", category: "Substation", image: "busbar-132kv", text: "Bus bar stringing work in a high voltage switchyard." },
  { title: "11 kV panel installation", category: "Panels", image: "panels-11kv", text: "Installation of 11 kV switchgear panels." },
  { title: "11 kV switchgear room", category: "Panels", image: "panel-room-11kv", text: "A completed 11 kV panel room ready for testing." },
  { title: "Cable tray installation", category: "Cabling", image: "cable-tray", text: "Cable tray runs installed for power and control cabling." },
  { title: "Medium voltage cable termination", category: "Cabling", image: "cable-termination", text: "Our crew terminating medium voltage cables on site." },
  { title: "11 kV transmission line construction", category: "Transmission", image: "transmission-line", text: "Pole and tower works for an 11 kV line." },
  { title: "Distribution boards", category: "Panels", image: "distribution-boards", text: "Installation of distribution boards." },
  { title: "Street light installation", category: "Lighting", image: "street-lights", text: "Street light poles and luminaires installed with a crane." },
  { title: "Cable trunking", category: "Cabling", image: "cable-trunking", text: "Cable trunking installation for wiring routes." },
  { title: "Bracket fixing and cable laying", category: "Cabling", image: "cable-laying", text: "Cable trench with brackets fixed and cables laid." },
  { title: "Control cable termination", category: "Cabling", image: "control-cable", text: "Neat control cable termination inside a panel." },
  { title: "Cad weld jointing", category: "Substation", image: "cad-weld", text: "Cad weld joints for earthing conductors." },
];

export const values = [
  { title: "Safety", text: "We care about people on site and the people who use what we build." },
  { title: "Reliability", text: "We have integrity: we do what we say and finish what we start." },
  { title: "Responsiveness", text: "We listen to what you say and act on it." },
];

export const principles = [
  { title: "Honesty", text: "To always be truthful, open and candid." },
  { title: "Integrity", text: "To do what we say and live up to the highest standard of fairness." },
  { title: "Culture", text: "We seek new opportunities to learn, improve, teach and add value." },
  { title: "Passion", text: "We love what we do and we lead by example." },
];

export const team = [
  { name: "Malik Ghulam Muhammad", role: "Director" },
  { name: "Kashif Naseer", role: "Manager" },
  { name: "Awais Ahsan", role: "Manager, business development" },
  { name: "Haroon Abbas", role: "Quality supervisor" },
  { name: "Farukh Nisar", role: "Health and safety" },
  { name: "Zubair Arshed", role: "CAD operator" },
  { name: "Muhammad Iqbal", role: "Purchasing and stores manager" },
];

export const clients = [
  { name: "WAPDA", logo: "/client/wapda.png" },
  { name: "Jubilee Corporation", logo: "/client/jubilee-corp.png" },
  { name: "DHA Islamabad-Rawalpindi", logo: "/client/dha.png" },
  { name: "Bahria Town", logo: "/client/bahria.png" },
  { name: "Fauji Foundation", logo: "/client/fauji-foundation.png" },
];