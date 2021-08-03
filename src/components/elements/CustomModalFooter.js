import React from "react";
import { ModalFooter, ModalButton } from "react-native-modals";

function CustomModalFooter({ buttons }) {
   return (
      <ModalFooter>
         {buttons.map((item, key) => (
            <ModalButton key={`modal_button_${key}`} {...item} />
         ))}
      </ModalFooter>
   );
}

export default CustomModalFooter;
