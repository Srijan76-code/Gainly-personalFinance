export const defaultCategories = [
    // Income Categories
    {
      id: "salary",
      name: "Salary",
      type: "INCOME",
      color: "bg-green-700",
      icon: "Wallet",
    },
    {
      id: "freelance",
      name: "Freelance",
      type: "INCOME",
      color: "bg-cyan-700",
      icon: "Laptop",
    },
    {
      id: "investments",
      name: "Investments",
      type: "INCOME",
      color: "bg-indigo-700",
      icon: "TrendingUp",
    },
    {
      id: "business",
      name: "Business",
      type: "INCOME",
      color: "bg-pink-700",
      icon: "Building",
    },
    {
      id: "rental",
      name: "Rental",
      type: "INCOME",
      color: "bg-amber-700",
      icon: "Home",
    },
    {
      id: "other-income",
      name: "Other Income",
      type: "INCOME",
      color: "bg-slate-700",
      icon: "Plus",
    },
  
    // Expense Categories
    {
      id: "housing",
      name: "Housing",
      type: "EXPENSE",
      color: "bg-red-700",
      icon: "Home",
      subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
    },
    {
      id: "transportation",
      name: "Transportation",
      type: "EXPENSE",
      color: "bg-orange-700",
      icon: "Car",
      subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
    },
    {
      id: "groceries",
      name: "Groceries",
      type: "EXPENSE",
      color: "bg-lime-700",
      icon: "Shopping",
    },
    {
      id: "utilities",
      name: "Utilities",
      type: "EXPENSE",
      color: "bg-cyan-700",
      icon: "Zap",
      subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
    },
    {
      id: "entertainment",
      name: "Entertainment",
      type: "EXPENSE",
      color: "bg-violet-700",
      icon: "Film",
      subcategories: ["Movies", "Games", "Streaming Services"],
    },
    {
      id: "food",
      name: "Food",
      type: "EXPENSE",
      color: "bg-rose-700",
      icon: "UtensilsCrossed",
    },
    {
      id: "shopping",
      name: "Shopping",
      type: "EXPENSE",
      color: "bg-pink-700",
      icon: "ShoppingBag",
      subcategories: ["Clothing", "Electronics", "Home Goods"],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      type: "EXPENSE",
      color: "bg-teal-700",
      icon: "HeartPulse",
      subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
    },
    {
      id: "education",
      name: "Education",
      type: "EXPENSE",
      color: "bg-indigo-700",
      icon: "GraduationCap",
      subcategories: ["Tuition", "Books", "Courses"],
    },
    {
      id: "personal",
      name: "Personal Care",
      type: "EXPENSE",
      color: "bg-fuchsia-700",
      icon: "Smile",
      subcategories: ["Haircut", "Gym", "Beauty"],
    },
    {
      id: "travel",
      name: "Travel",
      type: "EXPENSE",
      color: "bg-sky-700",
      icon: "Plane",
    },
    {
      id: "insurance",
      name: "Insurance",
      type: "EXPENSE",
      color: "bg-slate-700",
      icon: "Shield",
      subcategories: ["Life", "Home", "Vehicle"],
    },
    {
      id: "gifts",
      name: "Gifts & Donations",
      type: "EXPENSE",
      color: "bg-pink-600",
      icon: "Gift",
    },
    {
      id: "bills",
      name: "Bills & Fees",
      type: "EXPENSE",
      color: "bg-rose-600",
      icon: "Receipt",
      subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
    },
    {
      id: "other-expense",
      name: "Other Expenses",
      type: "EXPENSE",
      color: "bg-slate-600",
      icon: "MoreHorizontal",
    },
  ];
  
  export const categoryColors = defaultCategories.reduce((acc, category) => {
    acc[category.id] = category.color;
    return acc;
  }, {});
  