let addedParamsCount =0

function getElementByString(string){
let div=document.createElement('div')
div.innerHTML=string
return div.firstElementChild
}

let parameterBox=document.getElementById("parameterBox")
parameterBox.style.display="none"

let paramsRadio=document.getElementById("paramsradio")
//console.log(paramsradio)
paramsRadio.addEventListener("click",()=>{
    document.getElementById("parameterBox").style.display="block"
    document.getElementById("params").style.display="block"
    document.getElementById("requestJsonBox").style.display="none"
})

let jsonRadio=document.getElementById("jsonradio")
//console.log(jsonRadio)
jsonRadio.addEventListener("click",()=>{
    document.getElementById("parameterBox").style.display="none"
    document.getElementById("params").style.display="none"
    document.getElementById("requestJsonBox").style.display="block"
})

let addParam=document.getElementById("addParam")
//console.log(addParam)
addParam.addEventListener("click",()=>{
let params=document.getElementById("params")
//console.log(params)
let string = `<div class="form-row">
<label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount+2}</label>
<div class="col-md-4">
  <input type="text" class="form-control" id="parameterkey${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} Key">
</div>
<div class="col-md-4">
  <input type="text" class="form-control" id="parametervalue${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} Value">
</div>
<button type="button" class="btn btn-primary deleteParam">-</button>
</div>`

//console.log("before",typeof string)
addedParamsCount++
let paramElement =getElementByString(string)
//console.log("after",typeof paramElement)
params.appendChild(paramElement)

let deleteParam=document.getElementsByClassName("deleteParam")
//console.log(deleteParam)
Array.from(deleteParam).forEach(item=>{
    item.addEventListener("click",e=>{
        e.target.parentElement.remove()
    })
})
})

let  submit=document.getElementById("submit")
//console.log(submit)
submit.addEventListener("click",()=>{
    document.getElementById("responseJsonText").value="Please Wait......"

    //fetch all the values
    let url=document.getElementById("urlField").value
    let requestType=document.querySelector("input[name='requestType']:checked").value
    let contentType=document.querySelector("input[name='contentType']:checked").value
    //console.log({url,requestType,contentType})

    let data;
    if(contentType==="params")
    {
     data={}
     for(let i=1;i<addedParamsCount+1;i++){
     //console.log(i)
     let key = document.getElementById(`parameterkey${i}`).value
     let value= document.getElementById(`parametervalue${i}`).value
     data[key]=value 
    }
    //console.log("data",data)


    }else{
        data =document.getElementById("responseJsonText").value
    }

    if(requestType==="GET"){
        fetch(url)
        .then(res=> res.text())
        .then(data=>  document.getElementById("responseJsonText").value=data)
        .catch(err => console.log(err))
    }else{
        let data=document.getElementById("responseJsonText").value
        fetch(url,{
            method:"POST",
            body:data,
            headers:{
                'Content-Type':"application/json; charset=UTF-8"
            }
        })
        //.then(res => console.log(res))
        .then(res=>res.text())
        .then(data => document.getElementById("responseJsonText").value=data)
        .catch(err => console.log(err))
    }
}) 

//let promise =new Promise((resolve,reject)=>{
   // setTimeout(()=>{
       // console.log("hello")
       // resolve()
       // return "hi"
      // resolve("hi")
      // reject("hi")
   // },2000)
//})
//promise
//.then(data => console.log(data))    //when resolve is called
//.then(data=>"hi from another promise")
//.then(data=> console.log(data))
//.catch(err => console.log("error",err))   //when reject is called