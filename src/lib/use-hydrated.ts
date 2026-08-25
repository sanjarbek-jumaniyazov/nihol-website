import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True only after the client has mounted — avoids hydration mismatches for client-only state (e.g. localStorage-backed cart). */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
