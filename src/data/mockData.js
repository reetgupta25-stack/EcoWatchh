export const currentUser = {
  id: "USR001",
  name: "Shivani Sharma",
  email: "shivani@example.com",
  role: "Citizen",
  avatar: "S",
  location: "Baru Sahib, Himachal Pradesh",
};

export const dashboardStats = {
  totalIssues: 248,
  pendingIssues: 42,
  inProgressIssues: 76,
  completedIssues: 130,
};

export const issues = [
  {
    id: "EW-1024",
    title: "Overflowing Dustbin",
    category: "Waste Management",
    icon: "🗑️",
    description:
      "The dustbin near the main road has been overflowing for several days.",
    location: "Baru Sahib Main Road",
    date: "04 Oct 2026",
    status: "Pending",
    priority: "High",
    reportedBy: "Rahul Sharma",
    assignedTo: "Not Assigned",
  },

  {
    id: "EW-1023",
    title: "Water Leakage",
    category: "Water Management",
    icon: "💧",
    description:
      "A water pipeline is leaking continuously and causing water wastage.",
    location: "University Campus",
    date: "03 Oct 2026",
    status: "In Progress",
    priority: "High",
    reportedBy: "Priya Verma",
    assignedTo: "Amit Kumar",
  },

  {
    id: "EW-1022",
    title: "Broken Street Light",
    category: "Public Infrastructure",
    icon: "💡",
    description:
      "The street light near the residential area is not working.",
    location: "Campus Residential Area",
    date: "02 Oct 2026",
    status: "Completed",
    priority: "Medium",
    reportedBy: "Neha Singh",
    assignedTo: "Rohit Kumar",
  },

  {
    id: "EW-1021",
    title: "Garbage Dumping",
    category: "Waste Management",
    icon: "♻️",
    description:
      "Unauthorized garbage dumping has been reported near the community park.",
    location: "Community Park",
    date: "01 Oct 2026",
    status: "Verified",
    priority: "High",
    reportedBy: "Aman Thakur",
    assignedTo: "Vikas Sharma",
  },

  {
    id: "EW-1020",
    title: "Dirty Public Area",
    category: "Cleanliness",
    icon: "🧹",
    description:
      "The public area requires cleaning and proper waste collection.",
    location: "Market Area",
    date: "30 Sep 2026",
    status: "In Progress",
    priority: "Medium",
    reportedBy: "Simran Kaur",
    assignedTo: "Manoj Kumar",
  },

  {
    id: "EW-1019",
    title: "Blocked Drainage",
    category: "Sanitation",
    icon: "🚰",
    description:
      "The drainage system is blocked and needs immediate cleaning.",
    location: "Village Road",
    date: "29 Sep 2026",
    status: "Pending",
    priority: "High",
    reportedBy: "Karan Singh",
    assignedTo: "Not Assigned",
  },

  {
    id: "EW-1018",
    title: "Plastic Waste",
    category: "Waste Management",
    icon: "♻️",
    description:
      "Large amounts of plastic waste have been found around the public area.",
    location: "Near Bus Stop",
    date: "28 Sep 2026",
    status: "Completed",
    priority: "Medium",
    reportedBy: "Anjali Sharma",
    assignedTo: "Deepak Kumar",
  },

  {
    id: "EW-1017",
    title: "Water Supply Issue",
    category: "Water Management",
    icon: "💧",
    description:
      "The local water supply has been disrupted and requires inspection.",
    location: "Hostel Area",
    date: "27 Sep 2026",
    status: "Pending",
    priority: "High",
    reportedBy: "Riya Thakur",
    assignedTo: "Not Assigned",
  },
];

export const categories = [
  {
    id: 1,
    name: "Waste Management",
    icon: "🗑️",
    count: 82,
  },
  {
    id: 2,
    name: "Water Management",
    icon: "💧",
    count: 54,
  },
  {
    id: 3,
    name: "Cleanliness",
    icon: "🧹",
    count: 46,
  },
  {
    id: 4,
    name: "Public Infrastructure",
    icon: "💡",
    count: 32,
  },
  {
    id: 5,
    name: "Sanitation",
    icon: "🚰",
    count: 21,
  },
  {
    id: 6,
    name: "Other",
    icon: "🌱",
    count: 13,
  },
];

