const AsSeenOnBanner = () => {
  const companies = [
    "TechCrunch",
    "Forbes",
    "Wired",
    "Fast Company",
    "VentureBeat",
    "The Verge",
    "Business Insider",
    "MIT Technology Review"
  ];

  return (
    <div className="w-full py-12 overflow-hidden bg-background/50 backdrop-blur-sm border-y border-primary/10">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          As Seen On
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Rolling logos container */}
        <div className="flex animate-scroll">
          {/* First set of logos */}
          <div className="flex items-center gap-12 px-6 min-w-max">
            {companies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-xl font-bold tracking-tight whitespace-nowrap opacity-60 hover:opacity-100"
              >
                {company}
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-12 px-6 min-w-max">
            {companies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-xl font-bold tracking-tight whitespace-nowrap opacity-60 hover:opacity-100"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsSeenOnBanner;
