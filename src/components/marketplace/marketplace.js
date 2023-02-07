import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext } from "react";
function Marketplace() {
  const { account } = useContext(WalletContext);

  if (account === null) {
    return (
      <LayoutPage>
      <h2>Please Login</h2>
      </LayoutPage>
    );
  }
  else {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={
              <>
              </>
            }
          />
          <Route
            path="bullet"
            element={
              <>
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  }
  
  export default Marketplace;