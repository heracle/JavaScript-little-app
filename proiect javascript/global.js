"use strict"

var table_px = 500;
var table_cells = 10;
var team_size = 3;
var difficulty = 4;

var minutes = 5;

var wall_chance = 25;//[0,99]

var is_wall;
var who_wall_player, who_wall_cpu;

var cst_gen_map_prod = 0.3;



var seconds = 0;
function countDown()
{
	document.getElementById("count_down").innerHTML = (Math.floor(seconds / 60)) + "m " + (seconds % 60) + "s ";
	seconds --;

	if (seconds <= 0) {
		document.getElementById("count_down").innerHTML = "game over";
       	clearInterval(timerId);
    }
}

// 

// function classPerson(name, skills, )

function add_node( id, type, place)
{
	var my = document.createElement(type);
	my.id = id;

	my.style.position = "relative";

	place.appendChild(my);

	return my;
}


function get_random(up)
{
	var aux = Math.random();

	return Math.floor(aux * up);
}

var dx = [0, 1, 0, -1];
var dy = [1, 0, -1, 0];

function union(nx, ny, ox, oy)
{
	while(nx != ox)
	{

		is_wall[nx][ny] = 2;
		nx --;
	}

	while(ny > oy)
	{
		is_wall[nx][ny] = 2;
		ny --;
	}
	while(ny < oy)
	{
		is_wall[nx][ny] = 2;
		ny ++;

		while(is_wall[nx][ny] != 2)
		{
			is_wall[nx][ny] = 2;
			ny ++;
		}
	}

	
}

function dfs(x, y)
{
	if(x < 0 || y < 0 || x >= table_cells || y >= table_cells)
		return;

	if(is_wall[x][y] != 0)
		return;

	is_wall[x][y] = 2;

	for(var i = 0; i < 4; i++)
	{
		dfs(x + dx[i], y + dy[i]);
	}
}

function before_start()
{
	is_wall = new Array(table_cells);
	who_wall_player = new Array(table_cells);
	who_wall_cpu = new Array(table_cells);

	for(var i = 0; i < table_cells; i++)
	{
		is_wall[i] = new Array(table_cells);
		who_wall_player[i] = new Array(table_cells);
		who_wall_cpu[i] = new Array(table_cells);
		for(var j = 0; j < table_cells; j++)
		{
			var rand_var = get_random(100);

			is_wall[i][j] = 1;
		}
	}

	seconds = 0;


	var player_zone = document.getElementById("table_player");


	player_zone.style.width = table_px+"px";
	player_zone.style.height = table_px+"px";
	player_zone.style.border = "2px solid black";

	player_zone.style.display = "inline-block";
	player_zone.style.position = "relative";
	player_zone.style.marginBottom = "20px";


	for(var i = 0; i < table_cells; i++)
	{
		for(var j = 0; j < table_cells; j++)
		{
			var node = document.createElement("BUTTON");

			player_zone.appendChild(node);


			node.style.width = Math.floor(100/table_cells) + "%";
			node.style.height = Math.floor(100/table_cells) + "%";

			who_wall_player[i][j] = node;


			if(is_wall[i][j] == 1)
				node.style.backgroundColor = "black";
			else
				node.style.backgroundColor = "white";
		}
	}


	// player_zone.style.float = "left";

	// initiate_game_play(player_zone, 0, who_wall_player);

	var cpu_zone = document.getElementById("table_pc");


	cpu_zone.style.width = table_px+"px";
	cpu_zone.style.height = table_px+"px";
	cpu_zone.style.border = "2px solid black";

	cpu_zone.style.display = "inline-block";
	cpu_zone.style.position = "relative";
	cpu_zone.style.marginBottom = "20px";

	for(var i = 0; i < table_cells; i++)
	{
		for(var j = 0; j < table_cells; j++)
		{
			var node = document.createElement("BUTTON");

			cpu_zone.appendChild(node);


			node.style.width = Math.floor(100/table_cells) + "%";
			node.style.height = Math.floor(100/table_cells) + "%";

			who_wall_cpu[i][j] = node;


			if(is_wall[i][j] == 1)
				node.style.backgroundColor = "black";
			else
				node.style.backgroundColor = "white";
		}
	}

	// cpu_zone.style.float = "right";

	// initiate_game_play(cpu_zone, 1, who_wall_cpu);


	var menu = document.getElementById("little_menu");

	menu.style.position = "relative";
	menu.style.display = "inline-block";
	menu.style.marginLeft = "20px";
	menu.style.marginRight = "20px";
	menu.style.width = "100px";
	menu.style.height = (table_px - 50)  + "px";
	menu.style.border = "2px solid black";
	menu.style.top = "-10px";

	menu.style.verticalAlign = "top";
	menu.style.top = "20px";

	var info = document.getElementById("info_selected");

	info.style.position = "relative";
	info.style.display = "inline-block";

	info.style.marginLeft = "20px";
	info.style.marginRight = "20px";
	// info.style.top = "20px";

	info.style.width = "200px";
	info.style.height = (table_px - 50) + "px";

	info.style.border = "2px solid black";
	info.style.verticalAlign = "top";
	info.style.top = "20px";


	var menu = document.getElementById("little_menu");


	var counter = add_node("counter", "div", menu);

	counter.style.width = "100%";
	counter.style.height = "15%";
	counter.style.boxSizing = "border-box";
	counter.style.border = "2px solid black";
	counter.id = "count_down";

	var start_button = add_node("start_button", "div", menu);

	start_button.style.width = "100%";
	start_button.style.height = "15%";
	start_button.style.boxSizing = "border-box";
	start_button.style.border = "2px solid black";
	start_button.style.display = "block";
	start_button.onclick = function(){ start_game() };

	var text_inside_start_button = add_node("text_inside_start_button", "p", start_button);

	text_inside_start_button.innerHTML = "New Game";

	seconds = 1;

	var timerId = setInterval(function(){ countDown(); },1000);


}


