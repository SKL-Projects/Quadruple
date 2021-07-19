const Images = [
  { image: require("../../../../assets/attraction1.jpg") },
  { image: require("../../../../assets/attraction2.jpg") },
  { image: require("../../../../assets/attraction3.jpg") },
  { image: require("../../../../assets/attraction4.jpg") },
  { image: require("../../../../assets/attraction5.jpg") },
];

export const directions = [
{
  coordinate: {
    latitude: 40.740019,
    longitude: -73.989287,
  },
  startPoint: {
    latitude: 40.731296,
    longitude: -73.993267,
  },
  endPoint: {
    latitude: 40.748743,
    longitude: -73.985307,
  },
  type:"transit",
  index:1
},
{
  coordinate: {
    latitude: 40.758419,
    longitude: -73.987297,
  },
  startPoint: {
    latitude: 40.748743,
    longitude: -73.985307,
  },
  endPoint: {
    latitude: 40.768095,
    longitude: -73.979837,
  },
  type:"transit",
  index:3
},
]
export const markers = [
{
  index:0,
  coordinate: {
    latitude: 40.731296, 
    longitude: -73.993267,
  },
  type:"location",
  title: "숙소",
  description: "This is the best place",
  image: Images[0].image,
  price: 1000,
  reviews: 99,
},
{
  index:1,
  coordinate: {
    latitude: 40.740019,
    longitude: -73.989287,
  },
  startPoint: {
    latitude: 40.731296,
    longitude: -73.993267,
  },
  endPoint: {
    latitude: 40.748743,
    longitude: -73.985307,
  },
  type:"transit",
},
{
  index:2,
  coordinate: {
    latitude: 40.748743,
    longitude: -73.985307,
  },
  type:"location",
  title: "엠파이어 스테이트 빌딩",
  description: "This is the second best place",
  image: Images[1].image,
  price: 12300,
  reviews: 102,
},
{
  index:3,
  coordinate: {
    latitude: 40.758419,
    longitude: -73.982572,
  },
  startPoint: {
    latitude: 40.748743,
    longitude: -73.985307,
  },
  endPoint: {
    latitude: 40.768095,
    longitude: -73.979837,
  },
  type:"transit",
},
{
  index:4,
  coordinate: {
    latitude: 40.768095,
    longitude: -73.970388,
  },
  type:"location",
  title: "센트럴 파크",
  description: "This is the third best place",
  image: Images[2].image,
  price: 10000,
  reviews: 220,
},
{
  index:5,
  coordinate: {
    latitude: 40.734654,
    longitude: -74.011305,
  },
  startPoint: {
    latitude: 40.768095,
    longitude: -73.970388,
  },
  endPoint: {
    latitude: 40.701214,
    longitude: -74.052223,
  },
  type:"transit",
},
{
  index:6,
  coordinate: {
    latitude: 40.701214,
    longitude: -74.052223,
  },
  type:"location",
  title: "자유의 여신상",
  description: "This is the fourth best place",
  image: Images[3].image,
  price: 2000,
  reviews: 48,
},
];