import api from "@/src/utils/api";

// Create testimonial (for students)
export const createTestimonial = (payload: any) =>
  api.post(`/api/reviews`, payload).then((r) => r.data);

// Get all testimonials with pagination (for admin)
export const getAllTestimonials = (page = 1, limit = 10) =>
  api.get(`/api/reviews?page=${page}&limit=${limit}`).then((r) => r.data);

// Get public approved testimonials (for main page)
export const getPublicTestimonials = (page = 1, limit = 10) =>
  api
    .get(`/api/reviews/public?page=${page}&limit=${limit}`)
    .then((r) => r.data);

// Approve testimonial (for admin)
export const approveTestimonial = (id: string) =>
  api.patch(`/api/reviews/${id}/approve`).then((r) => r.data);

// Reject testimonial (for admin)
export const rejectTestimonial = (id: string) =>
  api.put(`/api/reviews/${id}`, { adminAccepted: false }).then((r) => r.data);

// Delete testimonial (for admin)
export const deleteTestimonial = (id: string) =>
  api.delete(`/api/reviews/${id}`).then((r) => r.data);
