var list_values = [];

var dropPos;
var dragPos;

function checkPosionOfList(x, y){
	var collection = document.getElementsByTagName('li');
	for(var i=0;i<collection.length;i++){
		if(x === collection[i])
			dropPos = i;
		if(y === collection[i])
			dragPos = i;
	}
}
var i =0;
var valueNo = 0;
	function addList(event){
		// console.log(localStorage);
		if(event.keyCode === 13  || event.target.classList.contains("add-btn")){
			var input_data = document.getElementById('input-data');
			if(input_data.value != ""){
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
				var text = document.createTextNode(input_data.value);
				para.appendChild(text);

				var cancel = document.createElement('i');
				cancel.className = 'fa fa-close';
				cancel.style = 'font-size:24px';

				li_tag.appendChild(checkbox);
				li_tag.appendChild(para);
				li_tag.appendChild(cancel);
				

				var ul_tag = document.getElementById('list-item');
				ul_tag.appendChild(li_tag);

				var obj = {
					input_para: input_data.value,
					checked_value: false
				}
				list_values.push(obj);
				var list_array = JSON.stringify(list_values);
				localStorage.setItem('list_array',list_array);
				// for(var i=0;i<list_values.length; i++){
					console.log(localStorage.getItem(list_array));
				// }
				// console.log(list_values.length);

			}
			else{
				
			}
		}
	}
	function addStroke(event){
		var checkbox = event.target.tagName;
		if( checkbox == 'INPUT'){
			var para = event.target.nextSibling;
			if(event.target.checked == true){
				para.style.setProperty("text-decoration","line-through");
			}
			else{
				para.style.setProperty("text-decoration","none");
			}

		}
	}

	function deleteList(event){
		var no = event.target.tagName;
		if(no == 'I'){
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
localStorage.setItem}

	function dragEnd(event){

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
	}

document.getElementById('input-data').addEventListener("keyup", addList);
document.getElementById('add-btn').addEventListener("click", addList);
document.getElementById('list-item').addEventListener("click", addStroke);
document.getElementById('list-item').addEventListener("click", deleteList);


document.getElementById('list-item').addEventListener("dragstart", dragStart);
document.getElementById('list-item').addEventListener("dragover", dragOver);
document.getElementById('list-item').addEventListener("drop", dropElement);
	
