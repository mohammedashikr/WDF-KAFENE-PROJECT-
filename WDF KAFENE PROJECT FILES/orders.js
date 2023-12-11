function readpost(){
    var a= new XMLHttpRequest();
    a.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",true);
    a.send();
    a.onreadystatechange=function(){
        // console.log(this.readyState)
        // console.log(this.status)
        if(this.status==200 && this.readyState==4){
            // console.log(this.responseText)
            // console.log(typeof(this.responseText))
            var main_data =JSON.parse(this.responseText);
            // console.log(main_data)
            // console.log(typeof(main_data))
            displayOrders(main_data);
        }
        else{
            console.log('Error',a.status)
        }
    }
}
// readpost()

function displayOrders(main_data){
    var ordersdata =document.getElementById('ordersdata');
    var totalcount=document.getElementById('ptag');
    ordersdata.innerHTML='';

    var ptag=0;

    main_data.filter(element => {
        const{id,customerName,orderDate,orderTime,amount,orderStatus}= element;
        
        const New = document.getElementById('New').checked;
        const packed = document.getElementById('Packed').checked;
        const intransit = document.getElementById('InTransit').checked;
        const delivered = document.getElementById('Delivered').checked;

        if(
            (orderStatus== 'New' && New) || (orderStatus== 'Packed' && packed) || (orderStatus== 'InTransit' && intransit) || (orderStatus== 'Delivered' && delivered)
        ){
            var text =document.createElement('tr')
            var day=`${element.orderDate},${element.orderTime}`;
            text.innerHTML=`
            <td>${id}</td>
            <td>${customerName}</td>
            <td>${day}</td>
            <td>${amount}</td>
            <td>${orderStatus}</td>`;

            ordersdata.appendChild(text);
            ptag++;
        }
    });
    totalcount.textContent = `Count: ${ptag}`;
}

function checkbox(){
    readpost();
}

document.getElementById('New').addEventListener('change', checkbox);
document.getElementById('Packed').addEventListener('change', checkbox);
document.getElementById('InTransit').addEventListener('change', checkbox);
document.getElementById('Delivered').addEventListener('change', checkbox);

readpost();