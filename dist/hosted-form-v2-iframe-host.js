(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createHostedFormService:()=>A});const r=require("tslib"),n=require("lodash"),i=function(e){var t=this,r=new Promise((function(e,r){t.cancel=r}));this.promise=Promise.race([e,r])},o=function(e){function t(t){var r,n,i=this.constructor,o=e.call(this,t||"An unexpected error has occurred.")||this;return o.name="StandardError",o.type="standard",r=o,n=i.prototype,Object.setPrototypeOf?Object.setPrototypeOf(r,n):r.__proto__=n,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(o,i):o.stack=new Error(o.message).stack,o}return(0,r.__extends)(t,e),t}(Error),s=function(e){function t(t){var r=e.call(this,t||"Unable to proceed because the required element is unexpectedly detached from the page.")||this;return r.name="UnexpectedDetachmentError",r.type="unexpected_detachment",r}return(0,r.__extends)(t,e),t}(o),a=function(){function e(e){this._mutationObserver=e}return e.prototype.ensurePresence=function(e,t){return(0,r.__awaiter)(this,void 0,void 0,(function(){var n,o,a,c;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:n=new i(t),(o=this._mutationObserver.create((function(t){t.forEach((function(t){0!==Array.from(t.removedNodes).filter((function(t){return e.some((function(e){return t===e||t.contains(e)}))})).length&&n.cancel(new s)}))}))).observe(document.body,{childList:!0,subtree:!0}),r.label=1;case 1:return r.trys.push([1,3,,4]),[4,n.promise];case 2:return a=r.sent(),o.disconnect(),[2,a];case 3:throw c=r.sent(),o.disconnect(),c;case 4:return[2]}}))}))},e}();var c=function(){function e(e){void 0===e&&(e=window),this._window=e}return e.prototype.create=function(e){return new this._window.MutationObserver(e)},e}();const u=require("rxjs"),d=require("rxjs/operators"),h=function(e){function t(t){var r=e.call(this,t||"Invalid arguments have been provided.")||this;return r.name="InvalidArgumentError",r.type="invalid_argument",r}return(0,r.__extends)(t,e),t}(o);function p(e){if(!/^(https?:)?\/\//.test(e))throw new h("The provided URL must be absolute.");var t=document.createElement("a");t.href=e;var r=t.port&&-1!==e.indexOf(t.hostname+":"+t.port)?t.port:"";return{hash:t.hash,hostname:t.hostname,href:t.href,origin:t.protocol+"//"+t.hostname+(r?":"+r:""),pathname:t.pathname,port:r,protocol:t.protocol,search:t.search}}function f(e,t){return e.type===t}const l=function(){function e(e,t,r){this._targetWindow=t,this._context=r,this._targetOrigin="*"===e?"*":p(e).origin}return e.prototype.post=function(e,t){var n=this,i=this._targetWindow;if(window!==i){if(!i)throw new Error("Unable to post message because target window is not set.");var o=t&&(0,u.fromEvent)(window,"message").pipe((0,d.filter)((function(e){return e.origin===n._targetOrigin&&f(e.data,e.data.type)&&-1!==[t.successType,t.errorType].indexOf(e.data.type)})),(0,d.map)((function(e){if(t.errorType===e.data.type)throw e.data;return e.data})),(0,d.take)(1)).toPromise();return i.postMessage((0,r.__assign)((0,r.__assign)({},e),{context:this._context}),this._targetOrigin),o}},e.prototype.setTarget=function(e){this._targetWindow=e},e.prototype.setContext=function(e){this._context=e},e}(),_=function(e,t,n){return t&&n?v(0,t,n):function(e){var t=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return(0,r.__extends)(t,e),t}(e);return Object.getOwnPropertyNames(e.prototype).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e.prototype,r);n&&"constructor"!==r&&Object.defineProperty(t.prototype,r,v(e.prototype,r,n))})),t}(e)};function v(e,t,n){if("function"!=typeof n.value)return n;var i=n.value;return{get:function(){var e=i.bind(this);return Object.defineProperty(this,t,(0,r.__assign)((0,r.__assign)({},n),{value:e})),e},set:function(e){i=e}}}const y=function(){function e(e){var t;this._sourceOrigins=[p(e).origin,(t=p(e),p(0===t.hostname.indexOf("www")?t.href:t.href.replace(t.hostname,"www."+t.hostname))).origin],this._isListening=!1,this._listeners={}}return e.prototype.listen=function(){this._isListening||(this._isListening=!0,window.addEventListener("message",this._handleMessage))},e.prototype.stopListen=function(){this._isListening&&(this._isListening=!1,window.removeEventListener("message",this._handleMessage))},e.prototype.addListener=function(e,t){var r=this._listeners[e];r||(this._listeners[e]=r=[]),-1===r.indexOf(t)&&r.push(t)},e.prototype.removeListener=function(e,t){var r=this._listeners[e];if(r){var n=r.indexOf(t);n>=0&&r.splice(n,1)}},e.prototype.trigger=function(e,t){var r=this._listeners[e.type];r&&r.forEach((function(r){return t?r(e,t):r(e)}))},e.prototype._handleMessage=function(e){if(-1!==this._sourceOrigins.indexOf(e.origin)&&f(e.data,e.data.type)){var t=e.data,n=t.context,i=(0,r.__rest)(t,["context"]);this.trigger(i,n)}},(0,r.__decorate)([_],e.prototype,"_handleMessage",null),e}();var m={body:{},headers:{},status:0};const g=function(e){function t(t,r){var n=void 0===r?{}:r,i=n.message,o=n.errors,s=this,a=t||m,c=a.body,u=a.headers,d=a.status;return(s=e.call(this,i||"An unexpected error has occurred.")||this).name="RequestError",s.type="request",s.body=c,s.headers=u,s.status=d,s.errors=o||[],s}return(0,r.__extends)(t,e),t}(o);function w(e){if(Array.isArray(e))return e.reduce((function(e,t){return t&&t.message?(0,r.__spreadArrays)(e,[t.message]):e}),[]).join(" ")}const E=function(e){function t(t){var r=e.call(this,t||"Unable to proceed due to invalid configuration provided for the hosted payment form.")||this;return r.name="InvalidHostedFormConfigError",r.type="invalid_hosted_form_config",r}return(0,r.__extends)(t,e),t}(o),b=function(e){function t(t){var r=e.call(this,t||"Unable to proceed due to an unknown error with the hosted payment form.")||this;return r.name="InvalidHostedFormError",r.type="invalid_hosted_form",r}return(0,r.__extends)(t,e),t}(o),T=function(e){function t(t){var i=e.call(this,(0,r.__spreadArrays)(["Unable to proceed due to invalid user input values"],(0,n.flatMap)((0,n.values)(t),(function(e){return(0,n.map)(e,(function(e){return e.message}))}))).join(". "))||this;return i.errors=t,i.name="InvalidHostedFormValueError",i.type="invalid_hosted_form_value",i}return(0,r.__extends)(t,e),t}(o);var O,L;!function(e){e.AttachRequested="HOSTED_FIELD:ATTACH_REQUESTED",e.SubmitRequested="HOSTED_FIELD:SUBMITTED_REQUESTED",e.ValidateRequested="HOSTED_FIELD:VALIDATE_REQUESTED"}(O||(O={})),function(e){e.AttachSucceeded="HOSTED_INPUT:ATTACH_SUCCEEDED",e.AttachFailed="HOSTED_INPUT:ATTACH_FAILED",e.BinChanged="HOSTED_INPUT:BIN_CHANGED",e.Blurred="HOSTED_INPUT:BLURRED",e.Changed="HOSTED_INPUT:CHANGED",e.CardTypeChanged="HOSTED_INPUT:CARD_TYPE_CHANGED",e.Entered="HOSTED_INPUT:ENTERED",e.Focused="HOSTED_INPUT:FOCUSED",e.SubmitSucceeded="HOSTED_INPUT:SUBMIT_SUCCEEDED",e.SubmitFailed="HOSTED_INPUT:SUBMIT_FAILED",e.Validated="HOSTED_INPUT:VALIDATED"}(L||(L={}));const S=function(){function e(e,t,r,n,i,o,s,a){this._type=e,this._containerId=t,this._placeholder=r,this._accessibilityLabel=n,this._styles=i,this._eventPoster=o,this._eventListener=s,this._detachmentObserver=a,this._iframe=document.createElement("iframe"),this._iframe.src="/checkout/payment/hosted-field?version=1.623.2",this._iframe.style.border="none",this._iframe.style.height="100%",this._iframe.style.overflow="hidden",this._iframe.style.width="100%"}return e.prototype.getType=function(){return this._type},e.prototype.attach=function(){return(0,r.__awaiter)(this,void 0,void 0,(function(){var e,t,n=this;return(0,r.__generator)(this,(function(i){switch(i.label){case 0:if(!(e=document.getElementById(this._containerId)))throw new E("Unable to proceed because the provided container ID is not valid.");return e.appendChild(this._iframe),this._eventListener.listen(),t=(0,u.fromEvent)(this._iframe,"load").pipe((0,d.switchMap)((function(e){var t=e.target;return(0,r.__awaiter)(n,void 0,void 0,(function(){var e;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:if(!(e=t&&t.contentWindow))throw new Error("The content window of the iframe cannot be accessed.");return this._eventPoster.setTarget(e),[4,this._eventPoster.post({type:O.AttachRequested,payload:{accessibilityLabel:this._accessibilityLabel,fontUrls:this._getFontUrls(),placeholder:this._placeholder,styles:this._styles,origin:document.location.origin,type:this._type}},{successType:L.AttachSucceeded,errorType:L.AttachFailed})];case 1:return r.sent(),[2]}}))}))})),(0,d.take)(1)).toPromise(),[4,this._detachmentObserver.ensurePresence([this._iframe],t)];case 1:return i.sent(),[2]}}))}))},e.prototype.detach=function(){this._iframe.parentElement&&(this._iframe.parentElement.removeChild(this._iframe),this._eventListener.stopListen())},e.prototype.submitForm=function(e,t){return(0,r.__awaiter)(this,void 0,void 0,(function(){var n,i;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),n=this._eventPoster.post({type:O.SubmitRequested,payload:{fields:e,data:t}},{successType:L.SubmitSucceeded,errorType:L.SubmitFailed}),[4,this._detachmentObserver.ensurePresence([this._iframe],n)];case 1:return[2,r.sent()];case 2:if(i=r.sent(),this._isSubmitErrorEvent(i)){if("hosted_form_error"===i.payload.error.code)throw new b(i.payload.error.message);if(i.payload.response)throw function(e,t){var r=e.body.errors,n=void 0===r?[]:r;return new g(e,{message:w(n)||void 0,errors:n})}(i.payload.response);throw new Error(i.payload.error.message)}throw i;case 3:return[2]}}))}))},e.prototype.validateForm=function(){return(0,r.__awaiter)(this,void 0,void 0,(function(){var e,t;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return e=this._eventPoster.post({type:O.ValidateRequested},{successType:L.Validated}),[4,this._detachmentObserver.ensurePresence([this._iframe],e)];case 1:if(!(t=r.sent().payload).isValid)throw new T(t.errors);return[2]}}))}))},e.prototype._getFontUrls=function(){var e=this,t="fonts.googleapis.com",r=document.querySelectorAll("link[href*='"+t+"'][rel='stylesheet']");return Array.prototype.slice.call(r).filter((function(e){return p(e.href).hostname===t})).filter((function(t){return(0,n.values)(e._styles).map((function(e){return e&&e.fontFamily})).filter((function(e){return"string"==typeof e})).some((function(e){return e.split(/,\s/).some((function(e){return-1!==t.href.indexOf(e.replace(" ","+"))}))}))})).map((function(e){return e.href}))},e.prototype._isSubmitErrorEvent=function(e){return e.type===L.SubmitFailed},e}(),D=function(){function e(e,t,i){var o=this;this._fields=e,this._eventListener=t,this._eventCallbacks=i,this._handleEnter=function(e){var t=e.payload;return(0,r.__awaiter)(o,void 0,void 0,(function(){var e,i;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.validate()];case 1:return r.sent(),[3,3];case 2:if("InvalidHostedFormValueError"!==(e=r.sent()).name)throw e;return[3,3];case 3:return(void 0===(i=this._eventCallbacks.onEnter)?n.noop:i)(t),[2]}}))}))};var s=this._eventCallbacks,a=s.onBlur,c=void 0===a?n.noop:a,u=s.onCardTypeChange,d=void 0===u?n.noop:u,h=s.onFocus,p=void 0===h?n.noop:h,f=s.onValidate,l=void 0===f?n.noop:f;this._eventListener.addListener(L.Blurred,(function(e){var t=e.payload;return c(t)})),this._eventListener.addListener(L.CardTypeChanged,(function(e){var t=e.payload;return d(t)})),this._eventListener.addListener(L.Focused,(function(e){var t=e.payload;return p(t)})),this._eventListener.addListener(L.Validated,(function(e){var t=e.payload;return l(t)})),this._eventListener.addListener(L.Entered,this._handleEnter),this._eventListener.addListener(L.CardTypeChanged,(function(e){var t=e.payload;return o._cardType=t.cardType})),this._eventListener.addListener(L.BinChanged,(function(e){var t=e.payload;return o._bin=t.bin}))}return e.prototype.getBin=function(){return this._bin},e.prototype.getCardType=function(){return this._cardType},e.prototype.attach=function(){return(0,r.__awaiter)(this,void 0,void 0,(function(){var e,t;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return this._eventListener.listen(),e=this._getFirstField(),t=(0,n.without)(this._fields,e),[4,e.attach()];case 1:return r.sent(),[4,Promise.all(t.map((function(e){return e.attach()})))];case 2:return r.sent(),[2]}}))}))},e.prototype.detach=function(){this._eventListener.stopListen(),this._fields.forEach((function(e){e.detach()}))},e.prototype.validate=function(){return(0,r.__awaiter)(this,void 0,void 0,(function(){return(0,r.__generator)(this,(function(e){return[2,this._getFirstField().validateForm()]}))}))},e.prototype._getFirstField=function(){var e=this._fields[0];if(!e)throw new E("Unable to proceed because the payment form has no field defined.");return e},e}(),F=function(){function e(){}return e.prototype.create=function(e,t){var i=Object.keys(t.fields).reduce((function(n,i){var o=t.fields[i];return o?(0,r.__spreadArrays)(n,[new S(i,o.containerId,o.placeholder||"",o.accessibilityLabel||"",t.styles||{},new l(e),new y(e),new a(new c))]):n}),[]);return new D(i,new y(e),(0,n.pick)(t,"onBlur","onEnter","onFocus","onCardTypeChange","onValidate"))},e}(),P=function(){function e(e,t){this._host=e,this._hostedFormFactory=t}return e.prototype.initialize=function(e){var t=this,r=this._hostedFormFactory.create(this._host,e);return r.attach().then((function(){t._hostedForm=r}))},e.prototype.deinitialize=function(){this._hostedForm&&(this._hostedForm.detach(),this._hostedForm=void 0)},e}();function A(e){return new P(e,new F)}module.exports=t})();
//# sourceMappingURL=hosted-form-v2-iframe-host.js.map