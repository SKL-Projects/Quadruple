import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Cost_list from './Cost_list'
import Cost_map from './Cost_map'

const { width } = Dimensions.get("window");

export default function Cost() {
  const [isLoading, setIsLoading] = useState(true);
  const [p, setP] = useState(false);

  useEffect(() => {
    setIsLoading(false)
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      ):(
        <>
          {p ? (
            <Cost_list/>
          ) : (
            <Cost_map/>
          )}
          <View style={styles.selector}>
            <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(false)}>
              <Text>지도로 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selector_btn} onPress={()=>setP(true)}>
              <Text>리스트로 보기</Text>
            </TouchableOpacity>
          </View>
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
    
  },
  selector_btn:{
    flex: 1,
    alignItems: "center",
  },
});