var list_values = [];

var dropPos;
var dragPos;
var valueNo = 0;
var selectedElement;
var currentElement;

function loadOnStart() {
    updateTodoListDom();
    progressBar();
}

function progressBar() {
    count = 0;
    for (var i = 0; i < list_values.length; i++) {
        if (list_values[i].checked_value === true) {
            ++count;
        }
    }
    var percent = Math.round((count / list_values.length) * 100);
    var progress_bar = document.getElementById('progress-bar');
    progress_bar.style.width = percent + "%";
    if (percent >= 0) {
        document.getElementById('progress-bar-value').innerHTML = percent + "% complete";
    } else {
        document.getElementById('progress-bar-value').innerHTML = "";
        // progress_bar.parentNode.style.border-color = "white";   
    }
}

function updateTodoListDom() {
    document.getElementById('list-item').innerHTML = "";
    list_values = JSON.parse(localStorage.getItem('list_array'));
    if (list_values.length > 0) {
        for (var i = 0; i < list_values.length; i++) {
            // updateTodoListDom(list_values[i].input_para, list_values[i].checked_value);
            var li_tag = document.createElement('li');
            li_tag.className = 'list-elements';
            li_tag.setAttribute("value", i);
            li_tag.setAttribute("draggable", "true");
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'work-done-btn';
            checkbox.id = 'work-done-btn';
            checkbox.className = 'work-done-btn';

            var para = document.createElement('p');
            para.id = 'input-para';
            var text = document.createTextNode(list_values[i].input_para);
            para.appendChild(text);

            var cancel = document.createElement('i');
            cancel.className = 'fa fa-close';
            cancel.style = 'font-size:24px';

            if (list_values[i].checked_value == true) {

                para.style.setProperty("text-decoration", "line-through");
                checkbox.checked = true;
            } else {

                para.style.setProperty("text-decoration", "none");
                checkbox.checked = false;
            }

            li_tag.appendChild(checkbox);
            li_tag.appendChild(para);
            li_tag.appendChild(cancel);


            var ul_tag = document.getElementById('list-item');
            ul_tag.appendChild(li_tag);
        }
    }
}

function storeInLocalStorage(val1, val2) {
    var obj = {
        input_para: val1,
        checked_value: val2
    }
    list_values.push(obj);
    var list_array = JSON.stringify(list_values);
    localStorage.setItem('list_array', list_array);
}

function addItem(event) {
    if (event.keyCode === 13 || event.target.classList.contains("add-btn")) {
        var input_data = document.getElementById('input-data');
        if (input_data.value != "") {
            storeInLocalStorage(input_data.value, false);
            updateTodoListDom();
            input_data.value = "";
        } else {

        }
    }
}

function updateItemStatus(pos, val1) {
    list_values[pos].checked_value = val1;
    var list_array = JSON.stringify(list_values);
    localStorage.setItem('list_array', list_array);
    updateTodoListDom();
}

function addStroke(event) {
    var checkbox = event.target.tagName;
    if (checkbox == 'INPUT') {
        var para = event.target.nextSibling;
        var para3 = para.textContent;
        if (event.target.checked == true) {
            para.style.setProperty("text-decoration", "line-through");
            for (var i = 0; i < list_values.length; i++) {
                if (para3 === list_values[i].input_para) {
                    updateItemStatus(i, true);
                }
            }
        } else {
            para.style.setProperty("text-decoration", "none");
            for (var i = 0; i < list_values.length; i++) {
                if (para3 === list_values[i].input_para) {
                    updateItemStatus(i, false);
                }
            }
        }

    }
    progressBar();
}

function deleteList(event) {
    var no = event.target.tagName;
    if (no == 'I') {
        var para3 = event.target.previousSibling.textContent;
        for (var i = 0; i < list_values.length; i++) {
            if (para3 === list_values[i].input_para) {
                list_values.splice(i, 1);
                let list_array = JSON.stringify(list_values);
                localStorage.setItem('list_array', list_array);
                updateTodoListDom();
                progressBar();
            }
        }
    }
}



function dragStart(event) {
    event.dataTransfer.setData('text/html', event.target);
    selectedElement = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function updatingOrder(x, y) {
    list_values = JSON.parse(localStorage.getItem('list_array'));
    data2 = list_values[x];
    list_values.splice(x, 1);
    list_values.splice(y, 0, data2);
    let list_array = JSON.stringify(list_values);
    localStorage.setItem('list_array', list_array);
    updateTodoListDom();
}

function dropElement(event) {

    var currentDropBox;
    if (event.target.tagName == 'INDEX' || event.target.tagName == 'P' || event.target.tagName == 'I') {
        currentDropBox = event.target.parentNode;
    } else if (event.target.tagName == 'LI') {
        currentDropBox = event.target;
    }
    if (currentDropBox.tagName === selectedElement.tagName && currentDropBox !== selectedElement) {
        dragPos = selectedElement.value;
        dropPos = currentDropBox.value;
        console.log(dragPos + "--" + dropPos);
        if (dragPos < dropPos) {
            updatingOrder(dragPos, dropPos);
        } else if (dropPos == 0) {
            updatingOrder(dragPos, 0);
        } else {
            updatingOrder(dragPos, currentDropBox.previousSibling.value)
        }
    }
}

document.getElementById('input-data').addEventListener("keyup", addItem);
document.getElementById('add-btn').addEventListener("click", addItem);
document.getElementById('list-item').addEventListener("click", addStroke);
document.getElementById('list-item').addEventListener("click", deleteList);


document.getElementById('list-item').addEventListener("dragstart", dragStart);
document.getElementById('list-item').addEventListener("dragover", dragOver);
document.getElementById('list-item').addEventListener("drop", dropElement);