import{e as g,f as p,l as h}from"./chunk-G5HA7YTQ.js";var m=class{constructor(){this.m=new Map}reset(e){this.m=new Map(Object.entries(e))}get(e,o){let s=this.m.get(e);return s!==void 0?s:o}getBoolean(e,o=!1){let s=this.m.get(e);return s===void 0?o:typeof s=="string"?s==="true":!!s}getNumber(e,o){let s=parseFloat(this.m.get(e));return isNaN(s)?o!==void 0?o:NaN:s}set(e,o){this.m.set(e,o)}},a=new m,A=t=>{try{let e=t.sessionStorage.getItem(I);return e!==null?JSON.parse(e):{}}catch{return{}}},S=(t,e)=>{try{t.sessionStorage.setItem(I,JSON.stringify(e))}catch{return}},j=t=>{let e={};return t.location.search.slice(1).split("&").map(o=>o.split("=")).map(([o,s])=>[decodeURIComponent(o),decodeURIComponent(s)]).filter(([o])=>W(o,b)).map(([o,s])=>[o.slice(b.length),s]).forEach(([o,s])=>{e[o]=s}),e},W=(t,e)=>t.substr(0,e.length)===e,b="ionic:",I="ionic-persist-config",F=t=>M(t),H=(t,e)=>(typeof t=="string"&&(e=t,t=void 0),F(t).includes(e)),M=(t=window)=>{if(typeof t>"u")return[];t.Ionic=t.Ionic||{};let e=t.Ionic.platforms;return e==null&&(e=t.Ionic.platforms=R(t),e.forEach(o=>t.document.documentElement.classList.add(`plt-${o}`))),e},R=t=>{let e=a.get("platform");return Object.keys(v).filter(o=>{let s=e==null?void 0:e[o];return typeof s=="function"?s(t):v[o](t)})},x=t=>l(t)&&!O(t),u=t=>!!(r(t,/iPad/i)||r(t,/Macintosh/i)&&l(t)),L=t=>r(t,/iPhone/i),U=t=>r(t,/iPhone|iPod/i)||u(t),N=t=>r(t,/android|sink/i),k=t=>N(t)&&!r(t,/mobile/i),B=t=>{let e=t.innerWidth,o=t.innerHeight,s=Math.min(e,o),n=Math.max(e,o);return s>390&&s<520&&n>620&&n<800},C=t=>{let e=t.innerWidth,o=t.innerHeight,s=Math.min(e,o),n=Math.max(e,o);return u(t)||k(t)||s>460&&s<820&&n>780&&n<1400},l=t=>D(t,"(any-pointer:coarse)"),T=t=>!l(t),O=t=>_(t)||y(t),_=t=>!!(t.cordova||t.phonegap||t.PhoneGap),y=t=>{let e=t.Capacitor;return!!(e!=null&&e.isNative)},J=t=>r(t,/electron/i),z=t=>{var e;return!!(!((e=t.matchMedia)===null||e===void 0)&&e.call(t,"(display-mode: standalone)").matches||t.navigator.standalone)},r=(t,e)=>e.test(t.navigator.userAgent),D=(t,e)=>{var o;return(o=t.matchMedia)===null||o===void 0?void 0:o.call(t,e).matches},v={ipad:u,iphone:L,ios:U,android:N,phablet:B,tablet:C,cordova:_,capacitor:y,electron:J,pwa:z,mobile:l,mobileweb:x,desktop:T,hybrid:O},d,K=t=>t&&p(t)||d,V=(t={})=>{if(typeof window>"u")return;let e=window.document,o=window,s=o.Ionic=o.Ionic||{},n={};t._ael&&(n.ael=t._ael),t._rel&&(n.rel=t._rel),t._ce&&(n.ce=t._ce),h(n);let f=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},A(o)),{persistConfig:!1}),s.config),j(o)),t);a.reset(f),a.getBoolean("persistConfig")&&S(o,f),M(o),s.config=a,s.mode=d=a.get("mode",e.documentElement.getAttribute("mode")||(H(o,"ios")?"ios":"md")),a.set("mode",d),e.documentElement.setAttribute("mode",d),e.documentElement.classList.add(d),a.getBoolean("_testing")&&a.set("animated",!1);let P=i=>{var c;return(c=i.tagName)===null||c===void 0?void 0:c.startsWith("ION-")},E=i=>["ios","md"].includes(i);g(i=>{for(;i;){let c=i.mode||i.getAttribute("mode");if(c){if(E(c))return c;P(i)&&console.warn('Invalid ionic mode: "'+c+'", expected: "ios" or "md"')}i=i.parentElement}return d})};export{a,H as b,K as c,V as d};
