"use client";

import { useJwtToken } from "./AuthUtils";
import { Events } from "./Events";

export const AuthCheckTwo = () => {
  const userData = useJwtToken();
  const isEmployer = userData?.role == "employer";

  if (isEmployer) {
    return null;
  }

  return <Events />;
};
