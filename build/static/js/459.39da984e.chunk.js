"use strict";(self.webpackChunkimpact_zone_frontend=self.webpackChunkimpact_zone_frontend||[]).push([[459],{9459:(a,e,t)=>{t.r(e),t.d(e,{default:()=>h});var n=t(5043),l=t(9456),s=t(1688),c=t(6038),i=t(8085),o=t(5050),x=t(3549),r=t(2468),d=t(7994),u=t(7374),m=t(6911),R=t(8056),b=t(1047),g=t(579);const h=()=>{const a=(0,s.W6)(),{id:e}=(0,s.g)(),t=(0,l.wA)(),[h,j]=(0,n.useState)(!1);(0,n.useEffect)((()=>{t((0,R.Km)())}),[t]);const{clubsDropdown:p}=(0,b.A)(),{allTaxDropdown:v}=(0,l.d4)((a=>a.taxes));(0,n.useEffect)((()=>{e&&t((0,R.g3)(e,(a=>{C({taxRateName:a.taxRateName,taxRatePercentage:a.taxRatePercentage,availableTaxRate:a.availableTaxRate,taxRateType:a.taxRateType,club:a.club,isActive:a.isActive})})))}),[e,t]);const[A,C]=(0,n.useState)({taxRateName:"",taxRatePercentage:0,availableTaxRate:null,taxRateType:"",club:"",isActive:!0}),T=a=>{let{name:e,value:t}=a;const n=(0,c.A)(e,t,A);C((a=>({...a,[e]:t,formErrors:n})))};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(o.A,{backText:"Tax",children:[(0,g.jsx)(x.Ay,{col:"12",title:"General",children:(0,g.jsxs)(x.a,{children:[(0,g.jsx)(r.wi,{data:A,onChange:T,name:"taxRateName",required:!0}),(0,g.jsx)(r.Bt,{data:A,onChange:T,name:"taxRatePercentage",required:!0,maxFractionDigits:4}),(0,g.jsx)(r.BR,{data:A,onChange:T,name:"availableTaxRate",options:v}),(0,g.jsx)(r.BR,{data:A,onChange:T,name:"taxRateType",options:u.A4,required:!0}),(0,g.jsx)(r.o4,{data:A,onChange:T,name:"isActive"})]})}),(0,g.jsx)(x.Ay,{col:"12",title:"Clubs",children:(0,g.jsx)(m.A,{name:"club",selected:null===A||void 0===A?void 0:A.club,sourceData:p,onPickListChange:T,data:A})}),(0,g.jsxs)(d.zp,{children:[(0,g.jsx)(d.Ay,{label:"Save",className:"mx-2",onClick:()=>{(0,i.nV)(A,C)&&t(e?(0,R.k0)(e,A,j,a):(0,R.HB)(A,j,a))},loading:h}),(0,g.jsx)(d.Ti,{label:"Cancel",onClick:()=>a.goBack()})]})]})})}}}]);
//# sourceMappingURL=459.39da984e.chunk.js.map