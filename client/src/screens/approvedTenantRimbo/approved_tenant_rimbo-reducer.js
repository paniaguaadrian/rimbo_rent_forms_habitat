import { UPDATE_NEWTENANT_RIMBO_APPROVED } from "./approved_tenant_rimbo-constants";

export const DefaultTenant = {
  isRimboAccepted: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_RIMBO_APPROVED:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
