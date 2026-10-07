import type { Product, ProductCategory, ProductSubcategory } from "@/types/product";

type AdditionalInventoryGroup =
  | "Corporate Plant Gifts"
  | "Philodendron Plants"
  | "Radermachera Plants"
  | "Schefflera Plants"
  | "Brassia Orchids"
  | "Palm Plants"
  | "Hosta Plants"
  | "Pachira Plants";

interface AdditionalInventoryItem {
  number: number;
  name: string;
  price: number;
  image: string;
  group: AdditionalInventoryGroup;
}

const additionalInventory: AdditionalInventoryItem[] = [
  {
    "number": 1,
    "name": "Pachira in Glazed Bamboo - Node Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-001.jpg"
  },
  {
    "number": 2,
    "name": "Lotus Bamboo In Ceramic Pot",
    "price": 1000,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-002.jpg"
  },
  {
    "number": 3,
    "name": "Lucky Bamboo in Glazed Bamboo - Node Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-003.jpg"
  },
  {
    "number": 4,
    "name": "Calathea Makoyana Plant With Plastic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-004.jpg"
  },
  {
    "number": 5,
    "name": "Dracena Plant With Plastic Pot",
    "price": 180,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-005.jpg"
  },
  {
    "number": 6,
    "name": "Lucky Bamboo In Plastic Pot",
    "price": 130,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-006.jpg"
  },
  {
    "number": 7,
    "name": "Bamboo Palm In Plastic Pot",
    "price": 180,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-007.jpg"
  },
  {
    "number": 8,
    "name": "Peaclily Plant With Plastic Pot",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-008.jpg"
  },
  {
    "number": 9,
    "name": "Graptopetalum Succulent In Plastic Pot",
    "price": 140,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-009.jpg"
  },
  {
    "number": 10,
    "name": "Golden Money Plant In Plastic Pot",
    "price": 90,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-010.jpg"
  },
  {
    "number": 11,
    "name": "Syngonium Plant With Plastic Pot",
    "price": 110,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-011.jpg"
  },
  {
    "number": 12,
    "name": "Calathea Vittata Plant With Pastic Pot Edition",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-012.jpg"
  },
  {
    "number": 13,
    "name": "Wooden Frame Water Vase with Red Aglaonema",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-013.jpg"
  },
  {
    "number": 14,
    "name": "Adenium Plant",
    "price": 40,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-014.jpg"
  },
  {
    "number": 15,
    "name": "Lucky Bambo Plant In Plastic Pot Desk",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-015.jpg"
  },
  {
    "number": 16,
    "name": "Adenium Plant In Ceramic Pot",
    "price": 220,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-016.jpg"
  },
  {
    "number": 17,
    "name": "Lucky Bambo Plant Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-017.jpg"
  },
  {
    "number": 18,
    "name": "Lucky Bambo Plant In Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-018.jpg"
  },
  {
    "number": 19,
    "name": "Lucky Bambo Plant In Ceramic Pot",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-019.jpg"
  },
  {
    "number": 20,
    "name": "Chlorophytum Plant In White Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-020.jpg"
  },
  {
    "number": 21,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 160,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-021.jpg"
  },
  {
    "number": 22,
    "name": "Anthurium Red Plant In Coir Pot",
    "price": 460,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-022.jpg"
  },
  {
    "number": 23,
    "name": "Bamboo Plam Plant In Coir Pot",
    "price": 320,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-023.jpg"
  },
  {
    "number": 24,
    "name": "Aglaonema Super White Plant In Coir Pot",
    "price": 440,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-024.jpg"
  },
  {
    "number": 25,
    "name": "Lucky Bambo Plant In Coir Pot",
    "price": 540,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-025.jpg"
  },
  {
    "number": 26,
    "name": "Crassula Plant In Coir Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-026.jpg"
  },
  {
    "number": 27,
    "name": "Aglaonema Snow White Plant In Coir Pot",
    "price": 440,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-027.jpg"
  },
  {
    "number": 28,
    "name": "Snake Plant In Coir Pot",
    "price": 440,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-028.jpg"
  },
  {
    "number": 29,
    "name": "Zamia Plant In Coir Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-029.jpg"
  },
  {
    "number": 30,
    "name": "Golden Money Plant In Coir Pot",
    "price": 320,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-030.jpg"
  },
  {
    "number": 31,
    "name": "Hoya Heart In Coir Pot",
    "price": 220,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-031.jpg"
  },
  {
    "number": 32,
    "name": "Kalanchoe Succulent In Plastic Pot",
    "price": 140,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-032.jpg"
  },
  {
    "number": 33,
    "name": "Senecio Succulent In Plastic Pot",
    "price": 140,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-033.jpg"
  },
  {
    "number": 34,
    "name": "Bamboo Plam In Plastic Pot",
    "price": 160,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-034.jpg"
  },
  {
    "number": 35,
    "name": "Marbal Money Plant In Plastic Ceramic Pot",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-035.jpg"
  },
  {
    "number": 36,
    "name": "Varigated Money Plant In Plastic Pot",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-036.jpg"
  },
  {
    "number": 37,
    "name": "Snake Plant In Plastic Pot",
    "price": 130,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-037.jpg"
  },
  {
    "number": 38,
    "name": "Scindapsus N'Joy Plant In Plastic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-038.jpg"
  },
  {
    "number": 39,
    "name": "Zamia Plant In Plastic Pot",
    "price": 120,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-039.jpg"
  },
  {
    "number": 40,
    "name": "Peaclily Plant In Plastic Pot Edition",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-040.jpg"
  },
  {
    "number": 41,
    "name": "Aglaonema Green Lipstick Plant In Plastic Pot",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-041.jpg"
  },
  {
    "number": 42,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 150,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-042.jpg"
  },
  {
    "number": 43,
    "name": "Aglaonema Grenn Lipstick Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-043.jpg"
  },
  {
    "number": 44,
    "name": "Peaclily Plant In Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-044.jpg"
  },
  {
    "number": 45,
    "name": "Zamia Zenzii Plant In Ceramic Pot",
    "price": 220,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-045.jpg"
  },
  {
    "number": 46,
    "name": "Aglaonema Super White Plant In White Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-046.jpg"
  },
  {
    "number": 47,
    "name": "Snake Plant In Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-047.jpg"
  },
  {
    "number": 48,
    "name": "Zamia Black Plant In Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-048.jpg"
  },
  {
    "number": 49,
    "name": "Varigated Money Plant In White Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-049.jpg"
  },
  {
    "number": 50,
    "name": "Aglaonema Green Lipstick Plant In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-050.jpg"
  },
  {
    "number": 51,
    "name": "Zamioculcas Zamifolia Plant In Ceramic Pot",
    "price": 170,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-051.jpg"
  },
  {
    "number": 52,
    "name": "Zamia Zenzii Plant In Ceramic Pot Edition",
    "price": 180,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-052.jpg"
  },
  {
    "number": 53,
    "name": "Zamia Black (Raven ) Plant In Ceramic Pot",
    "price": 180,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-053.jpg"
  },
  {
    "number": 54,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-054.jpg"
  },
  {
    "number": 55,
    "name": "Varigated Money In Ceramic Pot",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-055.jpg"
  },
  {
    "number": 56,
    "name": "Peaclily Plant In Ceramic Pot Edition",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-056.jpg"
  },
  {
    "number": 57,
    "name": "Snake Plant In Ceramic Pot",
    "price": 200,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-057.jpg"
  },
  {
    "number": 58,
    "name": "Zamia Plant In Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-058.jpg"
  },
  {
    "number": 59,
    "name": "Peaclily Plant In Plastic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-059.jpg"
  },
  {
    "number": 60,
    "name": "Snake Plant In White Plastic",
    "price": 330,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-060.jpg"
  },
  {
    "number": 61,
    "name": "Echeveria succulent Plant In Plastic Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-061.jpg"
  },
  {
    "number": 62,
    "name": "Echeveria Succlent In Plastic Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-062.jpg"
  },
  {
    "number": 63,
    "name": "Echeveria Succulent In Plastic Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-063.jpg"
  },
  {
    "number": 64,
    "name": "Echeveria Succulent In Plastic Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-064.jpg"
  },
  {
    "number": 65,
    "name": "Donkey Tail Succulent In Plastic Pot",
    "price": 240,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-065.jpg"
  },
  {
    "number": 66,
    "name": "Aglaonema Red Lipstick Plant In Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-066.jpg"
  },
  {
    "number": 67,
    "name": "Oxy Cardium Red Plant In Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-067.jpg"
  },
  {
    "number": 68,
    "name": "Money Plant N Joy Plant In Ceramic Pot",
    "price": 250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-068.jpg"
  },
  {
    "number": 69,
    "name": "Zamia Plant In Ceramic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-069.jpg"
  },
  {
    "number": 70,
    "name": "Zamia Plant In Ceramic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-070.jpg"
  },
  {
    "number": 71,
    "name": "Bambo Plam In Ceramic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-071.jpg"
  },
  {
    "number": 72,
    "name": "Snake Plant In Plastic Pot",
    "price": 280,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-072.jpg"
  },
  {
    "number": 73,
    "name": "Snake Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-073.jpg"
  },
  {
    "number": 74,
    "name": "Snake Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-074.jpg"
  },
  {
    "number": 75,
    "name": "Marbel Money Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-075.jpg"
  },
  {
    "number": 76,
    "name": "Peaclily Plant In Ceramic Pot Edition",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-076.jpg"
  },
  {
    "number": 77,
    "name": "Money Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-077.jpg"
  },
  {
    "number": 78,
    "name": "Aglaonema Beauty Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-078.jpg"
  },
  {
    "number": 79,
    "name": "Golden Oxycardium Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-079.jpg"
  },
  {
    "number": 80,
    "name": "Golden Money Plants In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-080.jpg"
  },
  {
    "number": 81,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-081.jpg"
  },
  {
    "number": 82,
    "name": "Green Money Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-082.jpg"
  },
  {
    "number": 83,
    "name": "Syngonium Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-083.jpg"
  },
  {
    "number": 84,
    "name": "Bamboo Palm Plant In Ceramic Pot",
    "price": 300,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-084.jpg"
  },
  {
    "number": 85,
    "name": "Zamia Black Plant In Plastic Pot Desk",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-085.jpg"
  },
  {
    "number": 86,
    "name": "Bonsai Plant In White Plastic Pot",
    "price": 700,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-086.jpg"
  },
  {
    "number": 87,
    "name": "Aglaonema Red Lipstick Plant In Plastic Pot",
    "price": 470,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-087.jpg"
  },
  {
    "number": 88,
    "name": "Zamia Plant In Plastic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-088.jpg"
  },
  {
    "number": 89,
    "name": "Aglaonema Snow White Plant In Plastic Pot",
    "price": 270,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-089.jpg"
  },
  {
    "number": 90,
    "name": "Bambo Palm Plant In Ceramic Pot",
    "price": 320,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-090.jpg"
  },
  {
    "number": 91,
    "name": "Echeveria Chinensis Succulent In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-091.jpg"
  },
  {
    "number": 92,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 260,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-092.jpg"
  },
  {
    "number": 93,
    "name": "Jade Plant In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-093.jpg"
  },
  {
    "number": 94,
    "name": "Varigated Money Plant In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-094.jpg"
  },
  {
    "number": 95,
    "name": "Sedum Burrito Succulent In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-095.jpg"
  },
  {
    "number": 96,
    "name": "Calathea 'Freddie' Plant In Ceramic Pot",
    "price": 400,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-096.jpg"
  },
  {
    "number": 97,
    "name": "Calathea Makoyana Plant In Ceamic Pot",
    "price": 400,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-097.jpg"
  },
  {
    "number": 98,
    "name": "Jade plant In Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-098.jpg"
  },
  {
    "number": 99,
    "name": "Varigated Jade Plant In Ceramic Pot",
    "price": 400,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-099.jpg"
  },
  {
    "number": 100,
    "name": "Snake Plant In Ceramic Pot",
    "price": 400,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-100.jpg"
  },
  {
    "number": 101,
    "name": "Golden Money Plant In Ceramic Pot",
    "price": 400,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-101.jpg"
  },
  {
    "number": 102,
    "name": "Bamboo Palm In Ceramic Pot",
    "price": 320,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-102.jpg"
  },
  {
    "number": 103,
    "name": "Aglaonema White Anjuman Plant In Ceramic Pot",
    "price": 450,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-103.jpg"
  },
  {
    "number": 104,
    "name": "Calathea Silver Plate Plant In Ceramic Pot",
    "price": 450,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-104.jpg"
  },
  {
    "number": 105,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 450,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-105.jpg"
  },
  {
    "number": 106,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 450,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-106.jpg"
  },
  {
    "number": 107,
    "name": "Anthurium Plants In Ceramic Pot",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-107.jpg"
  },
  {
    "number": 108,
    "name": "Crassula Plant In Ceramic Pot",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-108.jpg"
  },
  {
    "number": 109,
    "name": "Anthurium Plant In Ceramic Pot Edition",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-109.jpg"
  },
  {
    "number": 110,
    "name": "Lucky Bambo In Ceramic Pot",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-110.jpg"
  },
  {
    "number": 111,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-111.jpg"
  },
  {
    "number": 112,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 550,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-112.jpg"
  },
  {
    "number": 113,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 550,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-113.jpg"
  },
  {
    "number": 114,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 550,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-114.jpg"
  },
  {
    "number": 115,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 550,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-115.jpg"
  },
  {
    "number": 116,
    "name": "Lucky Bamboo Plant In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-116.jpg"
  },
  {
    "number": 117,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-117.jpg"
  },
  {
    "number": 118,
    "name": "Lucky Bambo In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-118.jpg"
  },
  {
    "number": 119,
    "name": "Lucky Bambo In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-119.jpg"
  },
  {
    "number": 120,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-120.jpg"
  },
  {
    "number": 121,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 650,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-121.jpg"
  },
  {
    "number": 122,
    "name": "Zamia Plant In Ceramic Pot",
    "price": 670,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-122.jpg"
  },
  {
    "number": 123,
    "name": "Lucky Bamoo In Ceramic Pot",
    "price": 700,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-123.jpg"
  },
  {
    "number": 124,
    "name": "Snake Plant In Ceramic Pot",
    "price": 800,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-124.jpg"
  },
  {
    "number": 125,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 800,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-125.jpg"
  },
  {
    "number": 126,
    "name": "Monstera Plants In Ceramic Pot",
    "price": 350,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-126.jpg"
  },
  {
    "number": 127,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 1250,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-127.jpg"
  },
  {
    "number": 128,
    "name": "Zamia Plant in Ceramic Pot",
    "price": 230,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-128.jpg"
  },
  {
    "number": 129,
    "name": "Lucky Bamboo In Ceramic Pot",
    "price": 1500,
    "group": "Corporate Plant Gifts",
    "image": "/images/products/corporate-gift-129.jpg"
  },
  {
    "number": 1,
    "name": "Chlorophytum 8.5 cm pot",
    "price": 100,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-001.jpg"
  },
  {
    "number": 2,
    "name": "Philodendron Bird of Paradise Yellow 8.5 cm pot",
    "price": 100,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-002.jpg"
  },
  {
    "number": 3,
    "name": "Philodendron zanadu 8.5 cm pot",
    "price": 100,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-003.jpg"
  },
  {
    "number": 4,
    "name": "Chlorophytum 8.5 cm pot",
    "price": 100,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-004.jpg"
  },
  {
    "number": 5,
    "name": "Philodendron Sunshine 8.5 cm pot",
    "price": 120,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-005.jpg"
  },
  {
    "number": 6,
    "name": "Philodendron Golden Goddess 8.5 cm pot",
    "price": 120,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-006.jpg"
  },
  {
    "number": 7,
    "name": "Philodendron White Wizard 8.5 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-007.jpg"
  },
  {
    "number": 8,
    "name": "Chlorophytum comosum Bonnie plants 8.5 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-008.jpg"
  },
  {
    "number": 9,
    "name": "Philodendron Pink Bikin 8.5 cm pot",
    "price": 500,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-009.jpg"
  },
  {
    "number": 10,
    "name": "Philodendron Golden 10 cm pot",
    "price": 100,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-010.jpg"
  },
  {
    "number": 11,
    "name": "Philodendron Brandtianum Plants 10 cm pot",
    "price": 150,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-011.jpg"
  },
  {
    "number": 12,
    "name": "Philodendron Narrow Variegated 10 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-012.jpg"
  },
  {
    "number": 13,
    "name": "Philodendron Bird of Paradise Yellow 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-013.jpg"
  },
  {
    "number": 14,
    "name": "Philodendron Sunshine 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-014.jpg"
  },
  {
    "number": 15,
    "name": "Philodendron Golden Saw 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-015.jpg"
  },
  {
    "number": 16,
    "name": "Philodendron Moonshine 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-016.jpg"
  },
  {
    "number": 17,
    "name": "Philodendron Golden Melinonii 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-017.jpg"
  },
  {
    "number": 18,
    "name": "Philodendron Sun Red 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-018.jpg"
  },
  {
    "number": 19,
    "name": "Philodendron Black Cardinal 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-019.jpg"
  },
  {
    "number": 20,
    "name": "Philodendron Miniature 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-020.jpg"
  },
  {
    "number": 21,
    "name": "Philodendron Melinonii Gold 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-021.jpg"
  },
  {
    "number": 22,
    "name": "Philodendron Black Narrow 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-022.jpg"
  },
  {
    "number": 23,
    "name": "Philodendron Pink Princess 12 cm pot",
    "price": 250,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-023.jpg"
  },
  {
    "number": 24,
    "name": "Philodendron Calkins Gold 12 cm pot",
    "price": 250,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-024.jpg"
  },
  {
    "number": 25,
    "name": "Philodendron Verrucosum 12 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-025.jpg"
  },
  {
    "number": 26,
    "name": "Philodendron Homalomena Green 12 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-026.jpg"
  },
  {
    "number": 27,
    "name": "Philodendron Black Majesty Plants 12 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-027.jpg"
  },
  {
    "number": 28,
    "name": "Philodendron Billietiae 12 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-028.jpg"
  },
  {
    "number": 29,
    "name": "Philodendron White Wizard 12 cm pot",
    "price": 300,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-029.jpg"
  },
  {
    "number": 30,
    "name": "Philodendron Narrow Variegated 12 cm pot",
    "price": 350,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-030.jpg"
  },
  {
    "number": 31,
    "name": "Philodendron Gloriosum 12 cm pot",
    "price": 500,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-031.jpg"
  },
  {
    "number": 32,
    "name": "Philodendron Pink Bikin 12 cm pot",
    "price": 700,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-032.jpg"
  },
  {
    "number": 33,
    "name": "Philodendron Sunshine 14.5 cm pot",
    "price": 400,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-033.jpg"
  },
  {
    "number": 34,
    "name": "Philodendron Narrow Green 14.5 cm pot",
    "price": 400,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-034.jpg"
  },
  {
    "number": 35,
    "name": "Philodendron Goeldii 12 cm pot",
    "price": 250,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-035.jpg"
  },
  {
    "number": 36,
    "name": "Philodendron Red Congo 12 cm pot",
    "price": 700,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-036.jpg"
  },
  {
    "number": 37,
    "name": "Philodendron Xanadu Green 12 cm pot",
    "price": 200,
    "group": "Philodendron Plants",
    "image": "/images/products/philodendron-037.jpg"
  },
  {
    "number": 1,
    "name": "Radermachera Golden Plant 12 cm pot",
    "price": 700,
    "group": "Radermachera Plants",
    "image": "/images/products/specialty-001.jpg"
  },
  {
    "number": 2,
    "name": "Brassia Golden Plants 10 cm pot",
    "price": 400,
    "group": "Brassia Orchids",
    "image": "/images/products/specialty-002.jpg"
  },
  {
    "number": 3,
    "name": "Brassia Golden Plants 13.5 cm pot",
    "price": 800,
    "group": "Brassia Orchids",
    "image": "/images/products/specialty-003.jpg"
  },
  {
    "number": 4,
    "name": "Schefflera Plant 13.5 cm pot",
    "price": 500,
    "group": "Schefflera Plants",
    "image": "/images/products/specialty-004.jpg"
  },
  {
    "number": 5,
    "name": "Schefflera Variegated Plant 13.5 cm pot",
    "price": 500,
    "group": "Schefflera Plants",
    "image": "/images/products/specialty-005.jpg"
  },
  {
    "number": 1,
    "name": "Rhapis Excelsa palm 12 cm pot",
    "price": 400,
    "group": "Palm Plants",
    "image": "/images/products/palm-001.jpg"
  },
  {
    "number": 2,
    "name": "Bamboo Palm 8.5 cm pot",
    "price": 150,
    "group": "Palm Plants",
    "image": "/images/products/palm-002.jpg"
  },
  {
    "number": 3,
    "name": "Rhapis Excelsa Palm 8.5 cm pot",
    "price": 200,
    "group": "Palm Plants",
    "image": "/images/products/palm-003.jpg"
  },
  {
    "number": 4,
    "name": "Areca Palm plants 10 cm pot",
    "price": 100,
    "group": "Palm Plants",
    "image": "/images/products/palm-004.jpg"
  },
  {
    "number": 5,
    "name": "Bamboo Palm 10 cm pot",
    "price": 200,
    "group": "Palm Plants",
    "image": "/images/products/palm-005.jpg"
  },
  {
    "number": 6,
    "name": "Areca Palm 12 cm pot",
    "price": 300,
    "group": "Palm Plants",
    "image": "/images/products/palm-006.jpg"
  },
  {
    "number": 7,
    "name": "Bamboo Palm 12 cm pot",
    "price": 300,
    "group": "Palm Plants",
    "image": "/images/products/palm-007.jpg"
  },
  {
    "number": 8,
    "name": "Rhapis Excelsa Palm 12 cm pot",
    "price": 300,
    "group": "Palm Plants",
    "image": "/images/products/palm-008.jpg"
  },
  {
    "number": 9,
    "name": "Homalomena Curculigo Capitulata Plants 12 cm pot",
    "price": 400,
    "group": "Palm Plants",
    "image": "/images/products/palm-009.jpg"
  },
  {
    "number": 10,
    "name": "Bamboo Palm 15 cm pot",
    "price": 500,
    "group": "Palm Plants",
    "image": "/images/products/palm-010.jpg"
  },
  {
    "number": 11,
    "name": "Areca Palm 15 cm pot",
    "price": 500,
    "group": "Palm Plants",
    "image": "/images/products/palm-011.jpg"
  },
  {
    "number": 12,
    "name": "Areca Palm plants 20 cm pot",
    "price": 300,
    "group": "Palm Plants",
    "image": "/images/products/palm-012.jpg"
  },
  {
    "number": 1,
    "name": "Hosta Marginata White Plants 8.5 cm pot",
    "price": 600,
    "group": "Hosta Plants",
    "image": "/images/products/hosta-001.jpg"
  },
  {
    "number": 2,
    "name": "Hosta Autumn Frost plants 8.5 cm pot",
    "price": 600,
    "group": "Hosta Plants",
    "image": "/images/products/hosta-002.jpg"
  },
  {
    "number": 3,
    "name": "Hosta Plants 8.5 cm pot",
    "price": 600,
    "group": "Hosta Plants",
    "image": "/images/products/hosta-003.jpg"
  },
  {
    "number": 4,
    "name": "Hosta Plants 12 cm pot",
    "price": 1000,
    "group": "Hosta Plants",
    "image": "/images/products/hosta-004.jpg"
  },
  {
    "number": 5,
    "name": "Hosta Plants 12 cm pot",
    "price": 1000,
    "group": "Hosta Plants",
    "image": "/images/products/hosta-005.jpg"
  },
  {
    "number": 1,
    "name": "Pachira Money Tree Plants 10 cm pot",
    "price": 250,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-001.jpg"
  },
  {
    "number": 2,
    "name": "Pachira in Glazed Bamboo - Node Pot",
    "price": 350,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-002.jpg"
  },
  {
    "number": 3,
    "name": "Pachira Money Tree Plants 8.5 cm pot",
    "price": 600,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-003.jpg"
  },
  {
    "number": 4,
    "name": "Pachira Money Tree Plants 12 cm pot",
    "price": 600,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-004.jpg"
  },
  {
    "number": 5,
    "name": "Pachira Macrocarpa Money Tree Bonsai Plants 10 cm pot",
    "price": 1000,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-005.jpg"
  },
  {
    "number": 6,
    "name": "Pachira Plants 10 cm pot",
    "price": 1200,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-006.jpg"
  },
  {
    "number": 7,
    "name": "Pachira aquatica Money Tree Plants 13.5 cm pot",
    "price": 1500,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-007.jpg"
  },
  {
    "number": 8,
    "name": "Pachira money Tree Plants",
    "price": 1500,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-008.jpg"
  },
  {
    "number": 9,
    "name": "Pachira Money Tree Plants",
    "price": 7000,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-009.jpg"
  },
  {
    "number": 10,
    "name": "Pachira Money Plants",
    "price": 12000,
    "group": "Pachira Plants",
    "image": "/images/products/pachira-010.jpg"
  }
];

