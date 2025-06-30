"use client";

import { Jobs } from "./Jobs";
import { Gigs } from "./Gigs";
import { Categories } from "./Categories";
import { useJwtToken } from "./AuthUtils";

export const AuthCheckOne = () => {
  const userData = useJwtToken();
  const isEmployer = userData?.role == "employer";

  if (isEmployer) {
    return null;
  }

  return (
    <>
      <Jobs />
      <Gigs />
      <Categories />
    </>
  );
};
