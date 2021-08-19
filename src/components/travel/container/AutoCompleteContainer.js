import React from "react";
import AutoComplete from "../view/AutoComplete";

function AutoCompleteContainer({ setRegion }) {
   return <AutoComplete setRegion={setRegion} />;
}

export default React.memo(AutoCompleteContainer);
