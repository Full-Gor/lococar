import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types';
import { cars } from '../data/cars';

interface CarRentalContextType {
  cars: Car[];
  selectedCar: Car | null;
  rentalPeriod: number;
  isModalOpen: boolean;
  setSelectedCar: (car: Car | null) => void;
  setRentalPeriod: (period: number) => void;
  openModal: (car: Car) => void;
  closeModal: () => void;
  calculateOffer: () => number;
  sendOffer: (isDesktop: boolean) => Promise<void>;
}

const CarRentalContext = createContext<CarRentalContextType | undefined>(undefined);

export const CarRentalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [rentalPeriod, setRentalPeriod] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCar(null), 300);
  };

  const calculateOffer = (): number => {
    if (!selectedCar) return 0;
    return selectedCar.pricePerMonth * rentalPeriod;
  };

  const sendOffer = async (isDesktop: boolean): Promise<void> => {
    if (!selectedCar) return;
    
    const totalAmount = calculateOffer();
    const offerDetails = {
      carModel: selectedCar.name,
      brand: selectedCar.brand,
      rentalPeriod,
      totalAmount
    };
    
    // In a real app, this would connect to a backend service
    // For demo purposes, we'll just log the details
    console.log('Sending offer:', offerDetails);
    console.log(isDesktop 
      ? `Sending email to arnaudbarotteaux@gmail.com` 
      : `Sending SMS to 0644762721`);
      
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const value = {
    cars,
    selectedCar,
    rentalPeriod,
    isModalOpen,
    setSelectedCar,
    setRentalPeriod,
    openModal,
    closeModal,
    calculateOffer,
    sendOffer
  };

  return (
    <CarRentalContext.Provider value={value}>
      {children}
    </CarRentalContext.Provider>
  );
};

export const useCarRental = (): CarRentalContextType => {
  const context = useContext(CarRentalContext);
  if (context === undefined) {
    throw new Error('useCarRental must be used within a CarRentalProvider');
  }
  return context;
};