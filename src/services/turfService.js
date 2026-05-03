import api from "../api/axios";
import { getOwnerId } from "../utils/auth";

// ✅ GET TURFS 
export const getOwnerTurfs = () => {
  const owner_id = getOwnerId();

  console.log("GET OWNER ID 👉", owner_id);

  return api.post("/turf/get-turf", {
    owner_id
  });
};

// ✅ CREATE TURF 
export const createTurf = (data) => {
  const owner_id = getOwnerId();

  console.log("CREATE PAYLOAD 👉", { ...data, owner_id });

  return api.post("/turf/create", {
    ...data,
    owner_id
  });
};

// ✅ UPDATE TURF
export const updateTurf = (data) => {
  return api.put("/turf/update", data);
};

// ✅ DELETE TURF
export const deleteTurf = (data) => {
  return api.put("/turf/delete", data);
};