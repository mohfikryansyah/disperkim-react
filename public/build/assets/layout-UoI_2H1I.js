import{j as e,$ as n}from"./app-BVGqCYDV.js";import{B as r}from"./button-DU0ScleN.js";import{S as i}from"./separator-BWw_Cy7-.js";import{c}from"./utils-jAU0Cazi.js";function u({title:a,description:s}){return e.jsxs("header",{children:[e.jsx("h3",{className:"mb-0.5 text-base font-medium",children:a}),s&&e.jsx("p",{className:"text-muted-foreground text-sm",children:s})]})}function o({title:a,description:s}){return e.jsxs("div",{className:"mb-8 space-y-0.5",children:[e.jsx("h2",{className:"text-xl font-semibold tracking-tight",children:a}),s&&e.jsx("p",{className:"text-muted-foreground text-sm",children:s})]})}const x=[{title:"Profile",href:"/settings/profile",icon:null},{title:"Password",href:"/settings/password",icon:null},{title:"Appearance",href:"/settings/appearance",icon:null}];function p({children:a}){if(typeof window>"u")return null;const s=window.location.pathname;return e.jsxs("div",{className:"px-4 py-6",children:[e.jsx(o,{title:"Settings",description:"Manage your profile and account settings"}),e.jsxs("div",{className:"flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12",children:[e.jsx("aside",{className:"w-full max-w-xl lg:w-48",children:e.jsx("nav",{className:"flex flex-col space-y-1 space-x-0",children:x.map((t,l)=>e.jsx(r,{size:"sm",variant:"ghost",asChild:!0,className:c("w-full justify-start",{"bg-muted":s===t.href}),children:e.jsx(n,{href:t.href,prefetch:!0,children:t.title})},`${t.href}-${l}`))})}),e.jsx(i,{className:"my-6 md:hidden"}),e.jsx("div",{className:"flex-1 md:max-w-2xl",children:e.jsx("section",{className:"max-w-xl space-y-12",children:a})})]})]})}export{u as H,p as S};
