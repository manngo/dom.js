/*	DOM
	================================================
	DOM Manipulation Functions
	================================================ */

	'use strict';

	//	Required Methods

		//	Array.prototype.forEach
			if(!Array.prototype.forEach) Array.prototype.forEach=function(callback,thisArg) {
				for(var i=0;i<this.length;i++) if(this[i]!==undefined) callback.call(thisArg,this[i],i,this);
			};
		//	Array.prototype.of
			if(!Array.prototype.of) Array.prototype.of = function() {
				return Array.prototype.slice.call(arguments);
			};
		//	Array.prototype.from
			if(!Array.prototype.from) Array.prototype.from=function(data) {
				return Array.prototype.slice.call(data);
			};
		//	Array.prototype.flat
			if(!Array.prototype.flat) Array.prototype.flat=function() {
				return this.reduce(function(array,value) { return array.concat(value); },[]);
			}
		//	NodeList.prototype.forEach
			if(!NodeList.prototype.forEach) NodeList.prototype.forEach=function(callback,thisArg) {
				Array.prototype.forEach.call(this,callback,thisArg);
			};

	var jq={
		//	Returns an element or true array of elements
			select: function(selector) {
				return document.querySelector(selector);
			},
			selectAll: function(selector) {
				var nodes=document.querySelectorAll(selector);
				return Array.prototype.slice.call(nodes);
			},
		//	$target.add(source)	jq.add(target,source)
			add: function(target,source) {
				return Array.push.apply(target,source);
			},

		//	Create an element or an array of elements
			element: function(html) {
				var div=document.createElement('div');
				div.innerHTML=html;
				return div.firstChild;
			},
			elements: function(html,nodeList) {
				var div=document.createElement('div');
				div.innerHTML=html;
				return nodeList ? div.childNodes : Array.prototype.slice.call(div.childNodes);
			},

		//	Add element to or around another
			beforeElement: function(newElement,element) {
				element.insertAdjacentElement('beforebegin',newElement);
			},
			prependElement: function(newElement,element) {
				element.insertAdjacentElement('afterbegin',newElement);
			},
			appendElement: function(newElement,element) {
				element.insertAdjacentElement('beforeend',newElement);
			},
			afterElement: function(newElement,element) {
				element.insertAdjacentElement('afterend',newElement);
			},

		//	Add html to or around another element
			beforeHTML: function(html,element) {
				element.insertAdjacentHTML('beforebegin', html);
			},
			prependHTML: function(html,element) {
				element.insertAdjacentHTML('afterbegin', html);
			},
			appendHTML: function(html,element) {
				element.insertAdjacentHTML('beforeend', html);
			},
			afterHTML: function(html,element) {
				element.insertAdjacentHTML('afterend', html);
			},

		//	Combination of Above
			before: function(newElement,element) {
				if(newElement instanceof Element) element.insertAdjacentElement('beforebegin',newElement);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('beforebegin', newElement);
			},
			prepend: function(newElement,element) {
				if(newElement instanceof Element) element.insertAdjacentElement('afterbegin',newElement);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('afterbegin', newElement);
			},
			append: function(newElement,element) {
				if(newElement instanceof Element) element.insertAdjacentElement('beforeend',newElement);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('beforeend', newElement);
			},
			after: function(newElement,element) {
				if(newElement instanceof Element) element.insertAdjacentElement('afterend',newElement);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('afterend', newElement);
			},

		//	Toggle Attribute

			toggleAttribute: function(element,attribute,value) {
				if(!element || !attribute) return;
				if(value===undefined) value=true;
				if(!element.hasAttribute(attribute)) element.setAttribute(attribute,value);
				else element.removeAttribute(attribute);
			},

			radio: function(elements,attribute,allOff) {
				var selected=null;
				for(var i=0;i<elements.length; i++) elements[i].onclick=doit;
				function doit() {
					if(this==selected) {
						if(allOff) selected=this.removeAttribute(attribute);
						return;
					}
					if(selected) selected.removeAttribute(attribute);
					selected=this;
					selected.setAttribute(attribute,true);
				}
			},

		//	Wrapping Content
			//	if (typeof wrapper=='string') wrapper=document.createElement(wrapper);

			wrap: function(element,wrapper) {
				element.parentNode.insertBefore(wrapper, element);
				wrapper.appendChild(element);
				return wrapper;
			},
			wrapAll: function(elements, wrapper) {
				elements[0].parentNode.insertBefore(wrapper, elements[0]);
				for(var i=0;i<elements.length;i++) wrapper.appendChild(elements[i]);
				return wrapper;
			},
			wrapInner: function(element,wrapper) {
				while(var child=element.firstChild) wrapper.appendChild(child);
				element.appendChild(wrapper);
			}
			unwrap: function(element,totally) {
				var parent=element.parentNode;
				parent.parentNode.insertBefore(element,parent);
				if(totally) parent.parentNode.removeChild(parent);
				return element;
			},

		//	Empty Element

			empty: function(element) {
				//	element.innerHTML='';	//	Less Efficient!
				while(element.firstChild) element.removeChild(element.firstChild);
			},

		//	Scroll Position

			scrollPosition: function() {
				return {
					left: window.pageXOffset || document.documentElement.scrollLeft,
					top: window.pageYOffset || document.documentElement.scrollTop
				};
			},

		//	Bounding Rectangle

			boundingRect: function(element,documentRelative) {
				var width, height, left, top, right, bottom;
				var windowScroll, scroll, border, margin;
				var rect=element.getBoundingClientRect();

				windowScroll={
					left: window.pageXOffset || document.documentElement.scrollLeft,
					top: window.pageYOffset || document.documentElement.scrollTop
				};

				left=rect.left-documentRelative?scroll.left:0;
				top=rect.top-documentRelative?scroll.top:0;
				right=rect.right;
				bottom=rect.bottom;
				width=rect.right-rect.left;
				height=rect.bottom-rect.top;

				rect={
					'x':			left,
					'y':			top,
					'width':		width,
					'height':		height,
					'left':			left,
					'top':			top,
					'right':		right,
					'bottom':		bottom,
					'windowScroll':	windowScroll,
					'scroll':		{left: element.scrollLeft, top: element.scrollTop},
					'margin':		{
										left: parseFloat(style.marginLeft),
										top: parseFloat(style.marginTop),
										right: parseFloat(style.marginRight),
										bottom: parseFloat(style.marginBottom),
									},
					'border':		{
										left: parseFloat(style.borderLeftWidth),
										top: parseFloat(style.borderTopWidth),
										right: parseFloat(style.borderRightWidth),
										bottom: parseFloat(style.borderBottomWidth),
									},
				};
				return rect;
			},

		//	Ajax

			get: function(url,callback,query) {
				var xhr=new XMLHttpRequest();
				if(query) url+='?'+query.replace(/^\?/,'');
				xhr.open('get',url,true);
				xhr.onload=function() {
					if(callback) callback(this.responseText);
				};
				xhr.send(null);
			},
			loadHTML: function(element,url,query) {
				this.get(url,function(data) {
					element.innerHTML=data;
				},query);
			},
			loadText: function(element,url,query) {
				this.get(url,function(data) {
					element.textContent=data;
				},query);
			},

		//	Add Event Listeners

			listen: function(element,listener,fn,capture) {
				element.addEventListener(listener,fn,capture);
			},
			listenAll: function(elements,listener,fn,capture) {
				for(var i=0;i<elements.length; i++)
					elements[i].addEventListener(listener,fn,capture);
			},

		//	Get Siblings without white space nodes
		//	See https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM

			isIgnorable: function(element) {
				return element.nodeType==8 || element.nodeType==3 && !(/[^\t\n\r ]/.test(element.textContent));
			},

			previousSibling: function(element) {
				while (element = element.previousSibling)
					if(!this.isIgnorable(element)) return element;
				return null;
			},

			nextSibling: function(element) {
				while (element = element.nextSibling)
					if(!this.isIgnorable(element)) return element;
				return null;
			},

			lastChild: function(element) {
				var child=element.lastChild;
				while (child) {
					if (!this.isIgnorable(child)) return child;
					child = child.previousSibling;
				}
				return null;
			},

			firstChild: function(element) {
				var child=element.firstChild;
				while (child) {
					if (!this.isIgnorable(child)) return child;
					child = child.nextSibling;
				}
				return null;
			},
	};


