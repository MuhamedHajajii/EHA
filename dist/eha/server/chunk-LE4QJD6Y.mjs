import './polyfills.server.mjs';
import{j}from"./chunk-EM75C6OI.mjs";import{m as N,o as A,p as B,t as u}from"./chunk-ALSAN5KH.mjs";import{Cb as M,Gb as S,Hb as n,Ib as w,Jb as T,Oa as E,Ob as b,Pb as y,Qb as C,T as p,Ta as c,ba as v,ca as g,hc as _,jb as r,ka as x,la as I,mb as h,nb as s,rb as m,sa as z,wb as l,xb as o,yb as D}from"./chunk-QYIFABBK.mjs";var F=["*"];function V(e,d){if(e&1&&(l(0,"span",4),y(1),o()),e&2){let t=n();c(),C(t.label)}}function O(e,d){if(e&1&&D(0,"span",6),e&2){let t=n(2);m(t.icon),s("ngClass","p-avatar-icon")}}function R(e,d){if(e&1&&r(0,O,1,3,"span",5),e&2){let t=n(),a=b(6);s("ngIf",t.icon)("ngIfElse",a)}}function P(e,d){if(e&1){let t=M();l(0,"img",8),S("error",function(i){x(t);let f=n(2);return I(f.imageError(i))}),o()}if(e&2){let t=n(2);s("src",t.image,E),h("aria-label",t.ariaLabel)}}function U(e,d){if(e&1&&r(0,P,1,2,"img",7),e&2){let t=n();s("ngIf",t.image)}}var Y=(()=>{class e{label;icon;image;size="normal";shape="square";style;styleClass;ariaLabel;ariaLabelledBy;onImageError=new z;containerClass(){return{"p-avatar p-component":!0,"p-avatar-image":this.image!=null,"p-avatar-circle":this.shape==="circle","p-avatar-lg":this.size==="large","p-avatar-xl":this.size==="xlarge"}}imageError(t){this.onImageError.emit(t)}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=v({type:e,selectors:[["p-avatar"]],hostAttrs:[1,"p-element"],inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",style:"style",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},ngContentSelectors:F,decls:7,vars:9,consts:[["iconTemplate",""],["imageTemplate",""],[3,"ngClass","ngStyle"],["class","p-avatar-text",4,"ngIf","ngIfElse"],[1,"p-avatar-text"],[3,"class","ngClass",4,"ngIf","ngIfElse"],[3,"ngClass"],[3,"src","error",4,"ngIf"],[3,"error","src"]],template:function(a,i){if(a&1&&(w(),l(0,"div",2),T(1),r(2,V,2,1,"span",3)(3,R,1,2,"ng-template",null,0,_)(5,U,1,1,"ng-template",null,1,_),o()),a&2){let f=b(4);m(i.styleClass),s("ngClass",i.containerClass())("ngStyle",i.style),h("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("data-pc-name","avatar"),c(2),s("ngIf",i.label)("ngIfElse",f)}},dependencies:[N,A,B],styles:[`@layer primeng{.p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}}
`],encapsulation:2,changeDetection:0})}return e})(),Z=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=g({type:e});static \u0275inj=p({imports:[u]})}return e})();var oe=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=g({type:e});static \u0275inj=p({imports:[u,j]})}return e})();export{Y as a,Z as b,oe as c};