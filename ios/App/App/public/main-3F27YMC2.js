import{f as Le,h as Fe}from"./chunk-QHEGKEG4.js";import{a as Ie}from"./chunk-DTNKQRUS.js";import{a as v}from"./chunk-IKMMEWKZ.js";import{b as f}from"./chunk-OVKUN2VZ.js";import{a as xe,b as we,h as Ae,j as Te,l as be,n as Ee,o as Re}from"./chunk-7JYYFWPO.js";import{a as Pe}from"./chunk-56TNLAWK.js";import{d as ke}from"./chunk-3Z42Z5P2.js";import"./chunk-HCFXBRVH.js";import{A,Aa as $,Ba as G,Ca as K,Cb as le,Db as pe,E as m,Eb as me,Fa as J,Fb as de,G as U,Ga as g,Ha as Q,Hb as ue,Ia as X,Ib as he,Ja as Y,Jb as fe,K as n,Ka as F,Kb as ge,L as c,Lb as ve,M as d,N as D,P as h,Q as C,Qb as Ce,Ub as _e,Va as Z,Vb as Se,X as p,Xb as E,Y as T,Ya as q,Yb as ye,Z as N,_a as ee,_b as Me,e as O,ea as H,eb as te,g as S,ga as M,h as I,hb as oe,i as j,ib as ie,j as u,jb as ne,k as y,l as k,la as P,o as x,oa as V,ob as re,p as w,pb as b,tb as ae,v as s,va as L,vb as ce,wa as B,xa as z,za as W,zb as se}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import{a as R}from"./chunk-XD4PSF4R.js";var Oe=(()=>{let e=class e{constructor(){this.inspectionsServices=u(ke),this.authService=u(f),this.router=u(g),this.openInspections=P(()=>{var i;return(i=this.inspectionsServices.inspections())==null?void 0:i.filter(o=>{var r;return((r=o.state)==null?void 0:r.descEstado)=="Abierta"}).sort((o,r)=>r.idInspeccion-o.idInspeccion).slice(0,3)}),this.closedInspections=P(()=>{var i;return(i=this.inspectionsServices.inspections())==null?void 0:i.filter(o=>{var r;return((r=o.state)==null?void 0:r.descEstado)=="Cerrada"}).sort((o,r)=>r.idInspeccion-o.idInspeccion).slice(0,3)}),this.circleArrowRigth=Re,this.circleArrowLeft=Ee,this.carSide=Ae,this.folderOpen=Te,this.folderClosed=be,this.currentUser=this.authService.currentUser}ngOnInit(){this.inspectionsServices.clearState()}goToCheckOut(){this.inspectionsServices.currentInspection.update(i=>{let o=R({},i);return o.stage="checkout",o}),this.router.navigate(["inspections/create"],{state:{stage:"checkout"}})}goToCheckIn(){this.inspectionsServices.currentInspection.update(i=>{let o=R({},i);return o.stage="checkin",o}),this.router.navigate(["inspections/create"],{state:{stage:"checkin"}})}gotToReview(i){this.inspectionsServices.currentInspection.set(i),this.router.navigate(["/inspection-detail"])}goToCheckouts(){this.router.navigate(["inspections/checkout"],{state:{stage:"checkout"}})}goToCheckins(){this.router.navigate(["inspections/checkin"],{state:{stage:"checkin"}})}onLogout(){this.authService.logout()}handleRefresh(i){this.inspectionsServices.loadData(),i.target.complete()}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=y({type:e,selectors:[["app-home"]],standalone:!0,features:[H],decls:35,vars:4,consts:[["slot","fixed",3,"ionRefresh"],["fixed",""],["button","",2,"text-align","center","border-radius","10px",3,"click"],["size","7x",2,"color","var(--ion-color-primary)",3,"icon"]],template:function(o,r){o&1&&(d(0,"app-toolbar"),n(1,"ion-content")(2,"ion-refresher",0),h("ionRefresh",function(ze){return r.handleRefresh(ze)}),d(3,"ion-refresher-content"),c(),n(4,"ion-grid",1)(5,"ion-row")(6,"ion-col")(7,"ion-card",2),h("click",function(){return r.goToCheckOut()}),n(8,"ion-card-header"),d(9,"fa-icon",3),c(),n(10,"ion-card-content")(11,"h2"),p(12,"Inspecci\xF3n de salida"),c()()()(),n(13,"ion-col")(14,"ion-card",2),h("click",function(){return r.goToCheckIn()}),n(15,"ion-card-header"),d(16,"fa-icon",3),c(),n(17,"ion-card-content")(18,"h2"),p(19,"Inspecci\xF3n de entrada"),c()()()()(),n(20,"ion-row")(21,"ion-col")(22,"ion-card",2),h("click",function(){return r.goToCheckouts()}),n(23,"ion-card-header"),d(24,"fa-icon",3),c(),n(25,"ion-card-content")(26,"h2"),p(27,"Inspecciones abiertas"),c()()()(),n(28,"ion-col")(29,"ion-card",2),h("click",function(){return r.goToCheckins()}),n(30,"ion-card-header"),d(31,"fa-icon",3),c(),n(32,"ion-card-content")(33,"h2"),p(34,"Inspecciones cerradas"),c()()()()()()()),o&2&&(s(9),m("icon",r.circleArrowRigth),s(7),m("icon",r.circleArrowLeft),s(8),m("icon",r.folderOpen),s(7),m("icon",r.folderClosed))},dependencies:[E,oe,ie,ne,re,b,ae,fe,ge,ve,we,xe,Me],styles:["ion-card[_ngcontent-%COMP%]:hover{--ion-background-color:var(--ion-color-secondary);color:#fff}"]});let t=e;return t})();var je=(()=>{let e=class e{constructor(i){this.router=i,this.authService=u(f)}canActivate(){return this.authService.currentUser()==null?!0:(this.router.navigate(["/home"]),!1)}};e.\u0275fac=function(o){return new(o||e)(j(g))},e.\u0275prov=S({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var Ge=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",component:Oe,canActivate:[v]},{path:"inspections",loadChildren:()=>import("./chunk-JKHEP3N7.js").then(t=>t.InspectionsPageModule),canActivate:[v]},{path:"login",loadChildren:()=>import("./chunk-U7YVN6DB.js").then(t=>t.LoginPageModule),canActivate:[je]},{path:"damage-types",loadChildren:()=>import("./chunk-SHL47CXW.js").then(t=>t.DamageTypesPageModule),canActivate:[v]},{path:"auto-parts",loadChildren:()=>import("./chunk-OGRXSERA.js").then(t=>t.AutoPartsPageModule),canActivate:[v]},{path:"accessories",loadChildren:()=>import("./chunk-LNJGSZJR.js").then(t=>t.AccessoriesPageModule),canActivate:[v]},{path:"**",redirectTo:"home",pathMatch:"full"}],Ue=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=k({type:e}),e.\u0275inj=I({imports:[F.forRoot(Ge,{preloadingStrategy:Y}),F]});let t=e;return t})();var De=t=>[t];function Ke(t,e){if(t&1&&(n(0,"ion-menu-toggle",6)(1,"ion-item",12),d(2,"ion-icon",8),n(3,"ion-label"),p(4),c()()()),t&2){let l=e.$implicit;s(),m("routerLink",M(4,De,l.url)),s(),m("ios",l.icon+"-outline")("md",l.icon+"-sharp"),s(2),T(l.title)}}function Je(t,e){if(t&1&&(n(0,"ion-menu-toggle",6)(1,"ion-item",12),d(2,"ion-icon",8),n(3,"ion-label"),p(4),c()()()),t&2){let l=e.$implicit;s(),m("routerLink",M(4,De,l.url)),s(),m("ios",l.icon+"-outline")("md",l.icon+"-sharp"),s(2),T(l.title)}}function Qe(t,e){if(t&1){let l=D();n(0,"ion-menu",1)(1,"ion-content")(2,"ion-list",3)(3,"ion-list-header",4)(4,"ion-label"),p(5),c()(),n(6,"ion-note"),p(7),c(),A(8,Ke,5,6,"ion-menu-toggle",5),n(9,"ion-menu-toggle",6)(10,"ion-item",7),h("click",function(){x(l);let o=C();return w(o.goToCheckouts())}),d(11,"ion-icon",8),n(12,"ion-label"),p(13,"Inspecciones abiertas"),c()()(),n(14,"ion-menu-toggle",6)(15,"ion-item",7),h("click",function(){x(l);let o=C();return w(o.goToCheckins())}),d(16,"ion-icon",8),n(17,"ion-label"),p(18,"Inspecciones cerradas"),c()()()(),n(19,"ion-list",9)(20,"ion-list-header"),p(21,"Ajustes"),c(),A(22,Je,5,6,"ion-menu-toggle",5),c(),n(23,"ion-list")(24,"ion-list-header"),p(25,"Opciones"),c(),n(26,"ion-menu-toggle",6)(27,"ion-item",10),h("click",function(){x(l);let o=C();return w(o.onLogout())}),d(28,"ion-icon",11),n(29,"ion-label"),p(30,"Salir"),c()()()()()()}if(t&2){let l,i,o=C();s(5),N(" ",(l=o.currentUser())==null?null:l.nomUsuario," "),s(2),T((i=o.currentUser())==null?null:i.nickUsuario),s(),m("ngForOf",o.appPages),s(3),m("ios","folder-open-outline")("md","folder-open-sharp"),s(5),m("ios","folder-outline")("md","folder-sharp"),s(6),m("ngForOf",o.labels)}}Pe();var Ne=(()=>{let e=class e{constructor(){this.authService=u(f),this.navController=u(q),this.router=u(g),this.appPages=[{title:"Inicio",url:"/home",icon:"home"}],this.labels=[{title:"Tipos de Da\xF1os",icon:"list-circle",url:"/damage-types"},{title:"Piezas",icon:"list-circle",url:"/auto-parts"},{title:"Accesorios",icon:"list-circle",url:"/accessories"}],this.currentUser=this.authService.currentUser}onLogout(){this.authService.logout(),this.navController.navigateRoot("/login")}goToCheckouts(){this.router.navigate(["inspections/checkout"],{state:{stage:"checkout"}})}goToCheckins(){this.router.navigate(["inspections/checkin"],{state:{stage:"checkin"}})}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=y({type:e,selectors:[["app-root"]],decls:4,vars:1,consts:[["contentId","main-content"],["contentId","main-content","type","overlay"],["id","main-content"],["id","inbox-list"],[2,"margin-bottom","20px"],["auto-hide","false",4,"ngFor","ngForOf"],["auto-hide","false"],["routerDirection","root","lines","none","detail","false","routerLinkActive","selected",3,"click"],["aria-hidden","true","slot","start",3,"ios","md"],["id","labels-list"],["lines","none","detail","false",3,"click"],["aria-hidden","true","slot","start","ios","log-out-outline","md","log-out-sharp"],["routerDirection","root","lines","none","detail","false","routerLinkActive","selected",3,"routerLink"]],template:function(o,r){o&1&&(n(0,"ion-app")(1,"ion-split-pane",0),A(2,Qe,31,8,"ion-menu",1),d(3,"ion-router-outlet",2),c()()),o&2&&(s(2),U(2,r.currentUser()!=null?2:-1))},dependencies:[V,te,b,ce,se,le,pe,me,de,ue,he,Ce,_e,Se,Q,X]});let t=e;return t})();var He=(()=>{let e=class e{constructor(){this.authService=u(f)}intercept(i,o){let r=this.authService.currentUser();if(r&&r.access_token){let a=new L;a=a.set("Content-Type","application/json"),a=a.set("Authorization",`Bearer ${r.access_token}`),a=a.set("Access-Control-Allow-Origin","*"),a=a.set("Access-Control-Allow-Credentials","true"),i=i.clone({headers:a})}else{let a=new L;a=a.set("Content-Type","application/json"),a=a.set("Access-Control-Allow-Origin","*"),a=a.set("Access-Control-Allow-Credentials","true"),i=i.clone({headers:a})}return o.handle(i).pipe(O(()=>{},a=>{if(a instanceof B){if(a.status!=z.Unauthorized)return;this.authService.logout()}}))}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=S({token:e,factory:e.\u0275fac});let t=e;return t})();var Ve=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=k({type:e,bootstrap:[Ne]}),e.\u0275inj=I({providers:[f,{provide:W,useClass:He,multi:!0},{provide:J,useClass:ee}],imports:[K,E.forRoot(),Ue,$,Ie,Z]});let t=e;return t})();var Xe=()=>Fe(),Be=(t,e)=>typeof window>"u"?Promise.resolve():Xe().then(()=>Le([["pwa-camera-modal",[[1,"pwa-camera-modal",{facingMode:[1,"facing-mode"],present:[64],dismiss:[64]}]]],["pwa-action-sheet",[[1,"pwa-action-sheet",{header:[1],cancelable:[4],options:[16],open:[32]}]]],["pwa-toast",[[1,"pwa-toast",{message:[1],duration:[2],closing:[32]}]]],["pwa-camera",[[1,"pwa-camera",{facingMode:[1,"facing-mode"],handlePhoto:[16],handleNoDeviceError:[16],noDevicesText:[1,"no-devices-text"],noDevicesButtonText:[1,"no-devices-button-text"],photo:[32],photoSrc:[32],showShutterOverlay:[32],flashIndex:[32],hasCamera:[32],rotation:[32],deviceError:[32]}]]],["pwa-camera-modal-instance",[[1,"pwa-camera-modal-instance",{facingMode:[1,"facing-mode"],noDevicesText:[1,"no-devices-text"],noDevicesButtonText:[1,"no-devices-button-text"]},[[16,"keyup","handleBackdropKeyUp"]]]]]],e));Be(window);ye.production&&void 0;G().bootstrapModule(Ve).catch(t=>console.log(t));