/*	DOM
	================================================
	DOM Polyfills for Legacy Browsers
	================================================ */

	void function() {
		if(!Element.prototype.prepend) {
			Element.prototype.prepend=Document.prototype.prepend=DocumentFragment.prototype.prepend=
				function() {
				var args=Array.prototype.slice.call(arguments);
				for(var i=args.length;i;i--)
					if(args[i-1] instanceof Node) this.insertAdjacentElement('afterbegin',args[i-1]);
					else this.insertAdjacentText('afterbegin',args[i-1]);
			};
			Element.prototype.append=Document.prototype.append=DocumentFragment.prototype.append=
				function() {
				var args=Array.prototype.slice.call(arguments);
				for(var i=0;i<args.length;i++)
					if(args[i] instanceof Node) this.insertAdjacentElement('beforeend',args[i]);
					else this.insertAdjacentText('beforeend',args[i]);
			};
			Element.prototype.before=Document.prototype.before=DocumentFragment.prototype.before=
				function() {
				var args=Array.prototype.slice.call(arguments);
				for(var i=0;i<args.length;i++)
					if(args[i] instanceof Node) this.insertAdjacentElement('beforebegin',args[i]);
					else this.insertAdjacentText('beforebegin',args[i]);
			};
			Element.prototype.after=Document.prototype.after=DocumentFragment.prototype.after=
				function() {
				var args=Array.prototype.slice.call(arguments);
				for(var i=args.length;i;i--)
					if(args[i-1] instanceof Node) this.insertAdjacentElement('afterend',args[i-1]);
					else this.insertAdjacentText('afterend',args[i-1]);
			};
		}
	}();

	void function(prototypes) {
		function doFragment() {
			var args=Array.from(arguments[0]);
			var fragment=document.createDocumentFragment();
			args.forEach(function(arg) {
				fragment.appendChild(arg instanceof Node ? arg : document.createTextNode(String(arg)));
			});
			return fragment;
		}
		prototypes.forEach(function(prototype){
			if(!prototype.hasOwnProperty('Before'))
			prototype.Before=function() {
				var fragment=doFragment(arguments);
				this.parentNode.insertBefore(fragment,this);
			};
			if(!prototype.hasOwnProperty('After'))
			prototype.After=function() {
				var fragment=doFragment(arguments);
				this.parentNode.insertBefore(doFragment(arguments),this.nextSibling);
			};
			if(!prototype.hasOwnProperty('Prepend'))
			prototype.Prepend=function() {
				var fragment=doFragment(arguments);
				this.insertBefore(doFragment(arguments),this.firstChild);
			};
			if(!prototype.hasOwnProperty('Append'))
			prototype.Append=function() {
				var fragment=doFragment(arguments);
				this.appendChild(doFragment(arguments));
			};
			if(!prototype.hasOwnProperty('Remove'))
			prototype.Remove=function() {
				if(this.parentNode !== null) this.parentNode.removeChild(this);
			};
			if(!prototype.hasOwnProperty('ReplaceWith'))
			prototype.ReplaceWith=function() {
				if(!this.parentNode) return;
				var fragment=doFragment(arguments);
				this.parentNode.insertBefore(doFragment(arguments),this);
				this.parentNode.removeChild(this);
			};
		});
	}([Element.prototype,CharacterData.prototype,DocumentType.prototype]);
