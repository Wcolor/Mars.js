var Class=function(){function f(e,d){for(var c in d)a(e,c,d[c])}function a(a,d,c){a.prototype[d]=a.prototype._super&&"function"==typeof a.prototype._super[d]?function(){var a=this._super;this._super=a[d];var e=c.apply(this,arguments);this._super=a;return e}:c}var b=[].slice;return{create:function(a){a.initialize||(a.initialize=function(){});var d=function(){if(!this.__uninitialize&&"function"==typeof this.initialize)return this.initialize.apply(this,arguments)},c=[],c=b.call(arguments,1),j=null,g=
null;if("function"==typeof c[0]){var h=c[0];h.prototype.__uninitialize=!0;g=new h;h.prototype.__uninitialize=!1;d.prototype=g;d.prototype._super=h.prototype;c=c.slice(1)}f(d,a);for(g=0;g<c.length;g++)if(h=c[g],"object"==typeof h)for(j in h)"undefined"==typeof d.prototype[j]&&(d.prototype[j]=h[j]);return d.prototype.constructor=d},add_method:a,add_methods:f,instance:function(a){"string"==typeof a&&(a=eval(a));if("undefined"===typeof a)throw"illegal class name";"undefined"===typeof a._instance&&(a._instance=
new a);return a._instance},extend:function(a){var d=[].slice.call(arguments,1),c;for(c in d){var b=d[c],g;for(g in b)a[g]=b[g]}return a}}}(),Mars={modules:{}};
Class.extend(Mars,function(){function f(a){var c=Class.create({initialize:function(a){this.m=a},each:function(a,d){try{this._each(a,d)}catch(c){if("break"!=c)throw c;}return this.m}},Mars.module("enumberable"));Class.add_method(c,"_each",a instanceof Array?function(a,d){for(var c=0;c<this.m.length;c++)a.call(d,this.m[c],c)}:function(a,d){for(var c in this.m)a.call(d,this.m[c],c)});return new c(a)}function a(d){var c="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");this.__random_list||
(this.__random_list={});d||(d=8);for(var b="",e=0;e<d;e++)b+=c[Math.floor(Math.random()*c.length)];if(-1<this.__random_list[b])return a(d);this.__random_list[b]=1;return b}function b(a){var c={},b;for(b in a){var g=a[b];c[b]="object"==typeof g?"function"==typeof g.slice?arguments.callee(g):e(g):a[b]}return c}function e(a){for(var c=[],b=0;b<a.length;b++){var g=a[b];c[b]="object"==typeof g?"function"==typeof item.slice?arguments.callee(item):e(item):g}return c}return{module:function(a,b){if("undefined"==
typeof b)return Mars.modules[a];if(Mars.modules[a])throw"module already defined";Mars.modules[a]=b;return Mars},_:f,each:function(a,b,e){return f(a).each(b,e).m},random_string:a,deep_copy:function(a){return"object"==typeof a?a instanceof Array?b(a):e(a):a},proxy:function(a,b){if(a.__proxy)return a.__proxy;var e=function(){return a.apply(b,arguments)};return a.__proxy=e}}}());
Mars.module("enumberable",function(){function f(a,b){var e=[];this.each(function(d,c){e.push(a.call(b,d,c))});return e}return{each:function(a,b){try{this._each(a,b)}catch(e){if("break"!=e)throw e;}return this},collect:f,map:f}}());
Mars.module("observer",function(){function f(a,b,c){this.__init_observer();var f=this;if(!c&&!this._notify_sync)setTimeout(function(){f.notify(a,b,!0)},0);else return Mars._(this.__publish_handler[a]).each(function(a){var c=Mars.deep_copy(b);a(c)}),setTimeout(function(){f.__published[a]=Mars.deep_copy(b)},1),this}function a(a,b){this.__init_observer();if("undefined"==typeof b)this.__publish_handler[a]=[];else return Mars._(this.__publish_handler[a]).each(function(c,f){if(c===b)throw this.__publish_handler[a].splice(f,
1),"break";},this),this}function b(a,b,c){this.__init_observer();if(c&&this.__published[a])b(this.__published[a]);else return this.__publish_handler[a]=this.__publish_handler[a]||[],this.__publish_handler[a].push(b),this}return{__init_observer:function(){this.__publish_handler||(this.__publish_handler={},this.__published={})},notify:f,add_observer:b,remove_observer:a,bind:b,unbind:a,trigger:f,on:b,off:a}}());
Class.extend(Mars,function(){var f={};f.model=Class.create({__attr:{},primary:"id",url:null,initialize:function(a){Class.extend(this.__attr,a)},save:function(){var a=Mars.REQUEST_TYPE.add,b=this._get_request_url("add");this.__attr[primary]&&(a=Mars.REQUEST_TYPE.update,b=this._get_request_url("update"));return $.ajax({url:b,type:a,data:this.__attr})},attr:function(a,b){this.__attr[a]=b;return this},get:function(){return $.ajax({url:this._get_request_url("get"),data:this._get_request_id()})},remove:function(){var a=
{url:this._get_request_url("remove"),type:Mars.REQUEST_TYPE.remove,data:this._get_request_id()};return $.ajax(a)},update:function(a){a||(a=this.__attr);return $.ajax({url:this._get_request_url("update"),type:Mars.REQUEST_TYPE.update,data:a})},_get_request_id:function(){var a={};a[this.primary]=this.__attr[this.primary];return a},_get_request_url:function(a){return!Mars.support_rest?this.url[a]:this.url}},Mars.module("observer"),Mars.module("enumberable"));f.model_static={all:function(a){a=this._fix_args(a);
return $.ajax(a)},fetch:function(a,b){b=this._fix_args(b);b.data=a;return $.ajax(b)},find:function(a,b){this.fetch(a,b)},_fix_args:function(a){var b=this.prototype.url;Mars.support_rest&&(b=b.get);var e={type:Mars.REQUEST_TYPE.get,url:b};Mars._(a).each(function(a,b){e[b]=a});return e}};f.service=Class.create({},Mars.module("observer"));f.view=Class.create({d:{},_e:[],set:function(a,b){"object"==typeof a?Mars._(a).each(function(a,b){this.set(b,a)},this):this.d[a]="string"==typeof b?$(b):b;return this},
get:function(a){return this.d[a]},initialize:function(){},add_events:function(a){Mars._(a).each(this.add,this)},remove:function(a){this._toggle_event(a,!0)},_toggle_event:function(a,b){var e=b?"off":"on",d=item.split("/");if(3==d.length)this.d[d[0]][e](d[1],Mars.proxy(this[d[2]],this));else this.d[d[0]][e](d[1],d[2],Mars.proxy(this[d[2]],this))},add:function(a){this._toggle_event(a)}},Mars.module("observer"));return{initialize:function(){this._is_running=!0;this._instance_all();this.run()},_view:{},
__view:{},_service:{},__service:{},_model:{},_is_running:!1,rules:[],hash_rules:{},_hash_support:!1,support_rest:!1,_default:[],REQUEST_TYPE:{remove:"post",get:"get",update:"post",add:"post"},set:function(a,b,e){var d=[].slice.call(arguments,2)||[],c=a.split("."),j=c[0],c=c[1],d=Class.create(b,f[c],d);this["_"+c][j]=d;"model"==c&&Class.extend(d,f.model_static);this._is_running&&Mars._(this.rules).each(function(a){this._run_rule(a)},this);if("controller"==c||"service"==c||"view"==c&&this._is_running)this["__"+
c][j]=Class.instance(d);return this.get(a,!0)},_instance_all:function(){Mars._(this._view).each(function(a,b){this.__view[b]=Class.instance(a)},this)},get:function(a,b){var e=a.split("."),d=e[1];return this[("model"!=d&&!b?"__":"_")+d][e[0]]},add_rules:function(a){Mars._(a).each(function(a){this._add_rule(a)},this);return this},add_rule:function(a){this.rules.push(a);this._is_running&&this._run_rule(a)},destory_rule:function(a){if(this._is_running)this._run_rule(a,!0);else throw"error[can not remove observer before running Mars.destory_rule]";
},_run_rule:function(a,b){var e=a.split("/");if(this._is_running){var d=this.get(e[0]),c=this.get(e[2]);if(3==e.length){var f=e[1].replace(":","_");e.push(f+"_handler")}d[b?"remove_observer":"add_observer"](e[1],Mars.proxy(c[e[3]],c))}else throw"error[run before dom ready:Mars._run_rule.]";return this},_call:function(a){var b=a.split("/");this.get(b[0])[b[1]].apply(this.get(b[0]),[].slice.call(arguments,1))},run:function(a){if(this._is_running)a?this._call.apply(this,arguments):(Mars._(this.rules).each(function(a){this._run_rule(a)},
this),Mars._(this._default).each(function(a){this._call.apply(this,a)},this));else if(a)this._default.push(arguments);else throw"error[undefined rule to run Mars.run]";},rest_support:function(){this.support_rest=!0;this.REQUEST_TYPE.remove="delete";this.REQUEST_TYPE.update="put"}}}());(function(){$(document).ready(function(){Mars.initialize()})})();