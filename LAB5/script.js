var db = JSON.parse(document.getElementById("dbdata").value);

document.addEventListener("DOMContentLoaded", (() => {
	for (var i = 0; i < db.length; i++) {
		show(db[i]);
	}
}), false);

const main = document.querySelector("#this_is_main");

function filter () {
	var category = document.getElementById("choose_a_category");
	var selectCategory = category.options[category.selectedIndex].value;
	var searchTerm = document.getElementById("enter_search_term").value.trim().toLowerCase();

	var tempDB1 = [];
	if (selectCategory == "All") {
		tempDB1 = db;
	} else {
		for (var i = 0; i < db.length; i++) {
			if (db[i].product_category == selectCategory) {
				tempDB1.push(db[i]);
			}
		}
	}

	var tempDB2 = [];
	if (searchTerm != "") {
		for (var i = 0; i < tempDB1.length; i++) {
			if (tempDB1[i].product_title.toLowerCase().indexOf(searchTerm) != -1) {
				tempDB2.push(tempDB1[i]);
			}
		}
	} else {
		tempDB2 = tempDB1;
	}

	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}

	if (tempDB2.length == 0) {
		const msg = document.createElement('div');
		msg.className = 'msg';
		msg.innerHTML = 'No results!';
		main.appendChild(msg);
	} else {
		for (var i = 0; i < tempDB2.length; i++) {
			show(tempDB2[i]);
		}
	}
}

function show (ith) {
	const div = document.createElement("div");
	const img = document.createElement("img");
	
	div.className = "item_display";
	div.addEventListener("click", newpage);
	
	img.src = ith.product_image;
	img.alt = ith.product_title;
	img.className = "newitem";
	
	main.appendChild(div);
	div.appendChild(img);

	function newpage () {
		window.location.href = "./product/:" + ith.product_id;
	}
}
