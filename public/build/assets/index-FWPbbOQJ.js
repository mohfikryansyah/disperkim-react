import{j as a,L as p}from"./app-BVGqCYDV.js";import{D as h}from"./data-table-e0GFo4s_.js";import{C as t,a as r,b as n,c as o,d}from"./card-D6HOny5_.js";import{u as j,b as u,a as f}from"./use-fetch-CXA3CogJ.js";import{A as v}from"./app-layout-DfopFgtb.js";import{columns as b}from"./columns-FPfJCPTG.js";import{L as g}from"./loader-circle-CEC2G9P9.js";import"./utils-jAU0Cazi.js";import"./button-DU0ScleN.js";import"./index-Cpey5Hs_.js";import"./index-D9mPm1SS.js";import"./createLucideIcon-B2s69HQp.js";import"./dropdown-menu-Cm7EzMHJ.js";import"./index-B9Nt5S7z.js";import"./input-Cloe36vH.js";import"./separator-BWw_Cy7-.js";import"./app-logo-icon-BevWte67.js";import"./data-table-column-header-CrRdgqM5.js";function M({lamps:i}){j();const{subdistricts:l,loading:m}=u(7571010),{capitalize:s}=f(),c=[...new Map(l.map(e=>[e.id,{label:s(e.name),value:s(e.name)}])).values()];return console.log(i),a.jsxs(v,{children:[a.jsx(p,{title:"Dashboard"}),a.jsxs("div",{className:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4",children:[a.jsx("h1",{className:"text-2xl font-bold",children:"Data APJ Konvensional"}),a.jsx("div",{className:"grid grid-cols-4 gap-4",children:m?a.jsx("div",{className:"col-span-4",children:a.jsx(g,{className:"animate-spin text-blue-500 mx-auto"})}):a.jsxs(a.Fragment,{children:[a.jsxs(t,{children:[a.jsxs(r,{children:[a.jsx(n,{children:"Total data APJ Konvensional"}),a.jsx(o,{children:"Total APJ Konvensional keseluruhan"})]}),a.jsx(d,{children:a.jsx("div",{className:"text-2xl font-bold",children:i.length})})]}),l.map(e=>a.jsxs(t,{children:[a.jsxs(r,{children:[a.jsx(n,{children:s(e.name)}),a.jsxs(o,{children:["Total APJ Konvensional di ",s(e.name)]})]}),a.jsx(d,{children:a.jsx("div",{className:"text-2xl font-bold",children:i.filter(x=>x.subdistrict.subdistrict_name==s(e.name)).length})})]},e.id))]})}),a.jsx(h,{columns:b,data:i,columnFilter:"kelurahan",titleFilter:"Filter Kelurahan",optionsFilter:c})]})]})}export{M as default};
