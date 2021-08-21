import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import {
   updateDisplayName,
   updateProfileAvatar,
} from "../../../lib/api/profile";
import PwUpdateContainer from "./PwUpdateContainer";
import ReauthenticateModalContainer from "./ReauthenticateModalContainer";
import RemoveUserModalContainer from "./RemoveUserModalContainer";
import { Overlay } from "react-native-elements";
import LottieView from "lottie-react-native";

function ProfileContainer({ navigation }) {
   const { user } = useSelector(({ auth }) => auth);
   const [loading, setLoading] = useState(false);
   const [onEdit, setOnEdit] = useState({});
   const [editUserInfo, setEditUserInfo] = useState({});
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const [reauthenticated, setReauthenticated] = useState(false);
   const [reauthVisible, setReauthVisible] = useState(false);
   const [errMsg, setErrMsg] = useState({ name: "" });

   const changeAvatar = async () => {
      try {
         let res = await ImagePicker.getMediaLibraryPermissionsAsync();
         if (!res.granted) {
            res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
            if (!res.grated) {
               return;
            }
         }
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
         });
         setLoading(true);
         if (!result.cancelled) {
            await updateProfileAvatar(user.uid, result.uri, user);
         }
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };

   const changeDisplayName = async () => {
      setLoading(true);
      if (user.displayName !== editUserInfo.name) {
         try {
            await updateDisplayName(user, editUserInfo.name);
            setOnEdit({});
         } catch (err) {
            setErrMsg((prev) => ({
               ...prev,
               name: "변경 중에 오류가 발생했습니다. 다시 시도해주세요.",
            }));
         }
      } else {
         setOnEdit({});
      }
      setLoading(false);
   };

   const onPressOnEdit = (name, value) => {
      if (Object.keys(onEdit).length === 0) {
         setOnEdit({ [name]: true });
         setEditUserInfo({ [name]: value });
      }
   };
   const onChange = (name, value) => {
      if (!errMsg[name]) {
         setErrMsg((prev) => ({ ...prev, [name]: "" }));
      }
      setEditUserInfo((prev) => ({ ...prev, [name]: value }));
   };
   const showChangePassword = async () => {
      setModalVisible(true);
      setReauthVisible(true);
   };
   const showRemoveUser = async () => {
      setRemoveUserVisible(true);
      setReauthVisible(true);
   };
   return (
      <>
         <Profile
            user={user}
            changeAvatar={changeAvatar}
            changeDisplayName={changeDisplayName}
            onPressOnEdit={onPressOnEdit}
            onEdit={onEdit}
            onChange={onChange}
            editUserInfo={editUserInfo}
            showChangePassword={showChangePassword}
            showRemoveUser={showRemoveUser}
            errMsg={errMsg}
         />
         {(modalVisible || removeUserVisible) && !reauthenticated ? (
            <ReauthenticateModalContainer
               reauthVisible={reauthVisible}
               setReauthVisible={setReauthVisible}
               setReauthenticated={setReauthenticated}
               setLoading={setLoading}
            />
         ) : (
            <>
               <PwUpdateContainer
                  visible={modalVisible}
                  setVisible={setModalVisible}
                  setLoading={setLoading}
               />
               <RemoveUserModalContainer
                  visible={removeUserVisible}
                  setVisible={setRemoveUserVisible}
                  navigation={navigation}
                  user={user}
                  setLoading={setLoading}
               />
            </>
         )}

         <Overlay
            isVisible={loading}
            overlayStyle={{
               padding: 0,
               elevation: 0,
               backgroundColor: "transparent",
            }}>
            <LottieView
               style={{
                  width: 100,
                  height: 100,
               }}
               autoPlay
               source={require("../../../lib/styles/lottie/loading-circle.json")}
            />
         </Overlay>
      </>
   );
}

export default ProfileContainer;
