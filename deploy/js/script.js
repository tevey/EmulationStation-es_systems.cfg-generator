var systems;
var addedSystems = [];
var selectedSystem;
var XML;

$(function(){
	loadData();

	$('.path-help-button').click(function(event) {
		$('.path-help').slideToggle();
	});

	$('.command-help-button').click(function(event) {
		$('.command-help').slideToggle();
	});

	$('.system-select').change(function(event) {
		if($(this).val() == 'none')
			return;

		selectedSystem = getSystemByName($(this).val());
		$('#path').attr('placeholder', 'Path to ' + selectedSystem.name + ' roms');
	});

	$('#system-form').submit(function(event) {
		event.preventDefault();
		if($('.system-select').val() == 'none')
			return;
		selectedSystem.path = $('#path').val();
		selectedSystem.command = $('#command').val();
		$('#path').val('');
		$('#command').val('');
		addSystem(selectedSystem);
	});

	$('.download-button').click(function(event) {
		generateXML();
	});
});

function loadData() {
	$.getJSON('data.json', function(json, textStatus) {
		systems = json.systems;

		for (var i = 0; i < systems.length; i++) {
			$('.system-select').append('<option value="' + systems[i].name + '">' + systems[i].fullname + '</option>')
		}
	});
}

function getSystemByName(name) {
	for (var i = 0; i < systems.length; i++) {
		if(systems[i].name == name) {
			return systems[i];
		}
	}
}

function isDuplicate(name) {
	for (var i = 0; i < addedSystems.length; i++) {
		if(addedSystems[i].name == name) {
			return true;
		}
	}
	return false;
}

function addSystem(system) {

	$('.download-button').css('display', 'block');
	$('.added-systems-title').css('display', 'block');

	if(!isDuplicate(system.name)) {
		addedSystems.push(system);
	}
	$('.added-systems').children().remove();
	for (var i = 0; i < addedSystems.length; i++) {
		$('.added-systems').append('<li>' + addedSystems[i].fullname + '</li>')
	}
}

function generateXML() {
	XML = '<systemList>\n';
	for (var i = 0; i < addedSystems.length; i++) {
		var system = addedSystems[i];
		XML += '\t<system>\n';
		XML += '\t\t<name>' + system.name + '</name>\n';
		XML += '\t\t<fullname>' + system.fullname + '</fullname>\n';
		XML += '\t\t<path>' + system.path + '</path>\n';
		XML += '\t\t<extension>' + system.extension + '</extension>\n';
		XML += '\t\t<command>' + system.command + '</command>\n';
		XML += '\t\t<platform>' + system.platform + '</platform>\n';
		XML += '\t\t<theme>' + system.theme + '</theme>\n';
		XML += '\t</system>\n';
	}
	XML += '</systemList>';

	var blob = new Blob([XML], {type: 'text/plain;charset=utf-8'});
	saveAs(blob, 'es_systems.cfg');
}