const moneyPlantInventory = [
  { name: "Golden Money Plant 8.5 cm pot", price: 60, image: "/images/products/money-plant-01.jpg" },
  { name: "Oxycardium Green 10 cm pot", price: 80, image: "/images/products/money-plant-02.jpg" },
  { name: "Golden Money Plant 10 cm pot", price: 100, image: "/images/products/money-plant-03.jpg" },
  { name: "Oxy Cardium Red Plant 10 cm pot", price: 100, image: "/images/products/money-plant-04.jpg" },
  { name: "Green Money Plants 10 cm pot", price: 100, image: "/images/products/money-plant-05.jpg" },
  { name: "Oxycardium Golden Money Plant 10 cm pot", price: 100, image: "/images/products/money-plant-06.jpg" },
  { name: "Scindapsus and Money Plant 10 cm pot", price: 100, image: "/images/products/money-plant-07.jpg" },
  { name: "Sleeping Pothos 10 cm pot", price: 150, image: "/images/products/money-plant-08.jpg" },
  { name: "Scindapsus Treubii Dark Form 10 cm pot", price: 200, image: "/images/products/money-plant-09.jpg" },
  { name: "Scindapsus Moonlight 10 cm pot", price: 200, image: "/images/products/money-plant-10.jpg" },
  { name: "Scindapsus Silver Satin 10 cm pot", price: 250, image: "/images/products/money-plant-11.jpg" },
  { name: "Golden Money Plant 12 cm pot", price: 150, image: "/images/products/money-plant-12.jpg" },
  { name: "Scindapsus 12 cm pot", price: 150, image: "/images/products/money-plant-13.jpg" },
  { name: "Epipremnum Aureum Shangri La Sleeping Pothos Plant 12 cm pot", price: 200, image: "/images/products/money-plant-14.jpg" },
  { name: "Golden Money Plant Hanging 15 cm pot", price: 200, image: "/images/products/money-plant-15.jpg" },
  { name: "Marble Money Plant Hanging Plant 15 cm pot", price: 250, image: "/images/products/money-plant-16.jpg" },
  { name: "Oxy Golden Cardium Hanging 17 cm pot", price: 200, image: "/images/products/money-plant-17.jpg" },
  { name: "Green Plain Money Plant Hanging 17 cm pot", price: 200, image: "/images/products/money-plant-18.jpg" },
  { name: "Scindapsus Njoy Hanging 17 cm pot", price: 250, image: "/images/products/money-plant-19.jpg" },
  { name: "Scindapsus Treubii Dark Form 17 cm pot", price: 400, image: "/images/products/money-plant-20.jpg" },
  { name: "Green Plain Money Plant Hanging 20 cm pot", price: 300, image: "/images/products/money-plant-21.jpg" },
  { name: "Golden Moneyplant Hanging 20 cm pot", price: 300, image: "/images/products/money-plant-22.jpg" },
  { name: "Moneyplant Scindapsus Njoy Hanging 20 cm pot", price: 400, image: "/images/products/money-plant-23.jpg" },
  { name: "Marble Money Plant Hanging 20 cm pot", price: 400, image: "/images/products/money-plant-24.jpg" },
] as const;

