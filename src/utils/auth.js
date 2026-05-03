export const getOwnerId = () => {
  const owner = localStorage.getItem("owner");
  return owner ? JSON.parse(owner).id : null;
};