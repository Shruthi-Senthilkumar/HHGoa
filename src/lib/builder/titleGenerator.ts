const CURATED_TITLES = [
  "THE SYSTEMS BUILDER",
  "THE NIGHT BUILDER",
  "THE PRODUCT SHIPPER",
  "THE CODE ARCHITECT",
  "THE IDEA ENGINE",
  "THE RAPID BUILDER",
  "THE PIXEL PUSHER",
  "THE LOGIC CRAFTER",
  "THE DATA WEAVER",
  "THE FULLSTACK NOMAD",
  "THE PROTO SHIPPER"
];

export function generateBuilderTitle(): string {
  // We can use random selection from the curated list.
  // In the future, this could be seeded by the role/name to be deterministic.
  const randomIndex = Math.floor(Math.random() * CURATED_TITLES.length);
  return CURATED_TITLES[randomIndex];
}
