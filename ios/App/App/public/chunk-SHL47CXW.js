import{a as U}from"./chunk-WUM67DLH.js";import{A as I,Cb as L,Db as O,G as b,H as x,I as D,J as v,Jb as G,K as i,Ka as h,Kb as q,L as n,Lb as H,M as r,N as S,P as f,Pb as J,Q as T,Sb as K,Va as R,X as l,Xb as Q,Y as F,Ya as k,Z as E,_b as g,h as c,hb as M,ib as N,j as u,k as y,l as d,o as _,ob as P,p as C,pb as j,qb as V,rb as $,tb as z,ua as w,v as p,vb as A,zb as B}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import"./chunk-XD4PSF4R.js";function te(t,e){if(t&1){let m=S();i(0,"ion-item",9),f("click",function(){let o=_(m).$implicit,s=T(2);return C(s.goToDetail(o))}),r(1,"ion-icon",10),i(2,"ion-label",11)(3,"h2"),l(4),n(),i(5,"p"),l(6),n()()()}if(t&2){let m=e.$implicit;p(4),F(m.descTipoDanio),p(2),E("Tipo de Da\xF1o No.: ",m.idTipoDanio,"")}}function ie(t,e){t&1&&(i(0,"ion-item",8),r(1,"ion-icon",12),i(2,"ion-label"),l(3,"No se encontraron tipos de da\xF1os"),n()())}function ne(t,e){if(t&1&&(i(0,"ion-list"),D(1,te,7,2,"ion-item",7,x,!1,ie,4,0,"ion-item",8),n()),t&2){let m=T();p(),v(m.damageTypes())}}function oe(t,e){t&1&&(i(0,"ion-item"),r(1,"ion-icon",12),i(2,"ion-label"),l(3,"Obteniendo datos.."),n(),r(4,"ion-spinner",13),n())}var X=(()=>{let e=class e{constructor(){this.damageTypesService=u(U),this.navCtrl=u(k),this.damageTypes=this.damageTypesService.damageTypes}ngOnInit(){}goToDetail(a){this.navCtrl.navigateForward([`damage-types/detail/${a.idTipoDanio}`])}goToCreate(){this.navCtrl.navigateForward(["damage-types/create"])}handleRefresh(a){this.damageTypesService.loadData(),a.target.complete()}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=y({type:e,selectors:[["app-damage-types"]],decls:16,vars:1,consts:[["slot","fixed",3,"ionRefresh"],["fixed",""],["size","12"],[2,"border-radius","10px"],["vertical","bottom","horizontal","end","slot","fixed"],["aria-labelledby","Agregar tipo de da\xF1o","aria-label","Agregar tipo de da\xF1o",3,"click"],["name","add"],["detail","true","button",""],["lines","none"],["detail","true","button","",3,"click"],["slot","start","color","primary","name","ellipse"],["color","secondary"],["slot","start","name","alert-circle"],["color","secondary","name","crescent"]],template:function(o,s){o&1&&(r(0,"app-toolbar"),i(1,"ion-content")(2,"ion-refresher",0),f("ionRefresh",function(ee){return s.handleRefresh(ee)}),r(3,"ion-refresher-content"),n(),i(4,"ion-grid",1)(5,"ion-row")(6,"ion-col",2)(7,"ion-title"),l(8,"Tipos de Da\xF1os"),n()()()(),i(9,"ion-card",3)(10,"ion-card-content"),I(11,ne,4,1,"ion-list")(12,oe,5,0),n()(),i(13,"ion-fab",4)(14,"ion-fab-button",5),f("click",function(){return s.goToCreate()}),r(15,"ion-icon",6),n()()()),o&2&&(p(11),b(11,s.damageTypes().length>0?11:12))},dependencies:[M,N,P,j,V,$,z,A,B,L,O,G,q,H,J,K,g]});let t=e;return t})();var ae=[{path:"",component:X},{path:"detail/:id",loadComponent:()=>import("./chunk-OFJHFZTU.js").then(t=>t.DamageTypeDetailComponent)},{path:"create",loadComponent:()=>import("./chunk-OFJHFZTU.js").then(t=>t.DamageTypeDetailComponent)}],Y=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=d({type:e}),e.\u0275inj=c({imports:[h.forChild(ae),h]});let t=e;return t})();var xe=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=d({type:e}),e.\u0275inj=c({imports:[w,R,Q,Y,g]});let t=e;return t})();export{xe as DamageTypesPageModule};