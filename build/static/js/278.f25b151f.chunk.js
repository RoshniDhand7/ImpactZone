"use strict";(self.webpackChunkimpact_zone_frontend=self.webpackChunkimpact_zone_frontend||[]).push([[278],{3278:(e,a,n)=>{n.r(a),n.d(a,{default:()=>C});var s=n(5043),t=n(9649),o=n(5050),d=n(3549),r=n(7994),i=n(1688),l=n(9456),m=n(6038),c=n(8085),h=n(9286),p=n(579);const C=()=>{const e=(0,i.W6)(),{id:a}=(0,i.g)(),n=(0,l.wA)(),[C,x]=(0,s.useState)([]),[j,g]=(0,s.useState)([]),[y,u]=(0,s.useState)(!1);(0,s.useEffect)((()=>{const e=(0,c.s6)("US");x(e)}),[n]),(0,s.useEffect)((()=>{a&&n((0,h.f7)(a,(e=>{w({name:e.name,email:e.email,phone:e.phone,address1:e.address1,address2:e.address2,city:e.city,state:e.state,zipCode:e.zipCode,alternateVendors:e.alternateVendors,isActive:e.isActive,paymentTerms:e.paymentTerms,deliveryTerms:e.deliveryTerms,repName:e.repName,repCellPhone:e.repCellPhone,notes:e.notes,alternateEmail:e.alternateEmail});const a=(0,c.Wv)("US",e.state);g(a)})))}),[a,n]);const{vendorsDropdown:v}=(0,l.d4)((e=>e.vendors)),[f,w]=(0,s.useState)({name:"",email:"",phone:"",address1:"",address2:"",city:"",state:"",zipCode:"",alternateVendors:"",isActive:!0,paymentTerms:"",deliveryTerms:"",repName:"",repCellPhone:"",notes:"",alternateEmail:""}),k=e=>{let{name:a,value:n}=e;const s=(0,m.A)("name",n,f);if("state"===a){const e=(0,c.Wv)("US",n);g(e),w((e=>({...e,[a]:n,city:""})))}else w("name"===a?e=>({...e,[a]:n,formErrors:s}):e=>({...e,[a]:n,formErrors:{}}))};return(0,p.jsxs)(o.A,{backText:"Vendor",children:[(0,p.jsx)(d.Ay,{col:"12",title:"Add Vendor",children:(0,p.jsxs)(d.a,{children:[(0,p.jsx)(t.o4,{name:"isActive",data:f,onChange:k,col:"12"}),(0,p.jsx)(t.wi,{name:"name",data:f,onChange:k,required:!0}),(0,p.jsx)(t.wi,{name:"address1",data:f,onChange:k}),(0,p.jsx)(t.wi,{name:"address2",data:f,onChange:k}),(0,p.jsx)(t.BR,{name:"state",options:C,data:f,onChange:k}),(0,p.jsx)(t.BR,{name:"city",options:j,data:f,onChange:k}),(0,p.jsx)(t.wi,{name:"zipCode",data:f,onChange:k,disabled:!f.state}),(0,p.jsx)(t.SB,{name:"phone",id:"phone",mask:"(999) 999-9999",data:f,placeholder:"",onChange:k}),(0,p.jsx)(t.wi,{data:f,name:"email",onChange:k}),(0,p.jsx)(t.wi,{data:f,name:"alternateEmail",onChange:k}),(0,p.jsx)(t.BR,{name:"alternateVendors",options:v,data:f,onChange:k}),(0,p.jsx)(t.wi,{data:f,name:"paymentTerms",onChange:k}),(0,p.jsx)(t.wi,{data:f,name:"deliveryTerms",onChange:k}),(0,p.jsx)(t.wi,{data:f,name:"repName",onChange:k}),(0,p.jsx)(t.SB,{name:"repCellPhone",id:"repCellPhone",mask:"(999) 999-9999",data:f,placeholder:"",onChange:k}),(0,p.jsx)(t.Ky,{name:"notes",data:f,onChange:k})]})}),(0,p.jsxs)(r.zp,{children:[(0,p.jsx)(r.Ay,{label:"Save",className:"mx-2",onClick:()=>{(0,c.nV)(f,w,["zipCode","address1","address2","state","city","phone","email","notes"])&&n(a?(0,h.gL)(a,f,u,e):(0,h.ru)(f,u,e))},loading:y}),(0,p.jsx)(r.Ti,{label:"Cancel",onClick:()=>e.goBack()})]})]})}}}]);
//# sourceMappingURL=278.f25b151f.chunk.js.map