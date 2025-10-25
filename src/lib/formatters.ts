// Swedish number and date formatting utilities

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/,/g, ' ') + ' kr';
};

export const formatDate = (date: string | Date, format: string = "dd MMM yyyy"): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === "yyyy-MM-dd") {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Default: dd MMM yyyy (Swedish format)
  const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatDateShort = (date: string | Date, format: string = "dd MMM yyyy"): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === "yyyy-MM-dd") {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Default: dd MMM (Swedish format)
  const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  return `${day} ${month}`;
};

export const getMonthName = (monthIndex: number): string => {
  const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  return months[monthIndex];
};
