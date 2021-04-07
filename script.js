
$('#dataPciker').datepicker({
    language: "zh-CN",
    title: '',
    autoclose: true,
    startDate: new Date(),
  })
 
  $('#dataPciker1').datepicker({
    language: "zh-CN",
    title: '',
    autoclose: true,
    startDate: new Date(),
  })

  console.log(JSON.parse(localStorage.getItem('data')))
// JSON.parse(localStorage.getItem("data"))
 console.log()
let data = JSON.parse(localStorage.getItem('data')) || []

let _dataPciker = document.getElementById("dataTimer")
let _title = document.getElementById("title")
let _createBtn = document.getElementById("createBtn")
let _list = document.getElementById("list")
let nowTime = []
let _clearBtn = document.getElementById("clearBtn")
let currentChange = null
let _changeTime = document.getElementById("changeTime")
let _submit = document.getElementById("submit")
let _cancel = document.getElementById("cancel")
let _dataTimer1 = document.getElementById("dataTimer1")
if(data.length != 0){
  createClockDom()
}

function createClockDom(){
  console.log("当前数据",data)

  Object.keys(data).map((item,index) => {
    _list.innerHTML += `
    <li class="list-group-item">
    <span class="title"> ${data[item].title}</span>
    <span> distance ${data[item].time}</span>
    <span id='clock${index}'></span>
    <button type="button" class="btn btn-warning btn-right" id="clearBtn"
      onclick="change(${index})"
    >change time</button>
  </li>
    `
})
  setInterval(clock,100)
}

_cancel.onclick = function(){
  _changeTime.style.display = "none"

}

_submit.onclick = function(){
  if(_dataTimer1.value){
     _changeTime.style.display = "none"
      data[currentChange].time = _dataTimer1.value
      _list.innerHTML = ""
      createClockDom()
      localStorage.setItem("data",JSON.stringify(data))
      _dataTimer1.value = ""
  }else{
      alert("content cant be null")
  }
}
function change(index){
  console.log(index)
  currentChange = index
  _changeTime.style.display = "block"
  
}

function createTimer(){
    const title = _title.value
    const time = _dataPciker.value
    if(title == "" || time == ""){
        alert("please check your content is not null")
        return
    }
    let timer = {}
    timer.title = title
    timer.time = time
    data.push(timer)
    console.log(data)
    _list.innerHTML = ""
    createClockDom()
    localStorage.setItem("data",JSON.stringify(data))
    _title.value = ''
    _dataPciker.value = ''
}

_createBtn.addEventListener("click",createTimer)

function clock(){
  data.map((item,index) => {
    var today=new Date(),
    h=today.getHours(),
    m=today.getMinutes(),
    s=today.getSeconds();
  var stopTime=new Date(item.time),
    stopH=stopTime.getHours(),
    stopM=stopTime.getMinutes(),
    stopS=stopTime.getSeconds();
  var shenyu=stopTime.getTime()-today.getTime(),
    shengyuD=parseInt(shenyu/(60*60*24*1000)),
    D=parseInt(shenyu)-parseInt(shengyuD*60*60*24*1000),
    shengyuH=parseInt(D/(60*60*1000)),
    H=D-shengyuH*60*60*1000,
    shengyuM=parseInt(H/(60*1000)),
    M=H-shengyuM*60*1000;
    S=parseInt((shenyu-shengyuD*60*60*24*1000-shengyuH*60*60*1000-shengyuM*60*1000)/1000)
    // nowTime[index]= `${shengyuD}+"天"+${shengyuH}+"小时"+${shengyuM}+"分"+${S}+"秒"+"<br>")`
    document.getElementById(`clock${index}`).innerHTML=(shengyuD+"day"+shengyuH+"hour"+shengyuM+"min"+S+"s"+"<br>");

  })
    }




    function clearAll(){
      console.log(123)
      data = []
    localStorage.setItem("data",JSON.stringify(data))
    _list.innerHTML = ""
   
    }

    _clearBtn.onclick = clearAll
    