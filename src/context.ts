import { createContext } from "react";

export interface HEREMapContextType {
  map?: H.Map;
}

export const HEREMapContext = createContext<HEREMapContextType>({ });
