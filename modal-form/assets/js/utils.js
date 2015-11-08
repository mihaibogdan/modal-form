var Utils = (function () {
	var utils = {};
	
	utils.openModal = function(element){
		var modal = this.getElementByAttributeId(element, 'data-modalId');
		var overlay = this.getElementByAttributeId(element, 'data-overlayId');

		modal.classList.add('opened');
		overlay.classList.add('opened');

	}

	utils.closeModal = function(element){

		var modal = this.getElementByAttributeId(element, 'data-modalId');
		var overlay = this.getElementByAttributeId(element, 'data-overlayId');

		modal.classList.remove('opened');
		overlay.classList.remove('opened');

	}

	utils.getElementByAttributeId = function(element, attrId){
		var element_id = element.getAttribute(attrId), elem;
		if(element_id)
			elem = document.getElementById(element_id)

		return elem;
	}
	return utils;
}());