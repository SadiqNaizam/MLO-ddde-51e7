import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StyleOption {
  id: string;
  name: string;
  // Future enhancements could include:
  // imageUrl?: string;
  // icon?: React.ReactNode;
}

interface StyleOptionSelectorProps {
  label: string;
  options: StyleOption[];
  selectedOptionId?: string; // Can be undefined if nothing is initially selected
  onOptionSelect: (optionId: string) => void;
  className?: string; // Allows for additional styling from the parent component
}

const StyleOptionSelector: React.FC<StyleOptionSelectorProps> = ({
  label,
  options,
  selectedOptionId,
  onOptionSelect,
  className,
}) => {
  console.log(`StyleOptionSelector loaded for label: ${label}, selected: ${selectedOptionId}`);

  return (
    <div className={cn("space-y-3 w-full", className)}>
      <Label className="text-base font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
        {label}
      </Label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = option.id === selectedOptionId;
          return (
            <Button
              key={option.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onOptionSelect(option.id)}
              className={cn(
                "transition-all duration-200 ease-in-out transform hover:scale-105",
                "py-2.5 px-4 min-w-[100px] justify-start", // Ensure buttons have a decent minimum width and consistent padding
                "text-sm font-medium flex items-center gap-2 rounded-lg", // Slightly larger radius for a softer, modern look
                isSelected 
                  ? "ring-2 ring-primary ring-offset-1 shadow-lg dark:ring-offset-background" // Prominent selection
                  : "hover:shadow-md dark:hover:bg-accent",
                !isSelected && "hover:border-primary/60 text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:border-primary/60", // Subtle hover for unselected
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background"
              )}
              aria-pressed={isSelected}
            >
              {isSelected && <CheckCircle className="h-5 w-5 text-primary-foreground" />}
              {!isSelected && <span className="h-5 w-5"></span>} {/* Placeholder for alignment */}
              <span className="truncate">{option.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleOptionSelector;