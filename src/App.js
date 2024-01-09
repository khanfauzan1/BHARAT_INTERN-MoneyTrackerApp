import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
//library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//toast
import { toast } from "react-toastify";
import spending from "./spending.png";

function App() {
  const [name, setName] = useState("");
  // const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions();
  }, []);
  // console.log(transactions);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    try {
      const res = await axios.get(url);
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const addNewTransaction = async (ev) => {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";

    try {
      const res = await axios.post(url, {
        price,
        name,
      });
      setName("");
      setPrice("");
      toast.success(`You've have successfully added the transaction!`);
     
      window.location.reload(true);
     
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  return (
    <>
      <div className="navbar">
        <div className="navleft">
          <img src={spending} height={33} />
          <h1>Money Tracker</h1>
        </div>
        
      </div>
      <main>
        <h2>Balance Amount: &#8377;{balance}</h2>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              value={name}
              placeholder={"enter the name"}
              required
            />
            <input
              onChange={(ev) => setPrice(ev.target.value)}
              value={price}
              type="number"
              placeholder={"enter the price value"}
              required
            />
          </div>

          <button type="submit">Add New Transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="datetime">
                    {" "}
                    {new Date(transaction.updatedAt).toString().slice(0, 15)}
                  </div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">
                    {new Date(transaction.updatedAt).toString().slice(16, 24)}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="footer">Copyright &copy;Fauzan Ahmad 2024</div>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
