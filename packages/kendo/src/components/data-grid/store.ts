import { createStore } from "zustand/vanilla";
import { initialDataGridState } from "./reducer";

const dataGridStore = createStore(() => initialDataGridState);

const { getState, setState, subscribe } = dataGridStore;

export default dataGridStore;
