function getCities(tab) {
  if (tab === "bus") return APP_DATA.busCities;
  if (tab === "flights") return APP_DATA.flightCities;
  return APP_DATA.trainCities;
}

function getTimeBucket(time) {
  const hourPart = Number(time.split(":")[0]);
  const isPM = time.includes("PM");
  let hour24 = hourPart % 12;
  if (isPM) hour24 += 12;
  if (hour24 < 12) return "Morning";
  if (hour24 < 19) return "Afternoon";
  return "Evening";
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(email).trim());
}