import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

// Define the structure for a measurement item
interface MeasurementDetail {
  id: string; // e.g., 'chest', 'waist'
  name: string; // e.g., 'Chest Circumference'
  guide: string; // Text description for how to take the measurement
  placeholder?: string; // e.g., "cm" or "inches"
  unit?: string; // e.g. "cm", "inches"
}

// Define a standard list of measurements
const PREDEFINED_MEASUREMENTS: MeasurementDetail[] = [
  { id: 'height', name: 'Height', guide: 'Stand straight against a wall without shoes. Measure from the top of your head to the floor.', placeholder: 'e.g., 175', unit: 'cm' },
  { id: 'weight', name: 'Weight', guide: 'Your current body weight, ideally measured in the morning.', placeholder: 'e.g., 70', unit: 'kg' },
  { id: 'neck', name: 'Neck Circumference', guide: 'Measure around the base of your neck, keeping the tape measure slightly loose.', placeholder: 'e.g., 38', unit: 'cm' },
  { id: 'chest', name: 'Chest Circumference', guide: 'Measure around the fullest part of your chest, under your armpits, keeping the tape horizontal.', placeholder: 'e.g., 96', unit: 'cm' },
  { id: 'waist', name: 'Waist Circumference', guide: 'Measure around your natural waistline (smallest part of your torso), just above your hip bones.', placeholder: 'e.g., 81', unit: 'cm' },
  { id: 'hips', name: 'Hip Circumference', guide: 'Measure around the fullest part of your hips and buttocks, keeping the tape horizontal.', placeholder: 'e.g., 100', unit: 'cm' },
  { id: 'shoulderWidth', name: 'Shoulder Width', guide: 'Measure from the bony point of one shoulder to the bony point of the other, across your back.', placeholder: 'e.g., 45', unit: 'cm' },
  { id: 'sleeveLength', name: 'Sleeve Length', guide: 'With your arm slightly bent at the elbow, measure from the shoulder point, down the outside of your arm, to your wrist bone.', placeholder: 'e.g., 62', unit: 'cm' },
  { id: 'inseam', name: 'Inseam Length', guide: 'Measure from the crotch seam (top of your inner thigh) down to your desired trouser length or ankle bone.', placeholder: 'e.g., 78', unit: 'cm' },
  { id: 'thigh', name: 'Thigh Circumference', guide: 'Measure around the fullest part of one thigh, typically about 2.5cm (1 inch) below the crotch.', placeholder: 'e.g., 58', unit: 'cm' },
];

export type MeasurementValues = Record<string, string>;

interface AnimatedMeasurementInputProps {
  initialMeasurements?: MeasurementValues;
  onMeasurementsChange: (measurements: MeasurementValues) => void;
  measurementDefinitions?: MeasurementDetail[]; // Allow overriding the default measurements
}

const AnimatedMeasurementInput: React.FC<AnimatedMeasurementInputProps> = ({
  initialMeasurements = {},
  onMeasurementsChange,
  measurementDefinitions = PREDEFINED_MEASUREMENTS,
}) => {
  console.log('AnimatedMeasurementInput loaded');
  const [measurements, setMeasurements] = useState<MeasurementValues>(initialMeasurements);

  useEffect(() => {
    setMeasurements(initialMeasurements);
  }, [initialMeasurements]);

  const handleInputChange = (id: string, value: string) => {
    const newMeasurements = { ...measurements, [id]: value };
    setMeasurements(newMeasurements);
    onMeasurementsChange(newMeasurements);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Enter Your Measurements</CardTitle>
        <CardDescription>
          Provide accurate measurements for a perfectly tailored fit.
          Hover over the <Info className="inline h-4 w-4 align-middle" /> icon next to each measurement for detailed guidance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {measurementDefinitions.map((m) => (
          <div key={m.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={m.id} className="text-sm font-medium sm:text-base">
                {m.name}
              </Label>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Guide for {m.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="end" className="max-w-xs bg-background border shadow-lg p-3 rounded-md">
                  <p className="text-sm font-semibold mb-1">{m.name} Guide:</p>
                  <p className="text-xs">{m.guide}</p>
                  {/* Placeholder for visual guide/animation image/GIF */}
                  <div className="mt-2 text-center">
                    {/* Example: <img src={`/guides/${m.id}-guide.gif`} alt={`${m.name} measurement guide`} className="mt-2 rounded max-h-48 w-auto inline-block" /> */}
                    <p className="text-xs text-muted-foreground italic">
                      (Visual guide/animation for {m.name} will be shown here)
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id={m.id}
                type="number" // Using number allows numeric keyboard on mobile
                value={measurements[m.id] || ''}
                onChange={(e) => handleInputChange(m.id, e.target.value)}
                placeholder={m.placeholder || `Enter ${m.name.toLowerCase()}`}
                className="flex-grow"
                min="0" // Basic validation
              />
              {m.unit && <span className="text-sm text-muted-foreground w-12 text-right pr-1">{m.unit}</span>}
            </div>
          </div>
        ))}
      </CardContent>
      {/* No submit button here, as this component's role is primarily input and callback */}
    </Card>
  );
};

export default AnimatedMeasurementInput;