const moneyPlantProducts: Product[] = moneyPlantInventory.map((item, index) => {
  const number = index + 1;
  const slug = item.name
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `money-plant-${String(number).padStart(2, "0")}`,
    name: item.name,
    slug: `${slug}-${number}`,
    description: `${item.name} is a lively, easy-care trailing plant for shelves, bright corners and hanging displays.`,
    category: "Indoor Plants",
    subcategory: "Money Plants",
    tags: ["Low Maintenance"],
    image: item.image,
    price: item.price,
    rating: 0,
    reviewCount: 0,
    stock: 8,
    featured: true,
    addedAt: "2026-10-07",
    light: "Bright, indirect light; tolerates medium indoor light.",
    watering: "Water when the top layer of potting mix feels dry.",
    height: "Trailing length varies with growing conditions.",
    potSize: item.name.match(/\b\d+(?:\.\d+)?\s*cm\s*pot\b/i)?.[0] ?? "Nursery pot",
    careInstructions: [
      "Keep in a warm spot away from harsh afternoon sun.",
      "Trim trailing stems as needed and let excess water drain.",
    ],
  };
});

const aglaonemaInventory = [
  { name: "Aglaonema Snow White 7 cm pot", price: 150, image: "/images/products/aglaonema-01.jpg" },
  { name: "Aglaonema Red Lipstick 7 cm pot", price: 200, image: "/images/products/aglaonema-02.jpg" },
  { name: "Aglaonema Lipstick Green 7 cm pot", price: 200, image: "/images/products/aglaonema-03.jpg" },
  { name: "Aglaonema Beauty Plants 7 cm pot", price: 200, image: "/images/products/aglaonema-04.jpg" },
  { name: "Aglaonema Pink Valentine 7 cm pot", price: 200, image: "/images/products/aglaonema-05.jpg" },
  { name: "Aglaonema Thailand Red 7 cm pot", price: 250, image: "/images/products/aglaonema-06.jpg" },
  { name: "Aglaonema Super White 7 cm pot", price: 250, image: "/images/products/aglaonema-07.jpg" },
  { name: "Aglaonema China Red 7 cm pot", price: 250, image: "/images/products/aglaonema-08.jpg" },
  { name: "Aglaonema Ten Karat 7 cm pot", price: 300, image: "/images/products/aglaonema-09.jpg" },
  { name: "Aglaonema Tricolor 7 cm pot", price: 400, image: "/images/products/aglaonema-10.jpg" },
  { name: "Aglaonema Pictum Tricolor 7 cm pot", price: 400, image: "/images/products/aglaonema-11.jpg" },
  { name: "Aglaonema Peach Cochin 7 cm pot", price: 700, image: "/images/products/aglaonema-12.jpg" },
  { name: "Aglaonema Ten Karat Plants 8.5 cm Pot", price: 300, image: "/images/products/aglaonema-13.jpg" },
  { name: "Aglaonema Kumkum Plants 8.5 cm pot", price: 300, image: "/images/products/aglaonema-14.jpg" },
  { name: "Aglaonema Chinese Evergreen Plants 8.5 cm pot", price: 300, image: "/images/products/aglaonema-15.jpg" },
  { name: "Aglaonema Red Emerald Plants 8.5 cm pot", price: 300, image: "/images/products/aglaonema-16.jpg" },
  { name: "Aglaonema Red Apple Plants 8.5 cm pot", price: 400, image: "/images/products/aglaonema-17.jpg" },
  { name: "Aglaonema Red Vein 10 cm pot", price: 300, image: "/images/products/aglaonema-18.jpg" },
  { name: "Aglaonema White Anjuman 10 cm pot", price: 300, image: "/images/products/aglaonema-19.jpg" },
  { name: "Aglaonema Fireworks 10 cm pot", price: 300, image: "/images/products/aglaonema-20.jpg" },
  { name: "Aglaonema Snow White 12 cm pot", price: 350, image: "/images/products/aglaonema-21.jpg" },
  { name: "Aglaonema Lipstick 12 cm pot", price: 350, image: "/images/products/aglaonema-22.jpg" },
  { name: "Aglaonema Super White 12 cm pot", price: 400, image: "/images/products/aglaonema-23.jpg" },
  { name: "Aglaonema White Anjuman 12 cm pot", price: 400, image: "/images/products/aglaonema-24.jpg" },
  { name: "Aglaonema Butterfly 12 cm pot", price: 450, image: "/images/products/aglaonema-25.jpg" },
  { name: "Aglaonema Red Vein 12 cm pot", price: 500, image: "/images/products/aglaonema-26.jpg" },
  { name: "Aglaonema Beauty 12 cm pot", price: 500, image: "/images/products/aglaonema-27.jpg" },
  { name: "Aglaonema White Legacy 12 cm pot", price: 500, image: "/images/products/aglaonema-28.jpg" },
  { name: "Aglaonema Lucky Frozen Ruby 12 cm pot", price: 500, image: "/images/products/aglaonema-29.jpg" },
  { name: "Aglaonema Pink Emerald 12 cm pot", price: 500, image: "/images/products/aglaonema-30.jpg" },
  { name: "Aglaonema Bai Kaw Plants 12 cm pot", price: 600, image: "/images/products/aglaonema-31.jpg" },
  { name: "Aglaonema Pink Panama 12 cm pot", price: 800, image: "/images/products/aglaonema-32.jpg" },
  { name: "Aglaonema Pink Khanza 12 cm pot", price: 800, image: "/images/products/aglaonema-33.jpg" },
  { name: "Aglaonema Peach Panama 12 cm pot", price: 800, image: "/images/products/aglaonema-34.jpg" },
  { name: "Aglaonema Red Lipstick 15 cm pot", price: 700, image: "/images/products/aglaonema-35.jpg" },
  { name: "Aglaonema White Laksub 15 cm pot", price: 700, image: "/images/products/aglaonema-36.jpg" },
  { name: "Aglaonema Fireworks 15 cm pot", price: 800, image: "/images/products/aglaonema-37.jpg" },
  { name: "Aglaonema Golden Papaya 15 cm pot", price: 900, image: "/images/products/aglaonema-38.jpg" },
  { name: "Aglaonema Pink Emerald Plants 15 cm pot", price: 1000, image: "/images/products/aglaonema-39.jpg" },
  { name: "Aglaonema Lucky Frozen Ruby 15 cm pot", price: 1000, image: "/images/products/aglaonema-40.jpg" },
  { name: "Aglaonema Pink Lipstick 18 cm pot", price: 800, image: "/images/products/aglaonema-41.jpg" },
  { name: "Aglaonema Pink Beauty 7 cm pot", price: 200, image: "/images/products/aglaonema-42.jpg" },
  { name: "Aglaonema Pictum Tricolor 7 cm pot", price: 600, image: "/images/products/aglaonema-43.jpg" },
  { name: "Aglaonema Pink Panama 8.5 cm pot", price: 300, image: "/images/products/aglaonema-44.jpg" },
  { name: "Aglaonema Anjuman 10 cm pot", price: 300, image: "/images/products/aglaonema-45.jpg" },
  { name: "Aglaonema Snow White 10 cm pot", price: 200, image: "/images/products/aglaonema-46.jpg" },
  { name: "Aglaonema Pink Panama 10 cm pot", price: 400, image: "/images/products/aglaonema-47.jpg" },
  { name: "Aglaonema White Stem 12 cm pot", price: 300, image: "/images/products/aglaonema-48.jpg" },
  { name: "Aglaonema Fireworks 12 cm pot", price: 500, image: "/images/products/aglaonema-49.jpg" },
  { name: "Aglaonema Happiness 12 cm pot", price: 500, image: "/images/products/aglaonema-50.jpg" },
] as const;

