"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const params = useSearchParams();

  return (
    <div className="text-center">
      <p className="my-8 text-8xl">👍</p>
      <h1 className="text-xl">
        Thanks for letting us know about your decision!{" "}
        {params.get("remove") ? "We've removed you from the carpool. " : ""}{" "}
        This helps us calculate the most efficient routes for everyone
        participating in the carpool.
      </h1>
    </div>
  );
};

export default SuccessPage;
