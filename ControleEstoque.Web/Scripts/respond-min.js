
/*
 * https://github.com/ryanve/response.js
 * @license CC0-1.0
 */
!function(root,name,make){var $=root.jQuery||root.Zepto||root.ender||root.elo;if(typeof module!="undefined"&&module.exports)module.exports=make($);else root[name]=make($)}(this||window,"Response",function($){if(typeof $!="function"){try{return void console.warn("response.js aborted due to missing dependency")}catch(e){}}var Response,Elemset,root=this,name="Response",old=root[name],initContentKey="init"+name,win=window,doc=document,docElem=doc.documentElement,ready=$.domReady||$,$win=$(win),DMS=typeof DOMStringMap!="undefined",AP=Array.prototype,OP=Object.prototype,push=AP.push,concat=AP.concat,toString=OP.toString,owns=OP.hasOwnProperty,isArray=Array.isArray||function(item){return"[object Array]"===toString.call(item)},defaultPoints={width:[0,320,481,641,961,1025,1281],height:[0,481],ratio:[1,1.5,2]},propTests={},isCustom={},sets={all:[]},suid=1,screenW=screen.width,screenH=screen.height,screenMax=screenW>screenH?screenW:screenH,screenMin=screenW+screenH-screenMax,deviceW=function(){return screenW},deviceH=function(){return screenH},regexFunkyPunc=/[^a-z0-9_.-]/gi,regexTrimPunc=/^[\W\s]+|[\W\s]+$|/g,regexCamels=/([a-z])([A-Z])/g,regexDashB4=/-(.)/g,regexDataPrefix=/^data-(.+)$/,procreate=Object.create||function(parent){function Type(){}Type.prototype=parent;return new Type},namespaceIt=function(eventName,customNamespace){customNamespace=customNamespace||name;return eventName.replace(regexTrimPunc,"")+"."+customNamespace.replace(regexTrimPunc,"")},event={allLoaded:namespaceIt("allLoaded"),crossover:namespaceIt("crossover")},matchMedia=win.matchMedia||win.msMatchMedia,media=matchMedia?bind(matchMedia,win):function(){return{}},mq=matchMedia?function(q){return!!matchMedia.call(win,q).matches}:function(){return false},viewportW=function(){var a=docElem.clientWidth,b=win.innerWidth;return a<b?b:a},viewportH=function(){var a=docElem.clientHeight,b=win.innerHeight;return a<b?b:a},band=bind(between,viewportW),wave=bind(between,viewportH),device={band:bind(between,deviceW),wave:bind(between,deviceH)};function isNumber(item){return item===+item}function bind(fn,scope){return function(){return fn.apply(scope,arguments)}}function between(min,max){var point=this.call();return point>=(min||0)&&(!max||point<=max)}function map(stack,fn,scope){for(var r=[],l=stack.length,i=0;i<l;)r[i]=fn.call(scope,stack[i],i++,stack);return r}function compact(list){return!list?[]:sift(typeof list=="string"?list.split(" "):list)}function each(stack,fn,scope){if(null==stack)return stack;for(var l=stack.length,i=0;i<l;)fn.call(scope||stack[i],stack[i],i++,stack);return stack}function affix(stack,prefix,suffix){if(null==prefix)prefix="";if(null==suffix)suffix="";for(var r=[],l=stack.length,i=0;i<l;i++)null==stack[i]||r.push(prefix+stack[i]+suffix);return r}function sift(stack,fn,scope){var fail,l,v,r=[],u=0,i=0,run=typeof fn=="function",not=true===scope;for(l=stack&&stack.length,scope=not?null:scope;i<l;i++){v=stack[i];fail=run?!fn.call(scope,v,i,stack):fn?typeof v!==fn:!v;fail===not&&(r[u++]=v)}return r}function merge(r,s){if(null==r||null==s)return r;if(typeof s=="object"&&isNumber(s.length))push.apply(r,sift(s,"undefined",true));else for(var k in s)owns.call(s,k)&&void 0!==s[k]&&(r[k]=s[k]);return r}function route(item,fn,scope){if(null==item)return item;if(typeof item=="object"&&!item.nodeType&&isNumber(item.length))each(item,fn,scope);else fn.call(scope||item,item);return item}function dpr(decimal){var dPR=win.devicePixelRatio;if(null==decimal)return dPR||(dpr(2)?2:dpr(1.5)?1.5:dpr(1)?1:0);if(!isFinite(decimal))return false;if(dPR&&dPR>0)return dPR>=decimal;decimal="only all and (min--moz-device-pixel-ratio:"+decimal+")";if(mq(decimal))return true;return mq(decimal.replace("-moz-",""))}function camelize(s){return s.replace(regexDataPrefix,"$1").replace(regexDashB4,function(m,m1){return m1.toUpperCase()})}function datatize(s){return"data-"+(s?s.replace(regexDataPrefix,"$1").replace(regexCamels,"$1-$2").toLowerCase():s)}function parse(s){var n;return typeof s!="string"||!s?s:"false"===s?false:"true"===s?true:"null"===s?null:"undefined"===s||(n=+s)||0===n||"NaN"===s?n:s}function first(e){return!e||e.nodeType?e:e[0]}function eachAttr(el,fn,exp){var test,n,a,i,l;if(!el.attributes)return;test=typeof exp=="boolean"?/^data-/:test;for(i=0,l=el.attributes.length;i<l;){if(a=el.attributes[i++]){n=""+a.name;test&&test.test(n)!==exp||null==a.value||fn.call(el,a.value,n,a)}}}function getDataset(el){var ob;if(!el||1!==el.nodeType)return;if(ob=DMS&&el.dataset)return ob;ob={};eachAttr(el,function(v,k){ob[camelize(k)]=""+v},true);return ob}function setViaObject(el,ob,fn){for(var n in ob)owns.call(ob,n)&&fn(el,n,ob[n])}function dataset(el,k,v){el=first(el);if(!el||!el.setAttribute)return;if(void 0===k&&v===k)return getDataset(el);var exact=isArray(k)&&datatize(k[0]);if(typeof k=="object"&&!exact){k&&setViaObject(el,k,dataset)}else{k=exact||datatize(k);if(!k)return;if(void 0===v){k=el.getAttribute(k);return null==k?v:exact?parse(k):""+k}el.setAttribute(k,v=""+v);return v}}function deletes(elem,ssv){ssv=compact(ssv);route(elem,function(el){each(ssv,function(k){el.removeAttribute(datatize(k))})})}function sel(keys){for(var k,r=[],i=0,l=keys.length;i<l;){(k=keys[i++])&&r.push("["+datatize(k.replace(regexTrimPunc,"").replace(".","\\."))+"]")}return r.join()}function target(keys){return $(sel(compact(keys)))}function scrollX(){return window.pageXOffset||docElem.scrollLeft}function scrollY(){return window.pageYOffset||docElem.scrollTop}function rectangle(el,verge){var r=el.getBoundingClientRect?el.getBoundingClientRect():{};verge=typeof verge=="number"?verge||0:0;return{top:(r.top||0)-verge,left:(r.left||0)-verge,bottom:(r.bottom||0)+verge,right:(r.right||0)+verge}}function inX(elem,verge){var r=rectangle(first(elem),verge);return!!r&&r.right>=0&&r.left<=viewportW()}function inY(elem,verge){var r=rectangle(first(elem),verge);return!!r&&r.bottom>=0&&r.top<=viewportH()}function inViewport(elem,verge){var r=rectangle(first(elem),verge);return!!r&&r.bottom>=0&&r.top<=viewportH()&&r.right>=0&&r.left<=viewportW()}function detectMode(elem){var srcElems={img:1,input:1,source:3,embed:3,track:3,iframe:5,audio:5,video:5,script:5},modeID=srcElems[elem.nodeName.toLowerCase()]||-1;return 4>modeID?modeID:null!=elem.getAttribute("src")?5:-5}function store($elems,key,source){var valToStore;if(!$elems||null==key)throw new TypeError("@store");source=typeof source=="string"&&source;route($elems,function(el){if(source)valToStore=el.getAttribute(source);else if(0<detectMode(el))valToStore=el.getAttribute("src");else valToStore=el.innerHTML;null==valToStore?deletes(el,key):dataset(el,key,valToStore)});return Response}function access(elem,keys){var ret=[];elem&&keys&&each(compact(keys),function(k){ret.push(dataset(elem,k))},elem);return ret}function addTest(prop,fn){if(typeof prop=="string"&&typeof fn=="function"){propTests[prop]=fn;isCustom[prop]=1}return Response}Elemset=function(){var crossover=event.crossover,min=Math.min;function sanitize(key){return typeof key=="string"?key.toLowerCase().replace(regexFunkyPunc,""):""}function ascending(a,b){return a-b}return{$e:0,mode:0,breakpoints:null,prefix:null,prop:"width",keys:[],dynamic:null,custom:0,values:[],fn:0,verge:null,newValue:0,currValue:1,aka:null,lazy:null,i:0,uid:null,reset:function(){var subjects=this.breakpoints,i=subjects.length,tempIndex=0;while(!tempIndex&&i--)this.fn(subjects[i])&&(tempIndex=i);if(tempIndex!==this.i){$win.trigger(crossover).trigger(this.prop+crossover);this.i=tempIndex||0}return this},configure:function(options){merge(this,options);var i,points,prefix,aliases,aliasKeys,isNumeric=true,prop=this.prop;this.uid=suid++;if(null==this.verge)this.verge=min(screenMax,500);if(!(this.fn=propTests[prop]))throw new TypeError("@create");if(null==this.dynamic)this.dynamic="device"!==prop.slice(0,6);this.custom=isCustom[prop];prefix=this.prefix?sift(map(compact(this.prefix),sanitize)):["min-"+prop+"-"];aliases=1<prefix.length?prefix.slice(1):0;this.prefix=prefix[0];points=this.breakpoints;if(isArray(points)){each(points,function(v){if(!v&&v!==0)throw"invalid breakpoint";isNumeric=isNumeric&&isFinite(v)});isNumeric&&points.sort(ascending);if(!points.length)throw new TypeError(".breakpoints")}else{points=defaultPoints[prop]||defaultPoints[prop.split("-").pop()];if(!points)throw new TypeError(".prop")}this.breakpoints=points;this.keys=affix(this.breakpoints,this.prefix);this.aka=null;if(aliases){aliasKeys=[];i=aliases.length;while(i--)aliasKeys.push(affix(this.breakpoints,aliases[i]));this.aka=aliasKeys;this.keys=concat.apply(this.keys,aliasKeys)}sets.all=sets.all.concat(sets[this.uid]=this.keys);return this},target:function(){this.$e=$(sel(sets[this.uid]));store(this.$e,initContentKey);this.keys.push(initContentKey);return this},decideValue:function(){var val=null,subjects=this.breakpoints,sL=subjects.length,i=sL;while(val==null&&i--)this.fn(subjects[i])&&(val=this.values[i]);this.newValue=typeof val=="string"?val:this.values[sL];return this},prepareData:function(elem){this.$e=$(elem);this.mode=detectMode(elem);this.values=access(this.$e,this.keys);if(this.aka){var i=this.aka.length;while(i--)this.values=merge(this.values,access(this.$e,this.aka[i]))}return this.decideValue()},updateDOM:function(){if(this.currValue===this.newValue){return this}this.currValue=this.newValue;if(0<this.mode){this.$e[0].setAttribute("src",this.newValue)}else if(null==this.newValue){this.$e.empty&&this.$e.empty()}else{if(this.$e.html){this.$e.html(this.newValue)}else{this.$e.empty&&this.$e.empty();this.$e[0].innerHTML=this.newValue}}return this}}}();propTests["width"]=band;propTests["height"]=wave;propTests["device-width"]=device.band;propTests["device-height"]=device.wave;propTests["device-pixel-ratio"]=dpr;function resize(fn){$win.on("resize",fn);return Response}function crossover(prop,fn){var temp,eventToFire,eventCrossover=event.crossover;if(typeof prop=="function"){temp=fn;fn=prop;prop=temp}eventToFire=prop?""+prop+eventCrossover:eventCrossover;$win.on(eventToFire,fn);return Response}function action(fnOrArr){route(fnOrArr,function(fn){ready(fn);resize(fn)});return Response}function create(args){route(args,function(options){if(typeof options!="object")throw new TypeError("@create");var elemset=procreate(Elemset).configure(options),lowestNonZeroBP,verge=elemset.verge,breakpoints=elemset.breakpoints,scrollName=namespaceIt("scroll"),resizeName=namespaceIt("resize");if(!breakpoints.length)return;lowestNonZeroBP=breakpoints[0]||breakpoints[1]||false;ready(function(){var allLoaded=event.allLoaded,lazy=!!elemset.lazy;function resizeHandler(){elemset.reset();each(elemset.$e,function(el,i){elemset[i].decideValue().updateDOM()}).trigger(allLoaded)}function scrollHandler(){each(elemset.$e,function(el,i){inViewport(elemset[i].$e,verge)&&elemset[i].updateDOM()})}each(elemset.target().$e,function(el,i){elemset[i]=procreate(elemset).prepareData(el);if(!lazy||inViewport(elemset[i].$e,verge)){elemset[i].updateDOM()}});if(elemset.dynamic&&(elemset.custom||lowestNonZeroBP<screenMax)){resize(resizeHandler,resizeName)}if(!lazy)return;$win.on(scrollName,scrollHandler);elemset.$e.one(allLoaded,function(){$win.off(scrollName,scrollHandler)})})});return Response}function noConflict(callback){if(root[name]===Response)root[name]=old;if(typeof callback=="function")callback.call(root,Response);return Response}Response={deviceMin:function(){return screenMin},deviceMax:function(){return screenMax},noConflict:noConflict,create:create,addTest:addTest,datatize:datatize,camelize:camelize,render:parse,store:store,access:access,target:target,object:procreate,crossover:crossover,action:action,resize:resize,ready:ready,affix:affix,sift:sift,dpr:dpr,deletes:deletes,scrollX:scrollX,scrollY:scrollY,deviceW:deviceW,deviceH:deviceH,device:device,inX:inX,inY:inY,route:route,merge:merge,media:media,mq:mq,wave:wave,band:band,map:map,each:each,inViewport:inViewport,dataset:dataset,viewportH:viewportH,viewportW:viewportW};ready(function(){var settings=dataset(doc.body,"responsejs"),parse=win.JSON&&JSON.parse||$.parseJSON;settings=settings&&parse?parse(settings):settings;settings&&settings.create&&create(settings.create);docElem.className=docElem.className.replace(/(^|\s)(no-)?responsejs(\s|$)/,"$1$3")+" responsejs "});return Response});