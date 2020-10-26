export const colors = {
  backgroundColor: "#f3f3f4",
  sidebarColor: "#2d424f",
  primaryGreenColor: "#0eb799",
  greColor1: "#9aa4a7",
  greyColor2: "#c1c4c4",
  secondaryColor: "#eca658",
  primaryRedColor: "#db5a62",
  documentsCategoryColor: "#db5a62",
  workCategoryColor: "#0eb799",
  advertisingCategoryColor: "#07c6c9",
  socialCategoryColor: "#0f83c9",
  clientsCategoryColor: "#eca658",
  defaultCategoryColor: "#f9d6aa",
  white: "#FFFFFF",
};

export const labels = [
  "Family",
  "Work",
  "Home",
  "Children",
  "Holidays",
  "Music",
  "Photography",
  "Film",
];

export const categories = [
  {
    name: "Work",
    indicatorColor: colors.workCategoryColor,
  },
  {
    name: "Documents",
    indicatorColor: colors.documentsCategoryColor,
  },
  {
    name: "Social",
    indicatorColor: colors.socialCategoryColor,
  },
  {
    name: "Advertising",
    indicatorColor: colors.advertisingCategoryColor,
  },
  {
    name: "Clients",
    indicatorColor: colors.clientsCategoryColor,
  },
];

export const folders = [
  {
    name: "Inbox",
    icon: "inbox",
    hasSecondaryInfo: true,
    secondaryInfoColor: colors.secondaryColor,
  },
  {
    name: "Send Mail",
    icon: "mail-outline",
    hasSecondaryInfo: false,
    secondaryInfoColor: colors.secondaryColor,
  },
  {
    name: "Important",
    icon: "star",
    hasSecondaryInfo: true,
    secondaryInfoColor: colors.secondaryColor,
  },
  {
    name: "Drafts",
    icon: "drafts",
    hasSecondaryInfo: true,
    secondaryInfoColor: colors.primaryRedColor,
  },
  {
    name: "Trash",
    icon: "delete",
    hasSecondaryInfo: false,
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const userLoginDetails = [
  {
    username: "john@doe.com",
    password: "doeJohn",
  },
  {
    username: "anna@smith.com",
    password: "smithAnna",
  },
];

export const userDetails = {
  "john@doe.com": {
    firstName: "John",
    lastName: "Doe",
    designation: "Art Director",
    email: "john@doe.com",
  },
  "anna@smith.com": {
    firstName: "Anna",
    lastName: "Smith",
    designation: "Art Intern",
    email: "anna@smith.com",
  },
};

export const userSentMailsList = {
  "john@doe.com": [
    {
      subject: "Lorem Ipsum",
      time: new Date(),
      from: "Anna Smith",
      to:'john@doe.com',
      fromEmail: "anna@smith.com",
      isSelected: false,
      category: "Work",
      hasAttachment: true,
      isRead: true,
      body: "This is Lorem Ipsum email",
    },
    {
      subject: "Lorem Ipsum 2",
      time: new Date(),
      from: "John Doe",
      to:'john@doe.com',
      fromEmail: "anna@smith.com",
      isSelected: true,
      category: "Clients",
      hasAttachment: false,
      isRead: false,
      body: "This is continuation to the Lorem Ipsum2 email",
    },
    {
      subject: "Contrary to popular belief",
      time: new Date(),
      from: "Monica Ryther",
      fromEmail: "anna@smith.com",
      isSelected: true,
      to:'john@doe.com',
      hasAttachment: false,
      isRead: true,
      body: "This is continuation to the Contrary to popular belief emails ",
    },
  ],
  "anna@smith.com": [
    {
      subject: "Many Desktops publishing pacakges",
      time: new Date(2020, 4, 3, 3, 20, 30),
      from: "John Doe",
      to:'anna@smith.com',
      fromEmail: "john@doe.com",
      isSelected: false,
      category: "Documents",
      hasAttachment: true,
      isRead: true,
      body: "this is continuation tot he manydesktops publishing packages",
    },
    {
      subject: "Lorem Ipsum 2",
      time: new Date(),
      from: "John Doe",
      to:'anna@smith.com',
      fromEmail: "john@doe.com",
      isSelected: true,
      category: "Clients",
      hasAttachment: false,
      isRead: false,
      body:
        "This is in continuation to the intial mail with mock data for the body",
    },
    {
      subject: "Contrary to popular belief",
      time: new Date(),
      from: "Monica Ryther",
      fromEmail: "monica@ryther.com",
      isSelected: true,
      to:'anna@smith.com',
      hasAttachment: false,
      isRead: true,
      body: " Poplular belief email ",
    },
  ],
};

export const userInitialMailsList = {
  "john@doe.com": [
    {
      subject: "Lorem Ipsum",
      time: new Date(),
      from: "Anna Smith",
      fromEmail: "anna@smith.com",
      to: 'john@doe.com',
      body: 'test line',
      isSelected: false,
      category: "Work",
      hasAttachment: true,
      isRead: true,
    },
    {
      subject: "Lorem Ipsum 2",
      time: new Date(),
      from: "John Doe",
      fromEmail: "anna@smith.com",
      to: 'john@doe.com',
      body: 'test line',
      isSelected: true,
      category: "Clients",
      hasAttachment: false,
      isRead: false,
    },
    {
      subject: "Contrary to popular belief",
      time: new Date(),
      from: "Monica Ryther",
      fromEmail: "anna@smith.com",
      to: 'john@doe.com',
      body: 'test line',
      isSelected: true,
      hasAttachment: false,
      isRead: true,
    },
    {
      subject: "Many Desktops publishing pacakges",
      time: new Date(2020, 4, 3, 3, 20, 30),
      from: "John Doe",
      fromEmail: "john@doe.com",
      to: 'john@doe.com',
      body: 'test line',
      isSelected: false,
      category: "Documents",
      hasAttachment: true,
      isRead: true,
    },
  ],
  "anna@smith.com": [
    {
      subject: "Many Desktops publishing pacakges",
      time: new Date(2020, 4, 3, 3, 20, 30),
      from: "John Doe",
      fromEmail: "john@doe.com",
      to: 'anna@smith.com',
      body: 'test line',
      isSelected: false,
      category: "Documents",
      hasAttachment: true,
      isRead: true,
    },
    {
      subject: "Lorem Ipsum 2",
      time: new Date(),
      from: "John Doe",
      fromEmail: "john@doe.com",
      to: 'anna@smith.com',
      body: 'test line',
      isSelected: true,
      category: "Clients",
      hasAttachment: false,
      isRead: false,
    },
    {
      subject: "Contrary to popular belief",
      time: new Date(),
      from: "Monica Ryther",
      fromEmail: "monica@ryther.com",
      to: 'anna@smith.com',
      body: 'test line',
      isSelected: true,
      hasAttachment: false,
      isRead: true,
    },
  ],
};
