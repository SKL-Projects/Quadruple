import React, { useEffect, useState } from "react";
import ReauthenticateModal from "../view/ReauthenticateModal";

function ReauthenticateModalContainer({
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
}) {
   const [success, setSuccess] = useState(false);

   const reauthenticate = () => {};

   const onClose = () => {
      setReauthVisible(false);
   };

   return (
      <ReauthenticateModal
         visible={reauthVisible}
         success={success}
         reauthenticate={reauthenticate}
         onClose={onClose}
      />
   );
}

export default ReauthenticateModalContainer;
