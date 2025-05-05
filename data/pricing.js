export const pricingPlans = [
    {
      id: 1,
      title: "Free plan",
      subtitle:"Everything you need to get started.",
      price: "$0/month",
      image: "/pricing/image/a1.svg",
      video:"/pricing/video/v1.mp4",
     
      features: [
        "Manual Expense Tracking",
        "Basic Receipt Scanning",
        "Up to 1 Bank Account Integration",
        "Basic Insights Dashboard",
      ],
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      id: 2,
      title: "Pro plan",
      subtitle:"Powerful extra features for your growing finance.",
      price: "$199/month",
      image: "/pricing/image/a2.svg",
      video:"/pricing/video/v2.mp4",
      
      features: [
        "Unlimited Bank Integrations",
        "Smart Receipt Scanning (AI)",
        "Spending Pattern Detection",
        "Real-Time Alerts & Reports",
      ],
      buttonText: "Upgrade Now",
      isPopular: true,
    },
    {
      id: 3,
      title: "Enterprise Plan",
      subtitle:"Best for large multiple teams that need maximum capabilities.",
      price: "Custom",
      image: "/pricing/image/a3.svg",
      video:"/pricing/video/v3.mp4",
      
      features: [
        "Team Financial Management",
        "Admin Controls & Analytics",
        "Custom Integrations (APIs)",
        "Advanced Reporting Tools",

      ],
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ];
  