import React, { useState, useEffect, useRef } from "react";
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import AutoComplete from "./AutoComplete";
import MapViewDirections from 'react-native-maps-directions';
import { fbConfig } from "../../../../env";
import { markers} from './mapData';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const GOOGLE_API_KEY = fbConfig.googleMapKey; // never save your real api key in a snack!


export default function GoogleMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [data,setData] = useState(markers)

  const mapView = React.createRef();   
  const _scrollView = React.useRef(null);

  const coordinates = [
    {
      latitude: 40.748488, 
      longitude: -73.984525, 
    },
    {
      latitude: 40.221101,
      longitude: -74.755597,
    },
  ];

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const getLocation = async () => { //위치 가져오기
    try {
      await Location.requestForegroundPermissionsAsync(); //퍼미션 받고
      const { coords } = await Location.getCurrentPositionAsync();     //내위치 가져와서 coords에
       
      setRegion({
        //latitude: coords.latitude,
        //longitude: coords.longitude,
        latitude: 22.6293867,
        longitude: 88.4424486,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      })
      setIsLoading(false);
    } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
    }
  }

 
    
  const animateMap = async() => {
    mapView.current.animateToRegion(region,1000)
    //setIsSearch(false)
    //console.log(region)
  }   

  useEffect(() => {
    if(isLoading)
      getLocation();

    if(isSearch)
      animateMap(); 

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= data.length) {
        index = data.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex != index ) {
          mapIndex = index;
          const { coordinate } = data[index];
          console.log(data[index])
          mapView.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            },
            350
          );
        }
      }, 10);
    });
  }, [isSearch]);

  const interpolations = data.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const onAnimated = () => {
   console.log()
  }

   return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.content}>
            <Text>Loading...</Text>
          </View>
        ):(
          <>
            <AutoComplete setRegion={setRegion} setIsSearch={setIsSearch}/>
              <MapView 
                provider={PROVIDER_GOOGLE} 
                region={region}
                ref={mapView}
                style={styles.map}>
                {isSearch ? (
                  <Marker 
                    coordinate={{ latitude: region.latitude, longitude: region.longitude, }} 
                    image={require('../../../../assets/map_marker.png')}
                  >
                  </Marker>
                ):(<></>)}
                 <MapViewDirections
                    lineDashPattern={[0]}
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_API_KEY} // insert your API Key here
                    strokeColor="#111111"
                    mode="TRANSIT"
                    onReady={result => {
                      console.log(`Distance: ${result.distance} km`)
                      console.log(`Duration: ${result.duration} min.`)
                    }}
                    onError={(errorMessage) => {
                      // console.log('GOT AN ERROR');
                    }}
                  />
                  <Marker 
                    coordinate={coordinates[0]} 
                    image={require('../../../../assets/map_marker.png')} 
                    //title="start point" 
                    //description="장소명"
                  >
                    <Callout tooltip>
                      <View style={styles.bubble}>
                        <View>
                          <Text style={styles.name}>Start Point</Text>
                        </View>
                      </View>
                    </Callout>
                  </Marker>
                  <Marker coordinate={coordinates[1]} image={require('../../../../assets/map_marker.png')} title="end point" description="장소명"/> 
                  
                  {data.map((marker, index) => {
                    const scaleStyle = {
                      transform: [
                        {
                          scale: interpolations[index].scale,
                        },
                      ],
                    };
                    return (
                      <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
                        <Animated.View style={[styles.markerWrap]}>
                          <Animated.Image
                            source={require('../../../../assets/map_marker.png')}
                            style={[styles.marker, scaleStyle]}
                            resizeMode="cover"
                          />
                        </Animated.View>
                      </MapView.Marker>
                    );
                  })}

              </MapView>
              <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                  top: 0,
                  left: SPACING_FOR_CARD_INSET,
                  bottom: 0,
                  right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                  paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          x: mapAnimation,
                        }
                      },
                    },
                  ],
                  {useNativeDriver: true}
                )}
              >
                {data.map((marker, index) =>(
                  <View style={styles.card} key={index}>
                    <Image 
                      source={marker.image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                    </View>
                  </View>
                ))}
              </Animated.ScrollView>
            </>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
    position:'absolute',
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
   },
   map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex:1,
   },
   bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
   },
    name: {
    fontSize: 16,
    marginBottom: 5,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    zIndex:999,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
