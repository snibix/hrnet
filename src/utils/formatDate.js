// Formatage des dates pour l'affichage
const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString() : "";

export default formatDate;
