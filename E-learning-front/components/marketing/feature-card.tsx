import React from "react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

export function FeatureCard({
  title,
  subtitle,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="relative cursor-pointer rounded-xl border bg-sky-400/5 p-10 transition-all duration-200 ease-in-out hover:bg-sky-400/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400 bg-sky-400/35">
        <Icon className="h-6 w-6 text-sky-700" />
      </div>
      <h3 className="mt-6 text-sm font-semibold text-sky-400">{title}</h3>
      <p className="text-foreground mt-2 text-xl font-medium">{subtitle}</p>
      <p className="text-muted-foreground mt-4 text-sm">{description}</p>
    </div>
  );
}