const aglaonemaProducts: Product[] = aglaonemaInventory.map((item, index) => {
  const number = index + 1;
  const slug = item.name
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `aglaonema-${String(number).padStart(2, "0")}`,
    name: item.name,
    slug: `${slug}-${number}`,
    description: `${item.name} is a colourful Aglaonema foliage plant, selected for indoor greenery.`,
    category: "Indoor Plants",
    subcategory: "Aglaonema Plants",
    tags: ["Low Maintenance"],
    image: item.image,
    price: item.price,
    rating: 0,
    reviewCount: 0,
    stock: 8,
    featured: true,
    addedAt: "2026-10-07",
    light: "Bright, indirect light; protect from harsh direct afternoon sun.",
    watering: "Water when the top layer of potting mix feels dry; avoid waterlogging.",
    height: "Varies by plant and growing conditions.",
    potSize: item.name.match(/\b\d+(?:\.\d+)?\s*cm\s*pot\b/i)?.[0] ?? "Nursery pot",
    careInstructions: [
      "Keep in a warm spot with bright, filtered light.",
      "Allow excess water to drain and wipe leaves gently to remove dust.",
    ],
  };
});

interface NurseryListing {
  name: string;
  price: number;
  image: string;
}

const dieffenbachiaInventory: NurseryListing[] = [
  { name: "Dieffenbachia 'White Flame' 12 cm pot", price: 200, image: "/images/products/dieffenbachia-01.jpg" },
  { name: "Dieffenbachia 'Amy' 12 cm pot", price: 200, image: "/images/products/dieffenbachia-02.jpg" },
  { name: "Dieffenbachia 'Star Bright' 12 cm pot", price: 200, image: "/images/products/dieffenbachia-03.jpg" },
  { name: "Dieffenbachia New 12 cm pot", price: 300, image: "/images/products/dieffenbachia-04.jpg" },
  { name: "Dieffenbachia 'Delilah' 12 cm pot", price: 400, image: "/images/products/dieffenbachia-05.jpg" },
  { name: "Dieffenbachia 'Camille' 12 cm pot", price: 200, image: "/images/products/dieffenbachia-06.jpg" },
  { name: "Dieffenbachia 'Green Magic' 12 cm pot", price: 200, image: "/images/products/dieffenbachia-07.jpg" },
];

