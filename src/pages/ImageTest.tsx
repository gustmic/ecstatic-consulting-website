import { Helmet } from "react-helmet-async";
import hero1 from "@/assets/manufacturing-hero-1.jpg";
import hero2 from "@/assets/manufacturing-hero-2.jpg";
import hero3 from "@/assets/manufacturing-hero-3.jpg";
import hero4 from "@/assets/manufacturing-hero-4.jpg";
import hero5 from "@/assets/manufacturing-hero-5.jpg";
import { Card } from "@/components/ui/card";

const ImageTest = () => {
  const images = [
    { src: hero1, title: "Modern Factory Floor", description: "High-tech facility with robotic arms and automation" },
    { src: hero2, title: "Industrial Architecture", description: "Modern manufacturing plant with Swedish design aesthetics" },
    { src: hero3, title: "Precision Assembly Line", description: "Automated manufacturing with advanced machinery" },
    { src: hero4, title: "Control Room Technology", description: "Engineers monitoring production systems with IoT" },
    { src: hero5, title: "Collaborative Manufacturing", description: "Workers and equipment in modern production facility" },
  ];

  return (
    <>
      <Helmet>
        <title>Hero Image Test - Manufacturing Options</title>
      </Helmet>
      
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Manufacturing Hero Image Options</h1>
          <p className="text-muted-foreground mb-12">
            Select the image that best represents your manufacturing consulting vision
          </p>
          
          <div className="space-y-12">
            {images.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-2">Option {index + 1}: {image.title}</h2>
                    <p className="text-muted-foreground mb-4">{image.description}</p>
                    <p className="text-sm text-muted-foreground">
                      This image showcases {image.description.toLowerCase()}, perfect for establishing 
                      credibility in manufacturing consulting.
                    </p>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Next Steps</h3>
            <p className="text-muted-foreground">
              Once you've selected your preferred image, let me know which option (1-5) you'd like to use, 
              and I'll update the hero section on your homepage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageTest;
