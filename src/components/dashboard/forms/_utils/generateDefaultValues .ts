const generateDefaultValues = (type: string, category: string) => {
  if (type === "house" && category === "buy") {
    return {
      //title: { en: "", hy: "", rus: "" },
      ///description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      isContractBased:false,
      details: {
        bathrooms: "1",
        area: "",
        totalAreas: "",
        floor: "",
        floorNumber: "0",
        totalFloors: "1",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      projectType: [], // ✅
      houseType: "house",
      buildingType: "stone",
      renovation: "no renovation",
      status: "draft",
      _id: "",
      isBestOffers: false,
      location: {
        address: {
          en: "",
          hy: "",
          rus: "",
        },
        city: "",
        tCity: {
          en: "",
          hy: "",
          rus: "",
        },
        state: "",
        tState: {
          en: "",
          hy: "",
          rus: "",
        },
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "house" && category === "rent") {
    return {
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      isContractBased:false,
      details: {
        bedrooms: "0",
        bathrooms: "1",
        area: "",
        totalAreas: "",
        floor: "",
        floorNumber: "0",
        totalFloors: "0",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      houseType: "house",
      buildingType: "stone",
      renovation: "no renovation",
      furniture: "available",
      status: "draft",
      projectType: [], // ✅
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "house" && category === "daily rent") {
    return {
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      isContractBased:false,
      price: { amount: "", currency: "USD" },
      details: {
        bedrooms: "0",
        bathrooms: "1",
        area: "",
        totalAreas: "",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      houseType: "house",
      buildingType: "stone",
      renovation: "no renovation",
      status: "draft",
      projectType: [], // ✅
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "land" && category === "buy") {
    return {
      isContractBased:false,
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      details: { area: "", utilities: [] },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      projectType: [],
      significance: [],
      status: "draft",
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "land") {
    return {
      isContractBased:false,
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      details: { area: "", utilities: [] },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      projectType: [],
      significance: [],
      status: "draft",
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "apartment" && category === "buy") {
    return {
      isContractBased:false,
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      isContractBased: false,
      details: {
        bedrooms: "0",
        bathrooms: "1",
        area: "",
        totalArea: "",
        floor: "",
        floorNumber: "0",
        totalFloors: "0",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      projectType: [], // ✅
      buildingType: "stone",
      renovation: "no renovation",
      status: "draft",
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "apartment") {
    return {
      isContractBased:false,
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      details: {
        bedrooms: "0",
        bathrooms: "1",
        area: "",
        floor: "",
        floorNumber: "0",
        totalFloors: "0",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      buildingType: "stone",
      renovation: "no renovation",
      status: "draft",
      projectType: [], // ✅
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
  if (type === "commercial") {
    return {
      isContractBased:false,
      //title: { en: "", hy: "", rus: "" },
      //description: { en: "", hy: "", rus: "" },
      price: { amount: "", currency: "USD" },
      details: {
        bathrooms: "1",
        area: "",
        utilities: [],
        additionalUtilities: [],
      },
      // images: [],
      likes: 0,
      shares: 0,
      views: 0,
      buildingType: "panel",
      projectType: [], // ✅
      renovation: "no renovation",
      significance: [],
      status: "draft",
      _id: "",
      isBestOffers: false,
      location: {
        address: "",
        city: "",
        country: "",
        street: "",
        locationText: "",
        zipCode: "",
      },
    };
  }
};

export default generateDefaultValues;
