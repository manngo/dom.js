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


			/*	Combined Version
				================================================
				insertBefore: function(newElement,element) {
					if(newElement instanceof Element) element.parentNode.insertBefore(newElement,element);
					else if(typeof newElement == 'string') element.insertAdjacentHTML('beforebegin', newElement);
				},
				================================================ */

			//	Add element to or around another
				prefix: function(newElement,element) {
					element.parentNode.insertBefore(newElement,element);
				},
				prepend: function(newElement,element) {
					element.insertBefore(newElement,element.childNodes[0]);
				},
				append: function(newElement,element) {
					element.appendChild(newElement);
				},
				affix: function(newElement,element) {
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
					if(query) url+='?'+query;
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

		};
