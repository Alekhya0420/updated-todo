// import { createContext } from "react";
// import { createMongoAbility } from "@casl/ability";
// import { defineAbilitiesFor } from "@/utils/casl";

// export const AbilityContext = createContext(createMongoAbility());

// export const AbilityProvider = ({ children, role, permissions }: { children: React.ReactNode, role: string, permissions: any }) => {
//   const ability = defineAbilitiesFor(role, permissions);

//   return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
// };




// import { createContext, useEffect, useState } from "react";
// import { createMongoAbility, MongoAbility, AbilityTuple, MongoQuery } from "@casl/ability";
// import { defineAbilitiesFor } from "@/utils/casl";

// type AppAbility = MongoAbility<AbilityTuple, MongoQuery>;

// export const AbilityContext = createContext<AppAbility>(createMongoAbility() as AppAbility);

// export const AbilityProvider = ({ children, role, permissions }: { children: React.ReactNode, role: string, permissions: any }) => {
//   const [ability] = useState(() => createMongoAbility() as AppAbility);

//   useEffect(() => {
//     console.log("🟢 Updating abilities for:", role, permissions);
    
//     const newAbility = defineAbilitiesFor(role, permissions);
    
//     ability.update(newAbility.rules); // ✅ Instead of replacing, update existing ability
//   }, [role, permissions]); 

//   return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
// };





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




