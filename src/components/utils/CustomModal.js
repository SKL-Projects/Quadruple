import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
function CustomModal({ children, visible, title, footer }) {
   return (
      <Modal
         visible={visible}
         modalTitle={title}
         footer={footer}
         rounded
         hasOverlay
         modalAnimation={
            new SlideAnimation({
               slideFrom: "bottom",
            })
         }>
         <ModalContent children={children} />
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default CustomModal;
