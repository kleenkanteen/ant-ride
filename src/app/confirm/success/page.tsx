"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const params = useSearchParams();

  return (
    <div className="text-center">
      <p className="my-8 text-8xl">👍</p>
      <h1 className="text-xl">
        {params.get("remove")
          ? "We've removed you from the carpool."
          : "Your spot has been confirmed."}
      </h1>
    </div>
  );
};

export default SuccessPage;
