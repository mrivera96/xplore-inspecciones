import{b as p}from"./chunk-MM5QLNJM.js";import{i as v}from"./chunk-3573TPBU.js";import{a as f}from"./chunk-MCRJI3T3.js";var h=(r,t,o)=>{let n,e;if(f!==void 0&&"MutationObserver"in f){let d=Array.isArray(t)?t:[t];n=new MutationObserver(s=>{for(let c of s)for(let i of c.addedNodes)if(i.nodeType===Node.ELEMENT_NODE&&d.includes(i.slot)){o(),v(()=>u(i));return}}),n.observe(r,{childList:!0})}let u=d=>{var s;e&&(e.disconnect(),e=void 0),e=new MutationObserver(c=>{o();for(let i of c)for(let l of i.removedNodes)l.nodeType===Node.ELEMENT_NODE&&l.slot===t&&a()}),e.observe((s=d.parentElement)!==null&&s!==void 0?s:d,{subtree:!0,childList:!0})},E=()=>{n&&(n.disconnect(),n=void 0),a()},a=()=>{e&&(e.disconnect(),e=void 0)};return{destroy:E}},C=(r,t,o)=>{let n=r==null?0:r.toString().length,e=y(n,t);if(o===void 0)return e;try{return o(n,t)}catch(u){return p("Exception in provided `counterFormatter`.",u),e}},y=(r,t)=>`${r} / ${t}`;export{h as a,C as b};
