import React, { useState, useEffect, useRef } from "react";
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { markers} from './mapData';
import Test from './test'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export default function GoogleMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState('');
  const [x, setX] = useState(0);
  const [p, setP] = useState(false);
  const [dis, setDis] = useState([]);

  const mapView = React.createRef();   
  const _scrollView = React.useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  
  const getLocation = async () => { //위치 가져오기
    try {
      await Location.requestForegroundPermissionsAsync(); //퍼미션 받고
      const { coords } = await Location.getCurrentPositionAsync();     //내위치 가져와서 coords에
       
      setRegion({
        ...markers[0].coordinate,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      })
      //setDirectionData( data.filter((x) => x.type=='transit') )
      setIsLoading(false);
    } catch (error) {
        alert("Can't find you.", "So sad");
        console.log(error)
    }
  }

  const setMarkerVisible = (bool) =>{
    if(bool)
      setDis([])
    {markers.map((marker) => {
      let isVisibie = (markers[x].day == marker.day ? 1 : 0)
      setDis(dis => [...dis,isVisibie])
    })};
  }

  const scrollAnimate = (value) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      
      if (index >= markers.length) 
        index = markers.length - 1;
      if (index <= 0) 
        index = 0;
    
      mapIndex = index;
      
      const { coordinate } = markers[index];
      let pos;
      
      setX(index)
      //animateion 설정
      
      pos = {
        ...coordinate,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
      
      mapView.current.animateToRegion(pos,350)
      setRegion({pos}) 
      
      if(dis[x] == 0)
        setMarkerVisible(1)
  }

  useEffect(() => {
    //scrollAnimate();
    
    if(isLoading)
      getLocation();
    
    setMarkerVisible(0)
  }, []);

  const interpolations = markers.map((x, index) => {
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      ):(
        <>
          {p ? (
            <Test/>
          ) : (
            <MapView 
              provider={PROVIDER_GOOGLE} 
              region={region}
              ref={mapView}
              key="Gmap"
              style={styles.map}>
                {markers.filter((x)=>x.type=='location').map((marker, index) => {
                  const scaleStyle = {
                    transform: [
                      {
                        scale: interpolations[index].scale,
                      },
                    ],
                  };
                  
                  return (
                    <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)} style={{opacity:dis[index]}} >
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                          source={require('../../../../assets/map_marker.png')}
                          style={[styles.marker, scaleStyle]}
                          resizeMode="cover"
                        />
                      </Animated.View>
                      <View style={styles.price}>
                        <Text>&nbsp;&#8361;{marker.price}&nbsp;</Text>
                      </View>
                    </MapView.Marker>
                  );
                })}          
            </MapView>
          )}
          <View style={styles.selector}>
            <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(false)}>
              <Text>지도로 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(true)}>
              <Text>리스트로 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollHeader}>
            <Text>{markers[x].day}일차</Text>
          </View>
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
            onScroll={(e)=>{
              scrollAnimate(e.nativeEvent.contentOffset.x);
              mapAnimation.setValue(e.nativeEvent.contentOffset.x);
            }}
          >
            {markers.filter((x)=>x.type=='location').map((card, index) =>(
              <View style={styles.card} key={index}>
                <Image 
                  source={card.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{card.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>{card.description}</Text>
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

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    zIndex:999,
  },
  price:{
    backgroundColor:"#ffffff",
    borderRadius:10,
  },
  selector:{
    width:200,
    height:40,
    backgroundColor:'#ffffff',
    position:"absolute",
    top:25,
    zIndex:2,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius:10,
    
  },
  selector_btn:{
    flex: 1,
    alignItems: "center",
  },
  scrollHeader:{
    width:50,
    height:50,
    backgroundColor:'#ffffff',
    position:"absolute",
    top:75,
    zIndex:2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10,
    
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