import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Modal, TextInput  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { editTravelBlock } from "../../../lib/api/travelBlock";
import { Snackbar } from 'react-native-paper';
import GoogleMap from '../elements/Googlemap';
import { Alert } from "react-native";

export default function Cost_list({fb_plans,fb_infos}) {

  const [cost, setCost] = useState(0);
  const [snackVisible, setSnackVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCoordinate, setCurrentCoordinate] = useState();
  
  const images = {
    start:'arrow-forward-outline' ,
    end:'arrow-back-outline' ,
    hotel:'home-outline' ,
    airline:'airplane-outline' ,
    food:'restaurant-outline' ,
    shopping:'cart-outline' ,
    attraction:'camera-outline', 
    activity:'body-outline', 
    train:'train-outline',
    subway:'subway-outline',
    walking:'walk-outline',
    boat:'boat-outline',
    car:'car-outline',
    taxi:'car-sport-outline',
    etc_waypoint:'ellipsis-horizontal-outline' ,
  }
  
  const editCost = () =>{ 
    if(isEditable){
      setIsEditable(false)
    }  
    else
      setIsEditable(true)

  }

  const makeAmountCost = () =>{
    setCost(0)
    {fb_plans.map((data) => {
      setCost((cost) => cost+data.cost)      
    })}
  }

  const isModalVisible = (loca) =>{
    loca ? (
      setModalVisible(true),
      setCurrentCoordinate(loca)
    ) : (
      Alert.alert('','좌표가 없는 위치입니다')
    ) 
  }

  const submitCost = async (item,c,i) => {
    if(c.length >0){
      const intCost = parseInt(c)
      await editTravelBlock(
        "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
        1627379541738,
        item,
        { ...item, cost:intCost }
        
      );
      fb_plans[i].cost = intCost
      makeAmountCost()
      setSnackVisible(true)
    }
 };

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
    makeAmountCost();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView  style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>'{fb_infos.title}'의 소비</Text>
            <View style={styles.itemEdit}>                
              <TouchableOpacity onPress={() => editCost()}>
                <Text style={styles.itemDayText2}>{isEditable ? '확인' : '편집'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerCost}>
            <View style={styles.headerCost1}>
              <Text style={styles.headerCostText1_1}>{makeComma(cost)}원</Text>
              {cost>fb_infos.expectedCost ? (
                <Text style={[styles.headerCostText1_2,styles.text_blue]}>{makeComma(Math.abs(cost-fb_infos.expectedCost))}원 초과</Text>
              ) : (
                <Text style={[styles.headerCostText1_2,styles.text_red]}>{makeComma(Math.abs(cost-fb_infos.expectedCost))}원 남음</Text>
              )}
            </View>
            <Text style={styles.headerCostText2}>사용 예정 금액 : {makeComma(fb_infos.expectedCost)}원</Text>
          </View>
        </View>
        <View style={styles.line}><Text>&nbsp;</Text></View>
        <View style={styles.list}>
          {fb_plans.map((item,i)=>(
            <>
              {(item.day == 0 || fb_plans[i]?.time.getDate() != fb_plans[i-1]?.time.getDate()) && (
                <View style={styles.itemDay} key={'day'+i}>
                  <Text style={styles.itemDayText}>{item.time.getMonth() + 1}월 {item.time.getDate()}일</Text>
                </View>  
              )}
              <TouchableOpacity
                style={styles.pressableBtn}
                key={i.toString()}
                style={styles.item}
                onPress={() => isModalVisible(item.location)}
              >       
                <View style={styles.item_left}>
                  <Icon name={images[item.detailType]} size={35} color="#753BBD" style={styles.icon}/>
                </View>
                <View style={styles.item_right}>
                  {!isEditable && (
                    <View style={styles.item1}>
                      <Text style={styles.item1Text}>{item.title}</Text>
                    </View>
                  )}
                  <View style={styles.item2}>
                    {isEditable ?
                      <TextInput 
                        placeholder={makeComma(item.cost)}
                        style={[styles.item2Text,styles.item2InputTextType1,
                        ]}
                        editable={isEditable}
                        onEndEditing={event => submitCost(item,event.nativeEvent.text,i)}
                        keyboardType="numeric"
                      /> :
                      <TextInput 
                        value={makeComma(item.cost)}
                        style={[styles.item2Text,styles.item2InputTextType2
                        ]}
                        editable={isEditable}
                      />
                    }
                    <Text style={styles.item2Text}>&nbsp;원</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </ScrollView >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View style={styles.modalView}>
            <GoogleMap currentCoordinate={currentCoordinate}/>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={500}
      >
        수정되었습니다
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  content: {
    height: Dimensions.get('window').height - 90,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#e9e9e9',
  },
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  itemEdit: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  headerTitleText: {
    fontSize: 25,
    fontFamily: 'Font',
  },
  headerCost: {
    flex: 2,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerCost1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCostText1_1: {
    fontSize: 30,
    flex: 1.5,
    fontFamily: 'Font',
  },
  headerCostText1_2: {
    fontSize: 20,
    fontFamily: 'Font',
    flex: 1,
  },
  text_red: {
    color: 'red',
  },
  text_blue: {
    color: 'blue',
  },
  headerCostText2: {
    fontSize: 15,
    color: '#753BBD',
    fontFamily: 'Font',
  },
  line: {
    flex: 0.1,
    backgroundColor: '#e9e9e9',
  },
  list: {
    flex: 3,
    paddingTop: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  itemDay: {
    padding: 10,
  },
  itemDayText: {
    fontSize: 20,
    fontFamily: 'Font',
  },
  itemDayText2: {
    fontSize: 18,
    fontFamily: 'Font',
    textAlign: 'right',
    color: '#a0a0a0',
  },
  item: {
    height: 85,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  item_left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_right: {
    flex: 9,
  },
  icon: {
    position: 'relative',
    right: 5,
  },
  item1: {
    flex: 1.3,
    padding: 5,
    height:25,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  item1Text: {
    fontFamily: 'Font',
    fontSize: 20,
  },
  item2: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item2Text: {
    fontFamily: 'Font',
    fontSize: 15,
  },
  item2InputTextType1: {
    width: 80,
    height: 40,
    paddingLeft: 5,
    borderWidth: 1,
    color: '#bdbdbd',
  },
  item2InputTextType2: {
    borderWidth: 0,
    color: '#000000',
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 2,
  },
});