import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronDown } from 'lucide-react';

const SalesConditions: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  
  return (
    <section ref={sectionRef} id="conditions" className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Conditions de Vente
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {conditions.map((condition, index) => (
            <ConditionAccordion 
              key={condition.title} 
              title={condition.title} 
              content={condition.content} 
              isInView={isInView}
              delay={index * 150}
            />
          ))}
          
          <div className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-700 mb-4">
              Pour plus d'informations concernant nos conditions de vente, n'hésitez pas à contacter notre équipe.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ConditionAccordionProps {
  title: string;
  content: string;
  isInView: boolean;
  delay: number;
}

const ConditionAccordion: React.FC<ConditionAccordionProps> = ({ title, content, isInView, delay }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div 
      className={`mb-4 border border-gray-200 rounded-lg overflow-hidden transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${300 + delay}ms` }}
    >
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-white">
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

const conditions = [
  {
    title: "Éligibilité à la location",
    content: "Pour louer un véhicule, vous devez être âgé d'au moins 25 ans, posséder un permis de conduire valide depuis au moins 3 ans, et disposer d'une carte de crédit à votre nom. Des frais supplémentaires peuvent s'appliquer pour les conducteurs âgés de moins de 30 ans pour les véhicules de luxe."
  },
  {
    title: "Durée de location et kilométrage",
    content: "Nos contrats de location s'étendent de 1 jour à 12 mois. Chaque contrat inclut un kilométrage limité, généralement de 150 km par jour ou 3 000 km par mois. Des frais supplémentaires s'appliquent pour tout dépassement du kilométrage alloué."
  },
  {
    title: "Dépôt de garantie et assurance",
    content: "Un dépôt de garantie, variant selon le modèle de véhicule, sera prélevé au moment de la prise en charge. Tous nos véhicules sont assurés tous risques, avec une franchise qui peut être réduite moyennant un supplément quotidien."
  },
  {
    title: "Annulation et modification",
    content: "Toute annulation effectuée plus de 48 heures avant la date de prise en charge sera intégralement remboursée. Pour les annulations tardives, des frais équivalents à une journée de location seront facturés. Les modifications de réservation sont possibles sans frais, sous réserve de disponibilité."
  },
  {
    title: "État du véhicule et responsabilités",
    content: "Chaque véhicule est livré propre, avec le plein de carburant et en parfait état de fonctionnement. Il doit être restitué dans les mêmes conditions. Tout dommage non couvert par l'assurance sera à la charge du locataire."
  }
];

export default SalesConditions;