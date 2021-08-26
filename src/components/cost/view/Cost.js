import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";

import Cost_list from './Cost_list'
import Cost_map from './Cost_map'
import Cost_list_insert from './Cost_list_insert'

import { useFonts } from 'expo-font';
import { FAB } from "react-native-elements";

export default function Cost({
  navigation,
  plans,
  region,
  infos,
  setRefresh
  }){
  const [isLoading, setIsLoading] = useState(true);
  const [p, setP] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    Font: require('../../../../assets/fonts/Font.ttf'),
  });

  useEffect(() => {
    setIsLoading(false)         
  }, []);

  if(!loaded)
    return null
  else
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.content}>
            <Text>Loading...</Text>
          </View>
        ):(
          <>
            {p ? (
              <Cost_list
                navigation={navigation}
                fb_plans={plans}
                fb_infos={infos}
                fb_setRefresh={setRefresh}
              />
            ) : (
              <Cost_map               
                fb_region={region}              
                fb_plans={plans}
                fb_infos={infos}
              />
            )}
            <View style={styles.selector}>
              <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(false)}>
                <Text style={styles.selectorText}>지도로 보기</Text>
              </TouchableOpacity>
              <View style={styles.line}></View>
              <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(true)}>
                <Text style={styles.selectorText}>리스트로 보기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fabView}>
              <FAB
                visible={true}
                raised
                icon={{
                    name:   "plus",
                    type: "font-awesome",
                }}
                buttonStyle={styles.fabButton}
                onPress={() => setModalVisible(true)}
              />
            </View>
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
                  <Cost_list_insert parent_setModalVisible={setModalVisible} fb_setRefresh={setRefresh}/>
                </View>
              </View>
            </Modal>
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
    borderWidth:1,
    borderColor:'#753BBD'
  },
  selectorText:{
    fontFamily: 'Font',
    fontSize:14
  },
  line:{
    width:1,
    height:40,
    backgroundColor:'#753BBD'
  },
  selector_btn:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width:99,
    height:38,
  },
  fabView: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
 },
 fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
 },
 modalView: {
  height: Dimensions.get('window').height,
  width:Dimensions.get('window').width,
  zIndex:2,
  backgroundColor:'#ffffff'
},
});