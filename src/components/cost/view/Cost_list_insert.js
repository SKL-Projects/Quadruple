import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Picker,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Cost_map_coordinates from './Cost_map_coordinates'

export default function Cost_list_insert(props ) {
  
  const [cost, setCost] = useState("");
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setcoordinate] = useState("");

  useEffect(() => { 
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={[styles.box,styles.box1]}> 
          <Text style={styles.boxText}>금액</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCost}
            placeholder="금액을 입력하세요"
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
            <Picker.Item label="출발 전" value="0" />
            <Picker.Item label="day1" value="1" />
            <Picker.Item label="day2" value="2" />
          </Picker>
        </View>
        <View style={[styles.box,styles.box3]}>
          <Text style={styles.boxText}>장소명</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            placeholder="장소명을 입력하세요"
          />
        </View>
        <View style={[styles.box,styles.box4]}>
          <Text style={styles.boxText}>카테고리</Text>
          <View style={styles.icons}>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('rm')}
            >
              <Icon name='home-outline' size={30} color="violet"/>
              <Text>숙소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('mv')}
            >
              <Icon name='airplane-outline' size={30} color="violet"/>
              <Text>이동</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('fd')}
            >
              <Icon name='fast-food-outline' size={30} color="violet"/>
              <Text>식당</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('sp')}
            >
              <Icon name='gift-outline' size={30} color="violet"/>
              <Text>쇼핑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('tr')}
            >
              <Icon name='camera-outline' size={30} color="violet"/>
              <Text>관광</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={()=> setType('etc')}
            >
              <Icon name='ellipsis-horizontal-outline' size={30} color="violet"/>
              <Text>기타</Text>
            </TouchableOpacity>
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
              <Text style={styles.pressableBtnText}>설정 완료</Text> :
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
    bottom:5,    
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
    
  },
  icon:{
    flex:1,
    alignItems: "center",
    justifyContent: "center",
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