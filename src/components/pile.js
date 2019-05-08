import React from "react";

import Card from "./card";

export default function pile({ topCard, className }) {
  return <Card card={topCard} className={className} />;
}
