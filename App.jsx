import { useState, useMemo } from "react";
import {
  Search, ShoppingCart, X, Plus, Minus, Bell, Check,
  MessageCircle, Truck, Store, ChevronRight, Leaf, Star
} from "lucide-react";

const PRODUCTS = [
  // Dals & Pulses
  { id:1,  name:"Toor Dal",              brand:"Double Horse", weight:"4 lb",   price:6.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:2,  name:"Urad Gota",             brand:"Double Horse", weight:"4 lb",   price:6.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:3,  name:"Idli Ravva",            brand:"Double Horse", weight:"4 lb",   price:5.50,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:4,  name:"Dalia Split",           brand:"Double Horse", weight:"2 lb",   price:3.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:5,  name:"Kala Chana",            brand:"Double Horse", weight:"2 lb",   price:3.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:6,  name:"Moong Dal",             brand:"Laxmi",        weight:"4 lb",   price:8.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:7,  name:"Chana Dal",             brand:"Laxmi",        weight:"4 lb",   price:6.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:8,  name:"Masoor Dal",            brand:"Laxmi",        weight:"4 lb",   price:5.50,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:9,  name:"Peanuts Premium",       brand:"Laxmi",        weight:"3.5 lb", price:8.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:10, name:"Phool Makhana",         brand:"Laxmi",        weight:"200 g",  price:8.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:11, name:"Yellow Vatana",         brand:"Laxmi",        weight:"4 lb",   price:5.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:12, name:"Green Vatana",          brand:"Laxmi",        weight:"4 lb",   price:5.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:13, name:"Kabuli Chana",          brand:"Laxmi",        weight:"4 lb",   price:6.50,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:14, name:"Moong Whole",           brand:"Orchid",       weight:"4 lb",   price:6.50,  cat:"Dals & Pulses",     stock:true,  organic:false },
  { id:15, name:"Rajma Chitra",          brand:"Orchid",       weight:"4 lb",   price:7.00,  cat:"Dals & Pulses",     stock:true,  organic:false },
  // Flour
  { id:50, name:"Chakki Atta",           brand:"Royal",        weight:"20 lb",  price:18.00, cat:"Flour",             stock:true,  organic:false },
  // Rice
  { id:16, name:"Basmati Rice",          brand:"Farmers",      weight:"10 lb",  price:12.00, cat:"Rice",              stock:true,  organic:false },
  { id:17, name:"Aged Basmati Rice",     brand:"Laxmi",        weight:"10 lb",  price:13.00, cat:"Rice",              stock:true,  organic:false },
  { id:19, name:"Ponni Boiled Rice",     brand:"Laxmi",        weight:"20 lb",  price:19.00, cat:"Rice",              stock:true,  organic:false },
  { id:20, name:"Idli Rice",             brand:"Laxmi",        weight:"20 lb",  price:18.00, cat:"Rice",              stock:true,  organic:false },
  { id:52, name:"Ponni Raw Rice",        brand:"Royal",        weight:"20 lb",  price:17.00, cat:"Rice",              stock:true,  organic:false },
  { id:18, name:"Sona Masoori Rice",     brand:"Royal",        weight:"20 lb",  price:null,  cat:"Rice",              stock:false, organic:true  },
  // Millets
  { id:21, name:"Sorghum (Jowar)",       brand:"Devam",        weight:"5 lb",   price:7.00,  cat:"Millets",           stock:true,  organic:false },
  { id:22, name:"Pearl Millet (Bajra)",  brand:"Devam",        weight:"5 lb",   price:10.00, cat:"Millets",           stock:true,  organic:false },
  { id:23, name:"Kodri Millets",         brand:"Shreeji",      weight:"4 lb",   price:5.50,  cat:"Millets",           stock:true,  organic:false },
  { id:24, name:"Finger Millets (Ragi)", brand:"—",            weight:"—",      price:null,  cat:"Millets",           stock:false, organic:false },
  // Pickles
  { id:25, name:"Mango Pickle",          brand:"G Pulla Reddy",weight:"300 g",  price:null,  cat:"Pickles",           stock:false, organic:false },
  { id:26, name:"Gongura Pickle",        brand:"G Pulla Reddy",weight:"300 g",  price:null,  cat:"Pickles",           stock:false, organic:false },
  { id:27, name:"Tomato Pickle",         brand:"G Pulla Reddy",weight:"300 g",  price:null,  cat:"Pickles",           stock:false, organic:false },
  { id:28, name:"Red Chilli Pickle",     brand:"G Pulla Reddy",weight:"300 g",  price:null,  cat:"Pickles",           stock:false, organic:false },
  // Podis
  { id:30, name:"Karivepaku Karam",      brand:"G Pulla Reddy",weight:"250 g",  price:null,  cat:"Podis",             stock:false, organic:false },
  { id:31, name:"Munagaku Karam",        brand:"G Pulla Reddy",weight:"250 g",  price:null,  cat:"Podis",             stock:false, organic:false },
  { id:32, name:"Idli Karam Powder",     brand:"G Pulla Reddy",weight:"250 g",  price:null,  cat:"Podis",             stock:false, organic:false },
  { id:33, name:"Nalla Karam Powder",    brand:"G Pulla Reddy",weight:"250 g",  price:null,  cat:"Podis",             stock:false, organic:false },
  // Herbal
  { id:60, name:"Amla Fruit Powder",     brand:"Iyasa",        weight:"16 oz",  price:13.50, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:61, name:"Ashwagandha Powder",    brand:"Iyasa",        weight:"16 oz",  price:15.50, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:62, name:"Beet Root Powder",      brand:"Iyasa",        weight:"8 oz",   price:9.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:63, name:"Blue Pea Flower",       brand:"Iyasa",        weight:"2 oz",   price:7.50,  cat:"Herbal & Wellness", stock:true,  organic:false },
  { id:64, name:"Ginger Root Powder",    brand:"Iyasa",        weight:"8 oz",   price:10.00, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:65, name:"Haritaki Powder",       brand:"Iyasa",        weight:"4 oz",   price:6.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:66, name:"Lemongrass Loose Tea",  brand:"Iyasa",        weight:"4 oz",   price:7.50,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:67, name:"Moringa Leaf Powder",   brand:"Iyasa",        weight:"8 oz",   price:10.50, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:68, name:"Mucuna Powder",         brand:"Iyasa",        weight:"8 oz",   price:9.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:69, name:"Neem Leaf Powder",      brand:"Iyasa",        weight:"8 oz",   price:9.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:70, name:"Red Rose Petal Powder", brand:"Iyasa",        weight:"8 oz",   price:13.00, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:71, name:"Shatavari Root Powder", brand:"Iyasa",        weight:"8 oz",   price:12.00, cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:72, name:"Triphala Powder",       brand:"Iyasa",        weight:"4 oz",   price:6.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:73, name:"Turmeric Root Powder",  brand:"Iyasa",        weight:"8 oz",   price:8.00,  cat:"Herbal & Wellness", stock:true,  organic:true  },
  { id:74, name:"Henna Powder",          brand:"Iyasa",        weight:"4 oz",   price:null,  cat:"Herbal & Wellness", stock:false, organic:false },
  { id:75, name:"Hibiscus Flower Powder",brand:"Iyasa",        weight:"4 oz",   price:null,  cat:"Herbal & Wellness", stock:false, organic:true  },
  { id:76, name:"Bhringraj Powder",      brand:"Iyasa",        weight:"8 oz",   price:null,  cat:"Herbal & Wellness", stock:false, organic:true  },
];