export const users = [
  {
    id: "USR001",
    name: "Shivani Sharma",
    email: "shivani@example.com",
    role: "Citizen",
    status: "Active",
  },

  {
    id: "USR002",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Citizen",
    status: "Active",
  },

  {
    id: "USR003",
    name: "Priya Verma",
    email: "priya@example.com",
    role: "Citizen",
    status: "Active",
  },

  {
    id: "USR004",
    name: "Amit Kumar",
    email: "amit@example.com",
    role: "Worker",
    status: "Active",
  },

  {
    id: "USR005",
    name: "Rohit Kumar",
    email: "rohit@example.com",
    role: "Worker",
    status: "Active",
  },

  {
    id: "USR006",
    name: "Vikas Sharma",
    email: "vikas@example.com",
    role: "Worker",
    status: "Active",
  },

  {
    id: "USR007",
    name: "Neha Singh",
    email: "neha@example.com",
    role: "Supervisor",
    status: "Active",
  },

  {
    id: "USR008",
    name: "Admin User",
    email: "admin@ecowatch.com",
    role: "Admin",
    status: "Active",
  },
];

export const workers = [
  {
    id: "WRK001",
    name: "Amit Kumar",
    phone: "+91 98765 43210",
    area: "Baru Sahib",
    assignedTasks: 8,
    completedTasks: 24,
    status: "Available",
  },

  {
    id: "WRK002",
    name: "Rohit Kumar",
    phone: "+91 98765 12345",
    area: "Campus Area",
    assignedTasks: 5,
    completedTasks: 19,
    status: "Busy",
  },

  {
    id: "WRK003",
    name: "Vikas Sharma",
    phone: "+91 98765 67890",
    area: "Market Area",
    assignedTasks: 6,
    completedTasks: 21,
    status: "Available",
  },

  {
    id: "WRK004",
    name: "Manoj Kumar",
    phone: "+91 98765 11111",
    area: "Village Area",
    assignedTasks: 4,
    completedTasks: 16,
    status: "Busy",
  },
];

export const tasks = [
  {
    id: "TSK001",
    issueId: "EW-1023",
    title: "Fix Water Leakage",
    worker: "Amit Kumar",
    location: "University Campus",
    priority: "High",
    status: "In Progress",
    assignedDate: "03 Oct 2026",
    deadline: "05 Oct 2026",
  },

  {
    id: "TSK002",
    issueId: "EW-1022",
    title: "Repair Street Light",
    worker: "Rohit Kumar",
    location: "Campus Residential Area",
    priority: "Medium",
    status: "Completed",
    assignedDate: "02 Oct 2026",
    deadline: "04 Oct 2026",
  },

  {
    id: "TSK003",
    issueId: "EW-1021",
    title: "Remove Garbage Dump",
    worker: "Vikas Sharma",
    location: "Community Park",
    priority: "High",
    status: "Completed",
    assignedDate: "01 Oct 2026",
    deadline: "03 Oct 2026",
  },

  {
    id: "TSK004",
    issueId: "EW-1020",
    title: "Clean Public Area",
    worker: "Manoj Kumar",
    location: "Market Area",
    priority: "Medium",
    status: "In Progress",
    assignedDate: "30 Sep 2026",
    deadline: "05 Oct 2026",
  },
];

export const recentActivities = [
  {
    id: 1,
    user: "Rahul Sharma",
    action: "reported a new issue",
    issue: "Overflowing Dustbin",
    time: "10 minutes ago",
  },

  {
    id: 2,
    user: "Amit Kumar",
    action: "updated task status",
    issue: "Water Leakage",
    time: "35 minutes ago",
  },

  {
    id: 3,
    user: "Admin User",
    action: "assigned an issue",
    issue: "Blocked Drainage",
    time: "1 hour ago",
  },

  {
    id: 4,
    user: "Rohit Kumar",
    action: "completed a task",
    issue: "Broken Street Light",
    time: "2 hours ago",
  },
];

export const monthlyIssues = [
  {
    month: "May",
    reported: 32,
    resolved: 21,
  },
  {
    month: "Jun",
    reported: 45,
    resolved: 34,
  },
  {
    month: "Jul",
    reported: 38,
    resolved: 29,
  },
  {
    month: "Aug",
    reported: 51,
    resolved: 40,
  },
  {
    month: "Sep",
    reported: 48,
    resolved: 43,
  },
  {
    month: "Oct",
    reported: 34,
    resolved: 27,
  },
];