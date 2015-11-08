var Formular = (function () {
	var formular = {};

	formular.damaged = false;
	formular.hexComponents = "#0123456789ABCDEFabcdef";
	formular.hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	formular.changeMake = function(element){
		var img = Utils.getElementByAttributeId(element, 'data-imgId');
		var src = Make.values[element.value];
		img.setAttribute('src', src);
		
		removeError(element, 'error')
		
		
	}

	formular.changeDamaged = function(element){
		var txtArea = Utils.getElementByAttributeId(element, 'data-txtAreaId');
		this.damaged = !this.damaged;

		switch(this.damaged){
			case true:
				txtArea.removeAttribute('disabled');
				break;
			default:
				txtArea.setAttribute('disabled', '');
				break;
		}
	}

	formular.changeColor = function(element){
		var div = Utils.getElementByAttributeId(element, 'data-colorPreview');
		var value = element.value;
		var lastChar = value.substr(value.length - 1, value.length);
		if(value.length > 7 || this.hexComponents.indexOf(lastChar) == -1 || value.charAt(0) != '#')
		{
			value = value.substr(0, value.length - 1);
			element.value = value;
		}

		if(element.value.length > 0)
			removeError(element, 'error');

		div.style.backgroundColor = value;
		
	}

	formular.numberField = function(element, event){
		var value = element.value;
		if((isNaN(value) || value.length == 0) && event.keyCode != 9){
			if(value.length == 0)
				element.parentElement.querySelector('.tool-tip').innerHTML = "Please don't leave this field empty.";
			else
				element.parentElement.querySelector('.tool-tip').innerHTML = "Only numbers are accepted";

			addError(element, 'error');
		}
		else
			if(event.keyCode != 9)
				removeError(element, 'error');

		
	}

	formular.verifyRequiredField = function(element, event){
		

		if(event.keyCode != 9) //tab
			if(element.value.trim().length == 0)
				addError(element, 'error');
			else
				removeError(element, 'error');
	}

	formular.verifyIfSelected = function(element){
		if(element.selectedIndex == 0)
			addError(element, 'error');
		else
			removeError(element, 'error');
	}

	formular.verifyAll = function(){
		var i;
		if(document.querySelector('.error input[type=text], .error select, .error textarea'))
			document.querySelector('.error input[type=text], .error select, .error textarea').focus();
		else{
			var inputsRequired = document.querySelectorAll('input[data-condition=require], textarea[data-condition=require]:not([disabled])');
			var inputsNumber = document.querySelectorAll('input[data-condition=number]');
			var selects = document.querySelectorAll('select');

			for(i=0; i<inputsRequired.length; i++)
				this.verifyRequiredField(inputsRequired[i], '');
			for(i=0; i<inputsNumber.length; i++)
				this.numberField(inputsNumber[i], '');
			for(i=0; i<selects.length; i++)
				this.verifyIfSelected(selects[i]);
		}

		if(!document.querySelector('.error input[type=text], .error select, .error textarea'))
		{
			revealSuccesMessage();
			this.resetForm();
		}
	}

	formular.resetForm = function(){
		var inputs = document.querySelectorAll('input:not([type=button]), textarea');
		var selects = document.querySelectorAll('select');
		var i;
		for(i=0; i<inputs.length; i++)
			inputs[i].value = "";
		for(i=0; i<selects.length; i++)
		{
			selects[i].selectedIndex = 0;
			if(selects[i].hasAttribute('data-imgId'))
				this.changeMake(selects[i]);
		}

	}

	var revealSuccesMessage = function(){
		if(document.querySelector('.message').classList.contains('reveal'))
			document.querySelector('.message').classList.remove('reveal');
		window.setTimeout(function(){
			document.querySelector('.message').classList.add('reveal');
		}, 1)
	}

	var addError = function(element, errorClass){
		element.parentElement.classList.add(errorClass);
		element.classList.add(errorClass);
	}

	var removeError = function(element, errorClass){
		element.parentElement.classList.remove(errorClass);
		element.classList.remove(errorClass);
	}

	return formular;
}());