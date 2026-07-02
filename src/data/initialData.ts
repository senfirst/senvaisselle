import { Product, Category, ShopInfo } from "../types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat_assiettes",
    name: "Assiettes",
    slug: "assiettes",
    description: "Assiettes plates, creuses, à dessert, en porcelaine et céramique de qualité.",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_verres",
    name: "Verres",
    slug: "verres",
    description: "Verres à eau, verres à vin, flûtes et verres à cocktail raffinés.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_tasses",
    name: "Tasses",
    slug: "tasses",
    description: "Tasses à café, mugs et tasses de thé pour vos moments chaleureux.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_bols",
    name: "Bols",
    slug: "bols",
    description: "Bols de petit-déjeuner, saladiers et bols de soupe élégants.",
    image: "https://images.unsplash.com/photo-1542444591-cb351e136553?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_couverts",
    name: "Couverts",
    slug: "couverts",
    description: "Ménagères complètes, fourchettes, couteaux, cuillères de table.",
    image: "https://images.unsplash.com/photo-1543510473-ac2c35329a28?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_marmites",
    name: "Marmites",
    slug: "marmites",
    description: "Marmites robustes, faitouts et marmites pression pour la cuisson.",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_poeles",
    name: "Poêles",
    slug: "poeles",
    description: "Poêles antiadhésives, poêles grill et woks pour réussir tous vos plats.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_casseroles",
    name: "Casseroles",
    slug: "casseroles",
    description: "Séries de casseroles en acier inoxydable, cuivre ou céramique.",
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_plateaux",
    name: "Plateaux",
    slug: "plateaux",
    description: "Plateaux de service en bois, métal ou acrylique élégants.",
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb325721?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_theieres",
    name: "Théières",
    slug: "theieres",
    description: "Théières en fonte, porcelaine ou verre pour infuser de parfaits thés.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_cafetieres",
    name: "Cafetières",
    slug: "cafetieres",
    description: "Cafetières italiennes, à piston ou filtres pour un réveil énergique.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_bouteilles",
    name: "Bouteilles",
    slug: "bouteilles",
    description: "Bouteilles en verre, bouteilles de table et carafes élégantes.",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_gourdes",
    name: "Gourdes",
    slug: "gourdes",
    description: "Gourdes isothermes en inox pour conserver vos boissons chaudes ou froides.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_boites",
    name: "Boîtes de conservation",
    slug: "boites-de-conservation",
    description: "Boîtes hermétiques, bocaux en verre et boîtes alimentaires.",
    image: "https://images.unsplash.com/photo-1606859191214-25806e8e2448?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_ustensiles",
    name: "Ustensiles de cuisine",
    slug: "ustensiles-de-cuisine",
    description: "Louches, spatules, fouets et tous les ustensiles indispensables.",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_accessoires",
    name: "Accessoires de cuisine",
    slug: "accessoires-de-cuisine",
    description: "Planches à découper, égouttoirs, minuteurs et autres compléments.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_menagers",
    name: "Articles ménagers",
    slug: "articles-menagers",
    description: "Produits de nettoyage esthétiques, poubelles de cuisine et rangements.",
    image: "https://images.unsplash.com/photo-1528154291023-a6525fabb560?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat_decoration",
    name: "Décoration de table",
    slug: "decoration-de-table",
    description: "Nappes, chemins de table, bougeoirs, ronds de serviette de créateurs.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    ref: "SV-001",
    name: "Service d'Assiettes Royale en Porcelaine",
    category: "Assiettes",
    price: 45000,
    oldPrice: 55000,
    discountPercentage: 18,
    shortDescription: "Ensemble de 18 assiettes de luxe en porcelaine blanche avec liseré doré.",
    detailedDescription: "Ce service d'assiettes royales de la collection Sen Vaisselle apporte une élégance intemporelle à vos dîners. Il comprend 6 assiettes plates (27cm), 6 assiettes creuses (22cm) et 6 assiettes à dessert (19cm). Réalisées en porcelaine fine de haute qualité, elles résistent aux rayures et aux chocs thermiques quotidiens. Parfait pour recevoir vos invités ou sublimer vos repas de fête.",
    material: "Porcelaine Fine",
    color: "Blanc et Or",
    dimensions: "6x 27cm, 6x 22cm, 6x 19cm",
    stock: 12,
    isAvailable: true,
    isFeatured: true,
    isPromo: true,
    isNew: false,
    dateAdded: "2026-05-15",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_2",
    ref: "SV-002",
    name: "Verres à Cristal d'Arques (Lot de 6)",
    category: "Verres",
    price: 24000,
    shortDescription: "Verres en cristal de haute pureté, parfaits pour l'eau ou le vin rouge.",
    detailedDescription: "Un lot d'exception de 6 verres au design facetté qui captent magnifiquement la lumière. Fabriqués en cristal ultra-clair sans plomb, ces verres allient finesse esthétique et résistance exceptionnelle. Leur pied stable et leur calice évasé garantissent une dégustation optimale de vos meilleurs breuvages.",
    material: "Cristal sans plomb",
    color: "Transparent",
    dimensions: "Hauteur: 18cm, Capacité: 350ml",
    stock: 8,
    isAvailable: true,
    isFeatured: true,
    isPromo: false,
    isNew: true,
    dateAdded: "2026-06-20",
    images: [
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1574926053821-79c5e338a933?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_3",
    ref: "SV-003",
    name: "Tasse en Grès Artisanal d'Afrique",
    category: "Tasses",
    price: 4500,
    oldPrice: 6000,
    discountPercentage: 25,
    shortDescription: "Tasse façonnée à la main, émaillée de couleur terre chaleureuse.",
    detailedDescription: "Chaque tasse est unique, portant la signature subtile de l'artisan. Son argile brute de haute qualité conserve la chaleur de votre café ou de votre infusion plus longtemps. Son anse ergonomique offre une prise en main très confortable. Résistante au micro-ondes et au lave-vaisselle.",
    material: "Grès émaillé",
    color: "Marron Ocre",
    dimensions: "Diamètre: 8.5cm, Hauteur: 10cm",
    stock: 25,
    isAvailable: true,
    isFeatured: false,
    isPromo: true,
    isNew: true,
    dateAdded: "2026-06-28",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_4",
    ref: "SV-004",
    name: "Bol de Ramen Nordique Bleu",
    category: "Bols",
    price: 6500,
    shortDescription: "Grand bol profond en céramique de style minimaliste avec motif spirale.",
    detailedDescription: "Spécialement conçu pour les ramens, soupes de nouilles ou grandes salades, ce bol en céramique robuste arbore un coloris bleu cobalt profond avec des motifs en relief à l'extérieur. Un élément incontournable pour un dressage de table exotique et moderne.",
    material: "Céramique",
    color: "Bleu Cobalt",
    dimensions: "Diamètre: 20cm, Profondeur: 8.5cm",
    stock: 18,
    isAvailable: true,
    isFeatured: false,
    isPromo: false,
    isNew: false,
    dateAdded: "2026-04-10",
    images: [
      "https://images.unsplash.com/photo-1542444591-cb351e136553?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_5",
    ref: "SV-005",
    name: "Ménagère Classique Inox (24 pièces)",
    category: "Couverts",
    price: 32000,
    oldPrice: 38000,
    discountPercentage: 15,
    shortDescription: "Set complet de 24 pièces d'argenterie contemporaine en acier inoxydable.",
    detailedDescription: "Cette ménagère comprend 6 couteaux de table, 6 fourchettes, 6 cuillères à soupe et 6 cuillères à café. Fabriquée en acier inoxydable 18/10 poli miroir, elle offre un éclat somptueux et une résistance maximale à la corrosion. Son profil épuré convient à tout style de table, moderne ou traditionnel.",
    material: "Acier Inoxydable 18/10",
    color: "Argenté Miroir",
    dimensions: "Boîte de rangement incluse (35x25x5cm)",
    stock: 5,
    isAvailable: true,
    isFeatured: true,
    isPromo: true,
    isNew: false,
    dateAdded: "2026-05-01",
    images: [
      "https://images.unsplash.com/photo-1543510473-ac2c35329a28?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_6",
    ref: "SV-006",
    name: "Marmite de Chef Tri-Ply 6L",
    category: "Marmites",
    price: 28000,
    shortDescription: "Marmite professionnelle multicouches avec couvercle hermétique en verre trempé.",
    detailedDescription: "Cette marmite d'une capacité de 6 litres dispose d'une construction innovante à trois couches (Inox - Aluminium - Inox) qui permet de distribuer la chaleur de manière homogène sur tout le récipient. Parfaite pour mijoter vos sauces, bouillons ou cuire vos pâtes. Compatible tous feux dont induction.",
    material: "Inox & Cœur Aluminium",
    color: "Métal Brossé",
    dimensions: "Diamètre: 24cm, Hauteur: 15cm, Capacité: 6L",
    stock: 6,
    isAvailable: true,
    isFeatured: true,
    isPromo: false,
    isNew: false,
    dateAdded: "2026-03-22",
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_7",
    ref: "SV-007",
    name: "Poêle antiadhésive Granit Pro",
    category: "Poêles",
    price: 13500,
    oldPrice: 16000,
    discountPercentage: 15,
    shortDescription: "Poêle à frire avec revêtement effet pierre ultra-résistant sans PFOA.",
    detailedDescription: "La poêle Granit Pro offre une cuisson saine sans ajout de matières grasses grâce à son revêtement antiadhésif renforcé de particules minérales. Sa poignée ergonomique en bakélite reste froide pendant la cuisson pour une sécurité totale. Idéale pour cuire viandes, œufs et légumes sautés.",
    material: "Aluminium forgé / Revêtement pierre",
    color: "Gris Anthracite",
    dimensions: "Diamètre: 28cm, Épaisseur: 4.5mm",
    stock: 14,
    isAvailable: true,
    isFeatured: false,
    isPromo: true,
    isNew: false,
    dateAdded: "2026-04-18",
    images: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "prod_8",
    ref: "SV-008",
    name: "Théière en Fonte Impériale",
    category: "Théières",
    price: 19500,
    shortDescription: "Théière traditionnelle japonaise en fonte avec filtre amovible en inox.",
    detailedDescription: "Cette élégante théière préserve parfaitement la température et les saveurs de votre thé préféré. L'intérieur est entièrement émaillé pour éviter la rouille et faciliter l'entretien. Ornée d'un motif traditionnel de picots en relief, elle est un véritable régal pour les yeux lors du service.",
    material: "Fonte et émail",
    color: "Noir Mat",
    dimensions: "Capacité: 800ml",
    stock: 9,
    isAvailable: true,
    isFeatured: true,
    isPromo: false,
    isNew: true,
    dateAdded: "2026-06-25",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export const INITIAL_SHOP_INFO: ShopInfo = {
  name: "Sen Vaisselle",
  phone: "+221 33 824 55 55",
  whatsapp: "+221788626180",
  email: "contact@senvaisselle.com",
  address: "Avenue Cheikh Anta Diop, Dakar, Sénégal",
  aboutText: "Bienvenue chez Sen Vaisselle, votre boutique de référence au Sénégal pour tous vos besoins en vaisselle haut de gamme, ustensiles de cuisine performants, articles ménagers et décorations de table raffinées. Nous sélectionnons avec le plus grand soin des produits alliant robustesse, praticité et esthétique moderne pour sublimer vos espaces et accompagner vos moments conviviaux.",
  bannerMessage: "✨ Livraison rapide sur Dakar et toutes les régions du Sénégal ! Contactez-nous sur WhatsApp pour commander directement."
};
