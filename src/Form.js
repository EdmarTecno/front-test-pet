import axios from "axios";
import { useMemo, useState } from "react";
import CardData from "./CardData";

const Form = ({ setSeeList }) => {
  const formInitialValue = {
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: ""
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(formInitialValue);
  const TEXT_REGEX = new RegExp(/^[A-Za-z\u00C0-\u00FFñÑ+\s-]{0,}$/);
  const CARD_REGEX = new RegExp(/^[0-9]{0,16}$/);
  const CVV_REGEX = new RegExp(/^[0-9]{0,4}$/);
  const months = useMemo(() => {
    const monthsArray = [];
    monthsArray.push(
      <option key={0} value="Months" disabled={true}>
        Months
      </option>
    );
    for (let index = 0; index < 12; index++) {
      let val = "";
      if (index < 9) val = `0${index + 1}`;
      else val = `${index + 1}`;
      monthsArray.push(
        <option key={index} value={val}>
          {val}
        </option>
      );
    }
    return monthsArray;
  }, []);

  const years = useMemo(() => {
    const yearsArray = [];
    yearsArray.push(
      <option key={0} value="Years" disabled={true}>
        Years
      </option>
    );
    const date = new Date();
    const years = date.getFullYear();
    for (let index = years; index < years + 9; index++) {
      const val = `${index}`;
      yearsArray.push(
        <option key={index + 1} value={val}>
          {val}
        </option>
      );
    }
    return yearsArray;
  }, []);
  const handlerSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("https://l8ij7.sse.codesandbox.io/", {
        ...form
      });
      alert("se creo con exito");
      setForm({ ...formInitialValue });
      setSeeList(true);
    } catch (error) {
      debugger;
      alert("a pasado un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-local-container">
      <div className="fixCard">
        <CardData {...form} />
      </div>
      <div className="card">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            const { name, number, month, year, cvv } = form;
            const numberSpaceless = number.replaceAll(" ", "");
            if (
              name.length !== 0 &&
              numberSpaceless.length === 16 &&
              month !== "" &&
              year !== "" &&
              cvv >= 3
            ) {
              handlerSubmit();
            } else {
              alert("faltan datos");
            }
          }}
        >
          <div className="form-group">
            <label>Card Number</label>
            <input
              className="input"
              type="text"
              onChange={(e) => {
                const val = e.target.value;
                const replace = val.replaceAll(" ", "");
                if (CARD_REGEX.test(replace)) {
                  let finalVal = "";
                  for (let index = 0; index < replace.length; index++) {
                    const length = index + 1;
                    finalVal += replace[index];
                    if (length % 4 === 0) finalVal += " ";
                  }
                  setForm({ ...form, number: finalVal });
                }
              }}
              value={form.number}
            ></input>
          </div>
          <div className="form-group">
            <label>Card Name</label>
            <input
              className="input"
              type="text"
              onChange={(e) => {
                const val = e.target.value;
                if (TEXT_REGEX.test(val)) setForm({ ...form, name: val });
              }}
              value={form.name}
            ></input>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Month</label>
              <select
                className="input"
                type="text"
                onChange={(e) => {
                  setForm({ ...form, month: e.target.value });
                }}
                value={form.month}
              >
                <option></option>
                {months}
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <select
                className="input"
                type="text"
                onChange={(e) => {
                  setForm({ ...form, year: e.target.value });
                }}
                value={form.year}
              >
                <option></option>
                {years}
              </select>
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                className="input"
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  if (CVV_REGEX.test(val)) setForm({ ...form, cvv: val });
                }}
                value={form.cvv}
              ></input>
            </div>
          </div>
          <button className="button" type="submit">
            {!loading ? "Submit" : "Loading..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
