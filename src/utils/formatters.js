export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const calculateUrgency = (bestBeforeDate) => {
  if (!bestBeforeDate) return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  const now = new Date();
  const deadline = new Date(bestBeforeDate);
  const diffHours = (deadline - now) / (1000 * 60 * 60);

  if (diffHours < 0) {
    return { label: 'Expired / Ineligible', color: 'bg-red-100 text-red-800' };
  } else if (diffHours <= 6) {
    return { label: 'Urgent (< 6h)', color: 'bg-red-100 text-red-800 font-semibold animate-pulse' };
  } else if (diffHours <= 24) {
    return { label: 'Deadline Approaching', color: 'bg-amber-100 text-amber-800' };
  } else {
    return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  }
};
