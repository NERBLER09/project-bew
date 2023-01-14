import { writable, type Writable } from "svelte/store";

export const currentProject: Writable<any> = writable()

export type SortOption = "a-z" | "z-a"
export const projectSort: Writable<SortOption> = writable("a-z")