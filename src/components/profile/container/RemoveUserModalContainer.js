import React, { useState } from "react";
import RemoveUserModal from "../view/RemoveUserModal";
import { useDispatch } from "react-redux";
import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";

function RemoveUserModalContainer({ visible, setVisible, navigation }) {
   const [success, setSuccess] = useState(false);
   const dispatch = useDispatch();

   const removeUser = async () => {
      try {
         await fbAuth.currentUser.delete();
         setSuccess(true);
      } catch (err) {
         console.log(err.code);
      }
   };
   const afterRemove = () => {
      dispatch(signout());
      navigation.navigate("Home");
   };
   return (
      <RemoveUserModal
         visible={visible}
         setVisible={setVisible}
         removeUser={removeUser}
         afterRemove={afterRemove}
         success={success}
      />
   );
}

export default RemoveUserModalContainer;
