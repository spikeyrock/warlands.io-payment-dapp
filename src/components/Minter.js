import { useEffect, useState } from "react";
import Web3 from "web3";
import contract from "../contracts/contract.json";
import dia from "../assets/diamondchest.png";
import gol from "../assets/goldchest.png";
import sil from "../assets/silverchest.png";
import bg from "../assets/background.png"

//selection sets according to percentages
const silver_chars = ["C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1"];
const gold_chars = ["C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2"];
const diamond_chars = ["C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-1", "C-Gwen-1", "C-Hector-1", "C-Ho-Jin-1", "C-Idore-1", "C-Lucius-1", "C-Maze-1", "C-Sabrina-1", "C-Templar-1", "C-Theia-1",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-2", "C-Gwen-2", "C-Hector-2", "C-Ho-Jin-2", "C-Idore-2", "C-Lucius-2", "C-Maze-2", "C-Sabrina-2", "C-Templar-2", "C-Theia-2",
  "C-Fabian-3", "C-Gwen-3", "C-Hector-3", "C-Ho-Jin-3", "C-Idore-3", "C-Lucius-3", "C-Maze-3", "C-Sabrina-3", "C-Templar-3", "C-Theia-3",
  "C-Fabian-3", "C-Gwen-3", "C-Hector-3", "C-Ho-Jin-3", "C-Idore-3", "C-Lucius-3", "C-Maze-3", "C-Sabrina-3", "C-Templar-3", "C-Theia-3",
  "C-Fabian-3", "C-Gwen-3", "C-Hector-3", "C-Ho-Jin-3", "C-Idore-3", "C-Lucius-3", "C-Maze-3", "C-Sabrina-3", "C-Templar-3", "C-Theia-3",
  "C-Fabian-4", "C-Gwen-4", "C-Hector-4", "C-Ho-Jin-4", "C-Idore-4", "C-Lucius-4", "C-Maze-4", "C-Sabrina-4", "C-Templar-4", "C-Theia-4"];
const gold_pets = ["P-Chiron-1", "P-Fleta-1", "P-Griffin-1"];
const diamond_pets = ["P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-1", "P-Fleta-1", "P-Griffin-1",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-2", "P-Fleta-2", "P-Griffin-2",
  "P-Chiron-3", "P-Fleta-3", "P-Griffin-3",
  "P-Chiron-3", "P-Fleta-3", "P-Griffin-3",
  "P-Chiron-3", "P-Fleta-3", "P-Griffin-3"
];
const diamond_land = ["L-Forrest Land"];


//info and mint states
const initialInfoState = {
  connected: false,
  status: null,
  account: null,
  web3: null,
  contract: null,
  address: null,
  contractJSON: null,
};
const initialMintState = {
  loading: false,
  status: `Mint your ${contract.name}`,
  amount: 1,
  supply: "0",
  cost: "0",
};



