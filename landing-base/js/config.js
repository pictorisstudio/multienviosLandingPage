export const siteConfig = {
  brandName: "[NOMBRE DE LA EMPRESA]",
  whatsappNumber: "[NÚMERO DE WHATSAPP]",
  whatsappMessage: "Hola, quiero información sobre [DESCRIPCIÓN DEL SERVICIO].",
  contactEmail: "[CORREO ELECTRÓNICO]",
  city: "[CIUDAD]",
  formSimulationDelay: 900,
};

export function getWhatsAppUrl() {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(siteConfig.whatsappMessage);
  return digits ? `https://wa.me/${digits}?text=${encodedMessage}` : "#contacto";
}
