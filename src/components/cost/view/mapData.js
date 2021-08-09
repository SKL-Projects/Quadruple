const Images = [
  { image: require("../../../../assets/attraction1.jpg") },
  { image: require("../../../../assets/attraction2.jpg") },
  { image: require("../../../../assets/attraction3.jpg") },
  { image: require("../../../../assets/attraction4.jpg") },
  { image: require("../../../../assets/attraction5.jpg") },
];
export const expected_price= 300000;

export const markers = [
  {
    index:0,
    day:1,
    coordinate: {
      latitude: 40.731296, 
      longitude: -73.993267,
    },
    type:"rm",
    title: "숙소",
    description: "This is the best place",
    image: Images[0].image,
    used_price: 189000,
    reviews: 99,
  },
  {
    index:1,
    day:1,
    coordinate: {
      latitude: 40.748743,
      longitude: -73.985307,
    },
    type:"fd",
    title: "엠파이어 스테이트 빌딩",
    description: "This is the second best place",
    image: Images[1].image,
    used_price: 12300,
    reviews: 102,
  },
  
  {
    index:2,
    day:1,
    coordinate: {
      latitude: 40.768095,
      longitude: -73.970388,
    },
    type:"sp",
    title: "센트럴 파크",
    description: "This is the third best place",
    image: Images[2].image,
    expected_price: 7000,
    used_price: 9000,
    reviews: 220,
  },
  {
    index:3,
    day:1,
    coordinate: {
      latitude: 40.701214,
      longitude: -74.052223,
    },
    type:"tr",
    title: "자유의 여신상",
    description: "This is the fourth best place",
    image: Images[3].image,
    used_price: 2000,
    reviews: 48,
  },
  {
    index:4,
    day:2,
    coordinate: {
      latitude: 40.721214,
      longitude: -74.062223,
    },
    type:"etc",
    title: "2일",
    description: "This is the fourth best place",
    image: Images[3].image,
    used_price: 7000,
    reviews: 48,
  },
  {
    index:5,
    day:2,
    coordinate: {
      latitude: 40.731214,
      longitude: -74.042223,
    },
    type:"etc",
    title: "2일차",
    description: "This is the fourth best place",
    image: Images[3].image,
    used_price: 8000,
    reviews: 48,
  },
];