//main minter app
function Minter() {
  const [info, setInfo] = useState(initialInfoState);
  const [mintInfo, setMintInfo] = useState(initialMintState);
  const init = async (_request, _contractJSON) => {
    if (window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: _request,
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (networkId == _contractJSON.chain_id) {
          let web3 = new Web3(window.ethereum);
          setInfo((prevState) => ({
            ...prevState,
            connected: true,
            status: null,
            account: accounts[0],
            web3: web3,
            contract: new web3.eth.Contract(
              _contractJSON.abi,
              _contractJSON.address
            ),
            contractJSON: _contractJSON,
          }));
        } else {
          setInfo(() => ({
            ...initialInfoState,
            status: `Change network to ${_contractJSON.chain}.`,
          }));
        }
      } catch (err) {
        console.log(err.message);
        setInfo(() => ({
          ...initialInfoState,
        }));
      }
    } else {
      setInfo(() => ({
        ...initialInfoState,
        status: "Please install metamask.",
      }));
    }
  };
  const initListeners = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  };


  // supply functions
  const getSupplySilver = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.totalSilverMinted().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 0,
      }));
    }
  };
  const getSupplyGold = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.totalGoldMinted().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 0,
      }));
    }
  };
  const getSupplyDiamond = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.totalDiamondMinted().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 0,
      }));
    }
  };


  // Mint or buy functions
  const MintSilverChest = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String("16345785d8a0000"
      ),
      data: info.contract.methods
        .BuySilverChest()
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Minting ${mintInfo.amount}...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      }); const handleItems = (_amount) => {

        switch (_amount) {
          case 1:
            var chest = 0.1;
            break;
          case 2:
            chest = 0.3;
            break
          case 3:
            chest = 0.75;
            break;
          default:
        }
        if (chest === 0.1) {
          var linkG = document.getElementById('GOLD');
          var linkD = document.getElementById('DIAMOND');
          linkG.style.display = 'none';
          linkD.style.display = 'none';
          console.log("Silver")
          var value = silver_chars[Math.floor(Math.random() * silver_chars.length)];

          // recieved values
          return "Received NFT : " + [value];
          document.getElementById()

        } else {
          return "Purchase unsuccessful, please try again..."
        }
      }
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          handleItems(1),
      }));
      getSupplySilver();
      handleItems(1);

    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };
  const MintGoldChest = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        "429d069189e0000"
      ),
      data: info.contract.methods
        .BuyGoldChest()
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Minting ${mintInfo.amount}...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      const handleItems = (_amount) => {

        switch (_amount) {
          case 1:
            var chest = 0.1;
            break;
          case 2:
            chest = 0.3;
            break
          case 3:
            chest = 0.75;
            break;
          default:
        }
        if (chest === 0.3) {
          var linkS = document.getElementById('SILVER');
          var linkD = document.getElementById('DIAMOND');
          linkS.style.display = 'none';
          linkD.style.display = 'none';
          console.log("Gold")
          var value1 = gold_chars[Math.floor(Math.random() * gold_chars.length)];
          var value2 = gold_chars[Math.floor(Math.random() * gold_chars.length)];
          var value3 = gold_pets[Math.floor(Math.random() * gold_pets.length)];

          // recieved values
          return "Received NFT : " + [value1, value2, value3];
        } else {
          return "Purchase unsuccessful, please try again..."
        }
      }
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          handleItems(2),
      }));
      getSupplyGold();
      handleItems(2);

    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };
  const MintDiamondChest = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        "a688906bd8b0000"
      ),
      data: info.contract.methods
        .BuyDiamondChest()
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Minting ${mintInfo.amount}...`,
        data: info.contract.methods.totalGoldMinted().encodeABI()
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      }); const handleItems = (_amount) => {

        switch (_amount) {
          case 1:
            var chest = 0.1;
            break;
          case 2:
            chest = 0.3;
            break
          case 3:
            chest = 0.75;
            break;
          default:
        }
        if (chest === 0.75) {
          var linkS = document.getElementById('SILVER');
          var linkG = document.getElementById('GOLD');
          linkS.style.display = 'none';
          linkG.style.display = 'none';
          console.log("Diamond")
          var value1 = diamond_chars[Math.floor(Math.random() * diamond_chars.length)];
          var value2 = diamond_chars[Math.floor(Math.random() * diamond_chars.length)];
          var value3 = diamond_chars[Math.floor(Math.random() * diamond_chars.length)];
          var value4 = diamond_chars[Math.floor(Math.random() * diamond_chars.length)];
          var value5 = diamond_pets[Math.floor(Math.random() * diamond_pets.length)];
          var value6 = diamond_pets[Math.floor(Math.random() * diamond_pets.length)];
          var value7 = diamond_land[Math.floor(Math.random() * diamond_land.length)];

          // recieved values
          return "Received NFT : " + [value1, value2, value3, value4, value5, value6, value7];
        } else {
          return "Purchase unsuccessful, please try again..."
        }
      }
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: handleItems(3),
      }));
      getSupplyDiamond();
      handleItems(3);

    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };
  const connectToContract = (_contractJSON) => {
    init("eth_requestAccounts", _contractJSON);
  };
  useEffect(() => {
    connectToContract(contract);
    initListeners();
  }, []);
  useEffect(() => {
    if (info.connected) {
    }
  }, [info.connected]);

  // cards to mint + buttons
  return (
    <div className="page" >
      <div class="Navbar">  <div className="card_footer colorGradient">
        <button
          className="button"
          style={{
            backgroundColor: info.connected
              ? "var(--success)"
              : "var(--warning)",
          }}
          onClick={() => connectToContract(contract)}
        >
          {info.account ? "Connected" : "Connect Wallet"}
        </button>

      </div>
        {info.connected ? (
          <p className="accountText" style={{ color: "var(--wallet)", textAlign: "center", padding: "10px" }}>
            {String(info.account)}
          </p>
        ) : null}
      </div>
      <div className="card">
        <div className="card_header colorGradient">
          <img className="card_header_image ns" alt={"banner"} src={sil} />
        </div>

        <div className="card_body" id="silver">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <div style={{ width: 10 }}></div>
            <button
              disabled={!info.connected || mintInfo.SilverCost == "0"}
              className="button"
              onClick={() => MintSilverChest()}
            >
              BUY
            </button>
            <div style={{ width: 10 }}></div>

          </div>
          {info.connected ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                {"0.1 "}
                {contract.chain_symbol}
              </p>

            </div>
          ) : null}
          {mintInfo.status ? (
            <p className="statusText" id="SILVER" style={{
              color: mintInfo.status
                ? "var(--statusText)"
                : "var(--warning)",
            }}>{mintInfo.status}</p>
          ) : null}
          {info.status ? (
            <p className="statusText" style={{ color: "var(--error)" }}>
              {info.status}
            </p>
          ) : null}
        </div>
      </div>
      <div className="card">
        <div className="card_header colorGradient">
          <img className="card_header_image ns" alt={"banner"} src={gol} />
        </div>

        <div className="card_body" id="gold">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <div style={{ width: 10 }}></div>
            <button
              disabled={!info.connected || mintInfo.GoldCost == "0"}
              className="button"
              onClick={() => MintGoldChest()}
            >
              BUY
            </button>
            <div style={{ width: 10 }}></div>

          </div>
          {info.connected ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                {"0.3 "}
                {contract.chain_symbol}
              </p>



            </div>
          ) : null}
          {mintInfo.status ? (
            <p className="statusText" id="GOLD" style={{
              color: mintInfo.status
                ? "var(--statusText)"
                : "var(--warning)",
            }}>{mintInfo.status}</p>
          ) : null}
          {info.status ? (
            <p className="statusText" style={{ color: "var(--error)" }}>
              {info.status}
            </p>
          ) : null}
        </div>
      </div>
      <div className="card">
        <div className="card_header colorGradient">
          <img className="card_header_image ns" alt={"banner"} src={dia} />
        </div>

        <div className="card_body">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <div style={{ width: 10 }}></div>
            <button
              disabled={!info.connected || mintInfo.DiamondCost == "0"}
              className="button"
              onClick={() => MintDiamondChest()}
            >
              BUY

            </button>
            <div style={{ width: 10 }}></div>

          </div>
          {info.connected ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                {"0.75 "}
                {contract.chain_symbol}
              </p>


            </div>
          ) : null}
          {mintInfo.status ? (
            <p className="statusText" id="DIAMOND" style={{
              color: mintInfo.status
                ? "var(--statusText)"
                : "var(--warning)",
            }}>{mintInfo.status}</p>
          ) : null}
          {info.status ? (
            <p className="statusText" style={{ color: "var(--error)" }}>
              {info.status}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Minter;
