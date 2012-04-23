var maximo = 0;
var minimo = 0;

$(document).ready(function() {
	crearNumberSteps();
});

function crearNumberSteps() {
	if($('.numberSteps')) {
		cantidad = $('.numberSteps').length;
		for(i=0; i<cantidad; i++) {
			var value = 0;
			var min = 0;
			var max = 0;
			var steps = 0;
			var id = ''; 
			
			for(j=0; j<$('.numberSteps')[i].attributes.length; j++){
				if($('.numberSteps')[i].attributes[j].name == "steps") {
					steps = $('.numberSteps')[i].attributes[j].value;
				} else if($('.numberSteps')[i].attributes[j].name == "id") {
					id = $('.numberSteps')[i].attributes[j].value;
				} else if($('.numberSteps')[i].attributes[j].name == "value") {
					value = $('.numberSteps')[i].attributes[j].value;
				} else if($('.numberSteps')[i].attributes[j].name == "min") {
					min = $('.numberSteps')[i].attributes[j].value;
				} else if($('.numberSteps')[i].attributes[j].name == "max") {
					max = $('.numberSteps')[i].attributes[j].value;
				}
			}
			
			if((max.length * 8.2) > 22) {
				$('.numberSteps')[i].style.width = (max.length * 8.2) + 'px';
			}
			$('#' + id).keydown(keyDownNumberSteps);
			$('#' + id).keyup(keyUpNumberSteps);
			$('#' + id).blur(blurNumberSteps);
			$('#' + id).bind("disabledNumberSteps", {id: id, indice: i}, disabledNumberSteps);
					
			if(value === "") {
				value = min;
				$('.numberSteps')[i].value = value;
			}
			$('<div id="numberSteps' + i + '" class="spinBoxDiv"></div>').insertAfter($('#'+id));
			$('<button id="spinBoxUp" onclick="stepsUpNumberSteps(\'' + id + '\', ' + parseInt(min, 10) + ', ' + parseInt(max, 10) + ', ' + parseInt(steps, 10) + '); return false;"></button>').appendTo($('#numberSteps' + i));
			$('<button id="spinBoxDown" onclick="stepsDownNumberSteps(\'' + id + '\', ' + parseInt(min, 10) + ', ' + parseInt(max, 10) + ', ' + parseInt(steps, 10) + '); return false;"></button>').appendTo($('#numberSteps' + i));
		}
	}
}

function keyDownNumberSteps(event) {
	//event.preventDefault();
	tecla = (document.all) ? event.keyCode : event.which;
	if(tecla >= 37 && tecla <= 40 || 
		tecla >= 48 && tecla <= 57 || 
		tecla == 13 || 
		tecla == 8 || 
		tecla == 9) {
		return true; 
	} else {
		return false;
	}
}

function keyUpNumberSteps(event){
	//event.preventDefault();
	id = event.currentTarget.id;
	max = event.currentTarget.getAttribute('max');
	min = event.currentTarget.getAttribute('min');
	var valor = parseInt(document.getElementById(id).value, 10);
	max = parseInt(max, 10);
	min = parseInt(min, 10);
	if( valor >= min && valor <= max) {
		return true;
	} else {
		if(isNaN(valor)) {
			document.getElementById(id).value = '';
		} else if(valor > max){
			document.getElementById(id).value = max;
		} else if(valor < min){
			document.getElementById(id).value = min;
		}
		return false;
	}
}

function blurNumberSteps(event){
	//event.preventDefault();
	id = event.currentTarget.id;
	max = event.currentTarget.getAttribute('max');
	min = event.currentTarget.getAttribute('min');
	
	var valor = parseInt(document.getElementById(id).value, 10);
	max = parseInt(max, 10);
	min = parseInt(min, 10);
	if( valor >= min && valor <= max) {
		document.getElementById(id).value = valor;
		return true;
	} else {
		if(isNaN(valor)) {
			document.getElementById(id).value = min;
		} else if(valor > max){
			document.getElementById(id).value = max;
		} else if(valor < min){
			document.getElementById(id).value = min;
		}
		return false;
	}
}
function stepsUpNumberSteps(id, min, max, steps){
	var valor = parseInt(document.getElementById(id).value, 10);
	if(parseInt(valor + steps, 10) <= parseInt(max, 10)) {
		document.getElementById(id).value = parseInt(valor + steps, 10);
	}
	$('#'+id).trigger('change');
	return false;
}

function stepsDownNumberSteps(id, min, max, steps){
	var valor = parseInt(document.getElementById(id).value, 10);
	if(parseInt(valor - steps, 10) >= parseInt(min, 10)) {
		document.getElementById(id).value = parseInt(valor - steps, 10);
	}
	$('#'+id).trigger('change');
	return false;
}

function disabledNumberSteps(event){
	if($('#' + event.data.id).attr('disabled')) {
		for(i=0; i<document.getElementById('numberSteps' + event.data.indice).children.length; i++) {
			document.getElementById('numberSteps' + event.data.indice).children[i].disabled = true;
		}
	} else {
		for(i=0; i<document.getElementById('numberSteps' + event.data.indice).children.length; i++) {
			document.getElementById('numberSteps' + event.data.indice).children[i].disabled = false;
		}
	}
}