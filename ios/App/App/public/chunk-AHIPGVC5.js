import{d as ae}from"./chunk-VPIOKAOU.js";import"./chunk-HCFXBRVH.js";import{A as W,Db as ee,E as s,Eb as te,G as D,Ga as V,K as r,L as a,M,Ma as F,N as P,P as c,Q as N,Qa as j,Tb as ne,Va as G,X as S,Xb as oe,Ya as H,Zb as ie,_b as se,aa as p,ba as u,ca as m,cb as q,ea as R,fb as z,gb as J,hb as K,ib as Q,j as L,k as B,o as w,p as O,pb as U,sb as X,tb as Y,v as l,vb as Z,yb as x,zb as $}from"./chunk-UWOWUE4S.js";import"./chunk-BSN2JFBO.js";import"./chunk-ON2Z5523.js";import"./chunk-JNTQS7SG.js";import"./chunk-4PGTP63H.js";import"./chunk-HC6MZPB3.js";import"./chunk-QRDTLJMM.js";import"./chunk-SNYBEKMS.js";import"./chunk-5GDE5I7K.js";import"./chunk-CUAZPCFG.js";import"./chunk-KYGY6K7Z.js";import"./chunk-5AWJTBLE.js";import"./chunk-C4BIBDV4.js";import"./chunk-4537AK5U.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import"./chunk-2EOHHFOF.js";import"./chunk-JXIEZMHN.js";import"./chunk-2UEEUHXC.js";import"./chunk-MCRJI3T3.js";import"./chunk-FOZNFNPM.js";import"./chunk-G5HA7YTQ.js";import{a as T,e as A}from"./chunk-XD4PSF4R.js";function re(g,d){if(g&1){let k=P();r(0,"ion-item")(1,"ion-input",12),m("ngModelChange",function(t){w(k);let e=N();return u(e.notas.otrasObservacionesEntrega,t)||(e.notas.otrasObservacionesEntrega=t),O(t)}),c("ionChange",function(){w(k);let t=N();return O(t.updateNotes())}),a()()}if(g&2){let k=N();l(),p("ngModel",k.notas.otrasObservacionesEntrega)}}var ye=(()=>{let d=class d{constructor(){var i,t,e,o,n,_,h,C,b,y,v,I,f;this.inspectionsService=L(ae),this.alertsService=L(ie),this.navCtrl=L(H),this.router=L(V),this.notas={},this.currentInspection=this.inspectionsService.currentInspection,this.title=((i=this.inspectionsService.currentInspection())==null?void 0:i.stage)=="checkin"?" Checkin":" Checkout",this.notas={comentariosBateria:(t=this.currentInspection())==null?void 0:t.comentariosBateria,comentariosLlantasDelanteras:(e=this.currentInspection())==null?void 0:e.comentariosLlantasDelanteras,comentariosLlantasTraseras:(o=this.currentInspection())==null?void 0:o.comentariosLlantasTraseras,comentariosLlantaRepuesto:(n=this.currentInspection())==null?void 0:n.comentariosLlantaRepuesto,otrasObservacionesSalida:(_=this.currentInspection())==null?void 0:_.otrasObservacionesSalida,otrasObservacionesEntrega:(h=this.currentInspection())==null?void 0:h.otrasObservacionesEntrega},this.customer=(y=(b=(C=this.router.getCurrentNavigation())==null?void 0:C.extras)==null?void 0:b.state)==null?void 0:y.customer,this.driver=(f=(I=(v=this.router.getCurrentNavigation())==null?void 0:v.extras)==null?void 0:I.state)==null?void 0:f.driver}ngOnInit(){}ngOnDestroy(){this.notas={}}goToNext(){return A(this,null,function*(){var i;((i=this.currentInspection())==null?void 0:i.stage)=="checkout"?this.saveCheckout():this.saveCheckin(),this.navCtrl.navigateForward(["/inspections/create/signing"],{state:{customer:this.customer,driver:this.driver}})})}saveCheckout(){this.currentInspection.update(i=>{let t=T({},i);return t.comentariosLlantasDelanteras=this.notas.comentariosLlantasDelanteras,t.comentariosLlantasTraseras=this.notas.comentariosLlantasTraseras,t.comentariosLlantaRepuesto=this.notas.comentariosLlantaRepuesto,t.comentariosBateria=this.notas.comentariosBateria,t.otrasObservacionesSalida=this.notas.otrasObservacionesSalida,t.otrasObservacionesEntrega=this.notas.otrasObservacionesEntrega,t})}saveCheckin(){this.currentInspection.update(i=>{let t=T({},i);return t.comentariosLlantasDelanteras=this.notas.comentariosLlantasDelanteras,t.comentariosLlantasTraseras=this.notas.comentariosLlantasTraseras,t.comentariosLlantaRepuesto=this.notas.comentariosLlantaRepuesto,t.comentariosBateria=this.notas.comentariosBateria,t.otrasObservacionesSalida=this.notas.otrasObservacionesSalida,t.otrasObservacionesEntrega=this.notas.otrasObservacionesEntrega,t})}updateNotes(){var i;((i=this.currentInspection())==null?void 0:i.stage)=="checkout"?this.saveCheckout():this.saveCheckin()}goToPrev(){this.navCtrl.back()}};d.\u0275fac=function(t){return new(t||d)},d.\u0275cmp=B({type:d,selectors:[["app-additional-notes"]],standalone:!0,features:[R],decls:30,vars:17,consts:[[3,"fullscreen"],["fixed",""],["labelPlacement","stacked","type","text","label","Notas Llantas Delanteras",3,"ngModelChange","ionChange","readonly","ngModel","disabled"],["labelPlacement","stacked","type","text","label","Notas Llantas Traseras",3,"ngModelChange","ionChange","readonly","ngModel","disabled"],["labelPlacement","stacked","type","text","label","Notas Llanta de Repuesto",3,"ngModelChange","ionChange","readonly","ngModel","disabled"],["labelPlacement","stacked","type","text","label","Notas Bater\xEDa",3,"ngModelChange","ionChange","ngModel","readonly","disabled"],["labelPlacement","stacked","type","text","label","Otras Observaciones Salida",3,"ngModelChange","ionChange","ngModel","disabled","readonly"],["slot","start"],[3,"click"],["slot","start","name","arrow-back"],["slot","end"],["slot","end","name","arrow-forward"],["labelPlacement","stacked","type","text","label","Observaciones de Entrada",3,"ngModelChange","ionChange","ngModel"]],template:function(t,e){if(t&1&&(M(0,"app-toolbar"),r(1,"ion-content",0)(2,"ion-grid",1)(3,"ion-card")(4,"ion-card-content")(5,"ion-list")(6,"ion-list-header")(7,"h3"),S(8,"Notas"),a()(),r(9,"ion-item")(10,"ion-input",2),m("ngModelChange",function(n){return u(e.notas.comentariosLlantasDelanteras,n)||(e.notas.comentariosLlantasDelanteras=n),n}),c("ionChange",function(){return e.updateNotes()}),a()(),r(11,"ion-item")(12,"ion-input",3),m("ngModelChange",function(n){return u(e.notas.comentariosLlantasTraseras,n)||(e.notas.comentariosLlantasTraseras=n),n}),c("ionChange",function(){return e.updateNotes()}),a()(),r(13,"ion-item")(14,"ion-input",4),m("ngModelChange",function(n){return u(e.notas.comentariosLlantaRepuesto,n)||(e.notas.comentariosLlantaRepuesto=n),n}),c("ionChange",function(){return e.updateNotes()}),a()(),r(15,"ion-item")(16,"ion-input",5),m("ngModelChange",function(n){return u(e.notas.comentariosBateria,n)||(e.notas.comentariosBateria=n),n}),c("ionChange",function(){return e.updateNotes()}),a()(),r(17,"ion-item")(18,"ion-input",6),m("ngModelChange",function(n){return u(e.notas.otrasObservacionesSalida,n)||(e.notas.otrasObservacionesSalida=n),n}),c("ionChange",function(){return e.updateNotes()}),a()(),W(19,re,2,1,"ion-item"),a()()()()(),r(20,"ion-footer")(21,"ion-toolbar")(22,"ion-buttons",7)(23,"ion-button",8),c("click",function(){return e.goToPrev()}),S(24," Atr\xE1s "),M(25,"ion-icon",9),a()(),r(26,"ion-buttons",10)(27,"ion-button",8),c("click",function(){return e.goToNext()}),S(28," Siguiente "),M(29,"ion-icon",11),a()()()()),t&2){let o,n,_,h,C,b,y,v,I,f,E;l(),s("fullscreen",!0),l(9),s("readonly",((o=e.currentInspection())==null?null:o.stage)=="checkin"),p("ngModel",e.notas.comentariosLlantasDelanteras),s("disabled",((n=e.currentInspection())==null?null:n.stage)=="checkin"),l(2),s("readonly",((_=e.currentInspection())==null?null:_.stage)=="checkin"),p("ngModel",e.notas.comentariosLlantasTraseras),s("disabled",((h=e.currentInspection())==null?null:h.stage)=="checkin"),l(2),s("readonly",((C=e.currentInspection())==null?null:C.stage)=="checkin"),p("ngModel",e.notas.comentariosLlantaRepuesto),s("disabled",((b=e.currentInspection())==null?null:b.stage)=="checkin"),l(2),p("ngModel",e.notas.comentariosBateria),s("readonly",((y=e.currentInspection())==null?null:y.stage)=="checkin")("disabled",((v=e.currentInspection())==null?null:v.stage)=="checkin"),l(2),p("ngModel",e.notas.otrasObservacionesSalida),s("disabled",((I=e.currentInspection())==null?null:I.stage)=="checkin")("readonly",((f=e.currentInspection())==null?null:f.stage)=="checkin"),l(),D(19,((E=e.currentInspection())==null?null:E.stage)=="checkin"?19:-1)}},dependencies:[oe,z,J,K,Q,U,X,Y,Z,x,$,ee,te,ne,q,G,F,j,se]});let g=d;return g})();export{ye as AdditionalNotesComponent};