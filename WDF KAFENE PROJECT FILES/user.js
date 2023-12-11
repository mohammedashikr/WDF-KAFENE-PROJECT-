function readpost(){
    var a= new XMLHttpRequest();
    a.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",true);
    a.send();
    a.onreadystatechange=function(){
        // console.log(this.readyState)
        // console.log(this.status)
        if(this.status==200 && this.readyState==4){
            // console.log(this.responseText)
            // console.log(typeof(this.responseText))
            var main_data =JSON.parse(this.responseText);
            console.log(main_data)
            // console.log(typeof(main_data))
            displayusers(main_data);
        }
        else{
            console.log('Error',a.status)
        }
    }
}
// readpost()

function displayusers(main_data){
    var users=document.getElementById('user');
    users.innerHTML ='';

    main_data.filter(element => {
        const text= document.createElement('tr');
        const location=`${element.currentCity},${element.currentCountry}`;
        text.innerHTML=`
        <td>${element.id}</td>
        <td><img src="${element.profilePic}"></td>
        <td>${element.fullName}</td>
        <td>${element.dob}</td>
        <td>${element.gender}</td>
        <td>${location}</td>
    `;
        users.appendChild(text);
    });
}

function searchname(){
    var type =document.getElementById('search')
    var value =type.value.trim()

    if(value.length ==0){
        readpost();
    }
    else if(value.length>=2){
        var a= new XMLHttpRequest();
        a.onreadystatechange=function(){
            // console.log(this.readyState)
            // console.log(this.status)
            if(this.status==200 && this.readyState==4){
                // console.log(this.responseText)
                // console.log(typeof(this.responseText))
                var main_data =JSON.parse(this.responseText);
                console.log(main_data)
                // console.log(typeof(main_data))
                displayusers(main_data);
            }
            else{
                console.log('Error',a.status)
            }
        }
    
    const searchingvalue=`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${value}`;
        a.open("GET",searchingvalue,true);
        a.send();
    }
    else{
        alert('Please enter at least 2 characters for searching name')
    }
}

function resetvalue(){
    document.getElementById('search').value='';
    readpost();
}
window.onload=function(){
    readpost();
}