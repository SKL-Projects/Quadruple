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
  Alert,
  ScrollView
} from "react-native";
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Cost_map_coordinates from '../elements/GoogleMap'
import { getAllTravelList } from "../../../lib/api/travelList";

export default function Cost_list_insert({item}) {
  
  const [isLoading,setIsLoading] = useState(true);
  const [cost, setCost] = useState(item.cost);
  const [dayList, setDayList] = useState(['출발 전']);
  const [day, setDay] = useState();
  const [location, setLocation] = useState(item.title);
  const [type, setType] = useState(item.detailType);
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setcoordinate] = useState(item.location);
    
  const images = [
    {label:'home-outline',value:'hotel',text:'숙소'},
    {label:'airplane-outline',value:'airplane',text:'비행'},
    {label:'fast-food-outline',value:'food',text:'식당'},
    {label:'cart-outline',value:'shopping',text:'쇼핑'},
    {label:'camera-outline',value:'attraction',text:'관광'},
    {label:'body-outline',value:'activity',text:'액티비티'},
    {label:'train-outline',value:'train',text:'기차'},
    {label:'subway-outline',value:'subway',text:'지하철'},
    {label:'walk-outline',value:'walking',text:'걷기'},
    {label:'boat-outline',value:'boat',text:'배'},
    {label:'car-outline',value:'car',text:'자동차'},
    {label:'car-sport-outline',value:'taxi',text:'택시'},
    {label:'ellipsis-horizontal-outline',value:'etc',text:'기타'},
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

  useEffect(() => { 
    getInfo();
    console.log(item)
    setDay((item.time.getMonth() + 1)+'월 '+item.time.getDate()+'일')
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>loading...</Text>
      ):(

      
      <ScrollView style={styles.content}>
        <View style={[styles.box,styles.box1]}> 
          <Text style={styles.boxText}>금액</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCost}
            placeholder="금액을 입력하세요"
            value={String(cost)}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.box,styles.box2]}>
          <Text style={styles.boxText}>날짜</Text>
          <Picker
            selectedValue={day}
            style={{ height: 50, width: 150 }}
            onValueChange={(x, i) => setDay(x)}
          >
            <Picker.Item label="날짜 선택" value="" />
            {dayList.map((x,i) =>(
              <Picker.Item label={x} value={x}/>
            ))}
          </Picker>
        </View>
        <View style={[styles.box,styles.box3]}>
          <Text style={styles.boxText}>장소명</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            placeholder="장소명을 입력하세요"
            value={location}
          />
        </View>
        <View style={[styles.box,styles.box4]}>
          <Text style={styles.boxText}>카테고리</Text>
          <View style={styles.icons}>
            {images.map((arr,i) => (
              <TouchableOpacity
                style={[styles.icon,{backgroundColor:type == arr.value ? '#753BBD' : '#ffffff'}]}
                onPress={()=> setType(arr.value)}
              >
                {type == arr.value ? (
                  <Icon name={arr.label} size={30} color="#ffffff"/>
                ) : (
                  <Icon name={arr.label} size={30} color="#753BBD"/>
                )}
                
                <Text style={{color:type == arr.value ? '#ffffff' : '#753BBD'}}>
                  {arr.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.box,styles.box5]}>
          <Text style={styles.boxText}>장소 지정(선택)</Text>
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
                <Cost_map_coordinates setcoordinate={setcoordinate}/>
                <Pressable
                  style={[styles.pressableBtn_hide,styles.pressableBtn_hide1]}
                  onPress={() => (setModalVisible(!modalVisible),setcoordinate(''))}
                >
                  <Text>지도 닫기</Text>
                </Pressable>
                <Pressable
                  style={[styles.pressableBtn_hide,styles.pressableBtn_hide2]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>완료</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={styles.pressableBtn}
            onPress={() => setModalVisible(true)}
          >
            {coordinate ? 
              <Text style={styles.pressableBtnText}>재설정하기</Text> :
              <Text style={styles.pressableBtnText}>지도에서 설정하기</Text> 
            }
            
          </Pressable>
        </View>
        <Text>cost:{cost}{"\n"}day:{day}{"\n"}location:{location}{"\n"}type:{type}{"\n"}coordinate:{coordinate.latitude}</Text>
        <Pressable
          style={styles.pressableBtn}
          onPress={() => console.log('hi')}
        >
            <Text style={styles.pressableBtnText}>저장</Text>
        </Pressable>
      </ScrollView>
      )}
    </View>
   );
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   alignItems: "center",
   justifyContent: "center",
   height: Dimensions.get('window').height-10,
    width:Dimensions.get('window').width,
  },
  content: {
    
  },
  box:{
    
    width:Dimensions.get('window').width,
    padding:10,
  },
  boxText:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:30,
    
  },
  icons: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: "center",
    justifyContent: "center",
    
  },
  icon:{
    alignItems: "center",
    justifyContent: "center",
    width:55,
    height:70,
    borderRadius:10,
  },
  modalView: {
    height: Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    zIndex:2,
  },
  pressableBtn_hide: {
    zIndex:2,
    position:'absolute',
    bottom:30,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  pressableBtn_hide1: {
    left:20
  },
  pressableBtn_hide2: {
    right:20
  },
  pressableBtn:{
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:'#c8c8c8',
    width:150,
  },
  pressableBtnText:{
    textAlign:'center'
  },
});