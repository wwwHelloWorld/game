"use client";

import React from "react";

type ButtonProps = {
  text: string;
  action: () => void;
};

export default function Button({ text, action }: ButtonProps) {
  return (
    <div>
      <button onClick={action}>{text}</button>
    </div>
  );
}
