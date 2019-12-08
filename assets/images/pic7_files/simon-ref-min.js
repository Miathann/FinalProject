/*!
 * Commit SHA: e40bcf9
 * Commit timestamp: "2018-01-07 21:08:34 -0500"
 * Build timestamp: 2018-01-07 22:09:24 -0500
 * simonjs 1.0.0
 * https://www.simondata.com
 * (c) 2017 Simon Data
 */

!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=n[s]={exports:{}};t[s][0].call(p.exports,function(e){var n=t[s][1][e];return i(n||e)},p,p.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){"use strict";t.exports=function(e,t,n,r){function i(e){var n=new o,r=t.apiEndpoint+"/"+e.requestType+"/"+t.apiVersion;e.url&&(r=r+"/"+e.url),n.open(e.method,r),n.onComplete(e.resolve,e.reject),e.data?n.send(JSON.stringify(e.data)):n.send()}var o,s={JSON:"application/json"},a={EVENTS:"events",TAGS:"tags",ERROR:"errors"},c={POST:"POST",GET:"GET"};e.XDomainRequest&&n.isMinimunIE(10)?o=function(t){var n=new e.XDomainRequest;return{onComplete:function(e,t){n.ontimeout=n.onerror=t,n.onload=function(){n.responseText?e(JSON.parse(n.responseText)):e()}},open:function(){n.open.apply(n,arguments)},send:function(t){e.setTimeout(function(){n.send(t)},0)}}}:e.XMLHttpRequest&&(o=function(t){function n(e,t){var n={xhr:{status:e.status,statusText:e.statusText,readyState:e.readyState,response:e.response,responseText:e.responseText,responseHeaders:e.getAllResponseHeaders()}};if(e.responseText)try{n.response=JSON.parse(e.responseText)}catch(t){n.response=e.responseText}t(n)}var r=new e.XMLHttpRequest;return{onComplete:function(t,i){r.onreadystatechange=function(){r.readyState===e.XMLHttpRequest.DONE&&(200===r.status?n(r,t):n(r,i))}},open:function(){r.open.apply(r,arguments),r.setRequestHeader("Content-Type",s.JSON),r.setRequestHeader("Accept",s.JSON),"withCredentials"in r&&(r.withCredentials=!0)},send:r.send.bind(r)}}),this.sendEvent=function(e,n){var o=r.makeEvent(e,n);t.debug&&console.log("Sending Event: "+JSON.stringify(o)),i({method:c.POST,url:"collect",requestType:a.EVENTS,data:o,resolve:function(e){return!0},reject:function(e){t.debug&&console.log(e.response)}})},this.sendIdentity=function(e,n){var o=r.makeIdentify();t.debug&&console.log("Sending Identify Event: "+JSON.stringify(o)),i({method:c.POST,url:"collect",requestType:a.EVENTS,data:o,resolve:function(e){return!0},reject:function(e){t.debug&&console.log(e.response)}})},this.sendError=function(e){var n=r.makeEvent(t.EventTypes.EXCEPTION,e);t.debug?console.log("Sending Error: "+JSON.stringify(n)):i({method:c.POST,requestType:a.ERROR,data:n,resolve:function(e){return!0},reject:function(e){console.log("Unable to send Simon Data error")}})},this.getTags=function(e){i({method:c.POST,data:{partnerId:t.partnerId,clientId:t.getClientId(),identity:t.getIdentityData()},requestType:a.TAGS,resolve:e,reject:function(e){t.debug&&console.log("Unable to get Simon Data tags")}})}}},{}],2:[function(e,t,n){"use strict";t.exports=function(e,t,n,r){var i=(e.document.location.protocol,"https://");switch(this.apiVersion="v1",this.partnerId=e._sd.partnerId,this.env=e._sd.environment||e._sd.env,this.libraryName=e._sd.lib,this.debug=!!e._sd.debug,this.version=t,this.EventTypes={PAGE_VIEW:"page_view",EXCEPTION:"exception"},this.clientId=null,this.identityData=null,this.eventListeners={},this.env){case"localhost":case"local":this.apiEndpoint=i+"localhost";break;case"development":case"dev":this.apiEndpoint=i+"dev.simonsignal.com";break;case"staging":case"stg":this.apiEndpoint=i+"staging.simonsignal.com";break;case"production":case"prod":default:this.apiEndpoint=i+"simonsignal.com"}this.addListener=function(e,t){this.eventListeners[e]=this.eventListeners[e]||[],this.eventListeners[e].push(t)},this.call=function(e,t){if(this.eventListeners[e])for(var n=0;n<this.eventListeners[e].length;n++)this.eventListeners[e][n](t)},this.getClientId=function(){if(!this.clientId){var e=r.readCookies(!0);this.clientId=e[r.CookieNames.CLIENT_ID_COOKIE]}return this.clientId},this.createClientId=function(){var e=n.newUuid();return this.clientId=e,r.createCookie(r.CookieNames.CLIENT_ID_COOKIE,this.clientId,730),this.clientId},this.getIdentityData=function(){if(!this.identityData){var e=r.readCookies(!0)[r.CookieNames.IDENTITY_COOKIE];e&&(this.identityData=JSON.parse(e))}return this.identityData},this.setIdentityData=function(e){return this.identityData=e,r.createCookie(r.CookieNames.IDENTITY_COOKIE,JSON.stringify(this.identityData)),this.identityData},this.getCoreMetadata=function(){return{partnerId:this.partnerId,clientId:this.getClientId(),context:{version:this.version,name:this.libraryName,debug:this.debug}}}}},{}],3:[function(require,module,exports){"use strict";function Document(win){var domain=win._sd.domain;this.CookieNames={CLIENT_ID_COOKIE:"sd_client_id",IDENTITY_COOKIE:"sd_identity"},this.createCookie=function(e,t,n){var r="";if(n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3),r="; expires="+i.toGMTString()}var o="";domain&&""!==domain&&(o=";domain="+domain),win.document.cookie=e+"="+t+r+o+"; path=/"},this.readCookies=function(e){for(var t={},n=decodeURIComponent(win.document.cookie).split(";"),r=0;r<n.length;r++){var i=n[r].trim().split("=");if(i.length>=2&&(!e||e&&0===i[0].indexOf("sd_"))){var o=i.slice(1).join("=");t[i[0]]=o}}return t},this.getUrlEmail=function(){for(var e,t=["sd_email","WT.dscvid","cm_emid","vid","email"],n=/^([_\.\-\+a-zA-Z0-9]+)@([\.\-a-zA-Z0-9]+)\.([A-Za-z]{2,})$/,r=/\+/g,i=/([^&=]+)=?([^&]*)/g,o=function(e){return decodeURIComponent(e.replace(r," "))},s=win.location.search.substring(1),a={},c=0;e=i.exec(s);)a[o(e[1])]=o(e[2]),c++;var u,p;if(c>0){for(var d=0;d<t.length;d++){var l=t[d];if(l in a){if(u=l,p=a[l],!n.test(p))try{var f=win.atob(p);n.test(f)&&(p=f)}catch(e){}break}}if(!u)for(var g in a)if(a.hasOwnProperty(g)){var m=a[g];if(n.test(m)){u=g,p=m;break}}}if(u&&p)return{email:p,url_parameter_name:u,source:"url_parameter"}},this.getDocumentMetadata=function(e){var t=new Date,n={context:{userAgent:win.navigator.userAgent,page:{url:win.location.href}},sentAt:t.getTime(),timezone:t.getTimezoneOffset()};return e&&(n.properties={title:win.document.title,language:win.navigator.language},win.document.referrer&&""!==win.document.referrer&&(n.properties.referrer=win.document.referrer)),n},this.isSafari=function(){return win.navigator.vendor&&win.navigator.vendor.indexOf("Apple")>-1&&win.navigator.userAgent&&!win.navigator.userAgent.match("CriOS")},this.createHtmlAsChild=function(html,ele){var div=win.document.createElement("div");div.innerHTML=html;for(var elements=div.childNodes,e=0;e<elements.length;e++){var subElement=elements[e];this.isSafari()&&subElement.tagName&&"script"===subElement.tagName.toLowerCase()?eval(subElement.innerHTML||subElement.text):ele.appendChild(win.document.importNode(subElement,!0))}},this.getElementByTagName=function(e){var t=win.document.getElementsByTagName(e);return t.length>0?t[0]:void 0}}module.exports=Document},{}],4:[function(e,t,n){"use strict";t.exports=function(e,t,n){function r(t,n,r){return function(){try{return t.apply(this,arguments)}catch(t){if(e.debug)throw t;n.logError(t)}}}e.addListener("exception",function(e){n.sendError(e)}),this.logError=function(n){t.isDefined(n)&&e.call("exception",{name:n.name,message:n.message,stacktrace:n.stack||n.stacktrace})},this.wrap=function(e){if(t.isFunction(e))return r(e,this);if(t.isObject(e)){for(var n in e){var i=e[n];t.isFunction(i)&&(e[n]=r(i,this))}return e}}}},{}],5:[function(e,t,n){"use strict";var r=e("./SimonError");t.exports=function(e,t,n,i,o,s){function a(){var e=Array.prototype.shift.apply(arguments),t=Array.prototype.shift.apply(arguments)||{};n.isString(e)&&n.isObject(t)&&o.sendEvent(e,{properties:t})}function c(){var e=Array.prototype.shift.apply(arguments),r=Array.prototype.shift.apply(arguments)||{};if(n.isString(e)&&n.isObject(r)){var i={userId:e,traits:r};t.setIdentityData(i),o.sendIdentity("identify",i)}}function u(){return{send:function(){switch(Array.prototype.shift.apply(arguments)){case"track":a.apply(null,arguments);break;case"identify":c.apply(null,arguments)}},identify:c,track:a}}this.init=function(){var o=e[e.SimonData],c=new u;if(e[e.SimonData]=c,!n.isDefined(o))throw new r("Global SimonData object is undefined.  Possible corrupted simon.js script tag.");var p=t.getClientId();if(p?i.createCookie(i.CookieNames.CLIENT_ID_COOKIE,p,730):t.createClientId(),o.q)for(var d=0;d<o.q.length;d++)c.send.apply(null,o.q[d]);a(t.EventTypes.PAGE_VIEW),s.createTags()}}},{"./SimonError":8}],6:[function(e,t,n){"use strict";t.exports=function(e,t,n){this.makeEvent=function(r,i){var o,s=e.getCoreMetadata(),a=n.getDocumentMetadata(r===e.EventTypes.PAGE_VIEW),c=t.mergeObjects(s,a);return r===e.EventTypes.EXCEPTION?c.type="exception":(o=e.getIdentityData(),c.type="track"),i&&t.isObject(i)?("properties"in i&&(i=i.properties),c=t.mergeObjects(c,{event:r,properties:i})):c=this.mergeObjects(c,{properties:i}),o&&(c=t.mergeObjects(c,o)),c},this.makeIdentify=function(){var r=e.getCoreMetadata(),i=n.getDocumentMetadata(),o=e.getIdentityData(),s=t.mergeObjects(r,i);return o&&(s=t.mergeObjects(s,o)),s.type="identify",s}}},{}],7:[function(e,t,n){"use strict";var r="parent"in window?window.parent:window,i=r._sd,o=e("./../package.json"),s=e("./Core"),a=e("./Utility"),c=e("./ErrorHandler"),u=e("./Communication"),p=e("./Initialize"),d=e("./Document"),l=e("./Payloader"),f=e("./Tagger");e("./Validator");if(i){var g=new a,m=new d(r),h=new s(r,o.version,g,m),v=new l(h,g,m),y=new u(r,h,g,v),b=new c(h,g,y),E=new f(m,y),w=new p(r,h,g,m,y,E);b.wrap(g),b.wrap(m),b.wrap(h),b.wrap(v),b.wrap(y),b.wrap(E),b.wrap(w),w.init()}},{"./../package.json":15,"./Communication":1,"./Core":2,"./Document":3,"./ErrorHandler":4,"./Initialize":5,"./Payloader":6,"./Tagger":9,"./Utility":10,"./Validator":11}],8:[function(e,t,n){"use strict";function r(e){this.message=e;var t=new Error;this.stack=t.stack||t.stacktrace||""}t.exports=r,(r.prototype=Object.create(Error.prototype)).constructor=r,r.prototype.name="SimonError"},{}],9:[function(e,t,n){"use strict";t.exports=function(e,t){this.getTagsResolver=function(t){t=t.response;var n=e.getElementByTagName("head"),r=e.getElementByTagName("body");if(t&&"tags"in t)for(var i=0;i<t.tags.length;i++){var o=t.tags[i];if(o.embeddedScripts)for(var s=0;s<o.embeddedScripts.length;s++)e.createHtmlAsChild(o.embeddedScripts[s].html.trim(),r);if(o.externalScripts)for(var a=0;a<o.externalScripts.length;a++)e.createHtmlAsChild('<script src="'+o.externalScripts[a].src+'"><\/script>',n)}},this.createTags=function(){t.getTags(this.getTagsResolver)}}},{}],10:[function(e,t,n){"use strict";var r=e("uuid/v4");t.exports=function(e){Function.prototype.bind||(Function.prototype.bind=function(e){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r?this:e,t.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(r.prototype=this.prototype),i.prototype=new r,i}),this.isObject=function(e){return"[object Object]"===Object.prototype.toString.call(e)},this.isString=function(e){return"[object String]"===Object.prototype.toString.call(e)},this.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},this.isFunction=function(e){return"[object Function]"===Object.prototype.toString.call(e)},this.isValue=function(e){return!this.isArray(e)&&!this.isObject(e)&&!this.isFunction(e)},this.isDefined=function(e){return null!==e&&void 0!==e},this.isGoodValue=function(e){return this.isDefined(e)&&""!==e},this.isMinimumIE=function(t){var n=e.navigator.userAgent.toLowerCase();return-1!=n.indexOf("msie")&&parseInt(n.split("msie")[1])>=t},this.newUuid=function(){return r()},this.deepCopy=function(e){return JSON.parse(JSON.stringify(e))},this.mergeObjects=function(e,t){var n=this.deepCopy(e);for(var r in t)if(t.hasOwnProperty(r)&&this.isGoodValue(t[r])){var i=t[r],o=n[r];this.isObject(o)&&this.isObject(i)?n[r]=this.mergeObjects(o,i):n[r]=t[r]}return n}}},{"uuid/v4":14}],11:[function(e,t,n){"use strict";t.exports=function(e){function t(e,n,r){for(var i in r)if(r.hasOwnProperty(i)){var o=r[i];if(o&&!(i in n))return console.error("Error validating event: "+e+"; property not found: "+i),!1;if(Array.isArray(o)){var s=n[i];if(!Array.isArray(s))return console.error("Error validating event: "+e+"; property: "+i+" must be an array"),!1;for(var a=0;a<s.length;a++)if(!t(e+"_"+i+"_"+a,s[a],o[0]))return!1}}return!0}this.validateEvent=function(n){if(!n)return!1;switch(n.event){case"add_to_cart":return t(n.event,n.properties,{productId:!0,variant:!0,quantity:!0});case"complete_transaction":return t(n.event,n.properties,{transactionId:!0,revenue:!0,items:[{productId:!0,variant:!0,quantity:!0}]});case"product_view":return t(n.event,n.properties,{productId:!0});case"update_cart":case"remove_from_cart":return t(n.event,n.properties,{productId:!0,variant:!0,quantity:!0});case"page_view":return!0;default:return"identify"==n.type?t("identify",n.properties,{email:!0}):(e.debug&&console.warn("Unknown custom event but still sending: "+n.event),!0)}return!1}}},{}],12:[function(e,t,n){for(var r=[],i=0;i<256;++i)r[i]=(i+256).toString(16).substr(1);t.exports=function(e,t){var n=t||0,i=r;return i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+"-"+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]+i[e[n++]]}},{}],13:[function(e,t,n){(function(e){var n,r=e.crypto||e.msCrypto;if(r&&r.getRandomValues){var i=new Uint8Array(16);n=function(){return r.getRandomValues(i),i}}if(!n){var o=new Array(16);n=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],14:[function(e,t,n){var r=e("./lib/rng"),i=e("./lib/bytesToUuid");t.exports=function(e,t,n){var o=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null);var s=(e=e||{}).random||(e.rng||r)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t)for(var a=0;a<16;++a)t[o+a]=s[a];return t||i(s)}},{"./lib/bytesToUuid":12,"./lib/rng":13}],15:[function(e,t,n){t.exports={name:"simonjs",version:"1.0.0",description:"Simon Data JavaScript Tracker",license:"UNLICENSED",repository:{type:"git",url:"git@github.com:Radico/simonjs.git"},devDependencies:{brfs:"^1.4.3","browserify-shim":"^3.8.14",grunt:"1.0.1","grunt-browserify":"4.0.1","grunt-contrib-clean":"1.1.0","grunt-contrib-compress":"1.4.3","grunt-contrib-concat":"1.0.1","grunt-contrib-copy":"1.0.0","grunt-contrib-jshint":"1.1.0","grunt-contrib-uglify":"3.0.1","grunt-gitinfo":"0.1.8","grunt-karma":"2.0.0","grunt-serve":"0.1.6","jasmine-core":"2.6.3",karma:"1.7.0","karma-browserify":"5.1.1","karma-chrome-launcher":"2.1.1","karma-jasmine":"1.1.0","karma-phantomjs-launcher":"1.0.4",lodash:"4.17.4",matchdep:"1.0.1","package-json-versionify":"1.0.4","phantomjs-prebuilt":"2.1.14",uuid:"3.0.1"},engines:{node:"6.11.0"},"browserify-shim":{external:"global:External"}}},{}]},{},[7]);