function initiate_game_play(zone, is_bot, matrix)
{


	for(var i = 0; i < table_cells; i++)
	{
		for(var j = 0; j < table_cells; j++)
		{
			var node = matrix[i][j];


			if(is_wall[i][j] == 1)
				node.style.backgroundColor = "black";
			else
				node.style.backgroundColor = "white";
			
			
			// node.style.fontSize = "30px";

			// node.style.position = "absolute";

			// node.style.left = 33 * (i%3) + "%";
			// node.style.top = 33 * Math.floor(i/3) + "%";

			// node.classList.add("cells");
		}
	}

}


function start_game()
{
	// var minutes = prompt("How many minutes the game should last?", "5");
	// if(isNaN( minutes ) || minutes <= 0 )
	//  	minutes = 5;
	// seconds = minutes *60;

	// table_cells = prompt("How many cells the table should have?", "10");
	// if(isNaN(table_cells) || table_cells <= 0)
	// 	table_cells = 10;

	// team_size = prompt("How many members a team should have?", "3");
	// if(isNaN(team_size) || team_size <= 0)
	// 	team_size = 3;

	// difficulty = prompt("How good the cpu team should be? (a number between 1 and 10)", "4");
	// if(isNaN(difficulty) || difficulty <= 0)
	// 	difficulty = 4;

	for(var i = 0; i < table_cells; i++)
	{
		for(var j = 0; j < table_cells; j++)
		{
			is_wall[i][j] = 1;
		}
	}
	



	var no_lines_gen = table_cells * table_cells * cst_gen_map_prod;

	no_lines_gen = Math.floor(no_lines_gen);



	for(var i = 0; i < no_lines_gen; i++)
	{
		var dir = get_random(2);

		var xstart = get_random(table_cells / 2) * 2;
		var ystart = get_random(table_cells / 2) * 2;

		var len = get_random(Math.floor(table_cells / 2));

		for(var x = xstart, y = ystart, step = 0; step < len && x < table_cells && y < table_cells; step++, x += (dir == 0), y += (dir == 1))
		{
			is_wall[x][y] = 0;
		}
	}

	for(var i = 0; i < table_cells; i++)
	{
		console.log(is_wall[i]);
	}

	var lastx = -1, lasty = -1;

	for(var x = 0; x < table_cells; x++)
	{
		for(var y = 0; y < table_cells; y++)
		{
			if(is_wall[x][y] == 0)
			{
				dfs(x,y);
				if(lastx != -1)
				{
					union(x, y, lastx, lasty);
				}
			}

			if(is_wall[x][y] == 2)
			{
				lastx = x;
				lasty = y;
			}
		}
	}

	for(var x = 0; x < table_cells; x++)
	{
		for(var y = 0; y < table_cells; y++)
		{
			if(is_wall[x][y] == 2)
				is_wall[x][y] = 0;
		}
	}



	var player_zone = document.getElementById("table_player");

	// player_zone.style.float = "left";

	initiate_game_play(player_zone, 0, who_wall_player);

	var cpu_zone = document.getElementById("table_pc");

	// cpu_zone.style.float = "right";

	initiate_game_play(cpu_zone, 1, who_wall_cpu);


	seconds = minutes * 60;

}



// window.onload=function(){ // main function



function main(){
	document.body.style.display = "block";

	add_node("little_menu", "div", document.body);
	add_node("table_player", "div", document.body);
	add_node("info_selected", "div", document.body);
	add_node("table_pc", "div", document.body);

	before_start();


	//start_game();
}