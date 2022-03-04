document.addEventListener('contextmenu', event => event.preventDefault());
var sunDown = document.querySelector('.sundow')
sunDown.style.visibility = "hidden"
function birthDay() {
	var changeMonth = document.querySelector('#month').value
	var changeDay = document.querySelector('#day').value
	var changeYear = document.querySelector('#year').value

	if (changeMonth !== "" && changeDay !== "" && changeYear !== "") {
		sunDown.style.visibility = "visible"
	}
}

function loadingBtnAnimation() {
	const loadingBtn = document.querySelector(".loading-btn");
	const loadingBtnText = document.querySelector(".text");

	loadingBtn.classList.add("progress");


	setTimeout(() => {
		loadingBtn.classList.remove("progress");
		loadingBtnText.innerText = "Searched";
	}, 6000);
}

// Variable for Animations 
var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;


const form = document.getElementById('form')
const firstInput = document.getElementById('first_input');
const secondInput = document.getElementById('second_input');
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const yearInput = document.getElementById('year');



var formV = $("#msform");
formV.validate({
	rules: {
		name: "required",
		second_input:"required",
		months:"required",
		date:"required",
		year:"required"
	},
});



$(".next").click(function () {
	
	animating = true;
	formV.valid()
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	const firstInputValue = firstInput.value;
	const secondInputValue = secondInput.value;
	const monthInputValue = monthInput.value;
	const dayInputValue = dayInput.value;
	const yearInputValue = yearInput.value;


	if (firstInputValue !== '' && secondInputValue !== '' && monthInputValue !== '' && dayInputValue !== '' && yearInputValue !== '') {
		next_fs.show();
		loadingBtnAnimation()
		current_fs.animate({ opacity: 0 }, {
			step: function (now, mx) {
				scale = 1 - (1 - now) * 0.2;
				left = (now * 50) + "%";
				opacity = 1 - now;
				current_fs.css({
					'transform': 'scale(' + scale + ')',
					'position': 'absolute'
				});
				next_fs.css({ 'left': left, 'opacity': opacity });
			},
			duration: 800,
			complete: function () {
				current_fs.hide();
				animating = false;
			},
			easing: 'easeInOutBack'
		});
	}


});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function () {
	return false;
})










