import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";

function Item() {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={
              <>
                <h3>Stick</h3>
              </>
            }
          />
          <Route
            path="bullet"
            element={
              <>
                <h3>Bullet</h3>
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default Item;