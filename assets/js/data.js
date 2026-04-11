const APP_DATA = {
  busCities: [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika",
    "Nyeri", "Meru", "Machakos", "Malindi", "Naivasha", "Kericho",
    "Kakamega", "Garissa", "Isiolo", "Embu", "Nanyuki"
  ],

  flightCities: [
    "Nairobi", "Mogadishu", "Istanbul", "Dubai", "Doha", "London",
    "New York", "Paris", "Amsterdam", "Frankfurt", "Addis Ababa",
    "Johannesburg", "Kuala Lumpur", "Bangkok", "Singapore", "Tokyo",
    "Mumbai", "Cairo", "Riyadh", "Jeddah", "Toronto", "Sydney"
  ],

  trainCities: [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru"
  ],

  routes: {
    bus: [
      {
        id: 11,
        type: "Bus",
        operator: "Easy Coach",
        from: "Nairobi",
        to: "Kisumu",
        departTime: "08:00 AM",
        arrivalTime: "02:30 PM",
        price: 18,
        seats: 31,
        amenities: ["WiFi", "TV"]
      },
      {
        id: 12,
        type: "Bus",
        operator: "Modern Coast",
        from: "Nairobi",
        to: "Mombasa",
        departTime: "06:00 AM",
        arrivalTime: "02:00 PM",
        price: 25,
        seats: 24,
        amenities: ["WiFi", "USB Port", "Reclining Chair"]
      },
      {
        id: 13,
        type: "Bus",
        operator: "Mash Poa",
        from: "Nairobi",
        to: "Nakuru",
        departTime: "07:30 AM",
        arrivalTime: "10:00 AM",
        price: 9,
        seats: 20,
        amenities: ["Water On Board", "USB Port"]
      },
      {
        id: 14,
        type: "Bus",
        operator: "Dreamline",
        from: "Mombasa",
        to: "Nairobi",
        departTime: "09:00 PM",
        arrivalTime: "05:00 AM",
        price: 17,
        seats: 12,
        amenities: ["VIP Seater", "WiFi", "Reclining Chair"]
      }
    ],

    flights: [
      {
        id: 1,
        type: "Flight",
        operator: "Turkish Airlines",
        from: "Nairobi",
        to: "Istanbul",
        departTime: "03:20 AM",
        arrivalTime: "10:40 AM",
        price: 480,
        seats: 18,
        amenities: ["WiFi", "TV", "USB Port"]
      },
      {
        id: 2,
        type: "Flight",
        operator: "Qatar Airways",
        from: "Mogadishu",
        to: "Doha",
        departTime: "11:30 AM",
        arrivalTime: "03:10 PM",
        price: 420,
        seats: 22,
        amenities: ["WiFi", "TV"]
      },
      {
        id: 3,
        type: "Flight",
        operator: "Somali Demo Air",
        from: "Mogadishu",
        to: "Nairobi",
        departTime: "08:00 AM",
        arrivalTime: "10:00 AM",
        price: 220,
        seats: 14,
        amenities: ["USB Port"]
      }
    ],

    train: [
      {
        id: 21,
        type: "Train",
        operator: "SGR Express",
        from: "Nairobi",
        to: "Mombasa",
        departTime: "08:00 AM",
        arrivalTime: "02:00 PM",
        price: 25,
        seats: 55,
        amenities: ["WiFi", "Reclining Chair"]
      },
      {
        id: 22,
        type: "Train",
        operator: "SGR Express",
        from: "Mombasa",
        to: "Nairobi",
        departTime: "03:00 PM",
        arrivalTime: "09:00 PM",
        price: 25,
        seats: 46,
        amenities: ["WiFi"]
      }
    ]
  }
};