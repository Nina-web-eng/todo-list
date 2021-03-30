//選取dom
var list=document.querySelector('.list') //點擊刪除時刪除ul中的資料
var addBtn=document.querySelector('.btn') //選取btn當點擊加入
var database=localStorage.getItem('.event')||[] //從localStorage選取從input輸入的代辦事項

//事件監聽
addBtn.addEventListener('click',addData,false)
list.addEventListener('click',delData,false)
updateList(database)


//加入資料
function addData(){
    var txt=document.querySelector('.event').value
    if(txt === ''){
        alert('請輸入代辦事項');
        return
    } 
    // console.log(typeof(txt)) //會是物件格式所以要轉成字串才能放入localStorage
    var todo={content:txt}
    // console.log(typeof(todo)) //會是物件格式所以要轉成字串才能放入localStorage

    database.push(todo) //把todo放進database中
    localStorage.setItem('listItem',JSON.stringify(database))
    updateList(database)
}

//updateList()更新網頁資料
function updateList(database){
    var str='';
    for(i=0;i<database.length;i++){
        str+='<li><a href="#" data-num='+i+'>'+'刪除</a>'+(i+1)+'.'+database[i].content+'</li>'
    } //data-num要放在a標籤裡，不然刪除的順序會跟著li走由上往下刪除
    list.innerHTML=str
}

//點擊刪除時刪除資料
function delData(e){
    e.preventDefault(); //清除點擊a標籤會轉向網頁的預設，因為是要在點擊刪除時觸發所以放在dalData
    if(e.target.nodeName !== 'A'){ //如果點擊的不是A標籤就中斷函式
        return
    }
    var num = e.target.dataset.num; //取得刪除的
    database.splice(num,1); //把database中的資料刪除點選的一筆
    localStorage.setItem('listItem',JSON.stringify(database)) //刪除後的資訊要放入localStorage
    updateList(database) //渲染進網頁
}
