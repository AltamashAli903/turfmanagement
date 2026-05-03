export const formatTo12Hour = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12; // 0 → 12

  return `${h}:${minute} ${ampm}`;
};

export const convertTo24Hour = (hour, minute, ampm) => {
  let h = parseInt(hour);

  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;

  return `${h.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
};

export const convertTo12HourParts = (time) => {
  if (!time) return {};

  let [hour, minute] = time.split(":");
  hour = parseInt(hour);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return {
    hour: hour.toString().padStart(2, "0"),   // ✅ FIX
    minute: minute.padStart(2, "0"),          // ✅ FIX
    ampm
  };
};