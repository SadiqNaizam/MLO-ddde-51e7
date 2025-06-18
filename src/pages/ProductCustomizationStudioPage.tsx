import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import InteractiveMannequinPreview, { CustomizationOption, StyleSelection } from '@/components/InteractiveMannequinPreview';
import FabricSwatchSelector, { Fabric } from '@/components/FabricSwatchSelector';
import StyleOptionSelector, { StyleOption } from '@/components/StyleOptionSelector';
import AnimatedMeasurementInput, { MeasurementValues } from '@/components/AnimatedMeasurementInput';

// Shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

// Sample Data
const sampleFabrics: Fabric[] = [
  { id: 'fab1', name: 'Italian Wool', colorName: 'Charcoal Grey', thumbnailUrl: 'https://placehold.co/150x150/6B7280/FFFFFF?text=Wool', detailImageUrl: 'https://placehold.co/600x400/6B7280/FFFFFF?text=Italian+Wool+Detail', textureDescription: 'Smooth, luxurious, and durable.', sheenLevel: 'Matte' },
  { id: 'fab2', name: 'Egyptian Cotton', colorName: 'Sky Blue', thumbnailUrl: 'https://placehold.co/150x150/3B82F6/FFFFFF?text=Cotton', detailImageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Egyptian+Cotton+Detail', textureDescription: 'Soft, breathable, and lightweight.', sheenLevel: 'Satin' },
  { id: 'fab3', name: 'Silk Charmeuse', colorName: 'Champagne', thumbnailUrl: 'https://placehold.co/150x150/F0E68C/333333?text=Silk', detailImageUrl: 'https://placehold.co/600x400/F0E68C/333333?text=Silk+Charmeuse+Detail', textureDescription: 'Lustrous, elegant, and fluid.', sheenLevel: 'Glossy' },
  { id: 'fab4', name: 'Linen Blend', colorName: 'Natural Beige', thumbnailUrl: 'https://placehold.co/150x150/D2B48C/333333?text=Linen', detailImageUrl: 'https://placehold.co/600x400/D2B48C/333333?text=Linen+Blend+Detail', textureDescription: 'Crisp, cool, and perfect for warm weather.', sheenLevel: 'Matte' },
];

const sampleCuts: StyleOption[] = [
  { id: 'cut1', name: 'Slim Fit' },
  { id: 'cut2', name: 'Modern Fit' },
  { id: 'cut3', name: 'Classic Fit' },
  { id: 'cut4', name: 'Relaxed Fit' },
];

const sampleCollarStyles: StyleOption[] = [
  { id: 'col1', name: 'Spread Collar' },
  { id: 'col2', name: 'Point Collar' },
  { id: 'col3', name: 'Button-Down Collar' },
  { id: 'col4', name: 'Mandarin Collar' },
];

const sampleCuffStyles: StyleOption[] = [
  { id: 'cuff1', name: 'French Cuffs' },
  { id: 'cuff2', name: 'Barrel Cuffs (Single Button)' },
  { id: 'cuff3', name: 'Mitered Cuffs' },
];

const sampleButtonStyles: StyleOption[] = [
  { id: 'btn1', name: 'Mother of Pearl' },
  { id: 'btn2', name: 'Horn Buttons' },
  { id: 'btn3', name: 'Covered Buttons' },
  { id: 'btn4', name: 'Metallic Snaps' },
];


const ProductCustomizationStudioPage = () => {
  console.log('ProductCustomizationStudioPage loaded');

  const [selectedFabricId, setSelectedFabricId] = useState<string | null>(sampleFabrics[0]?.id || null);
  const [selectedCutId, setSelectedCutId] = useState<string | undefined>(sampleCuts[0]?.id);
  const [selectedCollarId, setSelectedCollarId] = useState<string | undefined>(sampleCollarStyles[0]?.id);
  const [selectedCuffId, setSelectedCuffId] = useState<string | undefined>(sampleCuffStyles[0]?.id);
  const [selectedButtonId, setSelectedButtonId] = useState<string | undefined>(sampleButtonStyles[0]?.id);
  const [monogramText, setMonogramText] = useState<string>('');
  const [measurements, setMeasurements] = useState<MeasurementValues>({});

  const selectedFabricOption: CustomizationOption | undefined = sampleFabrics.find(f => f.id === selectedFabricId);
  const selectedCutOption: CustomizationOption | undefined = sampleCuts.find(c => c.id === selectedCutId);

  const mannequinSelectedStyles: StyleSelection = {
    collar: sampleCollarStyles.find(s => s.id === selectedCollarId)?.name || null,
    cuffs: sampleCuffStyles.find(s => s.id === selectedCuffId)?.name || null,
  };

  const mannequinSelectedDetails: StyleSelection = {
    buttons: sampleButtonStyles.find(s => s.id === selectedButtonId)?.name || null,
    monogram: monogramText || null,
  };

  const handleMeasurementsChange = (newMeasurements: MeasurementValues) => {
    setMeasurements(newMeasurements);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 dark:from-gray-900 dark:to-neutral-900 text-gray-800 dark:text-gray-200">
      <MainHeader />
      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-primary" /> Your Personal Atelier
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">Craft a garment that is uniquely yours. Every detail, perfectly personalized.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12 items-start">
            {/* Left Column (wider): Interactive Preview */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 self-start">
              <InteractiveMannequinPreview
                selectedFabric={selectedFabricOption}
                selectedCut={selectedCutOption}
                selectedStyles={mannequinSelectedStyles}
                selectedDetails={mannequinSelectedDetails}
                baseMannequinImageUrl="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder more fashion-oriented
              />
            </div>

            {/* Right Column (wider): Customization Options */}
            <div className="lg:col-span-4">
              <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-card">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
                   <CardTitle className="text-2xl font-semibold">Customize Your Garment</CardTitle>
                   <CardDescription>Select your preferences from the options below.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="fabric" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-0 p-0 border-b border-gray-200 dark:border-gray-700 rounded-none">
                      <TabsTrigger value="fabric" className="py-3 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:font-semibold">Fabric</TabsTrigger>
                      <TabsTrigger value="style" className="py-3 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:font-semibold">Style & Fit</TabsTrigger>
                      <TabsTrigger value="details" className="py-3 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:font-semibold">Details</TabsTrigger>
                      <TabsTrigger value="measurements" className="py-3 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:font-semibold">Measurements</TabsTrigger>
                    </TabsList>

                    <TabsContent value="fabric" className="p-6">
                      <section aria-labelledby="fabric-selection-heading" className="space-y-4">
                        <h3 id="fabric-selection-heading" className="text-lg font-medium text-gray-800 dark:text-gray-200">Fabric Selection</h3>
                        <FabricSwatchSelector
                          fabrics={sampleFabrics}
                          selectedFabricId={selectedFabricId}
                          onSelectFabric={setSelectedFabricId}
                        />
                      </section>
                    </TabsContent>

                    <TabsContent value="style" className="p-6 space-y-8">
                      <section aria-labelledby="cut-selection-heading">
                        <StyleOptionSelector
                          label="Garment Fit"
                          options={sampleCuts}
                          selectedOptionId={selectedCutId}
                          onOptionSelect={setSelectedCutId}
                        />
                      </section>
                      <section aria-labelledby="collar-selection-heading">
                         <StyleOptionSelector
                          label="Collar Style"
                          options={sampleCollarStyles}
                          selectedOptionId={selectedCollarId}
                          onOptionSelect={setSelectedCollarId}
                        />
                      </section>
                       <section aria-labelledby="cuff-selection-heading">
                         <StyleOptionSelector
                          label="Cuff Style"
                          options={sampleCuffStyles}
                          selectedOptionId={selectedCuffId}
                          onOptionSelect={setSelectedCuffId}
                        />
                      </section>
                    </TabsContent>

                    <TabsContent value="details" className="p-6 space-y-8">
                      <section aria-labelledby="button-selection-heading">
                         <StyleOptionSelector
                          label="Button Style"
                          options={sampleButtonStyles}
                          selectedOptionId={selectedButtonId}
                          onOptionSelect={setSelectedButtonId}
                        />
                      </section>
                      <section aria-labelledby="monogram-input-heading" className="space-y-2">
                        <label htmlFor="monogram" className="text-base font-semibold text-gray-800 dark:text-gray-200 tracking-wide">Monogram (Optional)</label>
                        <input
                          id="monogram"
                          type="text"
                          value={monogramText}
                          onChange={(e) => setMonogramText(e.target.value)}
                          placeholder="e.g., J.D."
                          maxLength={5}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background dark:bg-gray-700 focus:ring-primary focus:border-primary"
                        />
                        <p className="text-xs text-muted-foreground">Enter up to 5 characters for your custom monogram.</p>
                      </section>
                    </TabsContent>

                    <TabsContent value="measurements" className="p-6">
                      <section aria-labelledby="measurements-input-heading">
                        <AnimatedMeasurementInput
                          onMeasurementsChange={handleMeasurementsChange}
                          initialMeasurements={measurements}
                        />
                      </section>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end items-center border-t pt-6 border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Save Draft
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      Add to Bag & Proceed
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card text-card-foreground">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Customization</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your unique design is ready! Review your selections and proceed to checkout, or continue refining your choices.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4 p-4 bg-muted/50 rounded-md text-sm space-y-1">
                        <p><strong>Fabric:</strong> {selectedFabricOption?.name || 'Not selected'}</p>
                        <p><strong>Fit:</strong> {selectedCutOption?.name || 'Not selected'}</p>
                        <p><strong>Collar:</strong> {mannequinSelectedStyles.collar || 'Not selected'}</p>
                        <p><strong>Cuffs:</strong> {mannequinSelectedStyles.cuffs || 'Not selected'}</p>
                        <p><strong>Buttons:</strong> {mannequinSelectedDetails.buttons || 'Not selected'}</p>
                        {monogramText && <p><strong>Monogram:</strong> {monogramText}</p>}
                        {Object.keys(measurements).length > 0 && <p><strong>Measurements:</strong> Submitted</p>}
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                      <Link to="/checkout"> {/* Path from App.tsx */}
                        <AlertDialogAction>Proceed to Checkout</AlertDialogAction>
                      </Link>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </main>
      </ScrollArea>
      <MainFooter />
    </div>
  );
};

export default ProductCustomizationStudioPage;