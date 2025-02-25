import { createContext, useEffect, useState } from "react";
import { createMongoAbility } from "@casl/ability";
import { defineAbilitiesFor } from "@/utils/casl";

export const AbilityContext = createContext(createMongoAbility());

export const AbilityProvider = ({ children, role, permissions }: any) => {
  const [ability, setAbility] = useState(() => defineAbilitiesFor(role, permissions));

  useEffect(() => {
    const updatedAbility = defineAbilitiesFor(role, permissions);
    ability.update(updatedAbility.rules);
  }, [role, permissions]);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};




