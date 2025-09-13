import api from "@/src/utils/api";

// Get public contact information (no authentication required)
export const getPublicContactInfo = () =>
  api.get(`/api/admin/contact`).then((r) => r.data);
