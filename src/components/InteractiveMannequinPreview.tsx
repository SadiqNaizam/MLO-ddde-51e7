import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Props interface for individual customization options like fabric or cut
interface CustomizationOption {
  id: string; // Unique identifier for the option, used for React keys
  name: string; // Display name of the option
  imageUrl?: string; // Optional URL for an image representing this option (e.g., fabric texture, cut silhouette)
  color?: string; // Optional color information, primarily for fabrics
}

// Props interface for grouped style selections (e.g., collar, cuffs)
interface StyleSelection {
  [key: string]: string | null; // e.g., { collar: 'Shawl', cuffs: 'French Pleat' }
}

// Props for the main InteractiveMannequinPreview component
interface InteractiveMannequinPreviewProps {
  selectedFabric?: CustomizationOption;
  selectedCut?: CustomizationOption;
  selectedStyles?: StyleSelection;
  selectedDetails?: StyleSelection; // e.g., { buttons: 'Mother of Pearl', monogram: 'J.D.' }
  baseMannequinImageUrl?: string; // URL for the base mannequin image if no specific option image is available
}

// Helper sub-component for displaying individual option categories
interface OptionDisplayCardProps {
  title: string;
  value?: string; // For single value display like fabric name or cut name
  detail?: string; // Additional detail like color
  items?: StyleSelection; // For list of key-value style items
}

const OptionDisplayCard: React.FC<OptionDisplayCardProps> = ({ title, value, detail, items }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
    <h4 className="text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">{title}</h4>
    {value && <p className="text-md text-gray-900 font-medium">{value}</p>}
    {detail && <p className="text-xs text-gray-500 mt-0.5">{detail}</p>}
    {items && (
      <ul className="mt-1 space-y-1">
        {Object.entries(items).map(([key, val]) =>
          val ? (
            <li key={key} className="text-sm text-gray-700 flex justify-between">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> 
              <span>{val}</span>
            </li>
          ) : null
        )}
      </ul>
    )}
  </div>
);

const InteractiveMannequinPreview: React.FC<InteractiveMannequinPreviewProps> = ({
  selectedFabric,
  selectedCut,
  selectedStyles,
  selectedDetails,
  baseMannequinImageUrl = "https://via.placeholder.com/450x600?text=Your+Design", // Default placeholder
}) => {
  console.log('InteractiveMannequinPreview loaded. Fabric:', selectedFabric?.name, 'Cut:', selectedCut?.name);

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Determine the image to display on the mannequin
  // Priority: Fabric image > Cut image > Base mannequin image
  const displayImageUrl = selectedFabric?.imageUrl || selectedCut?.imageUrl || baseMannequinImageUrl;

  const hasSelections = selectedFabric || selectedCut || 
                        (selectedStyles && Object.keys(selectedStyles).length > 0) || 
                        (selectedDetails && Object.keys(selectedDetails).length > 0);

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl rounded-xl overflow-hidden bg-white">
      <CardHeader className="bg-gray-800 p-5">
        <CardTitle className="text-xl font-light text-center text-white tracking-wider">
          Live Preview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
          {/* Mannequin Display Area */}
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-inner flex items-center justify-center relative group border border-gray-200">
            <img
              src={displayImageUrl}
              alt="Mannequin Preview"
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-5 group-hover:bg-opacity-0 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Selected Options Display Area */}
          <div className="space-y-3.5">
            {!hasSelections && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <p className="text-center text-gray-500 italic py-10 px-4 text-sm">
                  Your customization choices will appear here. Start designing to see your vision come to life.
                </p>
              </motion.div>
            )}
            {selectedFabric && (
              <motion.div variants={itemVariants} initial="hidden" animate="visible" key={`fabric-${selectedFabric.id}`}>
                <OptionDisplayCard 
                  title="Selected Fabric" 
                  value={selectedFabric.name} 
                  detail={selectedFabric.color ? `Color: ${selectedFabric.color}` : undefined} 
                />
              </motion.div>
            )}
            {selectedCut && (
              <motion.div variants={itemVariants} initial="hidden" animate="visible" key={`cut-${selectedCut.id}`}>
                <OptionDisplayCard 
                  title="Garment Cut & Fit" 
                  value={selectedCut.name} 
                />
              </motion.div>
            )}
            {selectedStyles && Object.values(selectedStyles).some(v => v !== null) && (
              <motion.div variants={itemVariants} initial="hidden" animate="visible" key={`styles-${JSON.stringify(selectedStyles)}`}>
                <OptionDisplayCard title="Style Elements" items={selectedStyles} />
              </motion.div>
            )}
            {selectedDetails && Object.values(selectedDetails).some(v => v !== null) && (
              <motion.div variants={itemVariants} initial="hidden" animate="visible" key={`details-${JSON.stringify(selectedDetails)}`}>
                <OptionDisplayCard title="Refinements & Details" items={selectedDetails} />
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMannequinPreview;