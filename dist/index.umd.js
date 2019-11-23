parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"C9JJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ParserConfig=void 0;var t=function(){function t(t){void 0===t&&(t=!1),this.api=t,this.obj=[],this.exc=[]}return t.prototype.set=function(t){return this._set(t),this},t.prototype._set=function(t){this.obj&&this.obj.push(t)},t.prototype._excludeNode=function(){for(var t,e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];(t=this.exc).push.apply(t,e)},t.prototype.getObj=function(){return this.obj},t.prototype.isApi=function(){return this.api},t.prototype.isExclude=function(t){return this.exc.includes(t)},t.prototype.excludeNode=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this._excludeNode.apply(this,t),this},t}();exports.ParserConfig=t;
},{}],"clRr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ParserAPI=void 0;var e=function(){function e(e){this.config=e}return e.prototype.set=function(e){return this.config.set(e),this},e.prototype.excludeNode=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this.config).excludeNode.apply(e,t),this},e}();exports.ParserAPI=e;
},{}],"g4bq":[function(require,module,exports) {
"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=function(){function t(e,t){this.el=e,this.config=t,this.tmpElement=[],this.tmpJson=[],this.init()}return t.prototype.init=function(){var e=this;if(this.el.addEventListener("override",function(t){var n=e.getElement(t.detail.v);null===n&&console.error("[!Error!] Cannot catch HTMLELEMENT ! "),e.override(t.detail.o,n)}),!(this.el.children.length>=1))throw new Error("[DTM] No children ! ");this.pre(this.el.children),this.el.childNodes.forEach(function(t){e.parse(t)})},t.prototype.pre=function(e,t){void 0===t&&(t=!1);for(var n=0;n<e.length;n++){var o=e[n];this.tmpElement.push(o),o.children.length>0&&this.pre(o.children,!0)}},t.prototype.override=function(t,n){var o=[];if(this.config.isApi()){var r=this.config.getObj().filter(function(e){return e.node.toLowerCase()===n.nodeName.toLowerCase()});if(1===r.length)for(var i=r[0],l=void 0!==i.include,u=void 0!==i.exclude,a=function(e){var t=n.attributes.item(e);if(l&&u){var r=i.include.filter(function(e){return e.toLowerCase()===t.name.toLowerCase()}),a=i.exclude.filter(function(e){return e.toLowerCase()===t.name.toLowerCase()});if(r.length>1&&a.length>=1)throw new Error("[DomToJson] "+t.name+"is on exclude and include !");r.length>=1&&o.push({name:t.name,value:t.value}),a.length>=1&&o.push({name:t.name,value:t.value})}l&&((r=i.include.filter(function(e){return e.toLowerCase()===t.name.toLowerCase()}))&&o.push({name:t.name,value:t.value}));if(u){if((a=i.exclude.filter(function(e){return e.toLowerCase()===t.name.toLowerCase()})).length>=1)return{value:void 0};o.push({name:t.name,value:t.value})}},s=0;s<n.attributes.length;s++){var h=a(s);if("object"===e(h))return h.value}}else for(s=0;s<n.attributes.length;s++){var c=n.attributes.item(s);o.push({name:c.name,value:c.value})}o.length>=1&&(t.attr=o)},t.prototype.parse=function(e,t){var n=this;void 0===t&&(t=null);var o=e.nodeName.toLowerCase(),r={};if(r.node=o,null===t&&"#text"!==o&&this.tmpJson.push(r),"#text"!==e.nodeName){var i=new CustomEvent("override",{detail:{v:e,o:r}});this.el.dispatchEvent(i)}if(e.hasChildNodes()){null!=t&&(void 0===t.childs&&(t.childs=[]),t.childs.push(r));var l=e.childNodes.item(0);"#text"===l.nodeName&&(r.text=l.textContent),e.childNodes.length>=1&&(r.childs=[],e.childNodes.forEach(function(e){n.parse(e,r)}))}else"#text"===e.nodeName&&null!=t?t.text===e.textContent?delete t.childs:(r.text=e.textContent,t.childs.push(r)):null!=t&&t.childs.push(r)},t.prototype.getElement=function(e){var t=this.tmpElement.filter(function(t){return t.isSameNode(e)});return 0===t.length?null:t[0]},t.prototype.getJson=function(){return this.tmpJson},t}(),n=t;exports.default=n;
},{}],"KlB4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Json=void 0;var t=function(){function t(t){this.json=t,this.tmp=[];for(var e=0;e<Object.keys(this.json).length;e++)this.parse(this.json[e],null)}return t.prototype.parse=function(t,e){var n=this;void 0===e&&(e=null);var o=t.node,r=null;"#text"===o?r=document.createTextNode(t.text):(r=document.createElement(o),void 0!==t.text&&(r.textContent=t.text)),null===e&&this.tmp.push(r),void 0!==t.attr&&t.attr.forEach(function(t){r.setAttribute(t.name,t.value)}),void 0!==t.childs&&t.childs.forEach(function(t){n.parse(t,r)}),null!==e&&e.appendChild(r)},t.prototype.getElement=function(){return this.tmp},t}();exports.Json=t;
},{}],"EZvQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Parser=void 0;var e=require("./config"),n=require("./api/config"),r=o(require("./lib/dom")),t=require("./lib/json");function o(e){return e&&e.__esModule?e:{default:e}}var i=function(){function o(){this.config=new e.ParserConfig}return o.prototype.api=function(r){var t=r(new n.ParserAPI(new e.ParserConfig(!0)));this.config=t.config},o.prototype.toJson=function(e){return new r.default(e,this.config).getJson()},o.prototype.toDom=function(e,n){var r,o=new t.Json(e);return void 0===n?(r=document.createElement("div"),o.getElement().forEach(function(e){r.appendChild(e)})):(r=n,o.getElement().forEach(function(e){r.appendChild(e)})),r},o.prototype.newInstance=function(){return new o},o}();exports.Parser=i;
},{"./config":"C9JJ","./api/config":"clRr","./lib/dom":"g4bq","./lib/json":"KlB4"}],"QCba":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Parser",{enumerable:!0,get:function(){return e.Parser}});var e=require("./parser");
},{"./parser":"EZvQ"}]},{},["QCba"], null)
//# sourceMappingURL=/index.umd.js.map