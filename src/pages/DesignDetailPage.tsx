import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import InteractiveMannequinPreview from '@/components/InteractiveMannequinPreview';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

// Icons
import { ArrowRight } from 'lucide-react';

// Placeholder data for a design
const placeholderDesign = {
  id: "D001",
  name: "The 'Aura' Silk Gown",
  description: "An ethereal floor-length gown crafted from triple-ply silk georgette. Features a décolletage-enhancing V-neckline, delicate spaghetti straps, and a flowing A-line skirt that moves with grace. Perfect for galas and special occasions.",
  images: [
    { src: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Elegant 'Aura' Silk Gown - Front View" },
    { src: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Elegant 'Aura' Silk Gown - Detail Shot" },
    { src: "https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Model showcasing a similar elegant evening gown" }
  ],
  mannequinImage: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder for mannequin/base display
  fabricSuggestions: [
    "Triple-Ply Silk Georgette (Featured)",
    "Italian Crepe de Chine",
    "Satin-Backed Charmeuse",
    "Organic Peace Silk"
  ],
  keyFeatures: [
    "Deep V-neckline with soft draping",
    "Adjustable fine spaghetti straps",
    "Flowing A-line skirt with slight train",
    "Concealed side zipper for a seamless look",
    "Hand-finished detailing"
  ],
  careInstructions: "Professional dry clean only. Store hung in a breathable garment bag. Avoid direct sunlight and moisture. Iron on low heat through a protective cloth if necessary."
};

const DesignDetailPage: React.FC = () => {
  const location = useLocation();
  const [currentDesign, setCurrentDesign] = useState(placeholderDesign);

  useEffect(() => {
    console.log('DesignDetailPage loaded');
    if (location.state && location.state.designId) {
      console.log('Navigated to DesignDetailPage with designId:', location.state.designId, 'Title:', location.state.title);
      // In a real application, you would fetch specific design data using location.state.designId
      // For this example, we'll update the name and id if passed from a previous page (e.g., InspirationalDesignCard)
      setCurrentDesign(prevData => ({
        ...prevData, // Keep other placeholder data
        id: location.state.designId || prevData.id,
        name: location.state.title || prevData.name,
        // Potentially update images or other details based on ID if more placeholders were available
      }));
    }
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-serif">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs Section */}
        <section className="mb-8 md:mb-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {/* This could be more dynamic if designs are categorized */}
              <BreadcrumbItem>
                 <BreadcrumbLink asChild>
                  <Link to="/design-detail" className="hover:text-primary transition-colors">Designs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{currentDesign.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        {/* Main Content: Design Carousel + Details + CTA */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Carousel */}
          <section className="md:sticky md:top-28"> {/* Sticky for larger screens, adjust top based on header height */}
            <Carousel className="w-full max-w-lg mx-auto md:max-w-full shadow-xl rounded-lg overflow-hidden border border-border" opts={{ loop: true }}>
              <CarouselContent>
                {currentDesign.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 rounded-none"> {/* Remove card border if carousel has its own */}
                      <CardContent className="flex aspect-[3/4] items-center justify-center p-0 bg-muted/30">
                        <img 
                            src={img.src} 
                            alt={img.alt} 
                            className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105" 
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-background/70 hover:bg-background/90 border-border" />
              <CarouselNext className="right-2 bg-background/70 hover:bg-background/90 border-border" />
            </Carousel>
          </section>

          {/* Right Column: Details, Accordion, CTA */}
          <section className="space-y-6 py-4">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{currentDesign.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{currentDesign.description}</p>

            <Accordion type="single" collapsible defaultValue="item-1" className="w-full border-t border-b border-border">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">Fabric Suggestions</AccordionTrigger>
                <AccordionContent className="pt-1 pb-4">
                  <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-2">
                    {currentDesign.fabricSuggestions.map(fabric => <li key={fabric}>{fabric}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">Key Features</AccordionTrigger>
                <AccordionContent className="pt-1 pb-4">
                 <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-2">
                    {currentDesign.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">Care Instructions</AccordionTrigger>
                <AccordionContent className="pt-1 pb-4">
                  <p className="text-muted-foreground">{currentDesign.careInstructions}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button 
              size="lg" 
              className="w-full text-base md:text-lg py-7 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 transform hover:scale-[1.02]" 
              asChild
            >
              <Link 
                to="/product-customization-studio" 
                state={{ designId: currentDesign.id, designName: currentDesign.name }}
              >
                Customize this Design
                <ArrowRight className="ml-2.5 h-5 w-5" />
              </Link>
            </Button>
          </section>
        </div>

        {/* Interactive Mannequin Preview Section */}
        <section className="mt-16 lg:mt-24 py-10 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">Visualize Your Creation</h2>
          <div className="max-w-2xl mx-auto">
            <InteractiveMannequinPreview
              baseMannequinImageUrl={currentDesign.mannequinImage}
              selectedFabric={{ 
                id: 'fabric-default-silk', 
                name: 'Featured Silk Georgette', 
                imageUrl: currentDesign.images[0]?.src, // Use first image as a texture example
                color: 'As Shown' 
              }}
              // Potentially add selectedCut if this design has a very specific default cut
            />
          </div>
        </section>

      </main>
      <MainFooter />
    </div>
  );
};

export default DesignDetailPage;