export const formaterDate = (fecha) => {
  const fechaOriginal = new Date(fecha);
  const year = fechaOriginal.getFullYear();
  const month = ("0" + (fechaOriginal.getMonth() + 1)).slice(-2);
  const day = ("0" + fechaOriginal.getDate()).slice(-2);

  let hours = fechaOriginal.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convertir a formato de 12 horas
  const minutes = ("0" + fechaOriginal.getMinutes()).slice(-2);

  // Formatear la fecha en formato de 12 horas
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};
