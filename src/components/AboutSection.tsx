import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Award, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  
  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          À Propos de LuxDrive
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-4">Une Expérience de Luxe</h3>
            <p className="text-gray-700 mb-6">
              Depuis notre création, LuxDrive s'engage à offrir à nos clients une expérience de conduite exceptionnelle 
              avec les véhicules les plus prestigieux du marché. Notre sélection rigoureuse garantit qualité, 
              confort et performance pour chaque modèle que nous proposons.
            </p>
            <p className="text-gray-700">
              Que vous recherchiez une voiture pour un événement spécial, un voyage d'affaires ou simplement 
              pour découvrir le plaisir de conduire un véhicule de luxe, notre équipe est à votre disposition 
              pour vous conseiller et vous accompagner dans votre choix.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-white p-6 rounded-lg shadow-md transition-all duration-1000 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <feature.icon className="h-10 w-10 text-gold-500 mb-4" />
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Award,
    title: "Véhicules Premium",
    description: "Une sélection des meilleures marques et modèles du marché, entretenus avec le plus grand soin."
  },
  {
    icon: ShieldCheck,
    title: "Sécurité Garantie",
    description: "Tous nos véhicules sont régulièrement inspectés et bénéficient des dernières technologies de sécurité."
  },
  {
    icon: Clock,
    title: "Flexibilité Totale",
    description: "Des locations adaptées à vos besoins, de quelques jours à plusieurs mois, sans engagement contraignant."
  },
  {
    icon: HeartHandshake,
    title: "Service Personnalisé",
    description: "Un conseiller dédié pour vous accompagner tout au long de votre expérience de location."
  }
];

export default AboutSection;