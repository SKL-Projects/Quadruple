import React, { useState } from "react";
import RemoveUserModal from "../view/RemoveUserModal";
import { useDispatch } from "react-redux";
import { signout } from "../../../modules/auth";
import { deleteProfile } from "../../../lib/api/profile";

function RemoveUserModalContainer({ visible, setVisible, navigation, user }) {
   const [success, setSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const removeUserFunc = async () => {
      const uid = user.uid;
      setLoading(true);
      try {
         await user.delete();
      } catch (err) {
         console.log(err);
      }
      setSuccess(true);
      dispatch(signout());

      try {
         await deleteProfile(uid);
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };
   const afterRemove = () => {
      navigation.navigate("Home");
   };
   return (
      <RemoveUserModal
         visible={visible}
         setVisible={setVisible}
         removeUserFunc={removeUserFunc}
         afterRemove={afterRemove}
         success={success}
         loading={loading}
      />
   );
}

export default RemoveUserModalContainer;
