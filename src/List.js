import axios from "axios";
import { useEffect, useState } from "react";
import CardData from "./CardData";
const List = () => {
  const [list, setList] = useState([]);
  const handlerList = async () => {
    try {
      const response = await axios.get("https://l8ij7.sse.codesandbox.io/");
      setList([...response.data]);
    } catch (error) {
      alert("An error passed");
    }
  };
  useEffect(() => {
    handlerList();
  }, []);
  return (
    <div className="List">
      {list.map((item) => (
        <CardData key={item._id} {...item} />
      ))}
    </div>
  );
};

export default List;
