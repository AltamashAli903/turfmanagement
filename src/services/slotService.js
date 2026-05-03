import API from "../api/axios";

// Create Slot
export const createSlot = (data) => {
  return API.post("/slot/create", data);
};

// Get Turf Slots
export const getTurfSlots = (data) => {
  return API.post("/slot/turf",  data );
};

// Update Slot
export const updateSlot = (data) => {
  return API.put("/slot/update", data);
};

// Update Availability
export const updateAvailability = (data) => {
  return API.put("/slot/update-availability", data);
};

// Delete Slot
export const deleteSlot = (slot_id) => {
  return API.delete("/slot/delete", { data: { slot_id } });
};

// List All Slots
export const listSlots = () => {
  return API.get("/slot/list");
};