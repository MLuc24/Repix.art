
import { CreditPack, PaymentMethod } from '../../features/credits/types';

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'pack_starter',
    title: 'Starter Pack',
    credits: 10,
    price: 3.99,
    description: 'Good for a few HD exports.',
    features: ['10 HD Exports', 'Basic Support'],
    isPopular: false
  },
  {
    id: 'pack_creator',
    title: 'Creator Pack',
    credits: 30,
    price: 8.99,
    tag: 'Most Popular',
    description: 'Best for avatar sets + HD exports.',
    features: ['3 Avatar Packs', '30 HD Exports', 'Priority Queue'],
    isPopular: true
  },
  {
    id: 'pack_pro',
    title: 'Pro Pack',
    credits: 100,
    price: 19.99,
    description: 'Ideal for frequent creators.',
    features: ['+3 FREE Filters', '+1 HD Avatar', 'Commercial Rights'],
    isPopular: false
  }
];

export const PRICING_TIERS = [
  {
    id: 'casual',
    title: "Casual",
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: "Perfect for hobbyists.",
    features: ["5 Credits / Month", "Standard Quality", "Basic Remix Styles", "Community Support"],
    cta: "Current Plan",
    highlight: false
  },
  {
    id: 'pro',
    title: "Pro Creator",
    monthlyPrice: 15,
    yearlyPrice: 12,
    desc: "For serious designers.",
    features: ["100 Credits / Month", "4K Ultra HD Exports", "Pro Remix Styles", "No Watermark"],
    cta: "Upgrade to Pro",
    highlight: false
  },
  {
    id: 'freelance',
    title: "Freelance",
    monthlyPrice: 39,
    yearlyPrice: 29,
    desc: "Manage clients & brand.",
    features: ["500 Credits / Month", "Brand Kits", "Commercial License", "Client Folders"],
    cta: "Upgrade to Freelance",
    highlight: true
  },
  {
    id: 'agency',
    title: "Agency",
    monthlyPrice: 159,
    yearlyPrice: 129,
    desc: "High volume production.",
    features: ["2,500 Credits / Month", "API Access", "Unlimited Seats", "Dedicated Support"],
    cta: "Contact Sales",
    highlight: false
  }
];

export const ON_DEMAND_PRICE = 0.49; // Per credit

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'visa', name: 'Visa / Mastercard', iconType: 'CreditCard' },
  { id: 'apple', name: 'Apple Pay', iconType: 'Apple' },
  { id: 'google', name: 'Google Pay', iconType: 'Google' },
  { id: 'paypal', name: 'PayPal', iconType: 'Wallet' },
];
