import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import {
   updateDisplayName,
   updateProfileAvatar,
} from "../../../lib/api/profile";
import PwResetModal from "../../auth/view/PwResetModal";
import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";
import PwUpdate from "../view/PwUpdate";
import RemoveUserModal from "../view/RemoveUserModal";

function ProfileContainer({ navigation }) {
   const { user } = useSelector(({ auth }) => auth);
   const [loading, setLoading] = useState({ photo: false, name: false });
   const [onEdit, setOnEdit] = useState({});
   const [editUserInfo, setEditUserInfo] = useState({});
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      const reload = async () => {
         await user.reload();
      };
      reload();
   }, []);

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
         setLoading((prev) => ({ ...prev, photo: true }));
         if (!result.cancelled) {
            await updateProfileAvatar(user.uid, result.uri, user);
         }
      } catch (err) {
         console.log(err);
      }
      setLoading((prev) => ({ ...prev, photo: false }));
   };
   const changeDisplayName = async () => {
      setOnEdit({});
      setLoading((prev) => ({ ...prev, name: true }));
      if (user.displayName !== editUserInfo.name) {
         try {
            const res = await updateDisplayName(user, editUserInfo.name);
            console.log(res);
         } catch (err) {
            console.log(err);
         }
      }
      setLoading((prev) => ({ ...prev, name: false }));
   };
   const onPressOnEdit = (name, value) => {
      if (Object.keys(onEdit).length === 0) {
         setOnEdit({ [name]: true });
         setEditUserInfo({ [name]: value });
      }
   };
   const onChange = (name, value) => {
      setEditUserInfo((prev) => ({ ...prev, [name]: value }));
   };
   const changePassword = async () => {
      setModalVisible(true);
   };
   return (
      <>
         <Profile
            user={user}
            changeAvatar={changeAvatar}
            loading={loading}
            changeDisplayName={changeDisplayName}
            onPressOnEdit={onPressOnEdit}
            onEdit={onEdit}
            onChange={onChange}
            editUserInfo={editUserInfo}
            changePassword={changePassword}
            setRemoveUserVisible={setRemoveUserVisible}
         />
         <PwUpdate visible={modalVisible} setVisible={setModalVisible} />
         <RemoveUserModal
            visible={removeUserVisible}
            setVisible={setRemoveUserVisible}
            navigation={navigation}
         />
      </>
   );
}

export default ProfileContainer;
