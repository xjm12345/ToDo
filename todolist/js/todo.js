//清除本地缓存
function clear(){
	localStorage.clear();
	load();
}
//将用户数据保存至本地缓存
function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));
}
//从本地缓存中获取数据，有数据，赋值给todolist，这样刷新页面用户数据依旧存在
function loadData(){
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		return JSON.parse(collection);
	}
	else return [];
}
//创建一个数组对象来保存用户输入的数据，数组的每一项都是一个对象，对象的"todo"属性保存着用户输入的数据，

//每次用户输入完数据，都要更新缓存，并初始化输入框。
function postaction(){
	var title = document.getElementById("title");
	if(title.value == "") {
		alert("内容不能为空");
	}else{
		var data=loadData();
		var todo={"title":title.value,"done":false};
		data.push(todo);
		saveData(data);
		var form=document.getElementById("form");
		form.reset();
		load();//将用户输入的数据添加至dom节点
	}
}
//"done"属性可理解为用户输入数据的标签，主要用来对"todo"值进行分类。
function saveSort(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var ts=todolist.getElementsByTagName("p");
	var ds=donelist.getElementsByTagName("p");
	var data=[];
	for(i=0;i<ts.length; i++){
		var todo={"title":ts[i].innerHTML,"done":false};
		data.unshift(todo);
	}
	for(i=0;i<ds.length; i++){
		var todo={"title":ds[i].innerHTML,"done":true};
		data.unshift(todo);
	}
	saveData(data);
}
//删除相应项，并加载
function remove(i){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();
}
//将数组todolist相应项的属性（“todo”或“done”）进行更新，并加载
function update(i,field,value){
	var data = loadData();
	var todo = data.splice(i,1)[0];
	todo[field] = value;
	data.splice(i,0,todo);
	saveData(data);
	load();
}
//点击事项触发编辑事件，将可编辑表单控件插入段落中，并将用户输入的值通过update函数对todolist数组里存储的数据进行更新
function edit(i)
{
	load();
	var p = document.getElementById("p-"+i);
	title = p.innerHTML;
	p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	//通过upadate函数对todolist数组相应项进行更新，将用户输入的内容写入到todolist数组相应项的todo属性中
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
			alert("内容不能为空");
		}
		else{
			update(i,"title",input.value);//修改事项内容后，更新数组里对应项"todo"属性的值，以便更新dom节点
  		}

	}
}
//将输入的数据添加至dom节点，并且根据输入数据属性("done")的值进行分类。
function load(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var collection=localStorage.getItem("todo");
	//todolist数组对象里若包含用户输入数据，则将其添加至dom节点；若为空对象，则初始化页面。
	if(collection!=null){
		var data=JSON.parse(collection);
		var todoCount=0;
		var doneCount=0;
		var todoString="";
		var doneString="";
		//通过onchange事件，复选框值有改变则调用update函数，并改变输入数据“done”属性的布尔值，
		//这样下次load()后，这段数据会进入不同的分组，未完成的事项分入已完成事项组，已完成事项分入未完成事项组
		//点击事项调用edit函数
		//点击“-”，调用remove函数
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				doneString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";//将每次用户输入的数据，通过节点<p>利用id标记，以便后续编辑功能定位
				doneCount++;
			}
			else{
				todoString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todoCount++;
			}
		};
		todocount.innerHTML=todoCount;
		todolist.innerHTML=todoString;
		donecount.innerHTML=doneCount;
		donelist.innerHTML=doneString;
	}
	else{
		todocount.innerHTML=0;
		todolist.innerHTML="";
		donecount.innerHTML=0;
		donelist.innerHTML="";
	}
	// querySelectorAll可以选择多个节点,以","分隔开,返回的是个数组
	var lis=todolist.querySelectorAll('ol li');
	[].forEach.call(lis, function(li) {
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('drop', handleDrop, false);
		onmouseout =function(){
			saveSort();
		};
	});		
}
//一系列事件的监听
window.onload=load;
window.addEventListener("storage",load,false);
var dragSrcEl = null;
//当拖动文本框的时候，浏览器会调用setData将拖动文本以text格式保存到dataTransfer中，
//在拖动链接或者图片时候会保存URL，这样在drop事件中就可以读取了

//为移动的元素设置dragstart事件,该事件用于存放需要移动的数据
function handleDragStart(e) {
  	dragSrcEl = this;
  	e.dataTransfer.effectAllowed = 'move';
  	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  	if (e.preventDefault) {
    	e.preventDefault();
  	}
  	e.dataTransfer.dropEffect = 'move';
  	return false;
}
//drop事件，表示元素被放置时候触发的事件
function handleDrop(e) {
  	if (e.stopPropagation) {
    	e.stopPropagation(); 
  	}
  	if (dragSrcEl != this) {
    	dragSrcEl.innerHTML = this.innerHTML;
    	this.innerHTML = e.dataTransfer.getData('text/html');
  	}
  	return false;
}