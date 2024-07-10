import React from "react";

import { Button } from "@/components/ui/button";

interface SecondaryFeatureCardProps {
  title: string;
  description: string;
  image: string;
}

export function SecondaryFeatureCard({
  title,
  description,
  image,
}: SecondaryFeatureCardProps) {
  return (
    <div className="flex flex-col rounded-xl border">
      <a href="#">
        <img className="rounded-t-xl" src={image} alt={title} />
      </a>
      <div className="flex flex-col space-y-6 p-6">
        <a href="#">
          <h5 className="text-foreground text-2xl font-bold">{title}</h5>
        </a>
        <p className="text-muted-foreground font-normal">{description}</p>
        <Button variant="primaryOutline"> تعرف على المزيد </Button>
      </div>
    </div>
  );
}
