import React, { useState, useEffect } from "react";

export const demo = () => {
  const [name, setname] = useState("zz");
  useEffect(() => {
    setname("zzbbb");
  }, []);
  return <div>{name}</div>;
};