const floweringInventory: NurseryListing[] = [
  { name: "Adenium Plants 5.5 cm pot", price: 40, image: "/images/products/flowering-01.jpg" },
  { name: "Adenium Flower Plant 8.5 cm pot", price: 100, image: "/images/products/flowering-02.jpg" },
  { name: "Spathiphyllum Crown Plant 8.5 cm pot", price: 120, image: "/images/products/flowering-03.jpg" },
  { name: "Spathiphyllum Variegated Plant 8.5 cm pot", price: 300, image: "/images/products/flowering-04.jpg" },
  { name: "Anthurium Pink 8.5 cm pot", price: 400, image: "/images/products/flowering-05.jpg" },
  { name: "Anthurium Red Plants 8.5 cm pot", price: 400, image: "/images/products/flowering-06.jpg" },
  { name: "Anthurium Jenmanii Gold 12 cm pot", price: 1500, image: "/images/products/flowering-07.jpg" },
  { name: "Anthurium Clarinervium Plant 8.5 cm pot", price: 800, image: "/images/products/flowering-08.jpg" },
  { name: "Spathiphyllum Plant 10 cm pot", price: 200, image: "/images/products/flowering-09.jpg" },
  { name: "Dendrobium Orchid 10 cm pot", price: 400, image: "/images/products/flowering-10.jpg" },
  { name: "Anthurium Veitchii king 10 cm pot", price: 2000, image: "/images/products/flowering-11.jpg" },
  { name: "Spathiphyllum Plant 12 cm pot", price: 250, image: "/images/products/flowering-12.jpg" },
  { name: "Spathiphyllum Silver Streak Plant 12 cm pot", price: 300, image: "/images/products/flowering-13.jpg" },
  { name: "Spathiphyllum Crown 12 cm pot", price: 300, image: "/images/products/flowering-14.jpg" },
  { name: "Spathiphyllum 12 cm pot", price: 300, image: "/images/products/flowering-15.jpg" },
  { name: "Spathiphyllum Jessica Plant 12 cm pot", price: 500, image: "/images/products/flowering-16.jpg" },
  { name: "Anthurium Green Jenmani 12 cm pot", price: 300, image: "/images/products/flowering-17.jpg" },
  { name: "Anthurium Pink Plants 12 cm pot", price: 400, image: "/images/products/flowering-18.jpg" },
  { name: "Anthurium Red 12 cm pot", price: 400, image: "/images/products/flowering-19.jpg" },
  { name: "Anthurium Purple Plants 12 cm pot", price: 400, image: "/images/products/flowering-20.jpg" },
  { name: "Anthurium Livium Red – Plant 12 cm pot", price: 400, image: "/images/products/flowering-21.jpg" },
  { name: "Anthurium Red Plant 12 cm pot", price: 800, image: "/images/products/flowering-22.jpg" },
  { name: "Anthurium Crystallinum Silver Plant 12 cm pot", price: 1100, image: "/images/products/flowering-23.jpg" },
  { name: "Anthurium Green Jenmani 14.5 cm pot", price: 500, image: "/images/products/flowering-24.jpg" },
  { name: "Spathiphyllum Crown Plant 15 cm pot", price: 400, image: "/images/products/flowering-25.jpg" },
  { name: "Poinsettia Plant 15 cm pot", price: 300, image: "/images/products/flowering-26.jpg" },
  { name: "Poinsettia Red Plant 15 cm pot", price: 300, image: "/images/products/flowering-27.jpg" },
  { name: "Anthurium Black Plants 15 cm pot", price: 800, image: "/images/products/flowering-28.jpg" },
  { name: "Anthurium Red Plants 15 cm pot", price: 800, image: "/images/products/flowering-29.jpg" },
  { name: "Guzmania plants 15 cm pot", price: 800, image: "/images/products/flowering-30.jpg" },
];

