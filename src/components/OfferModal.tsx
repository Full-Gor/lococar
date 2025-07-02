import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCarRental } from '../context/CarRentalContext';

const OfferModal: React.FC = () => {
  const { selectedCar, closeModal, rentalPeriod, setRentalPeriod, calculateOffer, sendOffer } = useCarRental();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await sendOffer(isDesktop);
      setIsSent(true);
    } catch (error) {
      console.error('Error sending offer:', error);
    } finally {
      setIsSending(false);
    }
  };
  
  if (!selectedCar) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Demande d'offre</h3>
            <button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          {!isSent ? (
            <>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedCar.image} 
                    alt={selectedCar.name} 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{selectedCar.brand} {selectedCar.name}</h4>
                    <p className="text-gray-500">{selectedCar.pricePerMonth}€ / mois</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="period">
                      Durée de location (mois)
                    </label>
                    <input
                      id="period"
                      type="range"
                      min="1"
                      max="24"
                      value={rentalPeriod}
                      onChange={(e) => setRentalPeriod(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between">
                      <span>1 mois</span>
                      <span className="font-bold">{rentalPeriod} mois</span>
                      <span>24 mois</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Prix mensuel:</span>
                      <span>{selectedCar.pricePerMonth}€</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Durée:</span>
                      <span>{rentalPeriod} mois</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{calculateOffer()}€</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    <p>Un récapitulatif de votre offre vous sera envoyé par:</p>
                    <div className="flex mt-2">
                      <label className="inline-flex items-center mr-4">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={isDesktop}
                          onChange={() => setIsDesktop(true)}
                          className="mr-2"
                        />
                        <span>Email (PC)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={!isDesktop}
                          onChange={() => setIsDesktop(false)}
                          className="mr-2"
                        />
                        <span>SMS (Mobile)</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    {isSending ? 'Envoi en cours...' : 'Recevoir mon offre'}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Offre envoyée !</h4>
              <p className="text-gray-600 mb-6">
                Un récapitulatif de votre offre pour {selectedCar.brand} {selectedCar.name} a été envoyé 
                {isDesktop 
                  ? ' à arnaudbarotteaux@gmail.com'
                  : ' au 0644762721'
                }.
              </p>
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferModal;