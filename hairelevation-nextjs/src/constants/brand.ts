/**
 * Hair Elevation Studio — Brand Design Tokens
 * Extracted from DESIGN-SYSTEM.md and css/styles.css
 */

export const BRAND = {
  colors: {
    cream: "#F5EFE6",
    creamLight: "#F0E6D8",
    creamMid: "#E8D5C4",
    dark: "#3B2A23",
    darkDeep: "#2A1F1A",
    offWhite: "#FAF8F5",
    white: "#FFFFFF",
    gold: "#C8A97E",
    goldMid: "#B8956A",
    goldDark: "#A67C52",
    saleRed: "#D32F2F",
    errorRed: "#DC3545",
    successGreen: "#28A745",
    grayText: "#666666",
    grayLight: "#999999",
    black: "#000000",
    whatsapp: "#25D366",
    whatsappMid: "#20B954",
    whatsappDeep: "#128C7E",
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Roboto', 'Segoe UI', sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "80px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  borderRadius: {
    sm: "5px",
    md: "10px",
    lg: "16px",
    xl: "20px",
    pill: "30px",
    circle: "50%",
  },
  shadows: {
    card: "0 8px 20px rgba(99, 42, 35, 0.1)",
    cardHover: "0 12px 30px rgba(99, 42, 35, 0.15)",
    collapse: "0 15px 50px rgba(59, 42, 35, 0.1)",
    collapseHover: "0 25px 50px rgba(59, 42, 35, 0.15)",
    button: "0 6px 20px rgba(200, 169, 126, 0.4)",
    buttonHover: "0 8px 25px rgba(200, 169, 126, 0.5)",
    whatsapp: "0 10px 30px rgba(37, 211, 102, 0.5)",
    cart: "0 4px 8px rgba(59, 42, 35, 0.1)",
    form: "0 10px 30px rgba(59, 42, 35, 0.1)",
  },
  transitions: {
    fast: "0.3s ease",
    normal: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    slow: "0.6s ease",
  },
} as const;

export const COLLECTIONS = [
  "The Bridal Crowns",
  "The Everyday Crown",
  "The Queen's Curls",
  "The Signature Pixies",
] as const;

export type CollectionName = (typeof COLLECTIONS)[number];

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  collections: "/collections",
  contact: "/contact",
  book: "/book",
  cart: "/cart",
  checkout: "/checkout",
  products: "/products",
  productDetail: (id: string) => `/products/${id}`,
  collectionDetail: (slug: string) => `/collections/${slug}`,
} as const;

export const WHATSAPP = {
  phone: "233534057109",
  url: "https://wa.me/233534057109",
  channel: "https://whatsapp.com/channel/0029VaFJhHx6BIEiRMOt7f26",
} as const;

export const BUSINESS = {
  name: "Hair Elevation Studio",
  email: "hairelevationstudio@gmail.com",
  location: "Kanda, Accra, Ghana",
  hours: "Tuesdays to Saturdays 9:00am - 6:00pm",
} as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://hairelevationstudios-production.up.railway.app";
