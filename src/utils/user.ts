import { ADMIN_ROLES, ADMINS } from "./constant";

type AdminType = (typeof ADMINS)[number];

export const isSuperAdmin = (role: string) => {
  return ADMIN_ROLES.includes(role.toLowerCase());
};

export const isAdmin = (role: AdminType) => {
  return ADMINS.includes(role);
};

export const isPropertyAgent = (propertyAgentId: string, agentId: string) => {
  return propertyAgentId == agentId;
};
