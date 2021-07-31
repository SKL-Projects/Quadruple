import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity  } from 'react-native';
import {expected_price} from './mapData';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cost_list({navigation,fb_plans}) {

  const [cost, setCost] = useState(0);
  
  const images = {
    hotel:'home-outline' ,
    airplane:'airplane-outline' ,
    food:'fast-food-outline' ,
    shopping:'cart-outline' ,
    attraction:'camera-outline', 
    activity:'body-outline', 
    train:'train-outline',
    subway:'subway-outline',
    walking:'walk-outline',
    boat:'boat-outline',
    car:'car-outline',
    taxi:'car-sport-outline',
    etc:'ellipsis-horizontal-outline' ,
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

  useEffect(() => {
    {fb_plans.map((data) => {
      setCost((cost) => cost+data.cost)      
    })}
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView  style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>'여행 제목'의 소비</Text>
          </View>
          <View style={styles.headerCost}>
            <View style={styles.headerCost1}>
              <Text style={styles.headerCostText1_1}>{makeComma(cost)}원</Text>
              {cost>expected_price ? (
                <Text style={[styles.headerCostText1_2,styles.text_blue]}>{makeComma(Math.abs(cost-expected_price))}원 초과</Text>
              ) : (
                <Text style={[styles.headerCostText1_2,styles.text_red]}>{makeComma(Math.abs(cost-expected_price))}원 남음</Text>
              )}
            </View>
            <Text style={styles.headerCostText2}>사용 예정 금액 : {makeComma(expected_price)}원</Text>
          </View>
        </View>
        <View style={styles.line}><Text>&nbsp;</Text></View>
        <View style={styles.list}>
          {fb_plans.map((item,i)=>(
            <>
              {item.day == 0 || fb_plans[i]?.time.getDate() != fb_plans[i-1]?.time.getDate() ? (
                <View style={styles.itemDay} key={'day'+i}>
                  <Text style={styles.itemDayText}>{item.time.getMonth() + 1}월 {item.time.getDate()}일</Text>
                </View>  
              ) : (
                <></>
              )}
              <TouchableOpacity style={styles.item} key={i} onPress={() => navigation.navigate("Cost_insert")}>
                <View style={styles.item_left}>
                  <Icon name={images[item.detailType]} size={30} color="#753BBD" style={styles.icon}/>
                </View>
                <View style={styles.item_right}>
                  <View style={styles.item1}>
                    <Text>{item.title}</Text>
                  </View>
                  <View style={styles.item2}>
                    <Text style={styles.item2Text}>{makeComma(item.cost)}원</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ))}
          
        </View>
      </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   alignItems: "center",
   justifyContent: "center",
  },
  content: {
    height: Dimensions.get('window').height-90,
    width:Dimensions.get('window').width,
    position:"absolute",
    bottom:5
  },
  header:{
    flex:1,
    padding:10,
    
  },
  headerTitle:{
    flex:1,
  },
  headerTitleText:{
    fontSize:25,
    fontWeight:'bold',
  },
  headerCost:{
    flex:2,
    marginLeft:10,
    paddingTop:5,
    paddingBottom:5,
  },
  headerCost1:{
    flexDirection: 'row',
  },
  headerCostText1_1:{
    fontSize:30,
    fontWeight:'bold',
    flex:1.5,
  },
  headerCostText1_2:{
    fontSize:20,
    fontWeight:'bold',
    flex:1,
  },
  text_red:{
    color:'red'
  },
  text_blue:{
    color:'blue'
  },
  headerCostText2:{
    fontSize:15,
    color:'#753BBD',
  },
  line:{
    flex:0.1,
    backgroundColor:"#c8c8c8"
  },
  list:{
    flex:3,
    paddingTop:20,
    padding:10
  },
  itemDay:{
    padding: 10,
  },
  itemDayText:{
    fontSize: 20,
    fontWeight:'bold',
  },
  item:{
    height:60,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:10,
    flexDirection: 'row',
  },
  item_left:{
    flex:1,
    alignItems: "center",
   justifyContent: "center",
  },
  item_right:{
    flex:9
  },
  icon:{
    position:"relative",
    top:5
  },
  item1: {
    flex:1,
    padding: 5,
    fontSize: 18,
    textAlign:'left',
    fontWeight:'bold'
  },
  item2: {
    flex:1,
    padding: 5,
    fontSize: 15,
  },
  item2Text:{
    fontWeight:'bold'
  },
});
