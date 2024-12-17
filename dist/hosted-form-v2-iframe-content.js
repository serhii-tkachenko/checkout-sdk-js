(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{initializeHostedInput:()=>yt,notifyInitializeError:()=>mt});var n,r=(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});const o=function(t){function e(e){var n,r,o=this.constructor,i=t.call(this,e||"An unexpected error has occurred.")||this;return i.name="StandardError",i.type="standard",n=i,r=o.prototype,Object.setPrototypeOf?Object.setPrototypeOf(n,r):n.__proto__=r,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(i,o):i.stack=new Error(i.message).stack,i}return r(e,t),e}(Error);var i=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();const a=function(t){function e(e){var n=t.call(this,e||"Invalid arguments have been provided.")||this;return n.name="InvalidArgumentError",n.type="invalid_argument",n}return i(e,t),e}(o);function s(t){if(!/^(https?:)?\/\//.test(t))throw new a("The provided URL must be absolute.");var e=document.createElement("a");e.href=t;var n=e.port&&-1!==t.indexOf("".concat(e.hostname,":").concat(e.port))?e.port:"";return{hash:e.hash,hostname:e.hostname,href:e.href,origin:"".concat(e.protocol,"//").concat(e.hostname).concat(n?":".concat(n):""),pathname:e.pathname,port:n,protocol:e.protocol,search:e.search}}function u(t){return s(0===t.hostname.indexOf("www")?t.href:t.href.replace(t.hostname,"www.".concat(t.hostname)))}var c=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),p=function(){return p=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},p.apply(this,arguments)};const l=function(t,e,n){return e&&n?d(0,e,n):function(t){var e=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),e}(t);return Object.getOwnPropertyNames(t.prototype).forEach((function(n){var r=Object.getOwnPropertyDescriptor(t.prototype,n);r&&"constructor"!==n&&Object.defineProperty(e.prototype,n,d(t.prototype,n,r))})),e}(t)};function d(t,e,n){if("function"!=typeof n.value)return n;var r=n.value;return{get:function(){var t=r.bind(this);return Object.defineProperty(this,e,p(p({},n),{value:t})),t},set:function(t){r=t}}}function f(t,e){return t.type===e}var h=function(){function t(t){this._sourceOrigins=[s(t).origin,u(s(t)).origin],this._isListening=!1,this._listeners={}}return t.prototype.listen=function(){this._isListening||(this._isListening=!0,window.addEventListener("message",this._handleMessage))},t.prototype.stopListen=function(){this._isListening&&(this._isListening=!1,window.removeEventListener("message",this._handleMessage))},t.prototype.addListener=function(t,e){var n=this._listeners[t];n||(this._listeners[t]=n=[]),-1===n.indexOf(e)&&n.push(e)},t.prototype.removeListener=function(t,e){var n=this._listeners[t];if(n){var r=n.indexOf(e);r>=0&&n.splice(r,1)}},t.prototype.trigger=function(t,e){var n=this._listeners[t.type];n&&n.forEach((function(n){return e?n(t,e):n(t)}))},t.prototype._handleMessage=function(t){if(-1!==this._sourceOrigins.indexOf(t.origin)&&f(t.data,t.data.type)){var e=t.data,n=e.context,r=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}(e,["context"]);this.trigger(r,n)}},function(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);i>3&&a&&Object.defineProperty(e,n,a)}([l],t.prototype,"_handleMessage",null),t}();const y=h,_=function(){function t(){}return t.prototype.setNonce=function(t){this._nonce=t},t.prototype.getNonce=function(){return this._nonce},t}();var m;function v(){return m=m||new _}const g=require("@bigcommerce/request-sender"),b=require("rxjs"),w=require("rxjs/operators");var O=function(){return O=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},O.apply(this,arguments)};const E=function(){function t(t,e,n){this._targetWindow=e,this._context=n,this._targetOrigin="*"===t?"*":s(t).origin}return t.prototype.post=function(t,e){var n=this,r=this._targetWindow;if(window!==r){if(!r)throw new Error("Unable to post message because target window is not set.");var o=e&&(0,b.fromEvent)(window,"message").pipe((0,w.filter)((function(t){return t.origin===n._targetOrigin&&f(t.data,t.data.type)&&-1!==[e.successType,e.errorType].indexOf(t.data.type)})),(0,w.map)((function(t){if(e.errorType===t.data.type)throw t.data;return t.data})),(0,w.take)(1)).toPromise();return r.postMessage(O(O({},t),{context:this._context}),this._targetOrigin),o}},t.prototype.setTarget=function(t){this._targetWindow=t},t.prototype.setContext=function(t){this._context=t},t}();var S;!function(t){t.CardCode="cardCode",t.CardExpiry="cardExpiry",t.CardName="cardName",t.CardNumber="cardNumber",t.Note="note",t.Hidden="hidden"}(S||(S={}));const C=S;var T;!function(t){t.Json="application/json",t.JsonV1="application/vnd.bc.v1+json"}(T||(T={}));const P=T;var x,I,D,A;!function(t){t.Card="card",t.ManualPayment="manual_payment"}(I||(I={})),function(t){t.BankDeposit="bigcommerce_offline.bank_deposit",t.Cheque="bigcommerce_offline.cheque",t.Cod="bigcommerce_offline.cod",t.InStore="bigcommerce_offline.in_store",t.MoneyOrder="bigcommerce_offline.money_order"}(D||(D={})),function(t){t.BankDeposit="bank_deposit",t.Cheque="cheque",t.Cod="cod",t.InStore="in_store",t.MoneyOrder="money_order"}(A||(A={}));var j=((x={})[D.BankDeposit]=A.BankDeposit,x[D.Cheque]=A.Cheque,x[D.Cod]=A.Cod,x[D.InStore]=A.InStore,x[D.MoneyOrder]=A.MoneyOrder,x),N=function(t){return Object.values(D).includes(t)},L=function(){function t(t,e){this._requestSender=t,this._paymentOrigin=e}return t.prototype.submitPayment=function(t,e,n){var r,o,i,a,s,u,c;return a=this,s=void 0,c=function(){var a,s,u,c,p,l,d;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(f){return a=t.paymentMethodId,s=t.paymentSessionToken,"bigcommerce.manual_payment"===a?u={type:I.ManualPayment,note:null!==(r=e.note)&&void 0!==r?r:""}:N(a)?u={type:j[a]}:(c=e.cardExpiry?e.cardExpiry.split("/"):[],p=c[0],l=c[1],u={type:I.Card,name:null!==(o=e.cardName)&&void 0!==o?o:"",number:e.cardNumber?e.cardNumber.replace(/ /g,""):"",expires:{month:Number(p.trim()),year:Number("20".concat(l.trim()))},verification_value:null!==(i=e.cardCode)&&void 0!==i?i:void 0}),d={headers:{Accept:P.Json,"Content-Type":P.Json,"X-Payment-Session-Token":s},body:{instrument:u,payment_method_id:a,form_nonce:null!=n?n:void 0}},[2,this._requestSender.post("".concat(this._paymentOrigin,"/payments"),d)]}))},new((u=void 0)||(u=Promise))((function(t,e){function n(t){try{o(c.next(t))}catch(t){e(t)}}function r(t){try{o(c.throw(t))}catch(t){e(t)}}function o(e){var o;e.done?t(e.value):(o=e.value,o instanceof u?o:new u((function(t){t(o)}))).then(n,r)}o((c=c.apply(a,s||[])).next())}))},t}(),V=function(){function t(){}return t.prototype.format=function(t){var e=t.split(new RegExp("\\s*".concat("/","\\s*"))),n=e[0],r=void 0===n?"":n,o=e[1],i=void 0===o?"":o,a=r.slice(0,2),s=4===i.length?i.slice(-2):i?i.slice(0,2):r.slice(2);return t.length<2?r:t.length>3&&!s?a:"".concat(a," ").concat("/"," ").concat(s)},t.prototype.toObject=function(t){var e=t.split(new RegExp("\\s*".concat("/","\\s*"))),n=e[0],r=void 0===n?"":n,o=e[1],i=void 0===o?"":o;return/^\d+$/.test(r)&&/^\d+$/.test(i)?{month:1===r.length?"0".concat(r):r.slice(0,2),year:2===i.length?"20".concat(i):i.slice(0,4)}:{month:"",year:""}},t}();const k=V,M=require("card-validator"),F=require("lodash"),U=function(){function t(){}return t.prototype.format=function(t){var e=(0,M.number)(t).card;if(!e)return t;var n=(0,F.max)((0,M.creditCardType)(t).map((function(t){return(0,F.max)(t.lengths)}))),r=this.unformat(t).slice(0,n);return e.gaps.filter((function(t){return r.length>t})).reduce((function(t,e,n){return[t.slice(0,e+n),t.slice(e+n)].join(" ")}),r)},t.prototype.unformat=function(t){return(0,M.number)(t).card?t.replace(new RegExp(" ","g"),""):t},t}();function R(t){switch(t){case C.CardCode:return"cc-csc";case C.CardExpiry:return"cc-exp";case C.CardName:return"cc-name";case C.CardNumber:return"cc-number";default:return""}}const q=function(){function t(t,e,n){var r=this;this._form=t,this._fieldTypes=e,this._inputAggregator=n,this._handleChange=function(t){var e=t.target;if(!e)throw new Error("Unable to get a reference to the target of the change event.");var n=r._inputAggregator.getInputs().find((function(t){return r._getAutocompleteElementId(t.getType())===e.id}));n&&n.setValue(e.value)},this._inputs=this._fieldTypes.map((function(t){return r._createInput(t)}))}return t.prototype.attach=function(){var t=this;this._inputs.forEach((function(e){return t._form.appendChild(e)}))},t.prototype.detach=function(){this._inputs.forEach((function(t){t.parentElement&&t.parentElement.removeChild(t)}))},t.prototype._createInput=function(t){var e=document.createElement("input");return e.autocomplete=R(t),e.id=this._getAutocompleteElementId(t),e.tabIndex=-1,e.style.position="absolute",e.style.opacity="0",e.style.zIndex="-1",e.addEventListener("change",this._handleChange),e},t.prototype._getAutocompleteElementId=function(t){return"autocomplete-".concat((0,F.kebabCase)(t))},t}();var H,B;!function(t){t.AttachRequested="HOSTED_FIELD:ATTACH_REQUESTED",t.SubmitRequested="HOSTED_FIELD:SUBMITTED_REQUESTED",t.SubmitManualOrderRequested="HOSTED_FIELD:SUBMIT_MANUAL_ORDER_REQUESTED",t.ValidateRequested="HOSTED_FIELD:VALIDATE_REQUESTED"}(H||(H={})),function(t){t.AttachSucceeded="HOSTED_INPUT:ATTACH_SUCCEEDED",t.AttachFailed="HOSTED_INPUT:ATTACH_FAILED",t.BinChanged="HOSTED_INPUT:BIN_CHANGED",t.Blurred="HOSTED_INPUT:BLURRED",t.Changed="HOSTED_INPUT:CHANGED",t.CardTypeChanged="HOSTED_INPUT:CARD_TYPE_CHANGED",t.Entered="HOSTED_INPUT:ENTERED",t.Focused="HOSTED_INPUT:FOCUSED",t.SubmitSucceeded="HOSTED_INPUT:SUBMIT_SUCCEEDED",t.SubmitFailed="HOSTED_INPUT:SUBMIT_FAILED",t.SubmitManualOrderSucceeded="HOSTED_INPUT:SUBMIT_MANUAL_ORDER_SUCCEEDED",t.SubmitManualOrderFailed="HOSTED_INPUT:SUBMIT_MANUAL_ORDER_FAILED",t.Validated="HOSTED_INPUT:VALIDATED",t.StoredCardSucceeded="HOSTED_INPUT:STORED_CARD_SUCCEEDED",t.StoredCardFailed="HOSTED_INPUT:STORED_CARD_FAILED"}(B||(B={}));var z=function(){function t(t,e,n,r,o,i,a,s,u,c,p,l){var d=this;this._type=t,this._form=e,this._placeholder=n,this._accessibilityLabel=r,this._autocomplete=o,this._styles=i,this._fontUrls=a,this._eventListener=s,this._eventPoster=u,this._inputAggregator=c,this._inputValidator=p,this._manualOrderPaymentHandler=l,this._isTouched=!1,this._handleInput=function(t){var e=t.target;d._processChange(e.value)},this._handleBlur=function(){d._applyStyles(d._styles.default),d._validateForm(),d._eventPoster.post({type:B.Blurred,payload:{fieldType:d._type}})},this._handleFocus=function(){d._applyStyles(d._styles.focus),d._eventPoster.post({type:B.Focused,payload:{fieldType:d._type}})},this._handleValidate=function(){d._validateForm()},this._handleSubmit=function(t){t.preventDefault(),d._eventPoster.post({type:B.Entered,payload:{fieldType:d._type}})},this._forceFocusToInput=function(){document.activeElement===document.body&&(navigator.userAgent.toLowerCase().indexOf("safari")>-1?""===d._input.value&&(d._input.setAttribute("value"," "),d._input.setSelectionRange(0,1),d._input.setAttribute("value","")):d._input.focus())},this._input=document.createElement("input"),this._input.addEventListener("input",this._handleInput),this._input.addEventListener("blur",this._handleBlur),this._input.addEventListener("focus",this._handleFocus),this._eventListener.addListener(H.ValidateRequested,this._handleValidate),this._eventListener.addListener(H.SubmitManualOrderRequested,this._manualOrderPaymentHandler.handle),this._configureInput()}return t.prototype.getType=function(){return this._type},t.prototype.getValue=function(){return this._input.value},t.prototype.setValue=function(t){this._processChange(t)},t.prototype.isTouched=function(){return this._isTouched},t.prototype.attach=function(){this._form.appendChild(this._input),this._form.addEventListener("submit",this._handleSubmit),this._loadFonts(),this._eventPoster.setTarget(window.parent),this._eventListener.listen(),window.addEventListener("focus",this._forceFocusToInput),window.hostedInput=this,this._eventPoster.post({type:B.AttachSucceeded})},t.prototype.detach=function(){this._input.parentElement&&this._input.parentElement.removeChild(this._input),this._form.removeEventListener("submit",this._handleSubmit),this._unloadFonts(),window.removeEventListener("focus",this._forceFocusToInput),this._eventListener.stopListen()},t.prototype._formatValue=function(t){this._input.value=t},t.prototype._notifyChange=function(t){this._eventPoster.post({type:B.Changed,payload:{fieldType:this._type}})},t.prototype._configureInput=function(){switch(this._input.style.backgroundColor="transparent",this._input.style.border="0",this._input.style.display="block",this._input.style.height="100%",this._input.style.margin="0",this._input.style.outline="none",this._input.style.padding="0",this._input.style.width="100%",this._input.id=(0,F.kebabCase)(this._type),this._input.placeholder=this._placeholder,this._input.autocomplete=this._autocomplete,this._input.setAttribute("aria-label",this._accessibilityLabel),this._applyStyles(this._styles.default),this._input.id){case"card-code":case"card-expiry":case"card-number":this._input.type="text",this._input.inputMode="numeric",this._input.pattern="[0-9]*";break;case"card-name":case"note":case"hidden":this._input.type="text",this._input.inputMode="text"}},t.prototype._applyStyles=function(t){var e=this;void 0===t&&(t={});var n={color:t.color,fontFamily:t.fontFamily,fontSize:t.fontSize,fontWeight:t.fontWeight};Object.keys(n).forEach((function(t){n[t]&&(e._input.style[t]=n[t]||"")}))},t.prototype._loadFonts=function(){this._fontLinks||(this._fontLinks=this._fontUrls.filter((function(t){return"fonts.googleapis.com"===s(t).hostname})).filter((function(t){return!document.querySelector("link[href='".concat(t,"'][rel='stylesheet']"))})).map((function(t){var e=document.createElement("link");return e.rel="stylesheet",e.href=t,document.head.appendChild(e),e})))},t.prototype._unloadFonts=function(){this._fontLinks&&(this._fontLinks.forEach((function(t){t.parentElement&&t.parentElement.removeChild(t)})),this._fontLinks=void 0)},t.prototype._validateForm=function(){return t=this,e=void 0,r=function(){var t,e;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(n){switch(n.label){case 0:return t=this._inputAggregator.getInputValues(),[4,this._inputValidator.validate(t)];case 1:return(e=n.sent()).isValid?this._applyStyles(this._styles.default):this._applyStyles(this._styles.error),this._eventPoster.post({type:B.Validated,payload:e}),[2]}}))},new((n=void 0)||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function s(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}u((r=r.apply(t,e||[])).next())}));var t,e,n,r},t.prototype._processChange=function(t){t!==this._previousValue&&(this._isTouched=!0,this._formatValue(t),this._validateForm(),this._notifyChange(t),this._previousValue=t)},t}();const G=z;var W=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();const J=function(t){function e(e,n,r,o,i,a,s,u,c,p,l,d){var f=t.call(this,C.CardExpiry,e,n,r,o,i,a,s,u,c,p,l)||this;return f._formatter=d,f}return W(e,t),e.prototype._formatValue=function(t){this._input.value=this._formatter.format(t)},e}(G);var Q=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();const Y=function(t){function e(e,n,r,o,i,a,s,u,c,p,l,d,f,h){var y=t.call(this,e,n,r,o,i,a,s,u,c,p,l,d)||this;return y._autocompleteFieldset=f,y._formatter=h,y}return Q(e,t),e.prototype.attach=function(){t.prototype.attach.call(this),this._autocompleteFieldset.attach()},e.prototype._notifyChange=function(t){var e=(0,M.number)(t).card,n=this._previousValue&&(0,M.number)(this._previousValue).card;(0,F.get)(n,"type")!==(0,F.get)(e,"type")&&this._eventPoster.post({type:B.CardTypeChanged,payload:{cardType:e?e.type:void 0}});var r=this._formatter.unformat(t),o=this._previousValue?this._formatter.unformat(this._previousValue):"",i=r.length>=6&&(0,M.number)(r).isPotentiallyValid?r.substr(0,6):"";i!==(o.length>=6?o.substr(0,6):"")&&this._eventPoster.post({type:B.BinChanged,payload:{bin:i}})},e.prototype._formatValue=function(t){var e=this._input.selectionEnd,n=this._formatter.format(t);e===t.length&&t.length<n.length?this._input.setSelectionRange(n.length,n.length):this._input.setSelectionRange(e||0,e||0),this._input.value=n},e}(G);var $=function(){return $=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},$.apply(this,arguments)},X=function(t,e,n){if(n||2===arguments.length)for(var r,o=0,i=e.length;o<i;o++)!r&&o in e||(r||(r=Array.prototype.slice.call(e,0,o)),r[o]=e[o]);return t.concat(r||Array.prototype.slice.call(e))},K=function(){function t(t){this._parentWindow=t}return t.prototype.getInputs=function(t){return Array.prototype.slice.call(this._parentWindow.frames).reduce((function(e,n){try{var r=n.hostedInput;return!r||t&&!t(r)?e:X(X([],e,!0),[r],!1)}catch(t){if(t instanceof DOMException)return e;if(t instanceof Error&&"Permission denied"===t.message)return e;throw t}}),[])},t.prototype.getInputValues=function(t){return this.getInputs(t).reduce((function(t,e){var n;return $($({},t),((n={})[e.getType()]=e.getValue(),n))}),{})},t}();const Z=K;var tt=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),et=function(t){function e(e){var n=t.call(this,function(t,e,n){if(n||2===arguments.length)for(var r,o=0,i=e.length;o<i;o++)!r&&o in e||(r||(r=Array.prototype.slice.call(e,0,o)),r[o]=e[o]);return t.concat(r||Array.prototype.slice.call(e))}(["Unable to proceed due to invalid user input values"],(0,F.flatMap)((0,F.values)(e),(function(t){return(0,F.map)(t,(function(t){return t.message}))})),!0).join(". "))||this;return n.errors=e,n.name="InvalidHostedFormValueError",n.type="invalid_hosted_form_value",n}return tt(e,t),e}(o);const nt=et;var rt=function(){function t(t,e,n,r,o){var i=this;this._inputAggregator=t,this._inputValidator=e,this._inputStorage=n,this._eventPoster=r,this._manualOrderPaymentRequestSender=o,this.handle=function(t){return e=i,n=void 0,o=function(){var e,n,r,o,i,a,s,u,c,p,l;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(d){switch(d.label){case 0:return e=t.payload.data,n=this._inputAggregator.getInputValues(),[4,this._inputValidator.validate(n)];case 1:if(r=d.sent(),this._eventPoster.post({type:B.Validated,payload:r}),!r.isValid)return o=new nt(r.errors),[2,this._eventPoster.post({type:B.SubmitManualOrderFailed,payload:{error:{code:(0,F.snakeCase)(o.name),message:o.message}}})];d.label=2;case 2:return d.trys.push([2,4,,5]),[4,this._manualOrderPaymentRequestSender.submitPayment(e,n,this._inputStorage.getNonce())];case 3:return i=d.sent(),a="failure"===(0,F.get)(i.body,"type")&&(0,F.isString)((0,F.get)(i.body,"code")),s="error"===(0,F.get)(i.body,"type"),u=N(e.paymentMethodId)&&"continue"===(0,F.get)(i.body,"type")&&"complete_offline"===(0,F.get)(i.body,"code"),c="continue"===(0,F.get)(i.body,"type")&&"await_confirmation"===(0,F.get)(i.body,"code"),p="success"===(0,F.get)(i.body,"type")||u||c,a?this._eventPoster.post({type:B.SubmitManualOrderFailed,payload:{error:{code:(0,F.get)(i.body,"code")}}}):s?this._eventPoster.post({type:B.SubmitManualOrderFailed,payload:{error:{code:(0,F.get)(i.body,"type")}}}):p&&this._eventPoster.post({type:B.SubmitManualOrderSucceeded,payload:{response:i}}),[3,5];case 4:return l=d.sent(),this._isPaymentErrorResponse(l)?this._eventPoster.post({type:B.SubmitManualOrderFailed,payload:{error:l.body.errors[0],response:l}}):this._isErrorResponse(l)&&this._eventPoster.post({type:B.SubmitManualOrderFailed,payload:{error:{code:(0,F.snakeCase)(l.name),message:l.message}}}),[3,5];case 5:return[2]}}))},new((r=void 0)||(r=Promise))((function(t,i){function a(t){try{u(o.next(t))}catch(t){i(t)}}function s(t){try{u(o.throw(t))}catch(t){i(t)}}function u(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(a,s)}u((o=o.apply(e,n||[])).next())}));var e,n,r,o}}return t.prototype._isPaymentErrorResponse=function(t){var e=(t||{}).body,n=(void 0===e?{}:e).errors,r=void 0===n?[]:n;return"string"==typeof(r[0]&&r[0].code)&&"string"==typeof(r[0]&&r[0].message)},t.prototype._isErrorResponse=function(t){return"object"==typeof t&&null!==t&&("name"in t&&"string"==typeof t.name||!("name"in t))&&("message"in t&&"string"==typeof t.message||!("message"in t))},t}();const ot=rt,it=require("yup");var at=function(){return at=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},at.apply(this,arguments)},st=function(t,e,n){if(n||2===arguments.length)for(var r,o=0,i=e.length;o<i;o++)!r&&o in e||(r||(r=Array.prototype.slice.call(e,0,o)),r[o]=e[o]);return t.concat(r||Array.prototype.slice.call(e))},ut=function(){function t(){this._completeSchema={cardCode:this._getCardCodeSchema(),cardExpiry:this._getCardExpirySchema(),cardName:this._getCardNameSchema(),cardNumber:this._getCardNumberSchema(),note:this._getNoteSchema()},this._configureCardValidator()}return t.prototype.validate=function(t){return e=this,n=void 0,o=function(){var e,n,r,o;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(i){switch(i.label){case 0:for(r in e={},n={errors:{},isValid:!0},t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=this._completeSchema[r],n.errors[r]=[]);i.label=1;case 1:return i.trys.push([1,3,,4]),[4,(0,it.object)(e).validate(t,{abortEarly:!1})];case 2:return i.sent(),[2,n];case 3:if(o=i.sent(),this._isValidationErrorType(o))throw o;return[2,{errors:Object.keys(n.errors).reduce((function(t,e){var n;return at(at({},t),((n={})[e]=o.inner.filter((function(t){return t.path===e})).map((function(t){return{fieldType:t.path,message:t.errors.join(" "),type:t.type}})),n))}),{}),isValid:!1}];case 4:return[2]}}))},new((r=void 0)||(r=Promise))((function(t,i){function a(t){try{u(o.next(t))}catch(t){i(t)}}function s(t){try{u(o.throw(t))}catch(t){i(t)}}function u(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(a,s)}u((o=o.apply(e,n||[])).next())}));var e,n,r,o},t.prototype._configureCardValidator=function(){var t=M.creditCardType.getTypeInfo("discover"),e=M.creditCardType.getTypeInfo("visa");M.creditCardType.updateCard("visa",{lengths:st([13],e.lengths||[],!0)}),M.creditCardType.updateCard("discover",{patterns:st(st([],t.patterns||[],!0),[[810,817]],!1)}),M.creditCardType.addCard({niceType:"Mada",type:"mada",patterns:[400861,401757,407197,407395,409201,410685,412565,417633,419593,422817,422818,422819,428331,428671,428672,428673,431361,432328,434107,439954,440533,440647,440795,445564,446393,446404,446672,455036,455708,457865,458456,462220,468540,468541,468542,468543,483010,483011,483012,484783,486094,486095,486096,489317,489318,489319,493428,504300,506968,508160,513213,520058,521076,524130,524514,529415,529741,530060,530906,531095,531196,532013,535825,535989,536023,537767,539931,543085,543357,549760,554180,557606,558848,585265,588845,588846,588847,588848,588849,588850,588851,588982,588983,589005,589206,604906,605141,636120,968201,968202,968203,968204,968205,968206,968207,968208,968209,968210,968211],gaps:[4,8,12],lengths:[16,18,19],code:{name:"CVV",size:3}})},t.prototype._getCardCodeSchema=function(){return(0,it.string)().required("CVV is required").test({message:"CVV must be valid",name:"invalid_card_code",test:function(t){var e=(0,M.number)(this.parent.cardNumber||"").card;return(0,M.cvv)(t,e&&e.code?e.code.size:void 0).isValid}})},t.prototype._getCardExpirySchema=function(){return(0,it.string)().required("Expiration date is required").test({message:"Expiration date must be a valid future date in MM / YY format",name:"invalid_card_expiry",test:function(t){return(0,M.expirationDate)(t).isValid}})},t.prototype._getCardNameSchema=function(){return(0,it.string)().max(200).required("Full name is required")},t.prototype._getNoteSchema=function(){return(0,it.string)().required("Manual payment description is required").max(128,"Payment description cannot exceed 128 letters")},t.prototype._getCardNumberSchema=function(){return(0,it.string)().required("Credit card number is required").test({message:"Credit card number must be valid",name:"invalid_card_number",test:function(t){return(0,M.number)(t).isValid}})},t.prototype._isValidationErrorType=function(t){return"name"in t&&"ValidationError"!==t.name},t}();const ct=ut,pt=function(){function t(t,e){this._parentOrigin=t,this._paymentOrigin=e}return t.prototype.create=function(t,e,n,r,o,i){void 0===n&&(n={}),void 0===r&&(r=[]),void 0===o&&(o=""),void 0===i&&(i=function(t){switch(t){case C.CardCode:return"CVC";case C.CardExpiry:return"Expiration";case C.CardName:return"Name on card";case C.CardNumber:return"Credit card number";case C.Note:return"Payment note";case C.Hidden:return"Hidden field"}}(e));var a=R(e);return e===C.CardNumber?this._createNumberInput(e,t,n,r,o,i,a):e===C.CardExpiry?this._createExpiryInput(t,n,r,o,i,a):this._createInput(e,t,n,r,o,i,a)},t.prototype.normalizeParentOrigin=function(t){this._parentOrigin!==t&&(this._parentOrigin!==u(s(t)).origin&&t!==u(s(this._parentOrigin)).origin||(this._parentOrigin=t))},t.prototype.getParentOrigin=function(){return this._parentOrigin},t.prototype._createExpiryInput=function(t,e,n,r,o,i){return void 0===o&&(o=""),void 0===i&&(i=""),new J(t,r,o,i,e,n,new y(this._parentOrigin),new E(this._parentOrigin,window.parent),new Z(window.parent),new ct,this._createManualOrderPaymentHandler(),new k)},t.prototype._createNumberInput=function(t,e,n,r,o,i,a){return void 0===i&&(i=""),void 0===a&&(a=""),new Y(t,e,o,i,a,n,r,new y(this._parentOrigin),new E(this._parentOrigin,window.parent),new Z(window.parent),new ct,this._createManualOrderPaymentHandler(),new q(e,[C.CardCode,C.CardExpiry,C.CardName],new Z(window.parent)),new U)},t.prototype._createInput=function(t,e,n,r,o,i,a){return void 0===i&&(i=""),void 0===a&&(a=""),new G(t,e,o,i,a,n,r,new y(this._parentOrigin),new E(this._parentOrigin,window.parent),new Z(window.parent),new ct,this._createManualOrderPaymentHandler())},t.prototype._createManualOrderPaymentHandler=function(){return new ot(new Z(window.parent),new ct,v(),new E(this._parentOrigin,window.parent),new L((0,g.createRequestSender)(),this._paymentOrigin))},t}();var lt=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();const dt=function(t){function e(e){var n=t.call(this,e||"Unable to proceed due to invalid configuration provided for the hosted payment form.")||this;return n.name="InvalidHostedFormConfigError",n.type="invalid_hosted_form_config",n}return lt(e,t),e}(o);var ft=function(){function t(t,e,n){this._factory=t,this._storage=e,this._eventListener=n}return t.prototype.initialize=function(t,e){var n=this;e&&this._storage.setNonce(e);var r=this._createFormContainer(t);return this._resetPageStyles(t),this._eventListener.listen(),(0,b.fromEvent)(this._eventListener,H.AttachRequested).pipe((0,w.map)((function(t){var e=t.payload,o=e.accessibilityLabel,i=e.fontUrls,a=e.placeholder,s=e.styles,u=e.origin,c=e.type;u&&n._factory.normalizeParentOrigin(u);var p=n._factory.create(r,c,s,i,a,o);return p.attach(),p})),(0,w.take)(1)).toPromise()},t.prototype._resetPageStyles=function(t){[document.querySelector("html"),document.querySelector("body"),document.getElementById(t)].forEach((function(t){t&&(t.style.height="100%",t.style.width="100%",t.style.overflow="hidden",t.style.padding="0",t.style.margin="0")}))},t.prototype._createFormContainer=function(t){var e=document.getElementById(t);if(!e)throw new dt("Unable to proceed because the provided container ID is not valid.");var n=document.createElement("form"),r=document.createElement("button");return n.noValidate=!0,n.style.height="100%",n.style.width="100%",r.style.display="none",e.appendChild(n),n.appendChild(r),n},t}();const ht=ft;function yt(t){var e=t.containerId,n=t.nonce,r=t.parentOrigin,o=t.paymentOrigin;return new ht(new pt(r,o),v(),new y(r)).initialize(e,n)}var _t=new E("*",window.parent);function mt(t){_t.post({type:B.AttachFailed,payload:{error:t}})}module.exports=e})();
//# sourceMappingURL=hosted-form-v2-iframe-content.js.map