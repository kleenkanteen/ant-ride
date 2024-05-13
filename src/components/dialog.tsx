/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CopyIcon } from "@/lib/icons";
import { copyContent } from "@/lib/utils";
import React, { forwardRef } from "react";

interface DialogProps {
  title: string;
  children: React.ReactNode;
}

export function CopyElement({ label, code }) {
  return (
    <div className="my-2 flex items-center gap-4">
      <span className="w-[200px]">
        {label}: <strong>{code}</strong>
      </span>

      <button className="btn btn-xs" onClick={() => copyContent(code)}>
        <CopyIcon />
      </button>
    </div>
  );
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  return (
    <dialog
      ref={ref}
      id="success_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box my-4">
        <h3 className="text-xl font-bold">{props.title}</h3>
        <div className="mt-4">{props.children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default Dialog;
