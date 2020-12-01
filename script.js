 // Getting Api Data start Here 
 function getDataFromApi(){
	let receiveddata= fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
	  console.log(data);
	  if(data){
		  let len =data.length;
		  let txt=""
		  if(len>0){
			  for(let i=0;i<len;i++){
				  txt += "<tr><td><input type='checkbox' name='indchk' class='chkdata' onclick='showedit()' value="+data[i].id+"></td><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].body+"</td></tr>"
			  }
		  }
		  
		   if(txt != ""){
                        $("#tablepagination").append(txt).removeClass("hidden");
						paginate();
                    }
	  }
  });
	 
 }
 
 //Getting Api Data end Here 
 
 
 //Pagination
 
function paginate(){
    $('#tablepagination').after('<div id="nav"></div>');
    var rowsShown = 10;
    var rowsTotal = $('#tablepagination tbody tr').length;
	console.log(rowsTotal)
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#tablepagination tbody tr').hide();
    $('#tablepagination tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tablepagination tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
};

// Add Api Data Here //

function postAddDataFromApi(){
	fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: document.getElementById('title').value,
    body: document.getElementById('description').value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => 
  {
	  alert(response.json)
	return  response.json()
	  })
  .then((json) => alert(json));
	
	
}
// End Here //

//check All //
function checkAll(ele) {
     var checkboxes = document.getElementsByTagName('input');
     if (ele.checked) {
         for (var i = 0; i < checkboxes.length; i++) {
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = true;
             }
         }
     } else {
         for (var i = 0; i < checkboxes.length; i++) {
             console.log(i)
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = false;
             }
         }
     }
 }

//delete checked row
function deleteRecord(){
	if ($('input.chkdata').is(':checked')) {
		//var delVal=$('.chkdata:checked').attr("rel");
		var delVal = $('.chkdata:checked').map( function() {
			return this.value;
		}).get();
		console.log(delVal)
		for(let i=0;i<delVal.length;i++){
			alert(delVal[i]);
					fetch(`https://jsonplaceholder.typicode.com/posts/${delVal[i]}`, {
		  method: 'DELETE',
		headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
 .then((response) => response.json())
  .then((json) => {console.log(json);
  window.location.reload();
  })
		}
		

 
	}
	else{
		alert("Please select the record");
	}
}

//show edit if checkbox checked
function showedit(){
	
	var editVal = $('.chkdata:checked').map( function() {
			return this.value;
		}).get();
	
	if(editVal.length ==1){
		$('#showedit').removeClass("edithidden");
	}else{
		$('#showedit').addClass("edithidden");
	}
}

//Edit Model