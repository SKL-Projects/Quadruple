import React, { useState, useEffect } from "react";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { markers} from './mapData';

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export default function Cost_map() {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState('');
  const [x, setX] = useState(0);
  const [dis, setDis] = useState([]);
  const [dayCost, setDayCost] = useState(0);

  const mapView = React.createRef();   
  const _scrollView = React.useRef(null);

  let mapAnimation = new Animated.Value(0);
  
  const getLocation = async () => { 
    try {
      setRegion({
        ...markers[0].coordinate,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      })
      
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
    
      const { coordinate } = markers[index];
    
      let pos;
      
      setX(index)
      //animateion 설정
      
      pos = {
        ...coordinate,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
      
      mapView.current.animateToRegion(pos,350)
      setRegion({pos}) 
      
      if(dis[x] == 0)
        setMarkerVisible(1)

      setDayCost(0)
      markers.map((marker) => {
        if(markers[x].day == marker.day) setDayCost(dayCost => dayCost+marker.used_price)
      })
  }

  useEffect(() => {

    if(isLoading)
      getLocation();
    
    setMarkerVisible(0)
    markers.map((marker) => {
      if(markers[x].day == marker.day) setDayCost(dayCost => dayCost+marker.used_price)
    })
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

  const makeComma = (num) => {
    var len, point, str;        
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
    return str;
  }
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.content}>
        <Text>Loading...</Text>
        </View>
      ):(
        <>
          <MapView 
            provider={PROVIDER_GOOGLE} 
            region={region}
            ref={mapView}
            key="Gmap"
            style={styles.map}>
            {markers.map((marker, index) => {
              const scaleStyle = {
                transform: [{scale: interpolations[index].scale,},],
              };
                
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)} style={[{opacity:dis[index]},styles.markerWrap]} >
                  <Animated.View 
                    style={ scaleStyle}
                  >
                    <ImageBackground source={require('../../../../assets/map_marker.png')} resizeMode="contain" style={styles.marker}>
                      <Text style={styles.markerText}>&nbsp;{makeComma(marker.used_price)}&nbsp;</Text>
                    </ImageBackground>
                  </Animated.View >
                </MapView.Marker>
              );
            })}          
          </MapView>
          <View style={styles.scrollHeader}>
            <Text>{markers[x].day}일차</Text>
            <Text>Total : {makeComma(dayCost)}원</Text>
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
            {markers.map((card, index) => (
              <View style={styles.card} key={index}>
                <Text style={styles.edit}>편집</Text>
                <View style={styles.textContent}>
                  <View style={styles.cardtitle}>
                    <Text numberOfLines={1} style={styles.cardtitleText}>{makeComma(card.used_price)}원</Text>
                  </View>
                  <View style={styles.cardsubtitle}>
                    <View style={styles.cardsubtitle1}>
                      <Text numberOfLines={1} style={styles.cardsubtitle1Text}>사용 예정 금액 : {makeComma(card.expected_price)}원</Text> 
                    </View>
                    <View style={styles.cardsubtitle2}>
                      <Text numberOfLines={1} style={styles.cardsubtitle2Text}>{card.title}</Text>
                    </View>
                  </View>
                  
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
  scrollHeader:{
    height:50,
    padding:5,
    backgroundColor:'#ffffff',
    position:"absolute",
    top:75,
    zIndex:2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10,
    borderWidth:1,
    borderColor:'#753BBD'
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  edit:{
    position:"absolute",
    top:10,
    right:10,
    fontSize:15
  },
  textContent: {
    flex: 2,
    padding: 15,
  },
  cardtitle: {
    flex:1,
    justifyContent: "center",
    borderBottomWidth:2,
    borderBottomColor:'#753BBD',
    marginLeft:25,
    paddingBottom:7
  },
  cardsubtitle: {
    flex:2,
    marginLeft:25,
  },
  cardtitleText: {
    fontSize: 35,
    fontWeight:'bold',
    color: "#444",    
  },
  cardsubtitle1: {
    marginTop:7,
  },
  cardsubtitle2: {
    marginTop:25,
  },
  cardsubtitle1Text: {
    fontSize: 15,
    color:'#a4a4a4'
  },
  cardsubtitle2Text: {
    fontSize: 30,
    color: "#753BBD",
    margin:5,
    fontWeight:'bold'
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:100,
    height:80,
  },
  marker: {
    width: 50,
    height: 50,
  },
  markerText:{
    fontSize:8,
    width:50,
    textAlign: "center",
    position:'absolute',
    top:13,
    fontWeight:'bold'
  }
});