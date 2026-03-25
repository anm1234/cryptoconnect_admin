import React, { useState, useEffect, useRef } from "react";
import details from "../components/location";
import { useCryptoPrices } from "../components/websocket";

function Access() {
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const { prices, volume, coins } = useCryptoPrices();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(details.users, { method:'GET', headers:{'Content-Type':'application/json'} });
        const data = await response.json();
        const keys = Object.keys(data);
        const mapped = [];
        for (let i = 0; i < keys.length; i++) {
          const u = data[keys[i]];
          mapped.push({
            id:u.id, name:`${u.fname} ${u.lname}`,
            initials:`${u.fname?.[0]??'?'}${u.lname?.[0]??'?'}`,
            addr:u.email, vol:`$${u.balance??0}`,
            active:true, flagged:false, banned:false,
            color:["#00c97a15","#7c5cfc20","#f5a62320","#4da6ff20","#ffffff10"][i%5],
            tc:["#00c97a","#9f8fff","#f5a623","#4da6ff","#4a5568"][i%5],
          });
        }
        setUsers(mapped);
      } catch(err) { console.error("Failed to fetch users:", err); }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(details.transactions, { method:'GET', headers:{'Content-Type':'application/json'} });
        const data = await response.json();
        const keys = Object.keys(data);
        const mapped = [];
        for (let i = 0; i < keys.length; i++) {
          const tx = data[keys[i]];
          mapped.push({
            id:tx.transaction_id, userId:tx.user_id, coin:tx.coin,
            amount:tx.amount, price:tx.price, type:tx.transaction_type,
            ic:["#00c97a15","#7c5cfc20","#f5a62320","#4da6ff20","#ffffff10"][i%5],
            tc:["#00c97a","#9f8fff","#f5a623","#4da6ff","#4a5568"][i%5],
            ac:tx.transaction_type==="buy"?"#00c97a":"#ff4d6a",
          });
        }
        setTransactions(mapped);
      } catch(err) { console.error("Failed to fetch transactions:", err); }
    };

    const fetchHoldings = async () => {
      try {
        const response = await fetch(details.holdings, { method:'GET', headers:{'Content-Type':'application/json'} });
        const data = await response.json();
        const keys = Object.keys(data);
        const mapped = [];
        for (let i = 0; i < keys.length; i++) {
          const h = data[keys[i]];
          mapped.push({
            assetId:h.asset_id, userId:h.user_id,
            assetName:h.asset_name, assetAmount:h.asset_amount,
            ic:["#00c97a15","#7c5cfc20","#f5a62320","#4da6ff20","#ffffff10"][i%5],
            tc:["#00c97a","#9f8fff","#f5a623","#4da6ff","#4a5568"][i%5],
          });
        }
        setHoldings(mapped);
      } catch(err) { console.error("Failed to fetch holdings:", err); }
    };

    fetchUsers();
    fetchTransactions();
    fetchHoldings();
  }, []);

  const filtered = filter === "all" ? transactions : transactions.filter(t => t.type === filter);

  const toggleUser = (id) => setUsers(p => p.map(u => u.id===id ? {...u, active:!u.active} : u));
  const banUser = (id) => setUsers(p => p.map(u => u.id===id ? {...u, banned:true} : u));
  const unbanUser = (id) => setUsers(p => p.map(u => u.id===id ? {...u, banned:false, active:true} : u));
  const clearFlag = (id) => setUsers(p => p.map(u => u.id===id ? {...u, flagged:false} : u));

  const mono = { fontFamily:"'IBM Plex Mono', monospace" };
  const card = { background:"#0d1117", border:"1px solid #ffffff10", borderRadius:"12px", padding:"18px 20px" };
  const btn = (c="#8892a4", bg="transparent", bc="#ffffff10") => ({ fontSize:"10px", ...mono, padding:"4px 10px", borderRadius:"6px", border:`1px solid ${bc}`, background:bg, color:c, cursor:"pointer" });
  const pill = (bg, c, bc) => ({ fontSize:"9px", ...mono, padding:"2px 8px", borderRadius:"20px", background:bg, color:c, border:`0.5px solid ${bc}` });
  const av = (bg, c, size=34) => ({ width:size, height:size, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"700", color:c, flexShrink:0, ...mono });
  const row = { display:"flex", alignItems:"center", gap:"12px", padding:"11px 8px", borderRadius:"8px" };
  const divider = { height:"0.5px", background:"#ffffff10" };
  const scrollable = { maxHeight:"280px", overflowY:"auto" };

  return (
    <div style={{height:"100vh", overflow:"auto", background:"#080b10", color:"#e8eaf0", fontFamily:"'Syne', sans-serif", fontSize:"13px"}}>

      {/* Navbar */}
      <div style={{background:"#0d1117", borderBottom:"1px solid #ffffff10", padding:"16px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10}}>
        <div style={{fontSize:"17px", fontWeight:"700", letterSpacing:"-0.5px"}}>
          Crypto<span style={{color:"#00c97a"}}>Connect</span>
          <span style={{fontSize:"11px", fontWeight:"400", color:"#2d3748", marginLeft:"10px", ...mono}}>admin</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <div style={{fontSize:"10px", ...mono, color:"#f5a623", background:"#f5a62312", padding:"4px 11px", borderRadius:"20px", border:"0.5px solid #f5a62330"}}>gas 94 gwei ↑</div>
          <div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"10px", ...mono, color:"#00c97a", background:"#00c97a12", padding:"4px 11px", borderRadius:"20px", border:"0.5px solid #00c97a30"}}>
            <div style={{width:"6px", height:"6px", borderRadius:"50%", background:"#00c97a", animation:"blink 2s infinite"}}></div>
            live · #18,442,301
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{background:"#0d1117", borderBottom:"1px solid #ffffff10", overflow:"hidden", whiteSpace:"nowrap", padding:"8px 0"}}>
        <div style={{display:"inline-flex", gap:"32px", animation:"ticker 30s linear infinite"}}>
          {[...coins, ...coins].map((coin, i) => (
            <div key={i} style={{display:"inline-flex", alignItems:"center", gap:"8px", padding:"0 16px"}}>
              <span style={{fontSize:"11px", fontWeight:"600", color:"#e8eaf0", ...mono}}>{coin.replace("-USD","")}</span>
              <span style={{fontSize:"11px", ...mono, color: prices[coin] ? "#00c97a" : "#4a5568"}}>
                {prices[coin] ? `$${prices[coin].toFixed(2)}` : "---"}
              </span>
              {volume[coin] && (
                <span style={{fontSize:"9px", ...mono, color:"#4a5568"}}>
                  vol {volume[coin].toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"24px 28px", display:"flex", flexDirection:"column", gap:"16px"}}>

        {/* Metrics */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px"}}>
          {[
            {label:"Volume 24h", val:"$4.82M", chg:"↑ 12.4%", vc:"#00c97a"},
            {label:"Active Users", val:"24,190", chg:"↑ 841 today", vc:"#00c97a"},
            {label:"Pending TX", val:"1,203", chg:"↑ 18% vs avg", vc:"#ff4d6a", mvc:"#f5a623"},
            {label:"Protocol Fee", val:"$9,341", chg:"↑ 5.2%", vc:"#00c97a"},
          ].map((s,i) => (
            <div key={i} style={{...card, display:"flex", flexDirection:"column", gap:"10px"}}>
              <div style={{fontSize:"10px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"0.8px"}}>{s.label}</div>
              <div style={{fontSize:"26px", fontWeight:"700", ...mono, letterSpacing:"-1px", color:s.mvc||"#e8eaf0"}}>{s.val}</div>
              <div style={{fontSize:"11px", ...mono, color:s.vc}}>{s.chg}</div>
            </div>
          ))}
        </div>

        {/* Users + Alerts */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px"}}>

          {/* Users */}
          <div style={card}>
            <div style={{fontSize:"10px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"14px"}}>Users</div>
            <div style={scrollable}>
              {users.map((u, i) => (
                <div key={u.id}>
                  <div style={{...row, background: u.banned ? "#ff4d6a08" : "transparent"}}>
                    <div style={av(u.banned ? "#ff4d6a20" : u.color, u.banned ? "#ff4d6a" : u.tc)}>{u.initials}</div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:"13px", fontWeight:"500", color: u.banned ? "#ff4d6a" : "#e8eaf0"}}>
                        {u.name}
                        {u.flagged && !u.banned && <span style={{...pill("#ff4d6a20","#ff4d6a","#ff4d6a30"), fontSize:"9px", marginLeft:"6px"}}>flagged</span>}
                        {u.banned && <span style={{...pill("#ff4d6a20","#ff4d6a","#ff4d6a30"), fontSize:"9px", marginLeft:"6px"}}>banned</span>}
                      </div>
                      <div style={{fontSize:"10px", color:"#4a5568", ...mono, marginTop:"2px"}}>{u.addr} · {u.vol}</div>
                    </div>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                      {!u.banned && (
                        <div onClick={() => toggleUser(u.id)} style={{display:"flex", alignItems:"center", gap:"5px", cursor:"pointer", fontSize:"10px", ...mono, color:"#4a5568"}}>
                          <div style={{width:"28px", height:"16px", borderRadius:"8px", background:u.active?"#00c97a25":"#1a2030", border:`1px solid ${u.active?"#00c97a40":"#ffffff15"}`, position:"relative"}}>
                            <div style={{width:"10px", height:"10px", borderRadius:"50%", background:u.active?"#00c97a":"#4a5568", position:"absolute", top:"2px", left:u.active?"14px":"2px", transition:"all 0.2s"}}></div>
                          </div>
                          {u.active?"active":"off"}
                        </div>
                      )}
                      {u.flagged && !u.banned && <button onClick={() => clearFlag(u.id)} style={btn("#00c97a","#00c97a20","#00c97a40")}>clear</button>}
                      {!u.banned
                        ? <button onClick={() => banUser(u.id)} style={btn("#ff4d6a","transparent","#ff4d6a30")}>ban</button>
                        : <button onClick={() => unbanUser(u.id)} style={btn("#8892a4","transparent","#ffffff10")}>unban</button>
                      }
                    </div>
                  </div>
                  {i < users.length-1 && <div style={divider}></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div style={card}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px"}}>
              <div style={{fontSize:"10px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"1px"}}>Alerts</div>
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"200px", flexDirection:"column", gap:"8px"}}>
              <div style={{fontSize:"22px"}}>🚧</div>
              <div style={{fontSize:"12px", color:"#4a5568", ...mono}}>upcoming feature</div>
            </div>
          </div>

        </div>

        {/* Transactions */}
        <div style={card}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px"}}>
            <div style={{fontSize:"10px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"1px"}}>Transactions</div>
            <div style={{display:"flex", gap:"4px"}}>
              {["all","buy","sell"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={btn(filter===f?"#00c97a":"#4a5568", filter===f?"#00c97a20":"transparent", filter===f?"#00c97a40":"#ffffff10")}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{...scrollable, maxHeight:"320px"}}>
            {filtered.map((tx, i) => (
              <div key={tx.id}>
                <div style={row}>
                  <div style={av(tx.ic, tx.tc, 36)}>{tx.coin?.slice(0,2).toUpperCase()}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:"13px", fontWeight:"500", color:"#e8eaf0"}}>{tx.coin}</div>
                    <div style={{fontSize:"10px", color:"#4a5568", ...mono, marginTop:"2px"}}>User #{tx.userId} · TX #{tx.id}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:"12px", ...mono, color:tx.ac}}>{tx.type === "buy" ? "+" : "-"}{tx.amount}</div>
                    <div style={{fontSize:"10px", color:"#4a5568", ...mono, marginTop:"2px"}}>@ ${tx.price}</div>
                  </div>
                  <span style={tx.type==="buy" ? pill("#00c97a20","#00c97a","#00c97a30") : pill("#ff4d6a20","#ff4d6a","#ff4d6a30")}>
                    {tx.type}
                  </span>
                </div>
                {i < filtered.length-1 && <div style={divider}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Holdings */}
        <div style={card}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px"}}>
            <div style={{fontSize:"10px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"1px"}}>Holdings</div>
            <span style={pill("#4da6ff20","#4da6ff","#4da6ff30")}>{holdings.length} assets</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"12px", padding:"6px 8px", marginBottom:"4px"}}>
            {["Asset","Asset ID","User ID","Amount"].map(h => (
              <div key={h} style={{fontSize:"9px", color:"#4a5568", ...mono, textTransform:"uppercase", letterSpacing:"0.8px"}}>{h}</div>
            ))}
          </div>
          <div style={{...scrollable, maxHeight:"320px"}}>
            {holdings.map((h, i) => (
              <div key={h.assetId}>
                <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"12px", padding:"10px 8px", alignItems:"center", borderRadius:"8px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <div style={av(h.ic, h.tc, 30)}>{h.assetName?.slice(0,2).toUpperCase()}</div>
                    <div style={{fontSize:"13px", fontWeight:"500", color:"#e8eaf0"}}>{h.assetName}</div>
                  </div>
                  <div style={{fontSize:"11px", ...mono, color:"#4a5568"}}>#{h.assetId}</div>
                  <div style={{fontSize:"11px", ...mono, color:"#4a5568"}}>
                    <span style={pill("#7c5cfc20","#9f8fff","#7c5cfc40")}>user #{h.userId}</span>
                  </div>
                  <div style={{fontSize:"12px", ...mono, color:h.tc, fontWeight:"600"}}>{h.assetAmount}</div>
                </div>
                {i < holdings.length-1 && <div style={divider}></div>}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#ffffff15;border-radius:2px}
        ::-webkit-scrollbar-thumb:hover{background:#ffffff25}
        html, body { height:100%; overflow:auto; }
      `}</style>
    </div>
  );
}

export default Access;