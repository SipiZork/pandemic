const AllCities = {
  "Atlanta": {
    name: "Atlanta",
    positionX: 330,
    positionY: 350,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: true,
    lines: false,
    linesTo: null,
    from: ["Washington", "Chicago", "Miami"],
    path: ["Washington", "Chicago"],
    outbreaked: false,
  },
  "Chicago": {
    name: "Chicago",
    positionX: 290,
    positionY: 280,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Montreal", "Atlanta", "San Francisco", "Los Angeles", "Mexikóváros"],
    path: ["Montreal"],
    outbreaked: false,
  },
  "Washington": {
    name: "Washington",
    positionX: 440,
    positionY: 350,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [450, 350],
    from: ["Atlanta", "Miami", "New York", "Montreal"],
    path: ["Montreal", "New York"],
    outbreaked: false,
  },
  "Miami": {
    name: "Miami",
    positionX: 355,
    positionY: 435,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [405, 433],
    from: ["Atlanta", "Mexikóváros", "Washington", "Bogota"],
    path: ["Atlanta", "Bogota", "Washington"],
    outbreaked: false,
  },
  "Mexikóváros": {
    name: "Mexikóváros",
    positionX: 230,
    positionY: 460,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Los Angeles", "Miami", "Chicago", "Bogota", "Lima"],
    path: ["Chicago", "Miami", "Bogota", "Lima"],
    outbreaked: false,
  },
  "Los Angeles": {
    name: "Los Angeles",
    positionX: 120,
    positionY: 420,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [211, 375],
    from: ["Mexikóváros", "San Francisco", "Chicago", "Sydney"],
    path: ["Mexikóváros", "Chicago"],
    outbreaked: false,
  },
  "Bogota": {
    name: "Bogota",
    positionX: 355,
    positionY: 560,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Mexikóváros", "Miami", "Sao Paulo", "Buenos Aires", "Lima"],
    path: ["Lima", "Buenos Aires", "Sao Paulo"],
    outbreaked: false,
  },
  "Lima": {
    name: "Lima",
    positionX: 290,
    positionY: 680,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [407, 660],
    from: ["Mexikóváros", "Bogota", "Santiago"],
    path: ["Santiago"],
    outbreaked: false,
  },
  "Santiago": {
    name: "Santiago",
    positionX: 340,
    positionY: 850,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [466, 827],
    from: ["Lima"],
    path: null,
    outbreaked: false,
  },
  "Sao Paulo": {
    name: "Sao Paulo",
    positionX: 545,
    positionY: 715,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Bogota", "Lagos", "Madrid", "Buenos Aires"],
    path: ["Madrid", "Lagos", "Buenos Aires"],
    outbreaked: false,
  },
  "Buenos Aires": {
    name: "Buenos Aires",
    positionX: 495,
    positionY: 790,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Bogota", "Sao Paulo"],
    path: null,
    outbreaked: false,
  },
  "Madrid": {
    name: "Madrid",
    positionX: 700,
    positionY: 325,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [830, 337],
    from: ["New York", "London", "Párizs", "Algír", "Sao Paulo"],
    path: ["New York", "London", "Párizs", "Algír"],
    outbreaked: false,
  },
  "London": {
    name: "London",
    positionX: 715,
    positionY: 230,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [862, 262],
    from: ["New York", "Madrid", "Essen", "Párizs"],
    path: ["New York", "Essen", "Párizs"],
    outbreaked: false,
  },
  "New York": {
    name: "New York",
    positionX: 520,
    positionY: 270,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [488, 328],
    from: ["Montreal", "Washington", "London", "Madrid"],
    path: null,
    outbreaked: false,
  },
  "Montreal": {
    name: "Montreal",
    positionX: 410,
    positionY: 270,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Washington", "Chicago", "New York"],
    path: ["New York"],
    outbreaked: false,
  },
  "San Francisco": {
    name: "San Francisco",
    positionX: 130,
    positionY: 320,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Chicago", "Los Angeles", "Tokió", "Manila"],
    path: ["Chicago", "Los Angeles"],
    outbreaked: false,
  },
  "Párizs": {
    name: "Párizs",
    positionX: 795,
    positionY: 280,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Madrid", "London", "Essen", "Algír", "Milánó"],
    path: ["Essen", "Milánó", "Algír"],
    outbreaked: false,
  },
  "Essen": {
    name: "Essen",
    positionX: 830,
    positionY: 215,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [890,270],
    from: ["London", "Párizs", "Szentpétervár", "Milánó"],
    path: ["Milánó", "Szentpétervár"],
    outbreaked: false,
  },
  "Szentpétervár": {
    name: "Szentpétervár",
    positionX: 945,
    positionY: 200,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Moszkva", "Essen", "Isztambul"],
    path: ["Moszkva", "Isztambul"],
    outbreaked: false,
  },
  "Milánó": {
    name: "Milánó",
    positionX: 880,
    positionY: 265,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "blue",
    base: false,
    lines: true,
    linesTo: [915,305],
    from: ["Párizs", "Essen", "Isztambul"],
    path: ["Isztambul"],
    outbreaked: false,
  },
  "Lagos": {
    name: "Lagos",
    positionX: 775,
    positionY: 545,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Sao Paulo", "Kinshasa", "Kartúm"],
    path: ["Kartúm", "Kinshasa"],
    outbreaked: false,
  },
  "Kinshasa": {
    name: "Kinshasa",
    positionX: 855,
    positionY: 635,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [925,610],
    from: ["Lagos", "Johannesburg", "Kartúm"],
    path: ["Johannesburg", "Kartúm"],
    outbreaked: false,
  },
  "Johannesburg": {
    name: "Johannesburg",
    positionX: 920,
    positionY: 775,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Kinshasa", "Kartúm"],
    path: ["Kartúm"],
    outbreaked: false,
  },
  "Kartúm": {
    name: "Kartúm",
    positionX: 930,
    positionY: 525,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "yellow",
    base: false,
    lines: true,
    linesTo: [1010,500],
    from: ["Kinshasa", "Lagos", "Johannesburg", "Kairó"],
    path: ["Kairó"],
    outbreaked: false,
  },
  "Algír": {
    name: "Algír",
    positionX: 810,
    positionY: 380,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [892,359],
    from: ["Madrid", "Párizs", "Isztambul", "Kairó"],
    path: ["Isztambul", "Kairó"],
    outbreaked: false,
  },
  "Isztambul": {
    name: "Isztambul",
    positionX: 928,
    positionY: 320,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Algír", "Milánó", "Szentpétervár", "Moszkva", "Bagdad", "Kairó"],
    path: ["Kairó", "Moszkva", "Bagdad"],
    outbreaked: false,
  },
  "Moszkva": {
    name: "Moszkva",
    positionX: 1020,
    positionY: 270,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1030,265],
    from: ["Teherán", "Isztambul", "Szentpétervár"],
    path: ["Teherán"],
    outbreaked: false,
  },
  "Kairó": {
    name: "Kairó",
    positionX: 905,
    positionY: 405,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1003,398],
    from: ["Algír", "Isztambul", "Bagdad", "Rijád", "Kartúm"],
    path: ["Rijád", "Bagdad"],
    outbreaked: false,
  },
  "Bagdad": {
    name: "Bagdad",
    positionX: 1010,
    positionY: 370,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Isztambul", "Teherán", "Karacsi", "Rijád", "Kairó"],
    path: ["Rijád", "Teherán", "Karacsi"],
    outbreaked: false,
  },
  "Teherán": {
    name: "Teherán",
    positionX: 1090,
    positionY: 300,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1125,363],
    from: ["Moszkva", "Bagdad", "Karacsi", "Delhi"],
    path: ["Karacsi", "Delhi"],
    outbreaked: false,
  },
  "Delhi": {
    name: "Delhi",
    positionX: 1230,
    positionY: 375,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1295,430],
    from: ["Teherán", "Numbai", "Karacsi", "Csennai", "Kalkutta"],
    path: ["Numbai", "Csennai", "Kalkutta"],
    outbreaked: false,
  },
  "Karacsi": {
    name: "Karacsi",
    positionX: 1140,
    positionY: 410,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1247,450],
    from: ["Teherán", "Numbai", "Delhi", "Rijád", "Bagdad"],
    path: ["Numbai", "Delhi", "Rijád"],
    outbreaked: false,
  },
  "Rijád": {
    name: "Rijád",
    positionX: 1030,
    positionY: 465,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1105,445],
    from: ["Kairó", "Bagdad", "Karacsi"],
    path: null,
    outbreaked: false,
  },
  "Numbai": {
    name: "Numbai",
    positionX: 1165,
    positionY: 495,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1268,477],
    from: ["Delhi", "Csennai", "Karacsi"],
    path: ["Csennai"],
    outbreaked: false,
  },
  "Kalkutta": {
    name: "Kalkutta",
    positionX: 1305,
    positionY: 405,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: true,
    linesTo: [1343,455],
    from: ["Delhi", "Csennai", "Bangkok", "Hong Kong"],
    path: ["Csennai", "Bangkok", "Hong Kong"],
    outbreaked: false,
  },
  "Csennai": {
    name: "Csennai",
    positionX: 1240,
    positionY: 545,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "black",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Delhi", "Kalkutta", "Numbai", "Bangkok", "Jakarta"],
    path: ["Bangkok", "Jakarta"],
    outbreaked: false,
  },
  "Bangkok": {
    name: "Bangkok",
    positionX: 1345,
    positionY: 500,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Kalkutta", "Csennai", "Hong Kong", "Ho Si Minh Város", "Jakarta"],
    path: ["Hong Kong", "Ho Si Minh Város", "Jakarta"],
    outbreaked: false,
  },
  "Hong Kong": {
    name: "Hong Kong",
    positionX: 1405,
    positionY: 450,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Kalkutta", "Sanghaj", "Taipei", "Ho Si Minh Város", "Manila", "Bangkok"],
    path: ["Sanghaj", "Ho Si Minh Város", "Taipei", "Manila"],
    outbreaked: false,
  },
  "Jakarta": {
    name: "Jakarta",
    positionX: 1330,
    positionY: 630,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1467,638],
    from: ["Csennai", "Ho Si Minh Város", "Sydney", "Bangkok"],
    path: ["Sydney", "Ho Si Minh Város"],
    outbreaked: false,
  },
  "Sanghaj": {
    name: "Sanghaj",
    positionX: 1380,
    positionY: 355,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1515,380],
    from: ["Peking", "Taipei", "Hong Kong", "Szöul"],
    path: ["Peking", "Tokió", "Szöul", "Taipei"],
    outbreaked: false,
  },
  "Peking": {
    name: "Peking",
    positionX: 1370,
    positionY: 280,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1485,345],
    from: ["Sanghaj", "Szöul"],
    path: ["Szöul"],
    outbreaked: false,
  },
  "Szöul": {
    name: "Szöul",
    positionX: 1460,
    positionY: 280,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1540,357],
    from: ["Sanghaj", "Peking", "Tokió"],
    path: ["Tokió"],
    outbreaked: false,
  },
  "Tokió": {
    name: "Tokió",
    positionX: 1560,
    positionY: 310,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1605,373],
    from: ["Szöul", "Sanghaj", "Oszaka", "San Francisco"],
    path: ["Oszaka"],
    outbreaked: false,
  },
  "Oszaka": {
    name: "Oszaka",
    positionX: 1580,
    positionY: 395,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1585,380],
    from: ["Tokió", "Taipei"],
    path: ["Taipei"],
    outbreaked: false,
  },
  "Taipei": {
    name: "Taipei",
    positionX: 1500,
    positionY: 435,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1537,438],
    from: ["Sanghaj", "Hong Kong", "Oszaka", "Manila"],
    path: ["Manila"],
    outbreaked: false,
  },
  "Manila": {
    name: "Manila",
    positionX: 1555,
    positionY: 575,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1545,495],
    from: ["Ho Si Minh Város", "Hong Kong", "Taipei", "Sydney", "San Francisco"],
    path: ["Sydney", "Ho Si Minh Város"],
    outbreaked: false,
  },
  "Ho Si Minh Város": {
    name: "Ho Si Minh Város",
    positionX: 1425,
    positionY: 580,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: true,
    linesTo: [1460,535],
    from: ["Bangkok", "Hong Kong", "Jakarta", "Manila"],
    path: null,
    outbreaked: false,
  },
  "Sydney": {
    name: "Sydney",
    positionX: 1575,
    positionY: 800,
    infection: 0,
    infections: {
      1: "null",
      2: "null",
      3: "null",
    },
    color: "red",
    base: false,
    lines: false,
    linesTo: null,
    from: ["Manila", "Jakarta", "Manila", "Los Angeles"],
    path: null,
    outbreaked: false,
  },
}

export default AllCities
