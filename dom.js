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
				insertBefore: function(newElement,element) {
					element.parentNode.insertBefore(newElement,element);
				},
				prepend: function(newElement,element) {
					element.insertBefore(newElement,element.childNodes[0]);
				},
				append: function(newElement,element) {
					element.appendChild(newElement);
				},
				insertAfter: function(newElement,element) {
					element.parentNode.insertBefore(newElement, element.nextSibling);
				},

			//	Add html to or around another element
				insertHTMLBefore: function(html,element) {
					element.insertAdjacentHTML('beforebegin', html);
				},
				prependHTML: function(html,element) {
					element.insertAdjacentHTML('afterbegin', html);
				},
				appendHTML: function(html,element) {
					element.insertAdjacentHTML('beforeend', html);
				},
				insertHTMLAfter: function(html,element) {
					element.insertAdjacentHTML('afterend', html);
				},

			//	Toggle Attribute

				toggleAttribute: function(element,attribute,value) {
					if(!element || !attribute) return;
					if(value===undefined) value=true;
					if(!element.hasAttribute(attribute)) element.setAttribute(attribute,value);
					else element.removeAttribute(attribute);
				}

		};
