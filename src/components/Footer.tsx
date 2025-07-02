import React from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-400">
              L'excellence automobile à votre service depuis 2010. Découvrez le plaisir de conduire avec LuxDrive.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#models" className="text-gray-400 hover:text-white transition-colors">Modèles</a></li>
              <li><a href="#electric" className="text-gray-400 hover:text-white transition-colors">Gamme Électrique</a></li>
              <li><a href="#used" className="text-gray-400 hover:text-white transition-colors">Occasions</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À Propos</a></li>
              <li><a href="#conditions" className="text-gray-400 hover:text-white transition-colors">Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Informations Légales</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CGV</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CGU</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gold-500" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gold-500" />
                <span>contact@luxdrive.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gold-500" />
                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LuxDrive. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;