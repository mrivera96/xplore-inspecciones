import{a as U}from"./chunk-TO77FLXM.js";import{A as b,Cb as L,Db as O,G as x,H as v,I as S,J as T,Jb as G,K as i,Ka as C,Kb as q,L as o,Lb as H,M as a,N as y,P as f,Pb as J,Q as _,Sb as K,Va as w,X as m,Xb as Q,Y as A,Ya as z,Z as E,_b as u,h as p,hb as R,ib as k,j as h,k as P,l as d,o as g,ob as D,p as I,pb as M,qb as N,rb as j,tb as V,ua as F,v as c,vb as $,zb as B}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import"./chunk-XD4PSF4R.js";function te(t,e){if(t&1){let l=y();i(0,"ion-item",9),f("click",function(){let n=g(l).$implicit,s=_(2);return I(s.goToDetail(n))}),a(1,"ion-icon",10),i(2,"ion-label",11)(3,"h2"),m(4),o(),i(5,"p"),m(6),o()()()}if(t&2){let l=e.$implicit;c(4),A(l.descPieza),c(2),E("Pieza No.: ",l.idPieza,"")}}function ie(t,e){t&1&&(i(0,"ion-item",8),a(1,"ion-icon",12),i(2,"ion-label"),m(3,"No se encontraron piezas"),o()())}function oe(t,e){if(t&1&&(i(0,"ion-list"),S(1,te,7,2,"ion-item",7,v,!1,ie,4,0,"ion-item",8),o()),t&2){let l=_();c(),T(l.autoParts())}}function ne(t,e){t&1&&(i(0,"ion-item"),a(1,"ion-icon",12),i(2,"ion-label"),m(3,"Obteniendo datos.."),o(),a(4,"ion-spinner",13),o())}var X=(()=>{let e=class e{constructor(){this.autoPartsService=h(U),this.navCtrl=h(z),this.autoParts=this.autoPartsService.autoParts}ngOnInit(){}goToDetail(r){this.navCtrl.navigateForward([`auto-parts/detail/${r.idPieza}`])}goToCreate(){this.navCtrl.navigateForward(["auto-parts/create"])}handleRefresh(r){this.autoPartsService.loadData(),r.target.complete()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=P({type:e,selectors:[["app-auto-parts"]],decls:16,vars:1,consts:[["slot","fixed",3,"ionRefresh"],["fixed",""],["size","12"],[2,"border-radius","10px"],["vertical","bottom","horizontal","end","slot","fixed"],["aria-labelledby","Agregar pieza","aria-label","Agregar una pieza",3,"click"],["name","add"],["detail","true","button",""],["lines","none"],["detail","true","button","",3,"click"],["color","primary","slot","start","name","ellipse"],["color","secondary"],["slot","start","name","alert-circle"],["color","secondary","name","crescent"]],template:function(n,s){n&1&&(a(0,"app-toolbar"),i(1,"ion-content")(2,"ion-refresher",0),f("ionRefresh",function(ee){return s.handleRefresh(ee)}),a(3,"ion-refresher-content"),o(),i(4,"ion-grid",1)(5,"ion-row")(6,"ion-col",2)(7,"ion-title"),m(8,"Piezas"),o()()()(),i(9,"ion-card",3)(10,"ion-card-content"),b(11,oe,4,1,"ion-list")(12,ne,5,0),o()(),i(13,"ion-fab",4)(14,"ion-fab-button",5),f("click",function(){return s.goToCreate()}),a(15,"ion-icon",6),o()()()),n&2&&(c(11),x(11,s.autoParts().length>0?11:12))},dependencies:[R,k,D,M,N,j,V,$,B,L,O,G,q,H,J,K,u]});let t=e;return t})();var re=[{path:"",component:X},{path:"detail/:id",loadComponent:()=>import("./chunk-6RTWCZ5F.js").then(t=>t.AutoPartDetailComponent)},{path:"create",loadComponent:()=>import("./chunk-6RTWCZ5F.js").then(t=>t.AutoPartDetailComponent)}],Y=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=d({type:e}),e.\u0275inj=p({imports:[C.forChild(re),C]});let t=e;return t})();var ve=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=d({type:e}),e.\u0275inj=p({imports:[F,w,Q,Y,u]});let t=e;return t})();export{ve as AutoPartsPageModule};
