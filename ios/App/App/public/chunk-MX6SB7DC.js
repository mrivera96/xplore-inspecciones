import{d as m,f as b,i as u}from"./chunk-V7O3HEX4.js";import{a as g,c as p}from"./chunk-4PGTP63H.js";import"./chunk-MM5QLNJM.js";import"./chunk-3573TPBU.js";import{a as l,c as o}from"./chunk-FOZNFNPM.js";import{c as e,d as c,g as x,h as E,k as a,m as y,n as d}from"./chunk-G5HA7YTQ.js";import{e as r}from"./chunk-XD4PSF4R.js";var T="ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}",k=T,C=class{constructor(i){a(this,i),this.ionInfinite=E(this,"ionInfinite",7),this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.onScroll=()=>{let n=this.scrollEl;if(!n||!this.canStart())return 1;let t=this.el.offsetHeight;if(t===0)return 2;let s=n.scrollTop,S=n.scrollHeight,f=n.offsetHeight,h=this.thrPc!==0?f*this.thrPc:this.thrPx;return(this.position==="bottom"?S-t-s-h-f:s-t-h)<0&&!this.didFire?(this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3):4},this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom"}thresholdChanged(){let i=this.threshold;i.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(i)/100):(this.thrPx=parseFloat(i),this.thrPc=0)}disabledChanged(){let i=this.disabled;i&&(this.isLoading=!1,this.isBusy=!1),this.enableScrollEvents(!i)}connectedCallback(){return r(this,null,function*(){let i=b(this.el);if(!i){u(this.el);return}this.scrollEl=yield m(i),this.thresholdChanged(),this.disabledChanged(),this.position==="top"&&d(()=>{this.scrollEl&&(this.scrollEl.scrollTop=this.scrollEl.scrollHeight-this.scrollEl.clientHeight)})})}disconnectedCallback(){this.enableScrollEvents(!1),this.scrollEl=void 0}complete(){return r(this,null,function*(){let i=this.scrollEl;if(!(!this.isLoading||!i))if(this.isLoading=!1,this.position==="top"){this.isBusy=!0;let n=i.scrollHeight-i.scrollTop;requestAnimationFrame(()=>{y(()=>{let s=i.scrollHeight-n;requestAnimationFrame(()=>{d(()=>{i.scrollTop=s,this.isBusy=!1,this.didFire=!1})})})})}else this.didFire=!1})}canStart(){return!this.disabled&&!this.isBusy&&!!this.scrollEl&&!this.isLoading}enableScrollEvents(i){this.scrollEl&&(i?this.scrollEl.addEventListener("scroll",this.onScroll):this.scrollEl.removeEventListener("scroll",this.onScroll))}render(){let i=o(this),n=this.disabled;return e(c,{key:"c2248d06232dd7771dd155693ec75f9258dc969e",class:{[i]:!0,"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!n}})}get el(){return x(this)}static get watchers(){return{threshold:["thresholdChanged"],disabled:["disabledChanged"]}}};C.style=k;var I="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",L=I,v="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",H=v,w=class{constructor(i){a(this,i),this.customHTMLEnabled=l.get("innerHTMLTemplatesEnabled",p),this.loadingSpinner=void 0,this.loadingText=void 0}componentDidLoad(){if(this.loadingSpinner===void 0){let i=o(this);this.loadingSpinner=l.get("infiniteLoadingSpinner",l.get("spinner",i==="ios"?"lines":"crescent"))}}renderLoadingText(){let{customHTMLEnabled:i,loadingText:n}=this;return i?e("div",{class:"infinite-loading-text",innerHTML:g(n)}):e("div",{class:"infinite-loading-text"},this.loadingText)}render(){let i=o(this);return e(c,{key:"2f4afb07bcfe3e12528eb9cee8646a097e0b359f",class:{[i]:!0,[`infinite-scroll-content-${i}`]:!0}},e("div",{key:"af038177bf10c88c8970682487a4328689aaa5f2",class:"infinite-loading"},this.loadingSpinner&&e("div",{key:"1da5d419bc6a978b6a509fdab47dae347fc8d221",class:"infinite-loading-spinner"},e("ion-spinner",{key:"60cc5c64e0a317ac0005d5afe42c4bb8da58136f",name:this.loadingSpinner})),this.loadingText!==void 0&&this.renderLoadingText()))}};w.style={ios:L,md:H};export{C as ion_infinite_scroll,w as ion_infinite_scroll_content};