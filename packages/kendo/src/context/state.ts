import React from "react";
import { initialDataGridState } from "../components/data-grid/reducer";

export const StateContext = React.createServerContext<any>(initialDataGridState);
