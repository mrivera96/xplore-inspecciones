import{d as le}from"./chunk-3Z42Z5P2.js";import{a as ae}from"./chunk-HCFXBRVH.js";import{$a as z,A as D,Cb as ee,Db as te,E as f,G as M,Ga as R,H as S,I as b,J as T,K as a,L as c,Lb as ie,M as p,N as E,P as v,Pb as ne,Q as I,Sb as oe,Tb as re,X as m,Xb as ce,Y as w,Ya as j,Zb as se,_b as de,ea as L,fb as G,gb as q,hb as H,ib as J,j as _,k as $,ma as P,mb as K,o as A,ob as Q,p as x,pb as U,sb as W,tb as X,v as u,vb as Y,zb as Z}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import{a as k}from"./chunk-XD4PSF4R.js";function me(i,r){if(i&1){let o=E();a(0,"ion-item")(1,"ion-checkbox",8),v("ionChange",function(t){let n=A(o).$implicit,e=I(2);return x(e.onAccessoryAdd(t,n))}),m(2),c(),p(3,"ion-checkbox",9),c()}if(i&2){let o=r.$implicit;u(),f("value",o.idAccesorio)("checked",o.isInCheckin),u(),w(o.nomAccesorio),u(),f("checked",!0)}}function pe(i,r){i&1&&(a(0,"ion-item")(1,"ion-label"),m(2,"Obteniendo datos.."),c(),p(3,"ion-spinner",10),c())}function he(i,r){if(i&1&&b(0,me,4,4,"ion-item",null,S,!1,pe,4,0,"ion-item"),i&2){let o,s=I();T((o=s.currentInspection())==null?null:o.checkout_accessories)}}function _e(i,r){if(i&1){let o=E();a(0,"ion-item")(1,"ion-checkbox",8),v("ionChange",function(t){let n=A(o).$implicit,e=I(2);return x(e.onAccessoryAdd(t,n))}),m(2),c()()}if(i&2){let o=r.$implicit;u(),f("value",o.idAccesorio)("checked",o.isInCheckout),u(),w(o.nomAccesorio)}}function Ce(i,r){i&1&&(a(0,"ion-item")(1,"ion-label"),m(2,"Obteniendo datos.."),c(),p(3,"ion-spinner",10),c())}function fe(i,r){if(i&1&&b(0,_e,3,3,"ion-item",null,S,!1,Ce,4,0,"ion-item"),i&2){let o=I();T(o.accessories)}}var we=(()=>{let r=class r{constructor(){var s,t,n,e,l,d,h;this.accessoriesService=_(ae),this.alertsService=_(se),this.inspectionsService=_(le),this.navCtrl=_(j),this.router=_(R),this.accessories=this.accessoriesService.accessories(),this.currentInspection=this.inspectionsService.currentInspection,this.title=((s=this.inspectionsService.currentInspection())==null?void 0:s.stage)=="checkin"?" Checkin":" Checkout",P(()=>{this.accessories.map(C=>{var V,N,B,O;let ue=k({},C),y=((V=this.currentInspection())==null?void 0:V.stage)=="checkin"?(N=this.currentInspection())==null?void 0:N.checkout_accessories:(B=this.currentInspection())==null?void 0:B.accesoriosSalida,F=(O=this.currentInspection())==null?void 0:O.accesoriosEntrega;return y!=null&&y.some(g=>g.idAccesorio==C.idAccesorio)&&(C.isInCheckout=!0),F!=null&&F.some(g=>g.idAccesorio==C.idAccesorio)&&(C.isInCheckin=!0),ue})}),this.customer=(e=(n=(t=this.router.getCurrentNavigation())==null?void 0:t.extras)==null?void 0:n.state)==null?void 0:e.customer,this.driver=(h=(d=(l=this.router.getCurrentNavigation())==null?void 0:l.extras)==null?void 0:d.state)==null?void 0:h.driver}ngOnInit(){}onAccessoryAdd(s,t){s.target.checked?(this.accessoriesService.addCurrentAccessory(t),this.inspectionsService.currentInspection.update(n=>{var l,d;let e=k({},n);return e.stage=="checkout"?(l=e.accesoriosSalida)==null||l.push(t):(d=e.accesoriosEntrega)==null||d.push(t),e})):this.inspectionsService.currentInspection.update(n=>{var l,d;let e=k({},n);return e.stage=="checkout"?e.accesoriosSalida=(l=e.accesoriosSalida)==null?void 0:l.filter(h=>h.idAccesorio!=t.idAccesorio):e.accesoriosEntrega=(d=e.accesoriosEntrega)==null?void 0:d.filter(h=>h.idAccesorio!=t.idAccesorio),e})}goToNext(){var t,n,e;(((t=this.currentInspection())==null?void 0:t.stage)=="checkout"?(n=this.currentInspection())==null?void 0:n.accesoriosSalida.length:(e=this.currentInspection())==null?void 0:e.accesoriosEntrega.length)==0?this.alertsService.basicAlert("Atenci\xF3n!","No ha registrado ning\xFAn accesorio. \xBFDesea continuar?",[{text:"Ok",role:"ok",handler:()=>{this.navCtrl.navigateForward(["/inspections/create/notes"],{state:{customer:this.customer,driver:this.driver}})}},"Cancel"]):this.navCtrl.navigateForward(["/inspections/create/notes"],{state:{customer:this.customer,driver:this.driver}})}goToPrev(){this.navCtrl.back()}};r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=$({type:r,selectors:[["app-accessories"]],standalone:!0,features:[L],decls:22,vars:2,consts:[[3,"fullscreen"],["fixed",""],["size","12"],["slot","start"],[3,"click"],["slot","start","name","arrow-back"],["slot","end"],["slot","end","name","arrow-forward"],[3,"ionChange","value","checked"],["color","secondary","disabled","true","slot","end",3,"checked"],["color","secondary","name","crescent"]],template:function(t,n){if(t&1&&(p(0,"app-toolbar"),a(1,"ion-content",0)(2,"ion-grid",1)(3,"ion-row")(4,"ion-col",2)(5,"ion-title"),m(6,"Accesorios"),c()()(),a(7,"ion-card")(8,"ion-card-content")(9,"ion-list"),D(10,he,3,1)(11,fe,3,1),c()()()()(),a(12,"ion-footer")(13,"ion-toolbar")(14,"ion-buttons",3)(15,"ion-button",4),v("click",function(){return n.goToPrev()}),m(16," Atr\xE1s "),p(17,"ion-icon",5),c()(),a(18,"ion-buttons",6)(19,"ion-button",4),v("click",function(){return n.goToNext()}),m(20," Siguiente "),p(21,"ion-icon",7),c()()()()),t&2){let e;u(),f("fullscreen",!0),u(9),M(10,((e=n.currentInspection())==null?null:e.stage)=="checkin"?10:((e=n.currentInspection())==null?null:e.stage)=="checkout"?11:-1)}},dependencies:[ce,G,q,H,J,K,Q,U,W,X,Y,Z,ee,te,ie,ne,oe,re,z,de]});let i=r;return i})();export{we as AccessoriesComponent};