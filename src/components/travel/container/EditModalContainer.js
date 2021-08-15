import React, { useCallback, useState } from "react";
import { editTravelBlock } from "../../../lib/api/travelBlock";
import { TRANSIT } from "../../../lib/types";
import EditModal from "../view/EditModal";

//세부타입, 메모, 제목만 수정가능하게
function EditModalContainer({
   visible,
   setVisible,
   editElement,
   setRefresh,
   setLoading,
}) {
   const [title, setTitle] = useState(editElement.title);
   const [detailType, setDetailType] = useState(editElement.detailType);
   const [memo, setMemo] = useState(editElement.memo);
   const [errMsg, setErrMsg] = useState("");

   const close = useCallback(() => {
      setVisible(false);
   }, []);
   const onChangeTitle = useCallback(
      (v) => {
         if (errMsg) {
            setErrMsg("");
         }
         setTitle(v);
      },
      [errMsg]
   );
   const onChangeMemo = useCallback((v) => {
      setMemo(v);
   }, []);
   const editSubmit = async () => {
      if (title.length === 0) {
         setErrMsg("최소 한글자를 적어주세요.");
         return;
      }
      setLoading(true);
      delete editElement.date;
      if (editElement.type === TRANSIT) {
         delete editElement.location;
         delete editElement.direction;
      }
      await editTravelBlock(
         "aT1JPMs3GXg7SrkRE1C6KZPJupu1",
         1627379541738,
         editElement,
         { ...editElement, title: title, detailType: detailType, memo: memo }
      );
      setLoading(false);
      setRefresh((prev) => prev + 1);
      close();
   };

   return (
      <EditModal
         visible={visible}
         close={close}
         editElement={editElement}
         onChangeTitle={onChangeTitle}
         detailType={detailType}
         setDetailType={setDetailType}
         onChangeMemo={onChangeMemo}
         errMsg={errMsg}
         editSubmit={editSubmit}
      />
   );
}

export default EditModalContainer;
