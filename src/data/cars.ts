import { Car } from '../types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Model S',
    brand: 'Tesla',
    image: 'https://images.pexels.com/photos/12667210/pexels-photo-12667210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '0g CO₂/km',
    pricePerMonth: 999,
    category: 'electric',
    description: 'Experience the future of driving with Tesla Model S, featuring dual motor all-wheel drive, adaptive air suspension, and up to 405 miles of range.'
  },
  {
    id: 2,
    name: 'S-Class',
    brand: 'Mercedes-Benz',
    image: 'https://images.pexels.com/photos/6894430/pexels-photo-6894430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '152g CO₂/km',
    pricePerMonth: 1299,
    category: 'standard',
    description: 'The Mercedes-Benz S-Class stands for the fascination of the brand and defines the standards for luxury, comfort and safety.'
  },
  {
    id: 3,
    name: 'Taycan',
    brand: 'Porsche',
    image: 'https://images.pexels.com/photos/13033513/pexels-photo-13033513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '0g CO₂/km',
    pricePerMonth: 1499,
    category: 'electric',
    description: 'The Porsche Taycan brings electrifying performance and cutting-edge technology to the Porsche lineup, setting new standards for electric vehicles.'
  },
  {
    id: 4,
    name: '7 Series',
    brand: 'BMW',
    image: 'https://images.pexels.com/photos/6894428/pexels-photo-6894428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '172g CO₂/km',
    pricePerMonth: 1199,
    category: 'standard',
    description: 'The BMW 7 Series delivers an unparalleled driving experience with its innovative technology, extraordinary comfort and powerful dynamics.'
  },
  {
    id: 5,
    name: 'Model 3',
    brand: 'Tesla',
    image: 'https://images.pexels.com/photos/7101579/pexels-photo-7101579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '0g CO₂/km',
    pricePerMonth: 699,
    category: 'used',
    description: 'This pre-owned Tesla Model 3 offers incredible value with its impressive range, sleek design, and cutting-edge technology features.'
  },
  {
    id: 6,
    name: 'A8',
    brand: 'Audi',
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pollutionQuota: '159g CO₂/km',
    pricePerMonth: 1099,
    category: 'used',
    description: 'The Audi A8 combines elegance with advanced technology, offering a sophisticated driving experience with its powerful engine and premium interior.'
  }
];