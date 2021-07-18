const Images = [
    { image: require("../../../../assets/attraction1.jpg") },
    { image: require("../../../../assets/attraction2.jpg") },
    { image: require("../../../../assets/attraction3.jpg") },
    { image: require("../../../../assets/attraction4.jpg") },
    { image: require("../../../../assets/attraction5.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4354486,
      },
      title: "Amazing Place",
      description: "This is the best place",
      image: Images[0].image,
      price: 1000,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4377279,
      },
      title: "Second Amazing Place",
      description: "This is the second best place",
      image: Images[1].image,
      price: 12300,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
      title: "Third Amazing Place",
      description: "This is the third best place",
      image: Images[2].image,
      price: 10000,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 22.6341137,
        longitude: 88.4497463,
      },
      title: "Fourth Amazing Place",
      description: "This is the fourth best place",
      image: Images[3].image,
      price: 2000,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: 22.6292757,
        longitude: 88.444781,
      },
      title: "Fifth Amazing Place",
      description: "This is the fifth best place",
      image: Images[4].image,
      price: 3000,
      reviews: 178,
    },
];