/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useState } from "react";

export default function PhoneInput({ value, onChange }) {
  const [phone, setPhone] = useState([
    value.substring(0, 3),
    value.substring(3, 6),
    value.substring(6),
  ]);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const Separator = () => <span>-</span>;

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref1}
        type="text"
        disabled
        value={"+1"}
        className="input input-bordered w-[50px]"
      />
      <input
        ref={ref1}
        type="text"
        value={phone[0]}
        maxLength={3}
        onChange={(e) => {
          if (e.target.value.length === 3 && ref2.current) {
            ref2.current.focus();
          }
          setPhone((prev) => [e.target.value, prev[1], prev[2]]);
          onChange(e.target.value + phone[1] + phone[2]);
        }}
        className="input input-bordered w-16"
      />
      <Separator />
      <input
        ref={ref2}
        type="text"
        value={phone[1]}
        maxLength={3}
        onChange={(e) => {
          if (e.target.value.length === 3 && ref3.current) {
            ref3.current.focus();
          }
          setPhone((prev) => [prev[0], e.target.value, prev[2]]);
          onChange(phone[0] + e.target.value + phone[2]);
        }}
        className="input input-bordered w-16"
      />
      <Separator />
      <input
        ref={ref3}
        type="text"
        value={phone[2]}
        maxLength={4}
        onChange={(e) => {
          setPhone((prev) => [prev[0], prev[1], e.target.value]);
          onChange(phone[0] + phone[1] + e.target.value);
        }}
        className="input input-bordered w-20"
      />
    </div>
  );
}
