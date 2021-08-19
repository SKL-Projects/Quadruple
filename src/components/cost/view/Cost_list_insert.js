import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView
} from "react-native";
import { COST } from "../../../lib/types";
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from "react-native-uuid";
import Cost_map_coordinates from '../elements/Googlemap';
import SelectDate from '../elements/SelectDate';
import { getAllTravelList } from "../../../lib/api/travelList";
import { addTravelBlock } from "../../../lib/api/travelBlock";

export default function Cost_list_insert({parent_setModalVisible}) {
  
  const [isLoading,setIsLoading] = useState(false);
  const [cost, setCost] = useState('');
  const [title, setTitle] = useState('');
  const [dayList, setDayList] = useState(['출발 전']);
  const [day, setDay] = useState(new Date());
  const [memo,setMemo] = useState('');
  const [type, setType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setcoordinate] = useState('');  
    
  const images = [
    {label:'home-outline',value:'hotel',text:'숙소'},
    {label:'airplane-outline',value:'airline',text:'비행'},
    {label:'restaurant-outline',value:'food',text:'식당'},
    {label:'cart-outline',value:'shopping',text:'쇼핑'},
    {label:'camera-outline',value:'attraction',text:'관광'},
    {label:'body-outline',value:'activity',text:'액티비티'},
    {label:'train-outline',value:'train',text:'기차'},
    {label:'subway-outline',value:'subway',text:'지하철'},
    {label:'walk-outline',value:'walking',text:'걷기'},
    {label:'boat-outline',value:'boat',text:'배'},
    {label:'car-outline',value:'car',text:'자동차'},
    {label:'car-sport-outline',value:'taxi',text:'택시'},
    {label:'ellipsis-horizontal-outline',value:'etc_waypoint',text:'기타'},
  ]

  const getInfo = async () => {
    const info = await getAllTravelList("aT1JPMs3GXg7SrkRE1C6KZPJupu1");

    let startDate = info[0].info.departTime.toDate()
    let endDate = info[0].info.arrivalTime.toDate()
    while(startDate <= endDate){
      const day = startDate.toISOString().split("T")[0]
      setDayList(dayList => [...dayList,(day[5]=='0' ? day.substring(6,7) : day.substring(5,7)) +'월 '+day.substring(8,10)+'일']);
		  startDate.setDate(startDate.getDate() + 1);
    }
    setIsLoading(false)
 }

 const setInfo = async () => {
  let obj = {
    id: uuid.v4(), // uuid로
    createdWhere: COST,
    title: title,
    time: day,
    memo:memo,
    detailType: type,
    cost: parseInt(cost.replace(/,/g, "")),
    location: { latitude: coordinate.latitude, longitude: coordinate.longitude },
  };

  //파이어베이스 추가 + 로딩
  await addTravelBlock(
    "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
    "1627379541738",
    obj
  );
  parent_setModalVisible(false);
 }

  useEffect(() => { 
    getInfo();    
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>loading...</Text>
      ):(
        <ScrollView style={styles.content}>
          <View style={[styles.box, styles.box1]}>
            <Text style={styles.boxText}>금액</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCost}
              placeholder="금액을 입력하세요"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.box, styles.box2]}>
            <Text style={styles.boxText}>제목</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              placeholder="제목(장소명)을 입력하세요"
              value={title}
            />
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text style={styles.boxText}>날짜</Text>
              <SelectDate
                date={day}
                setDate={setDay}
                startDate={new Date('2021-11-07')}
                endDate={new Date('2021-11-28')}
              />
          </View>
          
          <View style={[styles.box, styles.box4]}>
            <Text style={styles.boxText}>메모(선택)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMemo}
              placeholder="메모를 입력하세요"
              value={memo}
            />
          </View>
          <View style={[styles.box, styles.box5]}>
            <Text style={styles.boxText}>카테고리</Text>
            <View style={styles.icons}>
              {images.map((arr, i) => (
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        type == arr.value ? '#753BBD' : '#ffffff',
                    },
                  ]}
                  onPress={() => setType(arr.value)}>
                  {type == arr.value ? (
                    <Icon name={arr.label} size={30} color="#ffffff" />
                  ) : (
                    <Icon name={arr.label} size={30} color="#753BBD" />
                  )}

                  <Text
                    style={{
                      color: type == arr.value ? '#ffffff' : '#753BBD',
                      fontFamily: 'Font',
                    }}>
                    {arr.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[styles.box, styles.box6]}>
            <Text style={styles.boxText}>장소 지정(선택)</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View>
                <View style={styles.modalView}>
                  <Cost_map_coordinates setcoordinate={setcoordinate} />
                  <TouchableOpacity
                    style={[
                      styles.pressableBtn_hide,
                      styles.pressableBtn_hide1,
                    ]}
                    onPress={() => (
                      setModalVisible(!modalVisible), setcoordinate('')
                    )}>
                    <Text>지도 닫기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.pressableBtn_hide,
                      styles.pressableBtn_hide2,
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>완료</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.pressableBtn}
              onPress={() => setModalVisible(true)}>
              {coordinate ? (
                <Text style={styles.pressableBtnText}>재설정하기</Text>
              ) : (
                <Text style={styles.pressableBtnText}>지도에서 설정하기</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.box, styles.box7]}>
            <TouchableOpacity
              style={styles.pressableBtn}
              onPress={() => setInfo()}>
              <Text style={styles.pressableBtnText}>저장</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  content: {},
  box: {
    width: Dimensions.get('window').width,
    padding: 10,
  },
  box7: {
    paddingBottom: 50,
  },
  boxText: {
    fontSize: 20,
    fontFamily: 'Font',
    marginBottom: 30,
  },
  input:{
    marginLeft: "5%",
    fontFamily: 'Font',
  },
  icons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 6,
    height: 70,
    borderRadius: 10,
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 2,
  },
  pressableBtn_hide: {
    zIndex: 2,
    position: 'absolute',
    bottom: 30,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  pressableBtn_hide1: {
    left: 20,
  },
  pressableBtn_hide2: {
    right: 20,
  },
  pressableBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c8c8c8',
    width: 150,
  },
  pressableBtnText: {
    textAlign: 'center',
  },
});