(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{createHostedFormService:()=>J,createStoredCardHostedFormService:()=>X});const r=require("lodash"),n=function(t){var e=this,r=new Promise((function(t,r){e.cancel=r}));this.promise=Promise.race([t,r])};var o,i=(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});const a=function(t){function e(e){var r,n,o=this.constructor,i=t.call(this,e||"An unexpected error has occurred.")||this;return i.name="StandardError",i.type="standard",r=i,n=o.prototype,Object.setPrototypeOf?Object.setPrototypeOf(r,n):r.__proto__=n,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(i,o):i.stack=new Error(i.message).stack,i}return i(e,t),e}(Error);var s=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const c=function(t){function e(e){var r=t.call(this,e||"Unable to proceed because the required element is unexpectedly detached from the page.")||this;return r.name="UnexpectedDetachmentError",r.type="unexpected_detachment",r}return s(e,t),e}(a);const u=function(){function t(t){this._mutationObserver=t}return t.prototype.ensurePresence=function(t,e){return r=this,o=void 0,a=function(){var r,o,i,a;return function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(s){switch(s.label){case 0:r=new n(e),(o=this._mutationObserver.create((function(e){e.forEach((function(e){0!==Array.from(e.removedNodes).filter((function(e){return t.some((function(t){return e===t||e.contains(t)}))})).length&&r.cancel(new c)}))}))).observe(document.body,{childList:!0,subtree:!0}),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,r.promise];case 2:return i=s.sent(),o.disconnect(),[2,i];case 3:throw a=s.sent(),o.disconnect(),a;case 4:return[2]}}))},new((i=void 0)||(i=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function s(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof i?r:new i((function(t){t(r)}))).then(n,s)}c((a=a.apply(r,o||[])).next())}));var r,o,i,a},t}();var l=function(){function t(t){void 0===t&&(t=window),this._window=t}return t.prototype.create=function(t){return new this._window.MutationObserver(t)},t}();const f=require("rxjs"),p=require("rxjs/operators");var d=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const h=function(t){function e(e){var r=t.call(this,e||"Invalid arguments have been provided.")||this;return r.name="InvalidArgumentError",r.type="invalid_argument",r}return d(e,t),e}(a);function y(t){if(!/^(https?:)?\/\//.test(t))throw new h("The provided URL must be absolute.");var e=document.createElement("a");e.href=t;var r=e.port&&-1!==t.indexOf("".concat(e.hostname,":").concat(e.port))?e.port:"";return{hash:e.hash,hostname:e.hostname,href:e.href,origin:"".concat(e.protocol,"//").concat(e.hostname).concat(r?":".concat(r):""),pathname:e.pathname,port:r,protocol:e.protocol,search:e.search}}function v(t,e){return t.type===e}var _=function(){return _=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},_.apply(this,arguments)};const b=function(){function t(t,e,r){this._targetWindow=e,this._context=r,this._targetOrigin="*"===t?"*":y(t).origin}return t.prototype.post=function(t,e){var r=this,n=this._targetWindow;if(window!==n){if(!n)throw new Error("Unable to post message because target window is not set.");var o=e&&(0,f.fromEvent)(window,"message").pipe((0,p.filter)((function(t){return t.origin===r._targetOrigin&&v(t.data,t.data.type)&&-1!==[e.successType,e.errorType].indexOf(t.data.type)})),(0,p.map)((function(t){if(e.errorType===t.data.type)throw t.data;return t.data})),(0,p.take)(1)).toPromise();return n.postMessage(_(_({},t),{context:this._context}),this._targetOrigin),o}},t.prototype.setTarget=function(t){this._targetWindow=t},t.prototype.setContext=function(t){this._context=t},t}();var m=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),w=function(){return w=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},w.apply(this,arguments)};const g=function(t,e,r){return e&&r?O(0,e,r):function(t){var e=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return m(e,t),e}(t);return Object.getOwnPropertyNames(t.prototype).forEach((function(r){var n=Object.getOwnPropertyDescriptor(t.prototype,r);n&&"constructor"!==r&&Object.defineProperty(e.prototype,r,O(t.prototype,r,n))})),e}(t)};function O(t,e,r){if("function"!=typeof r.value)return r;var n=r.value;return{get:function(){var t=n.bind(this);return Object.defineProperty(this,e,w(w({},r),{value:t})),t},set:function(t){n=t}}}const E=function(){function t(t){var e;this._sourceOrigins=[y(t).origin,(e=y(t),y(0===e.hostname.indexOf("www")?e.href:e.href.replace(e.hostname,"www.".concat(e.hostname)))).origin],this._isListening=!1,this._listeners={}}return t.prototype.listen=function(){this._isListening||(this._isListening=!0,window.addEventListener("message",this._handleMessage))},t.prototype.stopListen=function(){this._isListening&&(this._isListening=!1,window.removeEventListener("message",this._handleMessage))},t.prototype.addListener=function(t,e){var r=this._listeners[t];r||(this._listeners[t]=r=[]),-1===r.indexOf(e)&&r.push(e)},t.prototype.removeListener=function(t,e){var r=this._listeners[t];if(r){var n=r.indexOf(e);n>=0&&r.splice(n,1)}},t.prototype.trigger=function(t,e){var r=this._listeners[t.type];r&&r.forEach((function(r){return e?r(t,e):r(t)}))},t.prototype._handleMessage=function(t){if(-1!==this._sourceOrigins.indexOf(t.origin)&&v(t.data,t.data.type)){var e=t.data,r=e.context,n=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r}(e,["context"]);this.trigger(n,r)}},function(t,e,r,n){var o,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,r,a):o(e,r))||a);i>3&&a&&Object.defineProperty(e,r,a)}([g],t.prototype,"_handleMessage",null),t}();var S=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),T={body:{},headers:{},status:0};const P=function(t){function e(e,r){var n=void 0===r?{}:r,o=n.message,i=n.errors,a=this,s=e||T,c=s.body,u=s.headers,l=s.status;return(a=t.call(this,o||"An unexpected error has occurred.")||this).name="RequestError",a.type="request",a.body=c,a.headers=u,a.status=l,a.errors=i||[],a}return S(e,t),e}(a);var F=function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};function C(t){if(Array.isArray(t))return t.reduce((function(t,e){return e&&e.message?F(F([],t,!0),[e.message],!1):t}),[]).join(" ")}var D=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const I=function(t){function e(e){var r=t.call(this,e||"Unable to proceed due to invalid configuration provided for the hosted payment form.")||this;return r.name="InvalidHostedFormConfigError",r.type="invalid_hosted_form_config",r}return D(e,t),e}(a);var x=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const A=function(t){function e(e){var r=t.call(this,e||"Unable to proceed due to an unknown error with the hosted payment form.")||this;return r.name="InvalidHostedFormError",r.type="invalid_hosted_form",r}return x(e,t),e}(a);var j=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const L=function(t){function e(e){var n=t.call(this,function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))}(["Unable to proceed due to invalid user input values"],(0,r.flatMap)((0,r.values)(e),(function(t){return(0,r.map)(t,(function(t){return t.message}))})),!0).join(". "))||this;return n.errors=e,n.name="InvalidHostedFormValueError",n.type="invalid_hosted_form_value",n}return j(e,t),e}(a);var U,N;!function(t){t.AttachRequested="HOSTED_FIELD:ATTACH_REQUESTED",t.SubmitRequested="HOSTED_FIELD:SUBMITTED_REQUESTED",t.SubmitManualOrderRequested="HOSTED_FIELD:SUBMIT_MANUAL_ORDER_REQUESTED",t.ValidateRequested="HOSTED_FIELD:VALIDATE_REQUESTED",t.StoredCardRequested="HOSTED_FIELD:STORED_CARD_REQUESTED"}(U||(U={})),function(t){t.AttachSucceeded="HOSTED_INPUT:ATTACH_SUCCEEDED",t.AttachFailed="HOSTED_INPUT:ATTACH_FAILED",t.BinChanged="HOSTED_INPUT:BIN_CHANGED",t.Blurred="HOSTED_INPUT:BLURRED",t.Changed="HOSTED_INPUT:CHANGED",t.CardTypeChanged="HOSTED_INPUT:CARD_TYPE_CHANGED",t.Entered="HOSTED_INPUT:ENTERED",t.Focused="HOSTED_INPUT:FOCUSED",t.SubmitSucceeded="HOSTED_INPUT:SUBMIT_SUCCEEDED",t.SubmitFailed="HOSTED_INPUT:SUBMIT_FAILED",t.SubmitManualOrderSucceeded="HOSTED_INPUT:SUBMIT_MANUAL_ORDER_SUCCEEDED",t.SubmitManualOrderFailed="HOSTED_INPUT:SUBMIT_MANUAL_ORDER_FAILED",t.Validated="HOSTED_INPUT:VALIDATED",t.StoredCardSucceeded="HOSTED_INPUT:STORED_CARD_SUCCEEDED",t.StoredCardFailed="HOSTED_INPUT:STORED_CARD_FAILED"}(N||(N={}));var k=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},R=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};const H=function(){function t(t,e,r,n,o,i,a,s,c){this._type=t,this._containerId=e,this._placeholder=r,this._accessibilityLabel=n,this._styles=o,this._eventPoster=i,this._eventListener=a,this._detachmentObserver=s,this._orderId=c,this._iframe=document.createElement("iframe"),this._iframe.src=this.getFrameSrc(this._orderId),this._iframe.style.border="none",this._iframe.style.height="100%",this._iframe.style.overflow="hidden",this._iframe.style.width="100%"}return t.prototype.getFrameSrc=function(t){return void 0!==t?"/admin/payments/".concat(this._orderId,"/hosted-form-field?version=").concat("1.700.2"):"/checkout/payment/hosted-field?version=".concat("1.700.2")},t.prototype.getType=function(){return this._type},t.prototype.attach=function(){return k(this,void 0,void 0,(function(){var t,e,r=this;return R(this,(function(n){switch(n.label){case 0:if(!(t=document.getElementById(this._containerId)))throw new I("Unable to proceed because the provided container ID is not valid.");return t.appendChild(this._iframe),this._eventListener.listen(),e=(0,f.fromEvent)(this._iframe,"load").pipe((0,p.switchMap)((function(t){var e=t.target;return k(r,void 0,void 0,(function(){var t;return R(this,(function(r){switch(r.label){case 0:if(!(t=e&&e.contentWindow))throw new Error("The content window of the iframe cannot be accessed.");return this._eventPoster.setTarget(t),[4,this._eventPoster.post({type:U.AttachRequested,payload:{accessibilityLabel:this._accessibilityLabel,fontUrls:this._getFontUrls(),placeholder:this._placeholder,styles:this._styles,origin:document.location.origin,type:this._type}},{successType:N.AttachSucceeded,errorType:N.AttachFailed})];case 1:return r.sent(),[2]}}))}))})),(0,p.take)(1)).toPromise(),[4,this._detachmentObserver.ensurePresence([this._iframe],e)];case 1:return n.sent(),[2]}}))}))},t.prototype.detach=function(){this._iframe.parentElement&&(this._iframe.parentElement.removeChild(this._iframe),this._eventListener.stopListen())},t.prototype.submitForm=function(t,e){return k(this,void 0,void 0,(function(){var r,n;return R(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),r=this._eventPoster.post({type:U.SubmitRequested,payload:{fields:t,data:e}},{successType:N.SubmitSucceeded,errorType:N.SubmitFailed}),[4,this._detachmentObserver.ensurePresence([this._iframe],r)];case 1:return[2,o.sent()];case 2:if(n=o.sent(),this._isSubmitErrorEvent(n)){if("hosted_form_error"===n.payload.error.code)throw new A(n.payload.error.message);if(n.payload.response)throw function(t){var e=t.body.errors,r=void 0===e?[]:e;return new P(t,{message:C(r)||void 0,errors:r})}(n.payload.response);throw new Error(n.payload.error.message)}throw n;case 3:return[2]}}))}))},t.prototype.submitManualOrderForm=function(t){return k(this,void 0,void 0,(function(){var e,r;return R(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),e=this._eventPoster.post({type:U.SubmitManualOrderRequested,payload:{data:t}},{successType:N.SubmitManualOrderSucceeded,errorType:N.SubmitManualOrderFailed}),[4,this._detachmentObserver.ensurePresence([this._iframe],e)];case 1:return[2,n.sent()];case 2:if(r=n.sent(),this._isSubmitManualOrderErrorEvent(r)){if("hosted_form_error"===r.payload.error.code)throw new A(r.payload.error.message);if(r.payload.error.message)throw new Error(r.payload.error.message);throw new Error(r.payload.error.code)}throw r;case 3:return[2]}}))}))},t.prototype.submitStoredCardForm=function(t,e){return k(this,void 0,void 0,(function(){var r;return R(this,(function(n){return r=this._eventPoster.post({type:U.StoredCardRequested,payload:{fields:t,data:e}},{successType:N.StoredCardSucceeded,errorType:N.StoredCardFailed}),[2,this._detachmentObserver.ensurePresence([this._iframe],r)]}))}))},t.prototype.validateForm=function(){return k(this,void 0,void 0,(function(){var t,e;return R(this,(function(r){switch(r.label){case 0:return t=this._eventPoster.post({type:U.ValidateRequested},{successType:N.Validated}),[4,this._detachmentObserver.ensurePresence([this._iframe],t)];case 1:if(!(e=r.sent().payload).isValid)throw new L(e.errors);return[2]}}))}))},t.prototype._getFontUrls=function(){var t=this,e="fonts.googleapis.com",n=document.querySelectorAll("link[href*='".concat(e,"'][rel='stylesheet']"));return Array.prototype.slice.call(n).filter((function(t){return y(t.href).hostname===e})).filter((function(e){return(0,r.values)(t._styles).map((function(t){return t&&t.fontFamily})).filter((function(t){return"string"==typeof t})).some((function(t){return t.split(/,\s/).some((function(t){return-1!==e.href.indexOf(t.replace(" ","+"))}))}))})).map((function(t){return t.href}))},t.prototype._isSubmitManualOrderErrorEvent=function(t){return t instanceof Object&&null!==t&&"type"in t&&t.type===N.SubmitManualOrderFailed},t.prototype._isSubmitErrorEvent=function(t){return t.type===N.SubmitFailed},t}();var M=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},z=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};const q=function(){function t(t,e,n){var o=this;this._fields=t,this._eventListener=e,this._eventCallbacks=n,this._handleEnter=function(t){var e=t.payload;return M(o,void 0,void 0,(function(){var t,n;return z(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,this.validate()];case 1:return o.sent(),[3,3];case 2:if((t=o.sent())instanceof Error&&"InvalidHostedFormValueError"!==t.name)throw t;return[3,3];case 3:return(void 0===(n=this._eventCallbacks.onEnter)?r.noop:n)(e),[2]}}))}))};var i=this._eventCallbacks,a=i.onBlur,s=void 0===a?r.noop:a,c=i.onCardTypeChange,u=void 0===c?r.noop:c,l=i.onFocus,f=void 0===l?r.noop:l,p=i.onValidate,d=void 0===p?r.noop:p;this._eventListener.addListener(N.Blurred,(function(t){var e=t.payload;return s(e)})),this._eventListener.addListener(N.CardTypeChanged,(function(t){var e=t.payload;return u(e)})),this._eventListener.addListener(N.Focused,(function(t){var e=t.payload;return f(e)})),this._eventListener.addListener(N.Validated,(function(t){var e=t.payload;return d(e)})),this._eventListener.addListener(N.Entered,this._handleEnter),this._eventListener.addListener(N.CardTypeChanged,(function(t){var e=t.payload;return o._cardType=e.cardType})),this._eventListener.addListener(N.BinChanged,(function(t){var e=t.payload;return o._bin=e.bin}))}return t.prototype.getBin=function(){return this._bin},t.prototype.getCardType=function(){return this._cardType},t.prototype.attach=function(){return M(this,void 0,void 0,(function(){var t,e;return z(this,(function(n){switch(n.label){case 0:return this._eventListener.listen(),t=this._getFirstField(),e=(0,r.without)(this._fields,t),[4,t.attach()];case 1:return n.sent(),[4,Promise.all(e.map((function(t){return t.attach()})))];case 2:return n.sent(),[2]}}))}))},t.prototype.detach=function(){this._eventListener.stopListen(),this._fields.forEach((function(t){t.detach()}))},t.prototype.submitManualOrderPayment=function(t){return M(this,void 0,void 0,(function(){return z(this,(function(e){return[2,this._getFirstField().submitManualOrderForm(t.data)]}))}))},t.prototype.submitStoredCard=function(t){return M(this,void 0,void 0,(function(){return z(this,(function(e){return[2,this._getFirstField().submitStoredCardForm(t.fields,t.data)]}))}))},t.prototype.submit=function(t,e,r,n){return M(this,void 0,void 0,(function(){var o,i;return z(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,7]),[4,this._getFirstField().submitForm(this._fields.map((function(t){return t.getType()})),r.transform(t,n))];case 1:case 6:return[2,a.sent()];case 2:return o=a.sent(),i=void 0,o instanceof Error||"string"==typeof o?[4,e.handlePaymentHumanVerification(o)]:[3,4];case 3:return i=a.sent(),[3,5];case 4:throw new Error("Unexpected error type");case 5:return[4,this._getFirstField().submitForm(this._fields.map((function(t){return t.getType()})),r.transform(t,i))];case 7:return[2]}}))}))},t.prototype.validate=function(){return M(this,void 0,void 0,(function(){return z(this,(function(t){return[2,this._getFirstField().validateForm()]}))}))},t.prototype._getFirstField=function(){var t=this._fields[0];if(!t)throw new I("Unable to proceed because the payment form has no field defined.");return t},t}();var B=function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};const V=function(){function t(){}return t.prototype.create=function(t,e){var n=Object.keys(e.fields).reduce((function(r,n){var o=e.fields[n];return o?B(B([],r,!0),[new H(n,o.containerId,o.placeholder||"",o.accessibilityLabel||"",e.styles||{},new b(t),new E(t),new u(new l),e.orderId)],!1):r}),[]);return new q(n,new E(t),(0,r.pick)(e,"onBlur","onEnter","onFocus","onCardTypeChange","onValidate"))},t}();var G,Q=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();!function(t){t[t.CheckoutButtonNotInitialized=0]="CheckoutButtonNotInitialized",t[t.CustomerNotInitialized=1]="CustomerNotInitialized",t[t.PaymentNotInitialized=2]="PaymentNotInitialized",t[t.ShippingNotInitialized=3]="ShippingNotInitialized",t[t.SpamProtectionNotInitialized=4]="SpamProtectionNotInitialized"}(G||(G={}));const W=function(t){function e(e){var r=t.call(this,function(t){switch(t){case G.CustomerNotInitialized:return"Unable to proceed because the customer step of checkout has not been initialized.";case G.PaymentNotInitialized:return"Unable to proceed because the payment step of checkout has not been initialized.";case G.ShippingNotInitialized:return"Unable to proceed because the shipping step of checkout has not been initialized.";case G.SpamProtectionNotInitialized:return"Unable to proceed because the checkout spam protection has not been initialized.";default:return"Unable to proceed because the required component has not been initialized."}}(e))||this;return r.subtype=e,r.name="NotInitializedError",r.type="not_initialized",r}return Q(e,t),e}(a);const Y=function(){function t(t,e){this._host=t,this._hostedFormFactory=e}return t.prototype.initialize=function(t){var e=this,r=this._hostedFormFactory.create(this._host,t);return r.attach().then((function(){e._hostedForm=r}))},t.prototype.deinitialize=function(){this._hostedForm&&(this._hostedForm.detach(),this._hostedForm=void 0)},t.prototype.submitManualOrderPayment=function(t){return e=this,r=void 0,o=function(){var e;return function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(r){switch(r.label){case 0:if(!(e=this._hostedForm))throw new W(G.PaymentNotInitialized);return[4,e.validate()];case 1:return r.sent(),[2,e.submitManualOrderPayment({data:t})]}}))},new((n=void 0)||(n=Promise))((function(t,i){function a(t){try{c(o.next(t))}catch(t){i(t)}}function s(t){try{c(o.throw(t))}catch(t){i(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof n?r:new n((function(t){t(r)}))).then(a,s)}c((o=o.apply(e,r||[])).next())}));var e,r,n,o},t}();function J(t){return new Y(t,new V)}const K=function(){function t(t,e){this._host=t,this._hostedFormFactory=e}return t.prototype.submitStoredCard=function(t,e){return r=this,n=void 0,i=function(){var r;return function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(n){switch(n.label){case 0:if(!(r=this._hostedForm))throw new W(G.PaymentNotInitialized);return[4,r.validate().then((function(){return r.submitStoredCard({fields:t,data:e})}))];case 1:return n.sent(),[2]}}))},new((o=void 0)||(o=Promise))((function(t,e){function a(t){try{c(i.next(t))}catch(t){e(t)}}function s(t){try{c(i.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(a,s)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i},t.prototype.initialize=function(t){var e=this,r=this._hostedFormFactory.create(this._host,t);return r.attach().then((function(){e._hostedForm=r}))},t.prototype.deinitialize=function(){this._hostedForm&&this._hostedForm.detach()},t}();function X(t){return new K(t,new V)}module.exports=e})();
//# sourceMappingURL=hosted-form-v2-iframe-host.js.map