import{a as F,b as H,c as Q}from"./chunk-QUEPENYH.js";import{a as W}from"./chunk-RABS6FVZ.js";import"./chunk-XC4KBJWX.js";import{g as B,h as R,i as j,j as D}from"./chunk-GS7ZRR4M.js";import{k as E,r as I,t as y}from"./chunk-WDQTWRWB.js";import{Ab as x,Eb as s,Fb as d,Jb as S,Kb as A,Lb as M,Mb as m,Nb as c,Oa as N,Pb as T,Ra as f,Sa as g,Vb as C,Wb as V,Xb as w,Ya as L,ba as k,hb as h,ka as u,la as p,lb as b,qb as O,ub as i,vb as n,wa as P,wb as l}from"./chunk-IYQR6SBG.js";import"./chunk-DM275RSA.js";var q=["navbar"],z=()=>({exact:!0}),U=r=>({"d-none":r});function J(r,K){if(r&1){let o=x();i(0,"li",20)(1,"span",23),c(2),n(),l(3,"p-avatar",24),i(4,"div",25)(5,"ul",26)(6,"li",27)(7,"a",28),s("click",function(){u(o),d();let t=m(31);return p(t.click())}),c(8,"Articles "),l(9,"i",29),n()(),i(10,"li",27)(11,"a",30),s("click",function(){u(o),d();let t=m(31);return p(t.click())}),c(12,"BookMarks "),l(13,"i",29),n()(),i(14,"li",27)(15,"a",31),s("click",function(){u(o),d();let t=m(31);return p(t.click())}),i(16,"span"),l(17,"i",32),c(18," History"),n(),l(19,"i",29),n()(),i(20,"li",27)(21,"a",33),s("click",function(){u(o),d();let t=m(31);return p(t.click())}),i(22,"span"),l(23,"i",34),c(24," Settings"),n(),l(25,"i",29),n()(),i(26,"li",35)(27,"a",36),s("click",function(){u(o);let t=d(),a=m(31);return t.logOut(),p(a.click())}),l(28,"i",37),c(29," LOGOUT"),n()()()()()}if(r&2){let o=d();f(2),T("",o.userName," "),f(24),b("ngClass",w(2,U,!o.isLogIn))}}var Y=(()=>{class r{constructor(o,e,t,a){this._Renderer2=o,this._PLATFORM_ID=e,this._CookieService=t,this._Router=a,this.isLogIn=!1,this.userName=""}ngOnInit(){console.log(this.isLoggedIn())}onWindowScroll(){scrollY>500?this._Renderer2.addClass(this.navbar.nativeElement,"active"):this._Renderer2.removeClass(this.navbar.nativeElement,"active")}isLoggedIn(){y(this._PLATFORM_ID)&&(localStorage.getItem("token")?(this.userName=(localStorage.getItem("userName")||"").replaceAll('"',"").split("").slice(0,15).join(""),this.isLogIn=!0):this.isLogIn=!1)}logOut(){y(this._PLATFORM_ID)&&(localStorage.removeItem("token"),localStorage.removeItem("userName"),localStorage.clear(),this._Router.navigate(["/login"]))}static{this.\u0275fac=function(e){return new(e||r)(g(L),g(P),g(W),g(R))}}static{this.\u0275cmp=k({type:r,selectors:[["app-protocols-navbar"]],viewQuery:function(e,t){if(e&1&&S(q,5),e&2){let a;A(a=M())&&(t.navbar=a.first)}},hostBindings:function(e,t){e&1&&s("scroll",function(){return t.onWindowScroll()},!1,N)},standalone:!0,features:[C],decls:33,vars:6,consts:[["navbar",""],["toggleNavBar",""],[1,"navbar","d-block","navbar-expand-lg","bg-body-tertiary","p-0","shadow-lg","fixed-top","position-absolute"],[1,"navbar","position-relative"],[1,"container","py-1"],["href","#",1,"navbar-brand"],["width","70px","src","./assets/app_logo.png","alt","\u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629",1,"d-sm-none"],["width","70px","src","./assets/logo.png","alt","\u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629",1,"d-none","d-sm-block","d-xl-none"],["width","100px","src","./assets/HCAEn.png","alt","\u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629",1,"d-none","d-xl-block"],[1,"d-flex","align-items-center","gap-2"],["id","navbarSupportedContent",1,"collapse","navbar-collapse","px-0","px-lg-3","px-lg-0"],[1,"navbar-nav","ms-auto","mb-0"],[1,"nav-item","px-2","py-1"],["aria-current","page","routerLinkActive","active","routerLink","/",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click","routerLinkActiveOptions"],["routerLinkActive","active","routerLink","/about",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click"],["routerLinkActive","active","routerLink","/protocols/protocols-categories",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click"],["routerLinkActive","active","routerLink","/news-letters",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click"],["routerLinkActive","active","routerLink","/contact-us",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click"],[1,"nav-item","px-2","py-1",3,"ngClass"],["routerLinkActive","active","routerLink","/login",1,"nav-link","title__fonts","fw-bold","fs-14",3,"click"],[1,"nav-item","position-relative","px-2","user__name","py-1","d-flex","justify-content-start","align-items-center"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarSupportedContent","aria-controls","navbarSupportedContent","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler","btn-secondary","p-2","rounded-1"],[1,"fa-solid","fa-bars","fs-1"],[1,"nav-link","title__fonts","fw-bold","fs-14","text-uppercase"],["icon","pi pi-user","styleClass","mr-2","size","normal","shape","circle",1,"ms-2"],[1,"user__name__dropdown","position-absolute","top-100","start-0","w-100"],[1,"list-unstyled","bg-body-tertiary","p-0"],[1,"nav-item","w-100","px-1"],["routerLink","/guidelines",1,"text-uppercase","nav-link","title__fonts","fw-bold","fs-14","w-100","px-2","py-1","d-flex","justify-content-between","align-items-center",3,"click"],[1,"fa-solid","fa-chevron-right"],["routerLink","/protocols/bookmark",1,"text-uppercase","nav-link","title__fonts","fw-bold","fs-14","w-100","px-2","py-1","d-flex","justify-content-between","align-items-center",3,"click"],["routerLink","/protocols/history",1,"text-uppercase","nav-link","title__fonts","fw-bold","fs-14","w-100","px-2","py-1","d-flex","justify-content-between","align-items-center",3,"click"],[1,"pi","pi-history","me-1"],["routerLink","/settings",1,"text-uppercase","nav-link","title__fonts","fw-bold","fs-14","w-100","px-2","py-1","d-flex","justify-content-between","align-items-center",3,"click"],[1,"pi-cog","pi","me-1"],["data-bs-toggle","collapse","data-bs-target","#navbarSupportedContent",1,"nav-item","w-100","px-1",3,"ngClass"],["routerLink","/login",1,"nav-link","title__fonts","fw-bold","fs-14","w-100","px-2","py-1",3,"click"],[1,"pi","pi-sign-out","me-1"]],template:function(e,t){if(e&1){let a=x();i(0,"nav",2,0)(2,"div",3)(3,"div",4)(4,"a",5),l(5,"img",6)(6,"img",7)(7,"img",8),n(),i(8,"div",9)(9,"div",10)(10,"ul",11)(11,"li",12)(12,"a",13),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(13,"HOME "),n()(),i(14,"li",12)(15,"a",14),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(16,"ABOUT "),n()(),i(17,"li",12)(18,"a",15),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(19,"PROTOCOLS "),n()(),i(20,"li",12)(21,"a",16),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(22,"NEWSLETTERS "),n()(),i(23,"li",12)(24,"a",17),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(25,"CONTACT US "),n()(),i(26,"li",18)(27,"a",19),s("click",function(){u(a);let _=m(31);return p(_.click())}),c(28,"LOGIN"),n()(),h(29,J,30,4,"li",20),n()(),i(30,"button",21,1),l(32,"i",22),n()()()()()}e&2&&(f(12),b("routerLinkActiveOptions",V(3,z)),f(14),b("ngClass",w(4,U,t.isLogIn)),f(3),O(29,t.isLogIn?29:-1))},dependencies:[j,D,I,E,H,F,Q],styles:[".navbar__banner[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{border-right:1px solid rgba(255,255,255,.1)}.navbar__banner[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-left:1px solid rgba(255,255,255,.1)}.navbar__banner[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;padding-inline:15px;padding-block:10px;color:#fff;text-decoration:none;transition:all .5s}.navbar__banner[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#ffffffc1}.navbar.active[_ngcontent-%COMP%]{position:fixed!important;animation:_ngcontent-%COMP%_NavBar__Animation .5s forwards}@keyframes _ngcontent-%COMP%_NavBar__Animation{0%{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}"]})}}return r})();var _e=(()=>{class r{static{this.\u0275fac=function(e){return new(e||r)}}static{this.\u0275cmp=k({type:r,selectors:[["app-protocol-layout"]],standalone:!0,features:[C],decls:2,vars:0,template:function(e,t){e&1&&l(0,"app-protocols-navbar")(1,"router-outlet")},dependencies:[Y,B],styles:["[_nghost-%COMP%]{padding-top:150px}"]})}}return r})();export{_e as ProtocolLayoutComponent};