const monsteraInventory: NurseryListing[] = [
  { name: "Monstera 8.5 cm pot", price: 100, image: "/images/products/monstera-01.jpg" },
  { name: "Monstera delicosa Plants 8.5 cm pot", price: 100, image: "/images/products/monstera-02.jpg" },
  { name: "Monstera Peru 10 cm pot", price: 150, image: "/images/products/monstera-03.jpg" },
  { name: "Monstera delicosa Plants 12 cm pot", price: 200, image: "/images/products/monstera-04.jpg" },
  { name: "Monstrera broken Hearts Hanging Plants 15 cm pot", price: 200, image: "/images/products/monstera-05.jpg" },
  { name: "Monstrera Peru Hanging Plants 15 cm pot", price: 300, image: "/images/products/monstera-06.jpg" },
  { name: "Monstera Deliciosa 14.5 cm pot", price: 400, image: "/images/products/monstera-07.jpg" },
  { name: "Monstera (Normal Thai Constellation) Plants 10 cm pot", price: 500, image: "/images/products/monstera-08.jpg" },
  { name: "Monstera Burle Marx Flame Plants 8.5 cm pot", price: 700, image: "/images/products/monstera-09.jpg" },
  { name: "Monstera Burle Marx Flame Plants 10 cm pot", price: 1000, image: "/images/products/monstera-10.jpg" },
  { name: "Monstera Peru Variegated 8.5 cm pot", price: 2000, image: "/images/products/monstera-11.jpg" },
  { name: "Monstera delicosa Plants", price: 2000, image: "/images/products/monstera-12.jpg" },
  { name: "Monstera Adansonii Variegated 8.5 cm pot", price: 3000, image: "/images/products/monstera-13.jpg" },
  { name: "Monstera White Monstera Plants 10 cm pot", price: 3500, image: "/images/products/monstera-14.jpg" },
  { name: "Monstera White Monster Plants 14.5 cm pot", price: 4000, image: "/images/products/monstera-15.jpg" },
  { name: "Monstera Thai Constellation 18 cm pot", price: 4000, image: "/images/products/monstera-16.jpg" },
  { name: "Monstera Lemon Plants 12 cm pot", price: 6000, image: "/images/products/monstera-17.jpg" },
  { name: "Monstera Thai Constellation", price: 8000, image: "/images/products/monstera-18.jpg" },
];

const aspleniumInventory: NurseryListing[] = [
  { name: "Asplenium Nidus Crispy Wave 12 cm pot", price: 300, image: "/images/products/asplenium-nidus-01.jpg" },
  { name: "Asplenium Leslie 12 cm pot", price: 300, image: "/images/products/asplenium-nidus-02.jpg" },
  { name: "Asplenium Nidus 12 cm pot", price: 300, image: "/images/products/asplenium-nidus-03.jpg" },
  { name: "Asplenium Nidus 12 cm pot", price: 300, image: "/images/products/asplenium-nidus-04.jpg" },
  { name: "Asplenium Cobra 12 cm pot", price: 350, image: "/images/products/asplenium-nidus-05.jpg" },
  { name: "Asplenium Nidus Variegated 12 cm pot", price: 1000, image: "/images/products/asplenium-nidus-06.jpg" },
  { name: "Asplenium Nidus 14.5 cm pot", price: 1000, image: "/images/products/asplenium-nidus-07.jpg" },
  { name: "Asplenium 20 cm pot", price: 1000, image: "/images/products/asplenium-nidus-08.jpg" },
  { name: "Asplenium 20 cm pot", price: 1200, image: "/images/products/asplenium-nidus-09.jpg" },
];

