"use client";

import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "2025 Economic Data Available",
        action: {
          text: "Explore Countries",
          href: "/countries/usa",
        },
      }}
      title="Global Economic Insights"
      description="Comprehensive economic data and analysis for 29 countries worldwide. Explore salary comparisons, GDP rankings, and economic indicators with beautiful interactive visualizations."
      actions={[
        {
          text: "Explore Countries",
          href: "/countries/usa",
          variant: "default",
        },
        {
          text: "View Analytics",
          href: "/",
          variant: "secondary",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1248&h=765&fit=crop",
        dark: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1248&h=765&fit=crop",
        alt: "Economic Dashboard Preview",
      }}
    />
  );
}