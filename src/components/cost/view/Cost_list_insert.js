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
  Alert
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Cost_map_coordinate from './Cost_map_coordinate'
import {Picker} from '@react-native-picker/picker';

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
      <View style={styles.content}>
        <View style={styles.box1}> 
          <Text>금액</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCost}
            placeholder="금액을 입력하세요"
          />
        </View>
        <View style={styles.box2}>
          <Text>날짜*</Text>
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
        <View style={styles.box3}>
          <Text>장소명*</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            placeholder="장소명을 입력하세요"
          />
        </View>
        <View style={styles.box4}>
          <Text>카테고리*</Text>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('rm')}
            >
              <Icon name='home-outline' size={30} color="violet"/>
              <Text>숙소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('mv')}
            >
              <Icon name='airplane-outline' size={30} color="violet"/>
              <Text>이동</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('fd')}
            >
              <Icon name='fast-food-outline' size={30} color="violet"/>
              <Text>식당</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('sp')}
            >
              <Icon name='gift-outline' size={30} color="violet"/>
              <Text>쇼핑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('tr')}
            >
              <Icon name='camera-outline' size={30} color="violet"/>
              <Text>관광</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> setType('etc')}
            >
              <Icon name='ellipsis-horizontal-outline' size={30} color="violet"/>
              <Text>기타</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box5}>
          <Text>장소 지정</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.modalView}>
                <Cost_map_coordinate setcoordinate={setcoordinate}/>
                <Pressable
                  style={styles.pressableBtn_hide}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={styles.pressableBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text>Show Modal</Text>
          </Pressable>
        </View>
        <Text>{cost},{day},{location},{type}</Text>
      </View>
      
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
  btns: {
    flexDirection: 'row',
  },
  modalView: {
    height: Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    zIndex:2,
  },
  pressableBtn_hide: {
    zIndex:2,
    position:'absolute',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  pressableBtn:{
    borderRadius: 20,
    padding: 10,
    elevation: 2
  }
});