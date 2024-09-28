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
    <div className="flex items-center justify-center gap-2">
      <span className="text-lg text-center">
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
      className="modal modal-middle"
    >
      <div className="modal-box flex flex-col items-center justify-center gap-8">
        <h3 className="text-xl text-gray-200 font-bold text-center">{props.title}</h3>
        {props.children}
        <div className="modal-action my-0">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default Dialog;
