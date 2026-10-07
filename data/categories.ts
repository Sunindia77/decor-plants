import type { ProductCategory, ProductSubcategory } from "@/types/product";

export interface ShopSubcategory {
  label: string;
  subcategory?: ProductSubcategory;
  subcategories?: ProductSubcategory[];
  tag?: string;
  nameIncludes?: string[];
  children?: ShopSubcategory[];
}

export interface ShopCategory {
  label: ProductCategory;
  subcategories: ShopSubcategory[];
}

export const shopCategories: ShopCategory[] = [
  {
    label: "Indoor Plants",
    subcategories: [
      {
        label: "Aglaonema Plants",
        subcategory: "Aglaonema Plants",
        children: [
          { label: "Snow White", nameIncludes: ["Snow White"] },
          { label: "Red Lipstick", nameIncludes: ["Red Lipstick", "Pink Lipstick"] },
          { label: "Lipstick Green", nameIncludes: ["Lipstick Green"] },
          { label: "Beauty", nameIncludes: ["Beauty"] },
          { label: "Pink Valentine", nameIncludes: ["Pink Valentine"] },
          { label: "Thailand Red", nameIncludes: ["Thailand Red"] },
          { label: "Super White", nameIncludes: ["Super White"] },
          { label: "China Red", nameIncludes: ["China Red"] },
          { label: "Ten Karat", nameIncludes: ["Ten Karat"] },
          { label: "Tricolor", nameIncludes: ["Tricolor"] },
          { label: "Pictum Tricolor", nameIncludes: ["Pictum Tricolor"] },
          { label: "Peach Cochin", nameIncludes: ["Peach Cochin"] },
          { label: "Kumkum", nameIncludes: ["Kumkum"] },
          { label: "Chinese Evergreen", nameIncludes: ["Chinese Evergreen"] },
          { label: "Red Emerald", nameIncludes: ["Red Emerald"] },
          { label: "Red Apple", nameIncludes: ["Red Apple"] },
          { label: "Red Vein", nameIncludes: ["Red Vein"] },
          { label: "White Anjuman", nameIncludes: ["White Anjuman"] },
          { label: "Fireworks", nameIncludes: ["Fireworks"] },
          {
            label: "Other Aglaonema Varieties",
            nameIncludes: [
              "Butterfly",
              "White Legacy",
              "Lucky Frozen Ruby",
              "Pink Emerald",
              "Bai Kaw",
              "Pink Panama",
              "Pink Khanza",
              "Peach Panama",
              "White Laksub",
              "Golden Papaya",
              "White Stem",
              "Happiness",
            ],
          },
        ],
      },
      {
        label: "Money Plants",
        subcategory: "Money Plants",
        children: [
          { label: "Golden Money Plant", nameIncludes: ["Golden Money Plant", "Golden Moneyplant"] },
          { label: "Oxycardium Green", nameIncludes: ["Oxycardium Green", "Oxy Cardium Green"] },
          { label: "Oxy Cardium Red", nameIncludes: ["Oxy Cardium Red", "Oxycardium Red"] },
          { label: "Oxycardium Golden", nameIncludes: ["Oxycardium Golden", "Oxy Golden Cardium"] },
          { label: "Green Money Plant", nameIncludes: ["Green Money Plant", "Green Money Plants"] },
          { label: "Scindapsus", nameIncludes: ["Scindapsus"] },
          { label: "Sleeping Pothos", nameIncludes: ["Sleeping Pothos"] },
          { label: "Scindapsus Treubii Dark Form", nameIncludes: ["Scindapsus Treubii Dark Form"] },
          { label: "Scindapsus Moonlight", nameIncludes: ["Scindapsus Moonlight"] },
          { label: "Scindapsus Silver Satin", nameIncludes: ["Scindapsus Silver Satin"] },
          { label: "Scindapsus Njoy", nameIncludes: ["Scindapsus Njoy"] },
          { label: "Epipremnum Aureum Shangri La", nameIncludes: ["Epipremnum Aureum Shangri La"] },
          { label: "Hanging Money Plants", nameIncludes: ["Hanging", "Moneyplant Hanging"] },
        ],
      },
      {
        label: "Dieffenbachia Plants",
        subcategory: "Dieffenbachia Plants",
        children: [
          { label: "White Flame", nameIncludes: ["White Flame"] },
          { label: "Amy", nameIncludes: ["'Amy'"] },
          { label: "Star Bright", nameIncludes: ["Star Bright"] },
          { label: "New", nameIncludes: ["Dieffenbachia New"] },
          { label: "Delilah", nameIncludes: ["Delilah"] },
          { label: "Camille", nameIncludes: ["Camille"] },
          { label: "Green Magic", nameIncludes: ["Green Magic"] },
        ],
      },
      {
        label: "Monstera Plants",
        subcategory: "Monstera Plants",
        children: [
          { label: "Monstera Deliciosa", nameIncludes: ["Deliciosa", "delicosa"] },
          { label: "Monstera Peru", nameIncludes: ["Monstera Peru", "Monstrera Peru"] },
          { label: "Broken Hearts", nameIncludes: ["Broken Hearts"] },
          { label: "Peru Hanging", nameIncludes: ["Peru Hanging"] },
          { label: "Thai Constellation", nameIncludes: ["Thai Constellation"] },
          { label: "Burle Marx Flame", nameIncludes: ["Burle Marx Flame"] },
          { label: "Peru Variegated", nameIncludes: ["Peru Variegated"] },
          { label: "Adansonii Variegated", nameIncludes: ["Adansonii Variegated"] },
          { label: "White Monstera", nameIncludes: ["White Monstera", "White Monster"] },
          { label: "Lemon Monstera", nameIncludes: ["Monstera Lemon", "Monstera Lemon Plants"] },
        ],
      },
      {
        label: "Asplenium Nidus Plants",
        subcategory: "Asplenium Nidus Plants",
        children: [
          { label: "Crispy Wave", nameIncludes: ["Crispy Wave"] },
          { label: "Leslie", nameIncludes: ["Leslie"] },
          { label: "Nidus/Cobra", nameIncludes: ["Asplenium Nidus", "Asplenium Cobra"] },
          { label: "Variegated", nameIncludes: ["Asplenium Nidus Variegated"] },
          { label: "Nidus 14.5 cm", nameIncludes: ["Asplenium Nidus 14.5 cm"] },
          { label: "Asplenium 20 cm", nameIncludes: ["Asplenium 20 cm"] },
        ],
      },
      {
        label: "Flowering Plants",
        subcategories: ["New Flowering Plants", "Flowering Plants"],
        children: [
          { label: "Spathiphyllum", nameIncludes: ["Spathiphyllum"] },
          { label: "Anthurium", nameIncludes: ["Anthurium"] },
          { label: "Dendrobium Orchid", nameIncludes: ["Dendrobium Orchid"] },
          { label: "Guzmania", nameIncludes: ["Guzmania"] },
        ],
      },
      {
        label: "Philodendron Plants",
        subcategory: "Philodendron Plants",
        children: [
          { label: "Chlorophytum", nameIncludes: ["Chlorophytum"] },
          { label: "Bird of Paradise Yellow", nameIncludes: ["Bird of Paradise Yellow"] },
          { label: "Xanadu", nameIncludes: ["Xanadu", "zanadu"] },
          { label: "Sunshine", nameIncludes: ["Sunshine"] },
          { label: "Golden Varieties", nameIncludes: ["Philodendron Golden"] },
          { label: "White Wizard", nameIncludes: ["White Wizard"] },
          { label: "Brandtianum", nameIncludes: ["Brandtianum"] },
          { label: "Narrow Variegated", nameIncludes: ["Narrow Variegated"] },
          { label: "Pink Bikin", nameIncludes: ["Pink Bikin"] },
          { label: "Golden Saw", nameIncludes: ["Golden Saw"] },
          { label: "Moonshine", nameIncludes: ["Moonshine"] },
          { label: "Melinonii", nameIncludes: ["Melinonii"] },
          { label: "Sun Red", nameIncludes: ["Sun Red"] },
          { label: "Black Cardinal", nameIncludes: ["Black Cardinal"] },
          { label: "Miniature", nameIncludes: ["Miniature"] },
          { label: "Black Narrow", nameIncludes: ["Black Narrow"] },
          { label: "Pink Princess", nameIncludes: ["Pink Princess"] },
          { label: "Calkins Gold", nameIncludes: ["Calkins Gold"] },
          { label: "Verrucosum", nameIncludes: ["Verrucosum"] },
          { label: "Homalomena Green", nameIncludes: ["Homalomena Green"] },
          { label: "Black Majesty", nameIncludes: ["Black Majesty"] },
          { label: "Billietiae", nameIncludes: ["Billietiae"] },
          { label: "Gloriosum", nameIncludes: ["Gloriosum"] },
          { label: "Narrow Green", nameIncludes: ["Narrow Green"] },
          { label: "Goeldii", nameIncludes: ["Goeldii"] },
          { label: "Red Congo", nameIncludes: ["Red Congo"] },
        ],
      },
      {
        label: "Radermachera Plants",
        subcategory: "Radermachera Plants",
        children: [{ label: "Golden", nameIncludes: ["Golden"] }],
      },
      {
        label: "Schefflera Plants",
        subcategory: "Schefflera Plants",
        children: [
          { label: "Standard", nameIncludes: ["Schefflera Plant"] },
          { label: "Variegated", nameIncludes: ["Schefflera Variegated"] },
        ],
      },
      {
        label: "Brassia Orchids",
        subcategory: "Brassia Orchids",
        children: [{ label: "Golden", nameIncludes: ["Brassia Golden"] }],
      },
      {
        label: "Palm Plants",
        subcategory: "Palm Plants",
        children: [
          { label: "Areca Palm", nameIncludes: ["Areca Palm"] },
          { label: "Bamboo Palm", nameIncludes: ["Bamboo Palm"] },
          { label: "Rhapis Excelsa", nameIncludes: ["Rhapis Excelsa"] },
          { label: "Homalomena", nameIncludes: ["Homalomena"] },
        ],
      },
      {
        label: "Pachira Plants",
        subcategory: "Pachira Plants",
        children: [
          { label: "Pachira Money Tree", nameIncludes: ["Pachira Money Tree"] },
          { label: "Pachira Macrocarpa Bonsai", nameIncludes: ["Pachira Macrocarpa"] },
          { label: "Pachira Aquatica", nameIncludes: ["Pachira aquatica"] },
          { label: "Pachira Money Plants", nameIncludes: ["Pachira Money Plants"] },
          { label: "Pachira in Decorative Pot", nameIncludes: ["Pachira in Glazed Bamboo"] },
        ],
      },
      { label: "Other Indoor Plants", subcategory: "Other Indoor Plants" },
      { label: "Air Purifying Plants", tag: "Air Purifying Plants" },
      { label: "Low Maintenance", tag: "Low Maintenance" },
    ],
  },
  {
    label: "Outdoor Plants",
    subcategories: [
      { label: "Outdoor Foliage Plants", subcategory: "Outdoor Foliage Plants" },
      {
        label: "Flowering Plants",
        subcategories: ["New Flowering Plants", "Flowering Plants"],
        children: [
          { label: "Adenium", nameIncludes: ["Adenium"] },
          { label: "Poinsettia", nameIncludes: ["Poinsettia"] },
          { label: "Bougainvillea", nameIncludes: ["Bougainvillea"] },
        ],
      },
      {
        label: "Hosta Plants",
        subcategory: "Hosta Plants",
        children: [
          { label: "Marginata White", nameIncludes: ["Marginata White"] },
          { label: "Autumn Frost", nameIncludes: ["Autumn Frost"] },
          { label: "Other Hosta", nameIncludes: ["Hosta Plants"] },
        ],
      },
      { label: "Low Maintenance", tag: "Low Maintenance" },
    ],
  },
  {
    label: "Planters",
    subcategories: [{ label: "Ceramic Planters", subcategory: "Ceramic Planters" }],
  },
  {
    label: "Plant Combos",
    subcategories: [
      { label: "Indoor Plant Combos", subcategory: "Indoor Plant Combos" },
      {
        label: "Corporate Plant Gifts",
        subcategory: "Corporate Plant Gifts",
        children: [
          { label: "Ceramic Pot Gifts", nameIncludes: ["Ceramic Pot"] },
          { label: "Plastic Pot Gifts", nameIncludes: ["Plastic Pot"] },
          { label: "Bamboo Pot Gifts", nameIncludes: ["Bamboo"] },
        ],
      },
    ],
  },
  {
    label: "Plant Care",
    subcategories: [{ label: "Plant Care Services", subcategory: "Plant Care Services" }],
  },
];
