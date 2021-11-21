import { useState } from "react";
import Form from "./Form";
import List from "./List";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";

export default function App() {
  const [seeList, setSeeList] = useState(true);
  return (
    <div className="App">
      <Button
        color="primary"
        onClick={() => {
          setSeeList((old) => !old);
        }}
        style={{ margin: "10px" }}
      >
        {seeList ? "Crear" : "Cancelar"}
      </Button>
      {seeList ? <List /> : <Form setSeeList={setSeeList} />}
    </div>
  );
}