function createNurseryProducts(
  inventory: NurseryListing[],
  idPrefix: string,
  category: ProductCategory | ((item: NurseryListing) => ProductCategory),
  subcategory: ProductSubcategory,
  light: string,
  watering: string,
): Product[] {
  return inventory.map((item, index) => {
    const number = index + 1;
    const slug = item.name
      .toLocaleLowerCase("en")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      id: `${idPrefix}-${String(number).padStart(2, "0")}`,
      name: item.name,
      slug: `${slug}-${idPrefix}-${number}`,
      description: `${item.name} is a nursery-grown plant, selected to bring distinctive greenery to your collection.`,
      category: typeof category === "function" ? category(item) : category,
      subcategory,
      tags: [],
      image: item.image,
      price: item.price,
      rating: 0,
      reviewCount: 0,
      stock: 8,
      featured: true,
      addedAt: "2026-10-07",
      light,
      watering,
      height: "Varies by plant and growing conditions.",
      potSize: item.name.match(/\b\d+(?:\.\d+)?\s*cm\s*pot\b/i)?.[0] ?? "Nursery pot (size unspecified)",
      careInstructions: [
        `Provide ${light.charAt(0).toLocaleLowerCase("en")}${light.slice(1)}`,
        `Follow this watering guidance: ${watering}`,
      ],
    };
  });
}

const sourcedNurseryProducts: Product[] = [
  ...createNurseryProducts(
    dieffenbachiaInventory,
    "dieffenbachia",
    "Indoor Plants",
    "Dieffenbachia Plants",
    "medium to bright indirect light, away from harsh afternoon sun.",
    "Water when the top layer of soil begins to dry; do not leave the pot waterlogged.",
  ),
  ...createNurseryProducts(
    floweringInventory,
    "flowering",
    (item) => (/^(Adenium|Poinsettia)/i.test(item.name) ? "Outdoor Plants" : "Indoor Plants"),
    "New Flowering Plants",
    "bright light suited to the variety; protect indoor plants from harsh afternoon sun.",
    "Water when the top layer of soil begins to dry, adjusting for the plant and season.",
  ),
  ...createNurseryProducts(
    monsteraInventory,
    "monstera",
    "Indoor Plants",
    "Monstera Plants",
    "bright, indirect light; avoid strong direct afternoon sun.",
    "Water when the top layer of potting mix feels dry and allow excess water to drain.",
  ),
  ...createNurseryProducts(
    aspleniumInventory,
    "asplenium-nidus",
    "Indoor Plants",
    "Asplenium Nidus Plants",
    "medium to bright indirect light, away from direct sun.",
    "Keep the soil lightly and evenly moist without letting the roots sit in water.",
  ),
];

const sampleProducts: Product[] = [
  {
    id: "money-plant",
    name: "Money Plant",
    slug: "money-plant",
    description: "A lush, trailing favourite that brings an easy splash of green to any corner.",
    category: "Indoor Plants",
    subcategory: "Money Plants",
    tags: ["Air Purifying Plants", "Low Maintenance"],
    image: "/images/garden/indoor-tropical-garden.png",
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviewCount: 124,
    stock: 18,
    badge: "Bestseller",
    featured: true,
    addedAt: "2026-08-01",
    light: "Bright, indirect light; tolerates low light.",
    watering: "Water when the top 2–3 cm of soil feels dry.",
    height: "30–45 cm",
    potSize: "15 cm nursery pot",
    careInstructions: ["Keep away from harsh afternoon sun.", "Trim trailing stems to encourage fuller growth."],
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    slug: "snake-plant",
    description: "Architectural upright leaves and wonderfully forgiving, low-water care.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants", "Low Maintenance"],
    image: "/images/garden/indoor-garden-lounge.png",
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 98,
    stock: 12,
    badge: "Easy care",
    featured: true,
    addedAt: "2026-08-03",
    light: "Indirect light, from low light to bright filtered sun.",
    watering: "Let the soil dry out completely between waterings.",
    height: "35–50 cm",
    potSize: "15 cm nursery pot",
    careInstructions: ["Use a pot with drainage.", "Water sparingly, especially during cooler months."],
  },
  {
    id: "areca-palm",
    name: "Areca Palm",
    slug: "areca-palm",
    description: "Feathery tropical fronds turn a bright room into a leafy retreat.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants"],
    image: "/images/garden/modern-garden-home.png",
    price: 1199,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 76,
    stock: 8,
    featured: true,
    addedAt: "2026-08-05",
    light: "Bright, indirect light; avoid strong direct afternoon sun.",
    watering: "Keep soil lightly moist, never waterlogged.",
    height: "75–100 cm",
    potSize: "20 cm nursery pot",
    careInstructions: ["Mist occasionally in dry weather.", "Rotate weekly for even growth."],
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    slug: "peace-lily",
    description: "Glossy leaves and elegant white blooms make this a timeless indoor classic.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants"],
    image: "/images/garden/indoor-tropical-garden.png",
    price: 749,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 113,
    stock: 0,
    badge: "Popular",
    addedAt: "2026-08-09",
    light: "Medium to bright indirect light; tolerates shade.",
    watering: "Water when the top layer of soil is just dry.",
    height: "35–55 cm",
    potSize: "15 cm nursery pot",
    careInstructions: ["Keep soil evenly moist.", "Wipe leaves gently to keep them glossy."],
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    slug: "zz-plant",
    description: "Sculptural, polished leaves for desks and corners that need a resilient companion.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Low Maintenance", "Air Purifying Plants"],
    image: "/images/garden/indoor-garden-lounge.png",
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviewCount: 61,
    stock: 14,
    badge: "Easy care",
    addedAt: "2026-08-11",
    light: "Low to bright indirect light.",
    watering: "Water only after the soil has dried out completely.",
    height: "30–45 cm",
    potSize: "15 cm nursery pot",
    careInstructions: ["Avoid overwatering.", "Dust leaves with a soft, dry cloth."],
  },
  {
    id: "spider-plant",
    name: "Spider Plant",
    slug: "spider-plant",
    description: "Playful arching leaves and baby plantlets make this an instant shelf favourite.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants", "Low Maintenance"],
    image: "/images/garden/planting-softscape.png",
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    reviewCount: 54,
    stock: 21,
    addedAt: "2026-08-14",
    light: "Bright, indirect light.",
    watering: "Water when the top 2 cm of soil is dry.",
    height: "20–30 cm",
    potSize: "12 cm nursery pot",
    careInstructions: ["Let excess water drain away.", "Separate plantlets to grow new plants."],
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    slug: "jade-plant",
    description: "A charming, sun-loving succulent with plump leaves and a tree-like silhouette.",
    category: "Outdoor Plants",
    subcategory: "Outdoor Foliage Plants",
    tags: ["Low Maintenance"],
    image: "/images/garden/Urban Balcony.png",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 43,
    stock: 16,
    addedAt: "2026-08-18",
    light: "Bright light with a few hours of gentle morning sun.",
    watering: "Allow the soil to dry fully before watering.",
    height: "20–30 cm",
    potSize: "12 cm nursery pot",
    careInstructions: ["Use a free-draining potting mix.", "Protect from heavy rain and frost."],
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant",
    slug: "rubber-plant",
    description: "Bold, deep-green foliage makes a beautiful statement in a well-lit room.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants"],
    image: "/images/garden/indoor-tropical-garden.png",
    price: 999,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 87,
    stock: 7,
    badge: "Staff pick",
    addedAt: "2026-08-21",
    light: "Bright, indirect light.",
    watering: "Water when the top 3 cm of soil is dry.",
    height: "45–65 cm",
    potSize: "18 cm nursery pot",
    careInstructions: ["Turn the pot regularly for balanced growth.", "Wipe the broad leaves with a damp cloth."],
  },
  {
    id: "lucky-bamboo",
    name: "Lucky Bamboo",
    slug: "lucky-bamboo",
    description: "An elegant, easy-to-style gift plant that adds calm to desks and consoles.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Low Maintenance"],
    image: "/images/garden/modern-garden-home.png",
    price: 499,
    originalPrice: 599,
    rating: 4.5,
    reviewCount: 39,
    stock: 10,
    addedAt: "2026-08-24",
    light: "Medium to bright indirect light.",
    watering: "Keep roots in fresh filtered water, or soil lightly moist.",
    height: "25–35 cm",
    potSize: "Decorative glass vase",
    careInstructions: ["Refresh the water every week.", "Keep away from direct afternoon sunlight."],
  },
  {
    id: "monstera",
    name: "Monstera",
    slug: "monstera",
    description: "Distinctive split leaves bring a bold, tropical feel to your home.",
    category: "Indoor Plants",
    subcategory: "Other Indoor Plants",
    tags: ["Air Purifying Plants"],
    image: "/images/garden/indoor-garden-lounge.png",
    price: 1499,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 102,
    stock: 11,
    badge: "Trending",
    featured: true,
    addedAt: "2026-09-02",
    light: "Bright, indirect light.",
    watering: "Water when the top 3–5 cm of soil is dry.",
    height: "60–80 cm",
    potSize: "20 cm nursery pot",
    careInstructions: ["Provide a moss pole as it grows.", "Keep leaves clean and give it room to climb."],
  },
  {
    id: "ceramic-planter",
    name: "Ceramic Planter",
    slug: "ceramic-planter",
    description: "A hand-finished, warm-neutral planter that pairs beautifully with leafy greens.",
    category: "Planters",
    subcategory: "Ceramic Planters",
    tags: [],
    image: "/images/garden/garden-design.png",
    price: 599,
    originalPrice: 749,
    rating: 4.6,
    reviewCount: 28,
    stock: 19,
    addedAt: "2026-09-07",
    light: "Not applicable.",
    watering: "Includes a drainage hole and matching saucer.",
    height: "18 cm",
    potSize: "18 cm diameter",
    careInstructions: ["Clean with a soft, damp cloth.", "Use with the supplied saucer to protect surfaces."],
  },
  {
    id: "indoor-plant-combo",
    name: "Indoor Plant Combo",
    slug: "indoor-plant-combo",
    description: "Three easy-care greens thoughtfully paired to refresh a shelf or sunny corner.",
    category: "Plant Combos",
    subcategory: "Indoor Plant Combos",
    tags: ["Low Maintenance", "Air Purifying Plants"],
    image: "/images/garden/indoor-tropical-garden.png",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 48,
    stock: 6,
    badge: "Save ₹300",
    featured: true,
    addedAt: "2026-09-12",
    light: "Bright, indirect light.",
    watering: "Water each plant as its soil begins to dry.",
    height: "20–40 cm per plant",
    potSize: "Three 12 cm nursery pots",
    careInstructions: ["Includes three beginner-friendly plants.", "Keep plants in their nursery pots until established."],
  },
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    slug: "bougainvillea",
    description: "Colourful, sun-loving blooms bring a cheerful accent to patios and balconies.",
    category: "Outdoor Plants",
    subcategory: "Flowering Plants",
    tags: ["Low Maintenance"],
    image: "/images/garden/garden-courtyard-bougainvillea.png",
    price: 549,
    originalPrice: 699,
    rating: 4.7,
    reviewCount: 35,
    stock: 9,
    addedAt: "2026-09-15",
    light: "At least 5–6 hours of direct sunlight.",
    watering: "Water deeply when the top soil is dry; avoid standing water.",
    height: "35–50 cm",
    potSize: "16 cm nursery pot",
    careInstructions: ["Place outdoors in a sunny spot.", "Prune after flowering to encourage new growth."],
  },
  {
    id: "plant-care-consultation",
    name: "Plant Care Consultation",
    slug: "plant-care-consultation",
    description: "A one-to-one virtual session with a plant expert to help your garden thrive.",
    category: "Plant Care",
    subcategory: "Plant Care Services",
    tags: [],
    image: "/images/garden/garden-maintenance.png",
    price: 799,
    rating: 5,
    reviewCount: 17,
    stock: 50,
    badge: "Expert help",
    addedAt: "2026-09-20",
    light: "We will assess your plant's light together.",
    watering: "Get a practical, personalised watering plan.",
    height: "45-minute video consultation",
    potSize: "Suitable for your whole collection",
    careInstructions: ["Share photos of your space before the session.", "Your follow-up care notes arrive by email."],
  },
];

