import React from "react";

type SpaceProps = {
  size: number;
};

export default function Space({ size }: SpaceProps){
  return <div style={{ margin: size }}></div>;
};
