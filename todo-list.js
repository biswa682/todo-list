var list_values = [];

var dropPos;
var dragPos;
var count;
function progressBar(){
	count = 0;
	for(var i=0;i< list_values.length;i++){
		if(list_values[i].checked_value === true){
			++count;
		}
	}
	var percent = Math.round((count/list_values.length)*100);
	console.log(percent);
	var progress_bar = document.getElementById('progress-bar');
	progress_bar.style.width = percent+"%";
	document.getElementById('progress-bar-value').innerHTML = percent + "%";
}




function loadOnStart(){
	list_values =JSON.parse(localStorage.getItem('list_array'));
	if(list_values.length > 0){
		for(var i=0;i<list_values.length;i++){
			createListItem(list_values[i].input_para, list_values[i].checked_value);
		}
	}
	progressBar();
}

function checkPosionOfList(x, y){
	var collection = document.getElementsByTagName('li');
	for(var i=0;i<collection.length;i++){
		if(x === collection[i])
			dropPos = i;
		if(y === collection[i])
			dragPos = i;
	}
}

function createListItem(input_element, check_value){
	var li_tag = document.createElement('li');
	li_tag.className = 'list-elements';
	li_tag.setAttribute("value",++valueNo);
	li_tag.setAttribute("draggable","true");
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.name = 'work-done-btn';
	checkbox.id = 'work-done-btn';
	checkbox.className = 'work-done-btn';

	var para = document.createElement('p');
	para.id = 'input-para';
	var text = document.createTextNode(input_element);
	para.appendChild(text);

	var cancel = document.createElement('i');
	cancel.className = 'fa fa-close';
	cancel.style = 'font-size:24px';

	if(check_value == true){
		
		para.style.setProperty("text-decoration","line-through");
		checkbox.checked = true;
	}
	else{
		 
		para.style.setProperty("text-decoration","none");
		checkbox.checked = false;
	}

	li_tag.appendChild(checkbox);
	li_tag.appendChild(para);
	li_tag.appendChild(cancel);
	

	var ul_tag = document.getElementById('list-item');
	ul_tag.appendChild(li_tag);

}

function storeInLocalStorage(val1, val2){
	var obj = {
		input_para: val1,
		checked_value: val2
	}
	list_values.push(obj);
	var list_array = JSON.stringify(list_values);
	localStorage.setItem('list_array',list_array);
}
function ChangeStroke(pos, val1){
	list_values[pos].checked_value = val1;
	var list_array = JSON.stringify(list_values);
	localStorage.setItem('list_array', list_array);
}

var i =0;
var valueNo = 0;
	function addList(event){
		if(event.keyCode === 13  || event.target.classList.contains("add-btn")){
			var input_data = document.getElementById('input-data');
			if(input_data.value != ""){
				storeInLocalStorage(input_data.value, false);
				createListItem(input_data.value, false);
				input_data.value = "";
			}
			else{
				
			}
		}
	}
	function addStroke(event){
		var checkbox = event.target.tagName;
		if( checkbox == 'INPUT'){
			var para = event.target.nextSibling;
			var para3 = para.textContent;
			if(event.target.checked == true){
				para.style.setProperty("text-decoration","line-through");
				for(var i=0;i<list_values.length;i++){
					if(para3 === list_values[i].input_para){
						ChangeStroke(i,true);
					}
				}
			}
			else{
				para.style.setProperty("text-decoration","none");
				for(var i=0;i<list_values.length;i++){
					if(para3 === list_values[i].input_para){
						ChangeStroke(i,false);
					}
				}
			}

		}
		progressBar();
	}

	function deleteList(event){
		var no = event.target.tagName;
		if(no == 'I'){
			var para3 = event.target.previousSibling.textContent;
			for(var i=0;i<list_values.length;i++){
				if(para3 === list_values[i].input_para){
					list_values.splice(i, 1);
					var list_array = JSON.stringify(list_values);
					localStorage.setItem('list_array', list_array);
				}		
			}
			var main_list = event.target.parentNode;
			main_list.remove();
		}
	}

	var selectedElement;
	var currentElement;

	function dragStart(event){
		event.dataTransfer.setData('text/html', event.target);
		selectedElement = event.target;
	}

	function dragOver(event){
		event.preventDefault();
	}

	function dropElement(event){
		var newList = selectedElement;
		var currentDropBox;
		if(event.target.tagName == 'INDEX' || event.target.tagName == 'P' || event.target.tagName == 'I'){
			currentDropBox = event.target.parentNode;
		}
		else if(event.target.tagName == 'LI'){
			currentDropBox = event.target;
		}
		if(currentDropBox.tagName === selectedElement.tagName && currentDropBox !== selectedElement){
			checkPosionOfList(currentDropBox, newList);
			if(dragPos < dropPos){
				selectedElement.remove();	
				currentDropBox.parentNode.insertBefore(newList, currentDropBox.nextSibling);
			}
			else{
				selectedElement.remove();
				currentDropBox.parentNode.insertBefore(newList, currentDropBox);	
			}
		}
		
		var collection = document.getElementsByTagName('li');
		for(var i=0;i<collection.length;i++){
			var main_data = collection[i].childNodes[1].childNodes[0].textContent;
			var value_checked = collection[i].childNodes[0].checked;
			list_values[i].input_para = main_data;
			list_values[i].checked_value = value_checked;
		}
		var list_array = JSON.stringify(list_values);
		localStorage.setItem('list_array', list_array);
		console.log('local Storage Updated');

	}

document.getElementById('input-data').addEventListener("keyup", addList);
document.getElementById('add-btn').addEventListener("click", addList);
document.getElementById('list-item').addEventListener("click", addStroke);
document.getElementById('list-item').addEventListener("click", deleteList);


document.getElementById('list-item').addEventListener("dragstart", dragStart);
document.getElementById('list-item').addEventListener("dragover", dragOver);
document.getElementById('list-item').addEventListener("drop", dropElement);
	
