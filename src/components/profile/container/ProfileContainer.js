import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import { updateProfileAvatar } from "../../../lib/api/profile";
import { setProfileAction } from "../../../modules/profile";
import { Modal } from "react-native";
import { ActivityIndicator } from "react-native";

function ProfileContainer() {
   const profile = useSelector(({ profile }) => profile);
   const auth = useSelector(({ auth }) => auth);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);

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
            await updateProfileAvatar(auth.uid, result.uri, profile).then(
               (data) => dispatch(setProfileAction({ avatar: data }))
            );
         }
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };

   return (
      <>
         <Profile
            profile={profile}
            auth={auth}
            changeAvatar={changeAvatar}
            loading={loading}
         />
      </>
   );
}

export default ProfileContainer;
