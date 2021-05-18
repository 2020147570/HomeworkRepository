let cnt = 1;

fetch('product.json')
.then(response => response.json())
.then(json => init(json))
.catch(error => {
	console.log('Error: ' + error)
});

window.onscroll = () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		load();
	}
}

let category_group = [];
let filter_group = [];

let recentcategory = '';
let recentsearch = '';

const category = document.querySelector('#choose_a_category');
const searchterm = document.querySelector('#enter_search_term');
const buttonchk = document.querySelector('#filter_results');
const main = document.querySelector('#this_is_main');

function init (product) {
	let item_type = category.value;
	let item_name = '';
	
	filter_group = product;
	update();
	
	buttonchk.onclick = filtering;
	
	function filtering (e) {
		e.preventDefault();
		cnt = 1;
		scrollchk = true;
		
		category_group = [];
		filter_group = [];
		
		if (category.value === recentcategory && searchterm.value.trim() === recentsearch) {
			return;
		} else {
			recentcategory = category.value;
			recentsearch = searchterm.value.trim();
			
			if (category.value === 'All') {
				category_group = product;
				selectterm();
			} else {
				let lower_type = category.value.toLowerCase();
				for (let i = 0; i < product.length; i++) {
					if (product[i].type === lower_type) {
						category_group.push(product[i]);
					}
				}
				selectterm();
			}
		}
	}
}

function selectterm () {
	if (searchterm.value.trim() !== '') {
		let lower_term = searchterm.value.trim().toLowerCase();
		for (let i = 0; i < category_group.length; i++) {
			if (category_group[i].name.indexOf(lower_term) !== -1) {
				filter_group.push(category_group[i]);
			}
		}
	} else {
		filter_group = category_group;
	}
	
	update();
}

function update () {
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
	
	if (filter_group.length === 0) {
		const msg = document.createElement('div');
		msg.className = 'msg';
		msg.innerHTML = 'No results!';
		main.appendChild(msg);
	} else {
		load();
	}
}

function load () {
	if (cnt === filter_group.length) {
		return;
	}
	
	for (let i = (cnt - 1) * 6; i < cnt * 6; i++) {
		if (i >= filter_group.length) {
			break;
		}
		fetchblob(filter_group[i]);
	}
	
	if ((cnt - 1) * 6 >= filter_group.length) {
		cnt = filter_group.length;
	} else {
		cnt = cnt + 1;
	}
}

function fetchblob (product) {
	let url = product.image;
	
	fetch(url)
	.then(response => response.blob())
	.then(blob => {
		show(URL.createObjectURL(blob), product.name, product.price, product.info);
	})
	.catch(error => {
		console.log('Error: ' + error);
	});
}

function show (imageURL, productname, productprice, productinfo) {
	const div = document.createElement('div');
	const img = document.createElement('img');
	
	div.className = 'item_display';
	div.id = productname + '/' + productprice + '/' + productinfo;
	div.addEventListener('click', explain);
	
	img.src = imageURL;
	img.alt = productname;
	img.className = 'newitem';
	
	main.appendChild(div);
	div.appendChild(img);
}

function explain (e) {
	let targetID = e.target.parentNode.id;
	let detaillist = targetID.split('/');
	
	if (targetID.indexOf('explain-') === -1) {
		e.target.parentNode.id = 'explain-' + targetID;
		
		const detail = document.createElement('div');
		detail.className = 'item_detail';
		let str = '<br>이름: &nbsp;' + detaillist[0] + '<br><br>가격: &nbsp;' + detaillist[1] + ' 원<br><br>설명: &nbsp;' + detaillist[2];
		detail.innerHTML = str;
		document.getElementById(e.target.parentNode.id).appendChild(detail);
	} else {
		e.target.parentNode.id = targetID.substring(8);
		let chk = document.getElementById(e.target.parentNode.id);
		chk.removeChild(chk.childNodes[1]);
	}
}