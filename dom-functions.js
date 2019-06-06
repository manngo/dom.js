/*	DOM
	================================================
	DOM Manipulation Functions
	================================================ */

	//	Select an element or an array of elements

		DOM.select(selector);
		DOM.selectAll(selector,nodeList);

	//	Create an element or an array of elements
		DOM.element(html);
		DOM.elements(html,nodeList);

	//	Add element to or around another
		DOM.beforeElement(newElement,element);
		DOM.prependElement(newElement,element);
		DOM.appendElement(newElement,element);
		DOM.afterElement(newElement,element);

	//	Add html to or around another element
		DOM.beforeHTML(html,element);
		DOM.prependHTML(html,element);
		DOM.appendHTML(html,element);
		DOM.afterHTML(html,element);

	//	Combination of Above
		DOM.before(newElement,element);
		DOM.prepend(newElement,element);
		DOM.append(newElement,element);
		DOM.after(newElement,element);

	//	Toggle Attribute

		DOM.toggleAttribute(element,attribute,value);
		DOM.radio(elements,attribute,allOff);

	//	Wrapping Content
		DOM.wrap(element,wrapper);
		DOM.wrapAll(elements, wrapper);
		DOM.unwrap(element,totally);

	//	Empty Element
		DOM.empty(element);

	//	Scroll Position
		DOM.scrollPosition();

	//	Bounding Rectangle
		DOM.boundingRect;

	//	Ajax
		DOM.get(url,callback,query);
		DOM.loadHTML(element,url,query);
		DOM.loadText(element,url,query);

	//	Add Event Listeners
		DOM.listen(element,listener,fn,capture);
		DOM.listenAll(elements,listener,fn,capture);

	//	Get Siblings without white space nodes
		DOM.previousSibling(element);
		DOM.nextSibling(element);
		DOM.lastChild(element);
		DOM.firstChild(element);
