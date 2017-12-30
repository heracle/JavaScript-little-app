
"use strict";

var no_carousels;
var map_size = 1000;

function get_no_carousels()
{
	 no_carousels = prompt("How many carousels do you want?", "7");

	 if(isNaN( no_carousels ) || no_carousels <= 0 )
	 	no_carousels = 7;

	 document.getElementById("no_carousels").innerHTML = no_carousels;
}

function construct_background()
{
	var base = document.getElementById("game");

	base.style.width = map_size + "px";
	base.style.height = map_size + "px";
}

function construct_pivot()
{
	var pivot = document.getElementById("pivot");

	pivot.style.width = "15%";
	pivot.style.height = "48%";
	pivot.style.left = 50 - 15 / 2 + "%";
	pivot.style.top = "50%";
	pivot.style.position = "absolute";


	var pivot_base = document.getElementById("basePivot");
	pivot_base.style.width = "25%";
	pivot_base.style.height = "2%";
	pivot_base.style.left = 50 - 25 / 2 + "%";
	pivot_base.style.top = "98%";
	pivot_base.style.position = "absolute";
}	

function construct_cabs()
{
	var game = document.getElementById("game");

	var class_cab = "class = 'class_cab'";
	var people_place = "class = 'people_place'";

	for(var i = 1; i <= no_carousels; i++)
	{
		var id = "cab" + i;
		var id_cab = "id ='"+ id +"'";

		var declaration = "<div " + id_cab + " " + class_cab + "> </div>";
		game.innerHTML += declaration;
	

		var declaration = "<div "+ people_place + "> </div>";
		game.innerHTML += declaration;
	}

	// debugger;

	var entire_class = document.getElementsByClassName('class_cab');

	var rot = 0;

	for(var i = 0; i < entire_class.length; i++)
	{
		var act = entire_class[i].style;
		act.height = "35%";
		act.width = "2%";
		act.top ="18%";
		act.background = "yellow";
		act.zIndex = "0";
		act.position = "absolute";
		act.left = "49%";
		//debugger;

		act.transformOrigin = "bottom";// (50) + "% " + (100) + "%";

		act.transform = 'rotate(' + rot + 'rad)';
		rot += 2 * Math.PI / no_carousels;
	}

	var entire_class = document.getElementsByClassName('people_place');

	var rot = 2 * Math.PI / no_carousels;

	var top = 25;
	var left = 50;

	var centerx = 53, centery = 45;

	for(var i = 0; i < entire_class.length; i++)
	{
		var act = entire_class[i].style;

		act.boxSizing = "border-box";

		act.height = "10%";
		act.width = "10%";
		act.background = "lightblue";
		act.top = (top - 5) + "%";
		act.left = (left - 5) + "%";

		act.zIndex = "1";
		act.position = "absolute";
		
		var new_top = (top - centerx) * Math.cos(rot) - (left - centery) * Math.sin(rot);
		var new_left = (top - centerx) * Math.sin(rot) + (left - centery) * Math.sin(rot);

		new_top += centerx;
		new_left += centery;

		top = new_top;
		left = new_left;

		act.borderLeft = "thick solid black";
		act.borderRight = "thick solid black";
		act.borderBottom = "thick solid black";


	}
}

function initiate()
{
	get_no_carousels();

	construct_background();

	construct_pivot();

	construct_cabs();

}