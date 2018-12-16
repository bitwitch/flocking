var configSidebar          = document.getElementById('configSidebar');
var alignSlider            = document.getElementById('alignSlider');
var cohesionSlider         = document.getElementById('cohesionSlider');
var separationSlider       = document.getElementById('separationSlider');
var perceptionRadiusSlider = document.getElementById('perceptionRadiusSlider');
var configSliders          = document.querySelectorAll('.config-slider');

// TODO(shaw): some mobile UI for config? even support mobile?
window.addEventListener('keypress', handlerToggleSidebar);

for (var i=0; i<configSliders.length; i++) {
	configSliders[i].addEventListener('input', handlerConfigSliderChange);
	configSliders[i].addEventListener('change', handlerConfigSliderChange); // fuck IE
}

function handlerToggleSidebar(e) {
	if (e.key == "`" || e.key == "~") {
		configSidebar.classList.toggle('active');
	}
}
 
function handlerConfigSliderChange(e) {
	e.target.nextElementSibling.innerText = e.target.value;
}