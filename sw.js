if(!self.define){let e,n={};const i=(i,a)=>(i=new URL(i+".js",a).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let r={};const f=e=>i(e,c),o={module:{uri:c},exports:r,require:f};n[c]=Promise.all(a.map((e=>o[e]||f(e)))).then((e=>(s(...e),r)))}}define(["./workbox-cfcf5a78"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CF1AaQmD.css",revision:null},{url:"assets/index-tNyCCGLY.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"font.css",revision:"2ae659194031d58f98e5304a9065b3aa"},{url:"index.html",revision:"577d4467554386397fbee8c7bd40958d"},{url:"favicon.ico",revision:"4e9db3af3ad47c7e2f17d6dcdd6a36c7"},{url:"robots.txt",revision:"bf2651f2c41fe73ffc109a930fb86f9e"},{url:"font.css",revision:"2ae659194031d58f98e5304a9065b3aa"},{url:"MRegular.woff2",revision:"6653d24e8c12e8b1ef117db1f9f5e695"},{url:"MaliRegular.woff2",revision:"f7cba2675c17c0846a61670783da2ce8"},{url:"add-100.png",revision:"1041585b15ed11494fe5fb370aeb5015"},{url:"add-140.png",revision:"cc8d206bd1e57d3e0d26ab8bca477f6f"},{url:"add-200.png",revision:"7ae798c6f8fabb69ec1eca813b20d836"},{url:"all-100.png",revision:"9de1e00bcdf4b9fbd754f656e891c230"},{url:"all-140.png",revision:"80f17926a1abd1685712a846089570d1"},{url:"all-200.png",revision:"60ceb789a2e46ea54010f4e5a2879dfc"},{url:"apple-touch-icon.png",revision:"3b1c6ee2d9d992eaebef2ead1df46617"},{url:"asset1-1000.png",revision:"7f33d27d65819f8390bb1771aa244d54"},{url:"asset1-600-min.png",revision:"9bfcb36860fe81acdff40e3549cbd153"},{url:"asset1-600.png",revision:"90a756c96da7d756b240ad983b43710c"},{url:"asset2-500.png",revision:"5631171d8b4a6379c84b66289ac9f48f"},{url:"asset2-700.png",revision:"8580b62ae407bb58a90b080e1b592288"},{url:"asset3-500.png",revision:"c19d37808c9232e231118c8e6ec8ce37"},{url:"asset3-900.png",revision:"c5f0778ff2c81cac328357a72cc3c406"},{url:"learn-100.png",revision:"4658c107f045a59b6ff52771035f8d8a"},{url:"learn-140.png",revision:"b5020c0c9e72ac49ae72c8e98078834f"},{url:"learn-200.png",revision:"d4f79ec88ce15984801a145ee0931cba"},{url:"logo-100.png",revision:"a718d1013c72073b298feaa697bf4e26"},{url:"logo-140.png",revision:"8da7b09c4e9bd0bdb774b93c54ad1e79"},{url:"logo-200.png",revision:"5a7596b8c39013a92d96e97023f15dcd"},{url:"piles-100.png",revision:"5a5f938a2dc4089d289f7f7cc0aeae62"},{url:"piles-140.png",revision:"fa6e6f027f2325dd5cab262b64fe331b"},{url:"piles-200.png",revision:"8a9669acadf34061020c93f68b18df7b"},{url:"pwa-192x192.png",revision:"2fe418f5459a58cb0cf01effaa526a34"},{url:"pwa-512x512.png",revision:"b280e542ed414e795226e732457456cb"},{url:"settings-100.png",revision:"bfd4c7bfa3b1fb7e904419b261147c4e"},{url:"settings-140.png",revision:"92f9899e1c76e4c486b60e22f10579c8"},{url:"settings-200.png",revision:"06f8a5834b9c0c1ac68a27e1f9d699a9"},{url:"manifest.webmanifest",revision:"fe307c4bea6136bb5f22c0c10c2911cc"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"style"===e.destination),new e.CacheFirst({cacheName:"css-cache",plugins:[new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:604800})]}),"GET"),e.registerRoute((({request:e})=>"font"===e.destination),new e.CacheFirst({cacheName:"font-cache",plugins:[new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
