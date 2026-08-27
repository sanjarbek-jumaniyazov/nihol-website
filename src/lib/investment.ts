/** Per-tree investment constants, shared by the packages catalog, cart, and checkout. */
export const TREE_SOM = 499000;
export const TREE_USD = 50;

export type TreeStage = "seedling" | "sapling" | "maturing" | "harvest_ready";

export function stageForHeightPct(pct: number): TreeStage {
  if (pct < 15) return "seedling";
  if (pct < 45) return "sapling";
  if (pct < 85) return "maturing";
  return "harvest_ready";
}
