import{d as o}from"./chunk-3573TPBU.js";import{c as r}from"./chunk-FOZNFNPM.js";import{c as e,d as s,g as n,h as i,k as d}from"./chunk-G5HA7YTQ.js";import"./chunk-XD4PSF4R.js";var f=":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}",m=f,b=class{constructor(t){d(this,t),this.ionImgWillLoad=i(this,"ionImgWillLoad",7),this.ionImgDidLoad=i(this,"ionImgDidLoad",7),this.ionError=i(this,"ionError",7),this.inheritedAttributes={},this.onLoad=()=>{this.ionImgDidLoad.emit()},this.onError=()=>{this.ionError.emit()},this.loadSrc=void 0,this.loadError=void 0,this.alt=void 0,this.src=void 0}srcChanged(){this.addIO()}componentWillLoad(){this.inheritedAttributes=o(this.el,["draggable"])}componentDidLoad(){this.addIO()}addIO(){this.src!==void 0&&(typeof window<"u"&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype?(this.removeIO(),this.io=new IntersectionObserver(t=>{t[t.length-1].isIntersecting&&(this.load(),this.removeIO())}),this.io.observe(this.el)):setTimeout(()=>this.load(),200))}load(){this.loadError=this.onError,this.loadSrc=this.src,this.ionImgWillLoad.emit()}removeIO(){this.io&&(this.io.disconnect(),this.io=void 0)}render(){let{loadSrc:t,alt:a,onLoad:h,loadError:c,inheritedAttributes:l}=this,{draggable:g}=l;return e(s,{key:"efff4d1bd0e54dbeff140c137eb50b803a9f6f60",class:r(this)},e("img",{key:"3a1e0276ae67a7e40ec8c4ecd0061634573b2094",decoding:"async",src:t,alt:a,onLoad:h,onError:c,part:"image",draggable:u(g)}))}get el(){return n(this)}static get watchers(){return{src:["srcChanged"]}}},u=t=>{switch(t){case"true":return!0;case"false":return!1;default:return}};b.style=m;export{b as ion_img};