const additionalInventoryCare: Record<
  AdditionalInventoryGroup,
  { category: ProductCategory; light: string; watering: string }
> = {
  "Corporate Plant Gifts": {
    category: "Plant Combos",
    light: "Bright, indirect light suited to the included plant.",
    watering: "Follow the included plant's care needs and let excess water drain.",
  },
  "Philodendron Plants": {
    category: "Indoor Plants",
    light: "Bright, indirect light; keep away from harsh afternoon sun.",
    watering: "Water when the top layer of potting mix feels dry.",
  },
  "Radermachera Plants": {
    category: "Indoor Plants",
    light: "Bright, indirect light.",
    watering: "Keep soil lightly moist and allow excess water to drain.",
  },
  "Schefflera Plants": {
    category: "Indoor Plants",
    light: "Bright, indirect light.",
    watering: "Water when the top layer of soil begins to dry.",
  },
  "Brassia Orchids": {
    category: "Indoor Plants",
    light: "Bright, filtered light.",
    watering: "Water when the growing medium is nearly dry and drain thoroughly.",
  },
  "Palm Plants": {
    category: "Indoor Plants",
    light: "Bright, indirect light.",
    watering: "Keep soil lightly moist without leaving the pot waterlogged.",
  },
  "Hosta Plants": {
    category: "Outdoor Plants",
    light: "Partial shade, protected from strong afternoon sun.",
    watering: "Keep soil evenly moist, especially during warm weather.",
  },
  "Pachira Plants": {
    category: "Indoor Plants",
    light: "Bright, indirect light.",
    watering: "Water when the top layer of soil dries and let excess water drain.",
  },
};

const additionalProducts: Product[] = additionalInventory.map((item, index) => {
  const number = index + 1;
  const slug = item.name
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const care = additionalInventoryCare[item.group];

  return {
    id: `additional-${String(number).padStart(3, "0")}`,
    name: item.name,
    slug: `${slug}-additional-${number}`,
    description:
      item.group === "Corporate Plant Gifts"
        ? `${item.name} is a thoughtful plant gift for desks, homes, offices and special occasions.`
        : `${item.name} is a nursery-grown plant, selected to bring distinctive greenery to your collection.`,
    category: care.category,
    subcategory: item.group,
    tags: item.group === "Corporate Plant Gifts" ? ["Corporate Gifts"] : [],
    image: item.image,
    price: item.price,
    rating: 0,
    reviewCount: 0,
    stock: 8,
    featured: true,
    addedAt: "2026-10-07",
    light: care.light,
    watering: care.watering,
    height: "Varies by plant and growing conditions.",
    potSize: item.name.match(/\b\d+(?:\.\d+)?\s*cm\s*pot\b/i)?.[0] ?? "Nursery pot (size unspecified)",
    careInstructions: [
      `Provide ${care.light.charAt(0).toLocaleLowerCase("en")}${care.light.slice(1)}`,
      care.watering,
    ],
  };
});

export const products: Product[] = [
  ...aglaonemaProducts,
  ...moneyPlantProducts,
  ...sourcedNurseryProducts,
  ...additionalProducts,
  ...sampleProducts,
];
