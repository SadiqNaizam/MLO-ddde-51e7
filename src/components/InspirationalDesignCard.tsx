import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface InspirationalDesignCardProps {
  /** Unique identifier for the design, passed to the linked page via state. */
  designId: string | number;
  /** URL for the main display image. */
  imageUrl: string;
  /** Title of the design. */
  title: string;
  /** A brief description of the design. */
  description: string;
  /** The path to navigate to when the card is clicked. Must match a route in App.tsx. */
  linkPath: "/design-detail" | "/product-customization-studio";
  /** Optional alt text for the image. Defaults to the title. */
  imageAlt?: string;
}

const InspirationalDesignCard: React.FC<InspirationalDesignCardProps> = ({
  designId,
  imageUrl,
  title,
  description,
  linkPath,
  imageAlt,
}) => {
  console.log(`InspirationalDesignCard: Rendering card for designId: ${designId}, title: "${title}"`);

  return (
    <Link
      to={linkPath}
      state={{ designId: designId, title: title }} // Pass designId and title to the linked page's state
      className="block group outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg h-full"
      aria-label={`View details for ${title}`}
    >
      <Card className="w-full h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl rounded-lg border">
        {/* Image Section */}
        <div className="overflow-hidden rounded-t-lg"> {/* Clips the image during scale animation */}
          <AspectRatio ratio={3 / 4} className="bg-muted"> {/* Aspect ratio for consistent image display, bg-muted as fallback */}
            <img
              src={imageUrl || 'https://via.placeholder.com/600x800?text=Inspirational+Design'}
              alt={imageAlt || title}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </AspectRatio>
        </div>

        {/* Content Section */}
        <CardContent className="p-4 flex flex-col flex-grow space-y-1.5"> {/* flex-grow allows content to fill card height */}
          <CardTitle className="text-base md:text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default InspirationalDesignCard;