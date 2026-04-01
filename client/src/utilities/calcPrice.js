export const BASE_PRICE = 40000
export const CONVERTIBLE_PRICE = 8000

export const CAR_OPTIONS = {
  exterior: [
    { name: 'Midnight Black', value: 'Midnight Black', color: '#1a1a2e', price: 0 },
    { name: 'Racing Red',     value: 'Racing Red',     color: '#8b0000', price: 2000 },
    { name: 'Pearl White',    value: 'Pearl White',    color: '#e8e8e0', price: 1500 },
    { name: 'Ocean Blue',     value: 'Ocean Blue',     color: '#0d3b6e', price: 3000 },
    { name: 'Sunburst Yellow',value: 'Sunburst Yellow',color: '#d4a000', price: 2500 },
  ],
  roof: [
    { name: 'Standard',   value: 'Standard',   price: 0 },
    { name: 'Sunroof',    value: 'Sunroof',    price: 3000 },
    { name: 'Panoramic',  value: 'Panoramic',  price: 5000 },
  ],
  wheels: [
    { name: 'Standard 18"', value: 'Standard 18"', color: '#555555', price: 0 },
    { name: 'Sport 20"',    value: 'Sport 20"',    color: '#1a1a1a', price: 2000 },
    { name: 'Chrome 20"',   value: 'Chrome 20"',   color: '#c0c0c0', price: 3500 },
    { name: 'Off-Road 22"', value: 'Off-Road 22"', color: '#6b4f2a', price: 1500 },
  ],
  interior: [
    { name: 'Standard Cloth',   value: 'Standard Cloth',   color: '#9e9e9e', price: 0 },
    { name: 'Leather',          value: 'Leather',          color: '#8B4513', price: 4000 },
    { name: 'Premium Leather',  value: 'Premium Leather',  color: '#3d1c0a', price: 7000 },
    { name: 'Sport Alcantara',  value: 'Sport Alcantara',  color: '#2d2d44', price: 2500 },
  ],
}

export const calculatePrice = ({ convertible, exterior, roof, wheels, interior }) => {
  let price = BASE_PRICE
  if (convertible) price += CONVERTIBLE_PRICE
  price += CAR_OPTIONS.exterior.find(o => o.value === exterior)?.price ?? 0
  price += CAR_OPTIONS.roof.find(o => o.value === roof)?.price ?? 0
  price += CAR_OPTIONS.wheels.find(o => o.value === wheels)?.price ?? 0
  price += CAR_OPTIONS.interior.find(o => o.value === interior)?.price ?? 0
  return price
}

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
