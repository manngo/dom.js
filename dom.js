/*	DOM
	================================================
	DOM Manipulation Functions
	================================================ */

	var DOM={
		//	Returns an element or true array of elements
			select: function(selector) {
				return document.querySelector(selector);
			},
			selectAll: function(selector,nodeList) {
				var nodes=document.querySelectorAll(selector);
				return nodeList ?  nodes : Array.prototype.slice.call(nodes);
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

		//	Combined Version: Add element or HTML to or around another
			prefix: function(data,element) {
				if(newElement instanceof Element) element.parentNode.insertBefore(data,element);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('beforebegin', data);
			},
			prepend: function(data,element) {
				if(newElement instanceof Element) element.insertBefore(data,element.childNodes[0]);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('afterbegin', data);
			},
			append: function(data,element) {
				if(newElement instanceof Element) element.appendChild(data);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('beforeend', data);
			},
			affix: function(data,element) {
				if(newElement instanceof Element) element.parentNode.insertBefore(data, element.nextSibling);
				else if(typeof newElement == 'string') element.insertAdjacentHTML('afterend', data);
			},

		//	Add element to or around another
			prefixElement: function(newElement,element) {
				element.parentNode.insertBefore(newElement,element);
			},
			prependElement: function(newElement,element) {
				element.insertBefore(newElement,element.childNodes[0]);
			},
			appendElement: function(newElement,element) {
				element.appendChild(newElement);
			},
			affixElement: function(newElement,element) {
				element.parentNode.insertBefore(newElement, element.nextSibling);
			},

		//	Add html to or around another element
			prefixHTML: function(html,element) {
				element.insertAdjacentHTML('beforebegin', html);
			},
			prependHTML: function(html,element) {
				element.insertAdjacentHTML('afterbegin', html);
			},
			appendHTML: function(html,element) {
				element.insertAdjacentHTML('beforeend', html);
			},
			affixHTML: function(html,element) {
				element.insertAdjacentHTML('afterend', html);
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
			unwrap: function(element,totally) {
				var parent=element.parentNode;
				parent.parentNode.insertBefore(element,parent);
				if(totally) parent.parentNode.removeChild(parent);
				return element;
			},

		//	Empty Element

			empty: function(element) {
				element.innerHTML='';
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
				var rect=element.getBoundingClientRect();
				var pos=DOM.scrollPosition();
				var scrollLeft=documentRelative?pos.left:0;
				var scrollTop=documentRelative?pos.top:0;
				return {
					'x':			rect.left-scrollLeft,
					'y':			rect.top-scrollTop,
					'width':		rect.right-rect.left,
					'height':		rect.bottom-rect.top,
					'left':			rect.left-scrollLeft,
					'top':			rect.top-scrollTop,
					'right':		rect.right-scrollLeft,
					'bottom':		rect.bottom-scrollTop,
					'scrollLeft':	pos.left,
					'scrollTop':	pos.top,
				};
			},

		//	Ajax

			get: function(url,callback,query) {
				var xhr=new XMLHttpRequest();
				if(query) url+='?'+query.replace(/^\?/,'');
				xhr.open('get',url,true);
				xhr.onload=function() {
					if(callback) callback(this.responseText);
				}
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
