"use client";

import React from "react";
import { Button } from 'semantic-ui-react'


type ButtonProps = {
  text: string;
  type?: 'small' | "medium" | "large" | "huge"
  style?: "blue" | "green" | "purple" | "black"
  disabled?: boolean
  action: () => void;
};

export default function ButtonUI({ text, action, type="large",  style="blue", disabled = false }: ButtonProps) {
  return (
    <div>
      <Button onClick={action} color={style} size={type} disabled={disabled}>{text}</Button>
    </div>
  );
}
