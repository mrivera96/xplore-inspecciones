import{a as K}from"./chunk-HCFXBRVH.js";import{A as x,Cb as O,Db as R,G as v,H as y,I as S,J as A,K as i,Ka as h,L as n,Lb as G,M as a,N as T,P as C,Pb as q,Q as _,Sb as H,Va as k,X as s,Xb as J,Y as F,Ya as D,Z as w,_b as f,h as d,hb as M,ib as N,j as u,k as g,l as p,o as I,ob as j,p as b,pb as P,qb as V,rb as $,tb as z,ua as E,v as l,vb as B,zb as L}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import"./chunk-XD4PSF4R.js";function X(t,e){if(t&1){let c=T();i(0,"ion-item",8),C("click",function(){let o=I(c).$implicit,m=_(2);return b(m.goToDetail(o))}),a(1,"ion-icon",9),i(2,"ion-label",10)(3,"h2"),s(4),n(),i(5,"p"),s(6),n()()()}if(t&2){let c=e.$implicit;l(4),F(c.nomAccesorio),l(2),w("Accesorio No.: ",c.idAccesorio,"")}}function Y(t,e){t&1&&(i(0,"ion-item",7),a(1,"ion-icon",11),i(2,"ion-label"),s(3,"No se encontraron accesorios"),n()())}function Z(t,e){if(t&1&&(i(0,"ion-list"),S(1,X,7,2,"ion-item",6,y,!1,Y,4,0,"ion-item",7),n()),t&2){let c=_();l(),A(c.accessories())}}function ee(t,e){t&1&&(i(0,"ion-item"),a(1,"ion-icon",11),i(2,"ion-label"),s(3,"Obteniendo datos.."),n(),a(4,"ion-spinner",12),n())}var U=(()=>{let e=class e{constructor(){this.accessoriesService=u(K),this.navCtrl=u(D),this.accessories=this.accessoriesService.accessories}ngOnInit(){}goToDetail(r){this.navCtrl.navigateForward([`accessories/detail/${r.idAccesorio}`])}goToCreate(){this.navCtrl.navigateForward(["accessories/create"])}handleRefresh(r){this.accessoriesService.loadData(),r.target.complete()}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=g({type:e,selectors:[["app-accessories"]],decls:14,vars:1,consts:[["fixed",""],["size","12"],[2,"border-radius","10px"],["vertical","bottom","horizontal","end","slot","fixed"],["aria-labelledby","Agregar accesorio","aria-label","Agregar una accesorio",3,"click"],["name","add"],["detail","true","button",""],["lines","none"],["detail","true","button","",3,"click"],["color","primary","slot","start","name","ellipse"],["color","secondary"],["slot","start","name","alert-circle"],["color","secondary","name","crescent"]],template:function(o,m){o&1&&(a(0,"app-toolbar"),i(1,"ion-content")(2,"ion-grid",0)(3,"ion-row")(4,"ion-col",1)(5,"ion-title"),s(6,"Accesorios"),n()()()(),i(7,"ion-card",2)(8,"ion-card-content"),x(9,Z,4,1,"ion-list")(10,ee,5,0),n()(),i(11,"ion-fab",3)(12,"ion-fab-button",4),C("click",function(){return m.goToCreate()}),a(13,"ion-icon",5),n()()()),o&2&&(l(9),v(9,m.accessories().length>0?9:10))},dependencies:[M,N,j,P,V,$,z,B,L,O,R,G,q,H,f]});let t=e;return t})();var te=[{path:"",component:U},{path:"detail/:id",loadComponent:()=>import("./chunk-ZV4MWWWJ.js").then(t=>t.AccessoryDetailComponent)},{path:"create",loadComponent:()=>import("./chunk-ZV4MWWWJ.js").then(t=>t.AccessoryDetailComponent)}],W=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=p({type:e}),e.\u0275inj=d({imports:[h.forChild(te),h]});let t=e;return t})();var be=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=p({type:e}),e.\u0275inj=d({imports:[E,k,J,W,f]});let t=e;return t})();export{be as AccessoriesPageModule};