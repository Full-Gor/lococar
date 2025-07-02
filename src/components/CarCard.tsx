import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group perspective rounded-xl overflow-hidden shadow-lg h-[400px]"
    >
      <div className="preserve-3d relative w-full h-full transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <img 
            src={car.image_url} 
            alt={`${car.brand} ${car.name}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">{car.brand}</h3>
            <p className="text-lg">{car.name}</p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 bg-white p-6 flex flex-col backface-hidden rotate-y-180 shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{car.brand} {car.name}</h3>
          <p className="text-gray-500 mb-4">Émissions: {car.pollution_quota}</p>
          <p className="text-sm text-gray-700 flex-grow mb-4">{car.description}</p>
          <div className="text-gold-600 text-xl font-bold mb-4">
            {car.price_per_month}€ / mois
          </div>
          
          <div className="flex space-x-3">
            <Link
              to={`/cars/${car.id}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium transition-colors text-center"
            >
              Voir détails
            </Link>
            {user ? (
              <Link
                to={`/booking/${car.id}`}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-md font-medium transition-colors text-center"
              >
                Réserver
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-md font-medium transition-colors text-center"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;