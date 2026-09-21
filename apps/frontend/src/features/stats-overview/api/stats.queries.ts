// Dummy query keys and fetching logic
export const statsKeys = {
  all: ['stats'] as const,
  newCustomers: () => [...statsKeys.all, 'new-customers'] as const,
};

export const fetchNewCustomersData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dummy data representing Mon-Sun with Website, Ads, Referral
  return [
    { day: 'Mon', website: 5, ads: 8, referral: 2 },
    { day: 'Tue', website: 7, ads: 6, referral: 3 },
    { day: 'Wed', website: 6, ads: 9, referral: 4 },
    { day: 'Thu', website: 6, ads: 13, referral: 4 },
    { day: 'Fri', website: 8, ads: 15, referral: 5 },
    { day: 'Sat', website: 12, ads: 18, referral: 7 },
    { day: 'Sun', website: 10, ads: 14, referral: 6 },
  ];
};
