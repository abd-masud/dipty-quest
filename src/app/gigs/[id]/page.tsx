"use client";

import { GigsItemComponent } from "@/components/Frontend/Gigs/GigsItem/GigsItemComponent";
import { useParams } from "next/navigation";

export default function Gigs() {
  const { id } = useParams();

  const gigId = Array.isArray(id) ? id[0] : id;

  if (!gigId) return <div>Gig not found</div>;

  return <GigsItemComponent gigId={gigId} />;
}
