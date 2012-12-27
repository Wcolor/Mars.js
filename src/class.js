/**
 * Perm.js JavaScript Inheritance
 * By D.Wang http://t.qq.com/igaves
 * MIT Licensed
 * 
 * @warnning 子类不会执行父类的构造函数。请用this._super('initialize');调用
 */
var Class = (function(){
	var _slice = [].slice;
	
	function create(property){
		//property为类属性列表，initialize为构造函数。
		if(!property.initialize){
			property.initialize = function(){};
		}
		//构造类。
		var _class = function(){
			//console.log(this.__uninitialize);
			if(!this.__uninitialize && typeof this.initialize == 'function'){
				return this.initialize.apply(this,arguments);
			}
		};
		var args = [];
		//取property后面的参数列表，用来apply
		args = _slice.call(arguments,1);
		
		var key=null,parent_property = null;
		//父类的构造函数
		//如果父类存在，是继承状态
		if(typeof args[0] == 'function'){
			//
			//如果弗雷中
			//
			var parent = args[0];
			parent.prototype.__uninitialize = true;
			parent_property = new parent();//不执行initialize
			parent.prototype.__uninitialize = false;
			//父类的prototype赋值。
			_class.prototype = parent_property;
			_class.prototype._super = parent.prototype;
			
			args = args.slice(1);
		}
		//继承
		for(key in property){
			var current_fn = property[key];
			if(parent_property && typeof _class.prototype._super[key] == 'function'){
				_class.prototype[key] = (function(k,v){
					return function(){
						var tmp  =this._super;
						this._super = tmp[k];
						var result = v.apply(this,arguments);
						this._super = tmp;
						return result;
					};
				})(key,current_fn);
			}else{
				_class.prototype[key] = property[key];
			}
		}
		
		//mixin
		for ( var i = 0; i < args.length; i++) {
			var arg = args[i];
			if(typeof arg == 'object'){
				for(key in arg){
					_class.prototype[key] = arg[key];
				}
			}
		}

		_class.prototype.constructor = _class;
		
		return _class;
	}
	
	/**
	 * 单例
	 */
	function instance(className){
		if(typeof className == 'string'){
			className =eval(className);
		}
		if(typeof className ==='undefined') throw 'illegal class name';
		
		if(typeof className._instance === 'undefined'){
			className._instance = new className();
		}
		
		return className._instance;
	}
	
	function extend(class_name,static_property){
		for(var key in static_property){
			class_name[key] = static_property[key];
		}
		return class_name;
	}
	
	return {
		/**
		 *创建新类，可继承
		 *@param {object} property -类方法，包括initilize构造函数
		 *@param {function} parent -父类，继承对象
		 *@example
		 *  //parentClass-<1>
		 *var Persion = Class.create({
		 *	initialize:function(name){
		 *		this.name = name;
		 *	},
		 *	getName:function(){
		 *		return this.name;
		 *	}
		 *});
		 *  //parentClass-<2>
		 *var Person = function(name){
		 * this.name = name;
		 *}
		 *Person.prototype.getName = function(){
		 *	return this.name;
		 *}
		 *  //inherit<1> 继承构造类。
		 *var Man=Class.create({
		 *	initilize:function(name,age){
		 *		this.parent();
		 *		this.parentClass.initilize.call(this,arguments);
		 *		this.age = age;
		 *	},
		 *	getAge:function(){
		 *		return this.age;
		 *	}
		 *},Person);
		 *  //inherit<2-1> 继承传统类第一种方式
		 *var Man1 = Class.create({
		 *	getAge:function(){
		 *		return this.age;
		 *	}
		 *},Person);
		 *  //inherit<2-2> 继承传统类第二种方式
 		 *var Man2 = Class.create({
 		 *	initilize:function(name,age){
 		 *		this.parent();
 		 *		this.age = age;
 		 *	},
		 *	getAge:function(){
		 *		return this.age;
		 *	}
		 *},Person);
		 *
		 *var Man3 = Class.create({
		 *	initialize:function(){
		 *	
		 *	}
		 *},EventUtil,ENumberable);
		 */
		create:create,
		/**
		 * 单例
		 * @param {class}
		 * @example 
		 * Class.instance(Service);
		 */
		instance:instance,
		/**
		 * 扩展静态方法
		 * @param {function/Class} -className/ModuleName/Object
		 * @param {object} -staticProperty -静态属性
		 * @example
		 * Class.extend(Dom,{
		 * 	create:function(nodeName){
		 * 		reutrn document.createElement(nodeName);
		 * }
		 * })
		 */
		extend:extend
	};
})();