const CATS = ["All","Dals & Pulses","Flour","Rice","Millets","Pickles","Podis","Herbal & Wellness"];
const CAT_EMOJI = { "All":"🛒","Dals & Pulses":"🫘","Flour":"🌾","Rice":"🍚","Millets":"🌿","Pickles":"🫙","Podis":"🌶️","Herbal & Wellness":"🌱" };
const WHATSAPP = "15178997699";
const FREE_THRESHOLD = 40;

const BRAND_DOT = {
  "Double Horse":"#dc2626","Laxmi":"#16a34a","Orchid":"#ea580c",
  "Farmers":"#ca8a04","Devam":"#7c3aed","Shreeji":"#0891b2",
  "G Pulla Reddy":"#be123c","Royal":"#1d4ed8","Iyasa":"#065f46","—":"#94a3b8",
};

export default function App() {
  const [cat, setCat]     = useState("All");
  const [q, setQ]         = useState("");
  const [onlyStock, setOnlyStock] = useState(false);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [cart, setCart]   = useState({});
  const [notify, setNotify] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mode, setMode]   = useState("delivery");
  const [placed, setPlaced] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = useMemo(()=> PRODUCTS.filter(p=>{
    const okCat = cat==="All" || p.cat===cat;
    const okQ   = !q || (p.name+p.brand).toLowerCase().includes(q.toLowerCase());
    const okS   = !onlyStock || p.stock;
    const okO   = !onlyOrganic || p.organic;
    return okCat && okQ && okS && okO;
  }),[cat,q,onlyStock,onlyOrganic]);

  const add = id => setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const dec = id => setCart(c=>{ const n=(c[id]||0)-1; const x={...c}; n<=0?delete x[id]:x[id]=n; return x; });
  const toggleNotify = id => setNotify(n=>({...n,[id]:!n[id]}));

  const cartItems = Object.entries(cart).map(([id,qty])=>({...PRODUCTS.find(p=>p.id===+id),qty}));
  const count     = cartItems.reduce((s,i)=>s+i.qty,0);
  const subtotal  = cartItems.reduce((s,i)=>s+(i.price*i.qty),0);
  const delivery  = mode==="pickup"||subtotal>=FREE_THRESHOLD ? 0 : 4.99;
  const total     = subtotal+delivery;

  const orderWA = () => {
    const lines = cartItems.map(i=>`• ${i.qty}× ${i.name} (${i.weight}) — $${(i.price*i.qty).toFixed(2)}`).join("%0a");
    const msg = `*Order — Exotik-Desi*%0a${lines}%0a%0a${mode==="pickup"?"Pickup: Monmouth Junction":"Home delivery"}%0aSubtotal: $${subtotal.toFixed(2)}%0aDelivery: $${delivery.toFixed(2)}%0a*Total: $${total.toFixed(2)}*`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,"_blank");
    setPlaced(true);
  };

  return (
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:"#f8f7f4",fontFamily:"'Inter',system-ui,sans-serif",fontSize:14,display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button{font-family:inherit;cursor:pointer;border:none;}
        input{font-family:inherit;}
        .pcard{transition:transform .12s;}
        .pcard:hover{transform:translateY(-1px);}
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{background:"#1c1917",padding:"14px 16px",position:"sticky",top:0,zIndex:30,display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:18,color:"#fef3c7",lineHeight:1}}>Exotik-Desi</div>
          <div style={{fontSize:10,color:"#78716c",letterSpacing:2,textTransform:"uppercase"}}>Monmouth Junction, NJ</div>
        </div>
        <button onClick={()=>setSearchOpen(s=>!s)} style={{background:"#292524",borderRadius:9,padding:"8px",display:"grid",placeItems:"center",color:"#a8a29e"}}>
          <Search size={18}/>
        </button>
        <button onClick={()=>setCartOpen(true)} style={{background:"#7c2d12",borderRadius:9,padding:"8px 14px",color:"#fff",fontWeight:600,fontSize:13,display:"flex",alignItems:"center",gap:6,position:"relative"}}>
          <ShoppingCart size={17}/>
          {count>0
            ? <span style={{fontWeight:700}}>{count}</span>
            : <span>Cart</span>
          }
          {count>0&&<span style={{position:"absolute",top:-6,right:-6,background:"#ea580c",color:"#fff",borderRadius:999,fontSize:9,fontWeight:800,minWidth:17,height:17,display:"grid",placeItems:"center"}}>{count}</span>}
        </button>
      </div>

      {/* Search bar */}
      {searchOpen&&(
        <div style={{background:"#292524",padding:"10px 14px",display:"flex",gap:8,alignItems:"center"}}>
          <Search size={15} color="#78716c"/>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search dal, rice, ashwagandha…"
            style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#e7e5e4",fontSize:14}}/>
          {q&&<button onClick={()=>setQ("")} style={{background:"none",color:"#78716c",padding:0}}><X size={15}/></button>}
        </div>
      )}

      {/* ── HERO STRIP ── */}
      <div style={{background:"linear-gradient(90deg,#7c2d12,#c2410c)",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <Truck size={16} color="#fca5a5"/>
        <span style={{color:"#fff",fontSize:12}}>Free delivery over <b>${FREE_THRESHOLD}</b> · Quick pickup available · <span style={{color:"#fde68a",fontWeight:600}}>WhatsApp orders</span></span>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div style={{padding:"12px 14px 0",display:"flex",gap:7,overflowX:"auto",flexWrap:"nowrap",msOverflowStyle:"none",scrollbarWidth:"none"}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{
            flexShrink:0,padding:"7px 13px",borderRadius:999,fontSize:12,fontWeight:600,whiteSpace:"nowrap",
            background:cat===c?"#1c1917":"#fff",
            color:cat===c?"#fef3c7":"#57534e",
            border:"1px solid",borderColor:cat===c?"#1c1917":"#e8e3da",
          }}>{CAT_EMOJI[c]} {c}</button>
        ))}
      </div>

      {/* ── FILTER TOGGLES ── */}
      <div style={{padding:"10px 14px",display:"flex",gap:8}}>
        {[[onlyStock,setOnlyStock,"✓ In Stock"],[onlyOrganic,setOnlyOrganic,"🌱 Organic"]].map(([on,set,label])=>(
          <button key={label} onClick={()=>set(v=>!v)} style={{
            padding:"5px 12px",borderRadius:999,fontSize:12,fontWeight:600,
            background:on?"#14532d":"#fff",color:on?"#fff":"#57534e",
            border:"1px solid",borderColor:on?"#14532d":"#e8e3da",
          }}>{label}</button>
        ))}
        <span style={{marginLeft:"auto",fontSize:12,color:"#a8a29e",alignSelf:"center"}}>{filtered.length} items</span>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div style={{flex:1,padding:"4px 14px 90px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {filtered.map(p=>{
          const inCart = cart[p.id]||0;
          const noted  = notify[p.id];
          return (
            <div key={p.id} className="pcard" style={{
              background:"#fff",border:"1px solid #e8e3da",borderRadius:14,
              padding:"13px 12px",display:"flex",flexDirection:"column",gap:6,
            }}>
              {/* Brand + badges */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:7,height:7,borderRadius:999,background:BRAND_DOT[p.brand]||"#94a3b8",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:600,color:"#a8a29e",letterSpacing:.3}}>{p.brand}</span>
                </div>
                {p.organic&&<Leaf size={11} color="#16a34a"/>}
              </div>

              {/* Name */}
              <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:15,lineHeight:1.2,color:"#1c1917",flex:1}}>
                {p.name}
              </div>

              {/* Weight */}
              <div style={{fontSize:11,color:"#a8a29e"}}>{p.weight}</div>

              {/* Price + CTA */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:18,color:p.price==null?"#a8a29e":"#1c1917"}}>
                  {p.price!=null?`$${p.price.toFixed(2)}`:"—"}
                </div>

                {p.stock ? (
                  inCart>0 ? (
                    <div style={{display:"flex",alignItems:"center",gap:5,background:"#1c1917",borderRadius:9,padding:"4px 6px"}}>
                      <button onClick={()=>dec(p.id)} style={{background:"transparent",color:"#fff",display:"grid",placeItems:"center",padding:2}}><Minus size={13}/></button>
                      <span style={{color:"#fff",fontWeight:700,fontSize:13,minWidth:14,textAlign:"center"}}>{inCart}</span>
                      <button onClick={()=>add(p.id)} style={{background:"transparent",color:"#fff",display:"grid",placeItems:"center",padding:2}}><Plus size={13}/></button>
                    </div>
                  ):(
                    <button onClick={()=>add(p.id)} style={{
                      background:"#7c2d12",color:"#fff",borderRadius:9,
                      padding:"7px 11px",fontWeight:600,fontSize:12,
                      display:"flex",alignItems:"center",gap:4,
                    }}><Plus size={12}/> Add</button>
                  )
                ):(
                  <button onClick={()=>toggleNotify(p.id)} style={{
                    background:noted?"#dcfce7":"#f8f7f4",
                    color:noted?"#166534":"#78716c",
                    border:"1px solid",borderColor:noted?"#86efac":"#e8e3da",
                    borderRadius:9,padding:"6px 9px",fontWeight:600,fontSize:11,
                    display:"flex",alignItems:"center",gap:4,
                  }}>
                    {noted?<><Check size={11}/> Noted</>:<><Bell size={11}/> Notify</>}
                  </button>
                )}
              </div>

              {/* Coming soon tag */}
              {!p.stock&&(
                <div style={{fontSize:10,fontWeight:700,color:"#854d0e",background:"#fef9c3",borderRadius:6,padding:"3px 7px",alignSelf:"start"}}>
                  Coming soon
                </div>
              )}
            </div>
          );
        })}

        {filtered.length===0&&(
          <div style={{gridColumn:"1/-1",textAlign:"center",padding:"50px 0",color:"#a8a29e"}}>
            Nothing found for "<b>{q}</b>"
          </div>
        )}
      </div>

      {/* ── CART DRAWER ── */}
      {cartOpen&&(
        <div onClick={()=>setCartOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:50,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"#f8f7f4",borderRadius:"20px 20px 0 0",
            maxHeight:"85vh",display:"flex",flexDirection:"column",
            boxShadow:"0 -8px 40px rgba(0,0,0,.2)"
          }}>
            {/* Handle */}
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
              <div style={{width:36,height:4,borderRadius:2,background:"#d4cfc6"}}/>
            </div>

            {/* Header */}
            <div style={{padding:"8px 18px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #e8e3da"}}>
              <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:18}}>
                Your basket {count>0&&<span style={{fontSize:13,color:"#a8a29e",fontFamily:"Inter,sans-serif",fontWeight:400}}>({count})</span>}
              </div>
              <button onClick={()=>setCartOpen(false)} style={{background:"none",color:"#78716c",padding:4}}><X size={20}/></button>
            </div>

            {/* Items */}
            <div style={{overflowY:"auto",padding:"12px 18px",flex:1}}>
              {cartItems.length===0&&(
                <div style={{textAlign:"center",color:"#a8a29e",padding:"30px 0",fontSize:13}}>
                  Your basket is empty.<br/>Add something delicious!
                </div>
              )}
              {cartItems.map(i=>(
                <div key={i.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:"1px solid #f0ece4"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13}}>{i.name}</div>
                    <div style={{fontSize:12,color:"#a8a29e"}}>{i.weight} · ${i.price.toFixed(2)} each</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <button onClick={()=>dec(i.id)} style={{width:26,height:26,borderRadius:7,border:"1px solid #e8e3da",background:"#fff",display:"grid",placeItems:"center"}}><Minus size={12}/></button>
                    <span style={{fontWeight:700,minWidth:16,textAlign:"center"}}>{i.qty}</span>
                    <button onClick={()=>add(i.id)} style={{width:26,height:26,borderRadius:7,border:"1px solid #e8e3da",background:"#fff",display:"grid",placeItems:"center"}}><Plus size={12}/></button>
                  </div>
                  <div style={{fontWeight:700,fontSize:13,minWidth:40,textAlign:"right"}}>${(i.price*i.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Checkout */}
            {cartItems.length>0&&(
              <div style={{padding:"14px 18px",borderTop:"1px solid #e8e3da",background:"#fff",borderRadius:"0 0 0 0"}}>
                {/* Mode toggle */}
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  {[["delivery","Home Delivery",Truck],["pickup","Pickup",Store]].map(([m,label,Icon])=>(
                    <button key={m} onClick={()=>setMode(m)} style={{
                      flex:1,padding:"9px",borderRadius:10,
                      border:"1px solid",borderColor:mode===m?"#7c2d12":"#e8e3da",
                      background:mode===m?"#fff8f5":"#fff",
                      color:mode===m?"#7c2d12":"#78716c",
                      fontWeight:600,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:5,
                    }}>
                      <Icon size={13}/> {label}
                    </button>
                  ))}
                </div>

                {mode==="delivery"&&subtotal<FREE_THRESHOLD&&(
                  <div style={{background:"#fef9c3",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#92400e",marginBottom:10}}>
                    Add <b>${(FREE_THRESHOLD-subtotal).toFixed(2)}</b> more for free delivery!
                  </div>
                )}

                {[["Subtotal",`$${subtotal.toFixed(2)}`],[`Delivery${delivery===0?" (free)":""}`,delivery===0?"$0.00":`$${delivery.toFixed(2)}`]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#57534e",marginBottom:5}}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"Fraunces,serif",fontWeight:700,fontSize:19,margin:"8px 0 14px"}}>
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>

                <button onClick={orderWA} style={{
                  width:"100%",background:"#16a34a",color:"#fff",borderRadius:12,
                  padding:"13px",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                }}>
                  <MessageCircle size={18}/> Order on WhatsApp
                </button>
                {placed&&<div style={{marginTop:8,fontSize:11,color:"#166534",textAlign:"center"}}>✓ Opened in WhatsApp — just hit Send!</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
