if(!self.define){let e,i={};const r=(r,n)=>(r=new URL(r+".js",n).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>r(e,o),c={module:{uri:o},exports:d,require:t};i[o]=Promise.all(n.map((e=>c[e]||t(e)))).then((e=>(s(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-ofNxBE_N.css",revision:null},{url:"assets/index-UIjrMgrE.js",revision:null},{url:"index.html",revision:"4da1dc93123751676cd995e380305b96"},{url:"registerSW.js",revision:"d5b8c2ffd57827f82b6e06dcb6df456e"},{url:"favicon.ico",revision:"4e9db3af3ad47c7e2f17d6dcdd6a36c7"},{url:"robots.txt",revision:"bf2651f2c41fe73ffc109a930fb86f9e"},{url:"apple-touch-icon.png",revision:"b6b6bd67b187de3ca7059a5d1fb96a8d"},{url:"pwa-192x192.png",revision:"32da7da7821ab402babd58727c04feaf"},{url:"pwa-512x512.png",revision:"186a6c372c559ee065107dec307b5afc"},{url:"manifest.webmanifest",revision:"af655772169116cff9843beee6a0a249"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
