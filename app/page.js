
"use client";
import React, { useState, useEffect } from "react";

const CART="ir_cart_max";
const ORDERS="ir_orders_max";
const CHECKED="ir_checked_max";

const products = [
  { name: "Oliwa z Oliwek Extra Vergine 1L", each: 50, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000046-c4a7ac4a7c/2e55fb_a3910e1c2ff8477699dd662febdefafa~mv2.jpeg" },
  { name: "Oliwa z oliwek extra virgin Coppini 1L", each: 70, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000108-0fe5f0fe61/OIP%20%284%29.jpeg" },

  { name: "La Gioiosa Aperitiv Spritz", each: 30, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000092-4c17b4c17d/OIP%20%282%29.jpeg" },
  { name: "La Gioiosa Hugo 0.7L", each: 30, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000084-3134c3134e/3cab72490267ea207e16b994f040f32846ee25e8.jpeg" },
  { name: "Hugo 0.7L", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000082-00aac00ab0/hugo-1.png" },

  { name: "Aperol Aperitivo 1L", each: 65, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000102-b3869b386a/OIP%20%283%29.jpeg" },

  { name: "Fragolino Rosso Corte Viola", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000000-1c08c1c08f/fragolino-corte-viola.jpeg" },
  { name: "Fragolino Bianco Corte Viola", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000002-1491e1491f/xl_32133.jpeg" },
  { name: "Fragolino Fiorelli", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000080-d1430d1431/b.jpeg" },

  { name: "Lambrusco Grasparossa", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000036-e0e67e0e69/2e55fb_4598a07ae7a14df1ac4747f139dda576~mv2.jpeg" },
  { name: "Lambrusco Rosato di Modena", each: 100, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000032-9fbcd9fbce/5863501-14297601-20230314111017-nowy.jpeg" },

  { name: "Prosecco DOC Treviso Extra Dry", each: 30, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000126-cd6e0cd6e1/montasolo-prosecco-doc-extra-dry-75cl-41784518607086.jpeg" },
  { name: "Prosecco DOC Musti Nobilis", each: 30, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000066-4e65c4e65e/2e55fb_4cd03e2edf404b74870483fbbc1030fc~mv2.png" },
  { name: "Prosecco Valdo Marca Oro", each: 50, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000070-bdc58bdc5b/marca-oro.jpeg" },

  { name: "Limoncello 0.7L", each: 30, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000058-0563b0563c/5802301-14422301-20231123120803.jpeg" },
  { name: "Amaretto 0.7L", each: 35, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000050-33e9533e97/2e55fb_a6c4dea0d97e49ebbefa0f2336125e99~mv2.jpeg" },

  { name: "Lavazza Qualita Oro 1kg", each: 120, img: "https://f4fc59d3f3.cbaul-cdnwnd.com/85d31112df68cf7481718ad35efbb486/200000104-4b6b94b6bb/Lavazza-Qualita-Oro-Espresso-1kg-ziarnista-na-rynek-wloski.jpeg" }
];


export default function Page(){
const [mode,setMode]=useState("each");
const [cart,setCart]=useState([]);
const [orders,setOrders]=useState([]);
const [checked,setChecked]=useState({});
const [admin,setAdmin]=useState(false);

useEffect(()=>{
const c=localStorage.getItem(CART);
const o=localStorage.getItem(ORDERS);
const ch=localStorage.getItem(CHECKED);
if(c)setCart(JSON.parse(c));
if(o)setOrders(JSON.parse(o));
if(ch)setChecked(JSON.parse(ch));
},[]);

useEffect(()=>localStorage.setItem(CART,JSON.stringify(cart)),[cart]);
useEffect(()=>localStorage.setItem(ORDERS,JSON.stringify(orders)),[orders]);
useEffect(()=>localStorage.setItem(CHECKED,JSON.stringify(checked)),[checked]);

const add=p=>{
const label=mode==="box"?"karton":"szt.";
const name=`${p.name} (${label})`;
const ex=cart.find(i=>i.name===name);
if(ex)setCart(cart.map(i=>i.name===name?{...i,qty:i.qty+1}:i));
else setCart([...cart,{name,qty:1}]);
};

const placeOrder=()=>{
const o={id:Date.now(),date:new Date().toLocaleString(),items:cart};
setOrders([o,...orders]);
setCart([]);
};

const aggregated=orders.reduce((acc,o)=>{
o.items.forEach(i=>{acc[i.name]=(acc[i.name]||0)+i.qty});
return acc;
},{});

const exportCSV=()=>{
let rows=["produkt,ilosc"];
Object.entries(aggregated).forEach(([n,q])=>rows.push(`${n},${q}`));
const blob=new Blob([rows.join("\n")],{type:"text/csv"});
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="zamowienia.csv";
a.click();
};

return (
<div>
<header style={{padding:20,textAlign:"center",fontSize:26}}>
Italian Reserve PRO MAX
<div style={{fontSize:12,cursor:"pointer"}} onClick={()=>setAdmin(true)}>Panel admina</div>
</header>

<div style={{textAlign:"center",marginBottom:20}}>
<button onClick={()=>setMode("each")}>Sztuki</button>
<button onClick={()=>setMode("box")} style={{marginLeft:10}}>Kartony</button>
</div>

<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,padding:20}}>
{products.map(p=>(
<div key={p.name} style={{border:"1px solid #333",padding:10}}>
<img src={p.img} style={{width:"100%"}}/>
<div>{p.name}</div>
<div>{mode==="box"?p.box:p.each} zł</div>
<button onClick={()=>add(p)}>Dodaj</button>
</div>
))}
</div>

{cart.length>0&&(
<div style={{position:"fixed",bottom:20,right:20,background:"#fff",color:"#000",padding:15}}>
<b>Koszyk</b>
{cart.map(i=><div key={i.name}>{i.name} x{i.qty}</div>)}
<button onClick={placeOrder}>Zamów</button>
</div>
)}

{admin&&(
<div style={{position:"fixed",inset:0,background:"#000c",padding:20,overflow:"auto"}}>
<h2>Lista zakupów zbiorcza</h2>
{Object.entries(aggregated).map(([n,q])=>(
<div key={n}>
<input type="checkbox" checked={!!checked[n]} onChange={()=>setChecked({...checked,[n]:!checked[n]})}/>
<span style={{textDecoration:checked[n]?"line-through":"none"}}>{n} — {q}</span>
</div>
))}
<button onClick={exportCSV}>Eksport CSV</button>

<h3>Historia zamówień</h3>
{orders.map(o=>(<div key={o.id} style={{border:"1px solid #333",marginBottom:10,padding:10}}>
<div>{o.date}</div>
{o.items.map(i=><div key={i.name}>{i.name} x{i.qty}</div>)}
</div>))}
<button onClick={()=>setAdmin(false)}>Zamknij</button>
</div>
)}
</div>
);
}
