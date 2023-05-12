"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { KendoGridState } from "kendo/src/components/data-grid/data-grid-server";

const serialize = (state?: Object) => {
  return JSON.stringify(state);
};

export const DataState = async (props: any) => {
  const router = useRouter();

  const handleStateChange = (state: KendoGridState) => {
    document.cookie = `kendo-grid=${serialize(state)}`;
    router.refresh();
  };

  return (
    <props.children.type
      {...props.children.props}
      onStateChange={handleStateChange}
    />
  );
};
