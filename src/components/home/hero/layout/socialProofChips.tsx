import React from "react";

export default function SocialProofChips() {
  const socialData = [
    ["120k+", "conversations every day"],
    ["4.9/5", "average community rating"],
    ["100%", "anonymous, always"],
  ];
  return (
    <div className="flex w-full h-full font-sans justify-around items-center">
      {socialData.map(([stat, label]) => (
        <div key={label} className="flex items-center flex-col">
          <p className="font-extrabold text-2xl text-foreground">{stat}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
