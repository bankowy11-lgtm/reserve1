
"use client";
import React, { useState, useEffect } from "react";

const CART="ir_cart_max";
const ORDERS="ir_orders_max";
const CHECKED="ir_checked_max";

const products=[
{name:"Chianti DOCG",each:79,box:420,img:"https://images.unsplash.com/photo-1510626176961-4b37d4fbf4c4"},
{name:"Prosecco DOC",each:39,box:210,img:"https://images.unsplash.com/photo-1604908176997-431f97d4d0f0"},
{name:"Lambrusco",each:35,box:180,img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092"},
{name:"Limoncello",each:49,box:260,img:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4"}
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
