import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export type Actions = "manage" | "view" | "edit" | "delete";//user defined
export type Subjects = "Task" | "User";//table tname

export const defineAbilitiesFor = (role: string, permissions: Record<string, boolean> = {}) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (role === "ADMIN") {
    can("manage", "all"); 
  } else if (role === "SUBADMIN") {
    if (permissions.viewAllTasks) can("view", "Task");
    if (permissions.editAllTasks) can("edit", "Task");
    if (permissions.deleteAllTasks) can("delete", "Task");
  } else {
    can("view", "Task", { ownerId: "self"});
  }

  return build();
};

