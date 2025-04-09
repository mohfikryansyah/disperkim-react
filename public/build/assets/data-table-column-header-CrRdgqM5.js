import{j as e}from"./app-BVGqCYDV.js";import{c as n}from"./utils-jAU0Cazi.js";import{B as c}from"./button-DU0ScleN.js";import{g as p,n as x,o as h,j as l,p as s,l as m}from"./dropdown-menu-Cm7EzMHJ.js";import{c as o}from"./createLucideIcon-B2s69HQp.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],d=o("ArrowDown",j);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],i=o("ArrowUp",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],w=o("EyeOff",f);function C({column:t,title:r,className:a}){return t.getCanSort()?e.jsx("div",{className:n("flex items-center space-x-2",a),children:e.jsxs(p,{children:[e.jsx(x,{asChild:!0,children:e.jsxs(c,{variant:"ghost",size:"sm",className:"-ml-3 h-8 data-[state=open]:bg-accent data-[state=open]:text-black data-[state=open]:dark:text-white",children:[e.jsx("span",{children:r}),t.getIsSorted()==="desc"?e.jsx(d,{}):t.getIsSorted()==="asc"?e.jsx(i,{}):e.jsx(h,{})]})}),e.jsxs(l,{align:"start",children:[e.jsxs(s,{onClick:()=>t.toggleSorting(!1),children:[e.jsx(i,{className:"h-3.5 w-3.5 text-muted-foreground/70"}),"Asc"]}),e.jsxs(s,{onClick:()=>t.toggleSorting(!0),children:[e.jsx(d,{className:"h-3.5 w-3.5 text-muted-foreground/70"}),"Desc"]}),e.jsx(m,{}),e.jsxs(s,{onClick:()=>t.toggleVisibility(!1),children:[e.jsx(w,{className:"h-3.5 w-3.5 text-muted-foreground/70"}),"Hide"]})]})]})}):e.jsx("div",{className:n(a),children:r})}export{C as D};
