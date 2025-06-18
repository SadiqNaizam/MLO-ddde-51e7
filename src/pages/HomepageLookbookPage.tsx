import React from 'react';
import { Link } from 'react-router-dom'; // Though MainHeader and InspirationalDesignCard handle their own links
import MainHeader from '@/components/layout/MainHeader';
import CinematicTransitionHandler from '@/components/CinematicTransitionHandler';
import InspirationalDesignCard from '@/components/InspirationalDesignCard';
import MainFooter from '@/components/layout/MainFooter';
import { ScrollArea } from '@/components/ui/scroll-area';

const inspirationalDesigns = [
  {
    designId: 'design001',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=1', // Replace with actual image URL
    title: 'The "Ethereal Bloom" Gown',
    description: 'A flowing silk chiffon gown with intricate floral embroidery, perfect for red carpet events or exclusive galas.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design002',
    imageUrl: 'https://images.unsplash.com/photo-1581338834907-1697131ef0cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=2', // Replace with actual image URL
    title: 'Velvet Knight Tuxedo',
    description: 'A modern take on classic menswear, featuring a deep sapphire velvet and sharp, tailored lines.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design003',
    imageUrl: 'https://images.unsplash.com/photo-1551909797-83c02633f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=3', // Replace with actual image URL
    title: '"Urban Sculpt" Power Suit',
    description: 'A statement power suit for women, combining architectural structure with luxurious Italian wool.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design004',
    imageUrl: 'https://images.unsplash.com/photo-1525840800908-068391326a84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=4', // Replace with actual image URL
    title: 'Celestial Dream Cape',
    description: 'An opulent, hand-beaded cape that drapes like a constellation, adding magic to any ensemble.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
    {
    designId: 'design005',
    imageUrl: 'https://images.unsplash.com/photo-1542838686-3769a0939879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=5',
    title: 'Avant-Garde Silk Blouse',
    description: 'A bold, asymmetrically draped silk blouse in a vibrant jewel tone, pushing fashion boundaries.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design006',
    imageUrl: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=6',
    title: 'Neo-Romantic Layered Skirt',
    description: 'A multi-layered tulle and lace skirt, offering a modern interpretation of romantic aesthetics.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design007',
    imageUrl: 'https://images.unsplash.com/photo-1600205329368-c597c04f8834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=7',
    title: 'Minimalist Cashmere Coat',
    description: 'An impeccably tailored cashmere coat with clean lines and understated luxury.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
  {
    designId: 'design008',
    imageUrl: 'https://images.unsplash.com/photo-1594252001907-01800f989078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80&sig=8',
    title: 'Art Deco Inspired Jacket',
    description: 'A structured jacket with geometric beading and metallic accents, echoing Art Deco glamour.',
    linkPath: '/design-detail' as "/design-detail" | "/product-customization-studio",
  },
];

const HomepageLookbookPage = () => {
  console.log('HomepageLookbookPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-neutral-900">
      <MainHeader />
      <main className="flex-grow relative overflow-hidden"> {/* relative for CinematicTransitionHandler, overflow-hidden to contain it */}
        <CinematicTransitionHandler>
          <ScrollArea className="h-full w-full"> {/* Ensure ScrollArea takes full height of its container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
              {/* Hero/Intro Section */}
              <section className="mb-12 md:mb-16 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  <span className="block">Welcome to the</span>
                  <span className="block text-primary mt-1">Luxe Atelier Lookbook</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                  Immerse yourself in a world of bespoke elegance. Discover curated collections and ignite your imagination for custom-made perfection.
                </p>
              </section>

              {/* Inspirational Designs Grid */}
              <section>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-8 text-center sm:text-left">
                  Featured Inspirations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {inspirationalDesigns.map((design) => (
                    <InspirationalDesignCard
                      key={design.designId}
                      designId={design.designId}
                      imageUrl={design.imageUrl}
                      title={design.title}
                      description={design.description}
                      linkPath={design.linkPath}
                      imageAlt={`Inspirational design: ${design.title}`}
                    />
                  ))}
                </div>
              </section>

              {/* Call to Action (Optional) */}
              <section className="mt-16 md:mt-24 text-center">
                 <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-4">
                    Ready to Create Your Masterpiece?
                </h3>
                <p className="max-w-xl mx-auto text-md sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Begin your journey into bespoke tailoring. Explore customization options or consult with our designers.
                </p>
                <Link
                    to="/product-customization-studio" // Path from App.tsx
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                    Start Designing
                </Link>
              </section>

            </div>
          </ScrollArea>
        </CinematicTransitionHandler>
      </main>
      <MainFooter />
    </div>
  );
};

export default HomepageLookbookPage;