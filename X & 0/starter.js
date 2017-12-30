"use strict"

var turn;

var gata = 0; 

var steps = 0;

function restart_table()
{
	alert("Osal");


	var children = document.getElementsByClassName("images");

	for(var i = children.length - 1; i >= 0; i--)
	{
		children[i].remove();
	}

	children = document.getElementsByClassName("cells");

	for(var i = 0; i < children.length; i++)
	{
		children[i].innerHTML = "";
	}

	turn = get_random(2);

	show_turn();

	steps = 0;
	gata = 0;

}

window.onkeyup = function(e)
{
	var key = e.keyCode;

	// alert("apasat " + key); //for finding it

	if(key == 82)//This is it...
	{
		restart_table();
	}
}



function make_end( mess )
{
	gata = 1;
	alert(mess + "! press 'r' on keyboard for restart (when the mouse is over the table)");

	var player = document.getElementsByClassName("jucator");

	var first = player[0];
	var second = player[1];

	var sad = document.createElement("img");
	sad.src = "http://www.irinaciocan.ro/tehnici_web/imagini/smiley_albastru_trist.png";

	sad.classList.add("images");	

	var happy = document.createElement("img");
	happy.src = "http://www.irinaciocan.ro/tehnici_web/imagini/smiley_galben_vesel.png";


	happy.classList.add("images");

	if(turn == 0)
	{
		first.appendChild(happy);
	}
	else
	{
		first.appendChild(sad);
	}


	var sad = document.createElement("img");
	sad.src = "http://www.irinaciocan.ro/tehnici_web/imagini/smiley_albastru_trist.png";

	sad.classList.add("images");	

	var happy = document.createElement("img");
	happy.src = "http://www.irinaciocan.ro/tehnici_web/imagini/smiley_galben_vesel.png";

	happy.classList.add("images");

	if(turn == 1)
	{
		second.appendChild(happy);
	}
	else
	{
		second.appendChild(sad);
	}
}

function check()
{
	var cells = document.getElementsByClassName("cells");

	var act;
	if(turn == 0)
		act = 'X';
	else
		act = '0';

	//check lines
	for(var s = 0; s < 9; s += 3)
	{
		if( cells[s].innerHTML != '' && cells[s].innerHTML == cells[s+1].innerHTML && cells[s+1].innerHTML == cells[s+2].innerHTML)
		{
			make_end(act + "wins");
		}
	}

	for(var s = 0; s < 3; s ++)
	{
		if(cells[s].innerHTML != '' && cells[s].innerHTML == cells[s+3].innerHTML && cells[s+3].innerHTML == cells[s+6].innerHTML)
		{
			make_end(act + "wins");
		}
	}

	if(cells[0].innerHTML != '' && cells[0].innerHTML == cells[4].innerHTML && cells[0].innerHTML == cells[8].innerHTML)
		make_end(act + "wins");


	if(cells[2	].innerHTML != '' && cells[2].innerHTML == cells[4].innerHTML && cells[2].innerHTML == cells[6].innerHTML)
		make_end(act + "wins");
}


function press(act)
{
	if(act.innerHTML != '' || gata == 1)
		return;

	if(turn == 0)
	{
		act.innerHTML = 'X';
	}
	else
	{
		act.innerHTML = '0';
	}

	check();

	steps ++;

	if(steps == 9 && gata == 0)
	{
		turn = 2;
		show_turn();
		make_end("draw, losers")
	}

	if(gata == 0)
	{
		turn = 1 - turn;
		show_turn();	
	}
}

function show_turn()
{
	var player = document.getElementsByClassName("jucator");

	var turn_player = player[1];
	var wait_player = player[0];

	if(turn == 0)
	{
	 	turn_player = player[0];
	 	wait_player = player[1];
	}

	turn_player.style.opacity = "1";
	wait_player.style.opacity = "0.3";

	if(turn > 1)
	{
		turn_player.style.opacity = "0.3";
	}

}

function get_random(up)
{
	var aux = Math.random();

	var slice = 1 / up;

	return Math.floor(aux / slice);
}

function make_buttons()
{

	var tabla = document.getElementsByClassName("tabla")[0];


	tabla.style.position = "relative";

	for(var i = 0; i < 9; i++)
	{
		var node = document.createElement("BUTTON");
		tabla.appendChild(node);


		node.style.width = "33%";
		node.style.height = "33%";
		node.style.fontSize = "30px";

		node.style.position = "absolute";

		node.style.left = 33 * (i%3) + "%";
		node.style.top = 33 * Math.floor(i/3) + "%";

		node.classList.add("cells");

		node.onclick = function(){ press(this) } ;
	}
}

window.onload=function(){

	var player = document.getElementsByClassName("jucator");

	var X = player[0];
	var O = player[1];

	X.innerHTML += "( X )";
	O.innerHTML += "( 0 )";

	turn = get_random(2);

	show_turn();

	make_buttons();
}