import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from 'lucide-react';

interface Fabric {
  id: string;
  name: string;
  colorName?: string;
  thumbnailUrl: string;
  detailImageUrl: string;
  textureDescription?: string;
  sheenLevel?: 'Matte' | 'Satin' | 'Glossy';
}

interface FabricSwatchSelectorProps {
  fabrics: Fabric[];
  selectedFabricId?: string | null;
  onSelectFabric: (fabricId: string) => void;
}

const FabricSwatchItem: React.FC<{
  fabric: Fabric;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ fabric, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const swatchVariants = {
    initial: { scale: 1, boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
  };

  const imageTransition = { duration: 0.4, ease: "easeInOut" };

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <motion.div
          layout
          variants={swatchVariants}
          initial="initial"
          whileHover="hover"
          animate={isSelected ? "hover" : "initial"} // Keep selected slightly elevated or use a dedicated selected variant
          className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
            isSelected ? 'border-ring' : 'border-transparent'
          } transition-colors duration-300`}
          onClick={onSelect}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          role="button"
          aria-pressed={isSelected}
          aria-label={`Select fabric: ${fabric.name} ${fabric.colorName || ''}`}
        >
          <AspectRatio ratio={1}>
            <motion.img
              src={fabric.thumbnailUrl}
              alt={`${fabric.name} ${fabric.colorName || ''} thumbnail`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={imageTransition}
            />
            <motion.img
              src={fabric.detailImageUrl}
              alt={`${fabric.name} ${fabric.colorName || ''} detail`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={imageTransition}
            />
          </AspectRatio>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute top-2 right-2 text-primary-foreground bg-primary p-1 rounded-full z-10"
              >
                <CheckCircle size={16} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <h4 className="text-xs font-semibold text-white truncate">{fabric.name}</h4>
            {fabric.colorName && <p className="text-xs text-gray-200 truncate">{fabric.colorName}</p>}
          </div>

          {fabric.sheenLevel && isHovered && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-2 left-2 z-10"
            >
              <Badge variant="secondary">{fabric.sheenLevel}</Badge>
            </motion.div>
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-background border shadow-lg rounded-md p-2">
        <p className="text-sm font-medium">{fabric.name} {fabric.colorName || ''}</p>
        {fabric.textureDescription && <p className="text-xs text-muted-foreground">{fabric.textureDescription}</p>}
      </TooltipContent>
    </Tooltip>
  );
};

const FabricSwatchSelector: React.FC<FabricSwatchSelectorProps> = ({
  fabrics,
  selectedFabricId,
  onSelectFabric,
}) => {
  console.log('FabricSwatchSelector loaded');

  if (!fabrics || fabrics.length === 0) {
    return <p className="text-muted-foreground">No fabric options available.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 p-1">
      {fabrics.map((fabric) => (
        <FabricSwatchItem
          key={fabric.id}
          fabric={fabric}
          isSelected={selectedFabricId === fabric.id}
          onSelect={() => onSelectFabric(fabric.id)}
        />
      ))}
    </div>
  );
};

export default FabricSwatchSelector;