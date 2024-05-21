"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ky, { type HTTPError } from "ky";
import { toast } from "sonner";

const ConfirmPage: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDecision = async (data) => {
    setLoading(true);
    try {
      const res: any = await ky
        .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/participant`, {
          json: {
            edit_code: params.get("edit_code"),
            event_code: params.get("event_code"),
            ...data,
          },
        })
        .json();
      if (res.status == "success") {
        router.push(`/confirm/success${data.remove ? "?remove=true" : ""}`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if ((error as Error).name === "HTTPError") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const err: any = await (error as HTTPError).response.json();
        toast.error(err?.message);
      } else {
        toast.error("An error occurred");
      }
    }
    setLoading(false);
  };

  return params.get("event_code") && params.get("edit_code") ? (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Excited for the Event?</h1>
      <p className="mb-8 mt-4 text-xl">
        Let us know if you're still on board for the event and ready to join the
        carpool!
      </p>
      <div className="flex items-center justify-center gap-8">
        <button
          className="btn btn-outline"
          onClick={() => handleDecision({ remove: true })}
          disabled={loading}
        >
          No, I'm not going
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleDecision({ confirmed: true })}
          disabled={loading}
        >
          Yes. I'm going!
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">
        Invalid Confirmation Link
      </h1>
      <p className="mb-8 mt-4 text-xl">
        The confirmation link is invalid. Please check the link and try again.
      </p>
    </div>
  );
};

export default ConfirmPage;
