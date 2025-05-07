const rolePermissions = {
  admin: [
    "view_products",
    "create_product",
    "edit_product",
    "delete_product",
    "view_pets",
    "create_pet",
    "edit_pet",
    "delete_pet",
    "view_users",
    "create_user",
    "edit_user",
    "delete_user",
    "view_orders",
    "update_order",
    "view_categories",
    "create_category",
    "edit_category",
    "delete_category",
    "view_appointments",
    "create_appointment",
    "update_appointment",
    "delete_appointment",
  ],
  seller: [
    "view_products",
    "create_product",
    "edit_own_product",
    "delete_own_product",
    "view_pets",
    "create_pet",
    "edit_own_pet",
    "delete_own_pet",
    "view_own_orders",
    "view_categories",
    "view_appointments",
    "create_appointment",
    "edit_own_appointment",
    "delete_own_appointment",
  ],
  client: [
    "view_products",
    "view_pets",
    "create_order",
    "view_own_orders",
    "view_categories",
    "view_own_appointments",
    "create_appointment",
    "delete_own_appointment",
  ],
};

export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  const permissions = rolePermissions[user.role.toLowerCase()] || [];
  return permissions.includes(permission);
};

export const isOwner = (user, resource) => {
  if (!user || !resource) return false;
  return (
    resource.sellerId === user.id ||
    resource.userId === user.id ||
    resource.clientId === user.id ||
    resource.vetId === user.id
  );
};

export const canPerformAction = (user, action, resource) => {
  if (!user || !user.role) return false;

  if (user.role.toLowerCase() === "admin") return true;

  const generalPermission = hasPermission(user, action);
  if (generalPermission) return true;

  const ownPermission = hasPermission(user, `${action}_own`);
  return ownPermission && isOwner(user, resource);
};