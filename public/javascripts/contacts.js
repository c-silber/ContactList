$(document).ready(function () {    
    // when someone clicks on the trash-can, remove the tr element and send a request to the server to delete the contact from the database
    $('.fa-trash').click(function () {
        $(this).closest("tr").remove();
        $.ajax({
            url: '/contacts',
            type: 'delete',
            data: {id: this.id},
            success: function (data) {
                console.log("success");
            }
        });
    });
    
    // create a new table row
    $('.waves-effect').click(function () {
        // get request to mailer here
    });
    
    // on clicking the edit in the contact list
    $('.edit').click(function () {
        var id = this.id;
        $(this).siblings().each(function () {
            if ($(this).attr('class') !== 'delete') {
                var val = $(this).text();
                $(this).replaceWith("<th><input class='changed' value='" + val + "' type='text'></th>");
            } else {
                $(this).prepend('<a href="#"><i id="' + id + '" style="color:blue;padding-right:10px" class="fa fa-floppy-o fa-lg" aria-hidden="true"></i></a>')
            }
        });
    });
    
    $('.tRow').click(function () {
       // reset the map here 
        var geocode = $(this).find('.geocode').attr('class').split(" ");
        
        var lng = parseFloat(geocode[1])
        var lat = parseFloat(geocode[2])
        console.log(lat, lng);
        var focus =  
            {'lat': lat,
             'lng': lng};
        
        console.log(map);
        map.setCenter(focus);
    });
    
    $('.waves').click(function () {
        console.log("clicked")
        $.ajax({
            url: '/mailer',
            type: 'get',
            success: function (data) {
                window.location.href = '/mailer'
            }
        });
    });
});

// click event for dynamically created save icon
$(document).on('click', '.fa-floppy-o', function () {
 $(this).parent().parent().parent().children().each(function(){
        console.log(this);
    });
});
    

// filtering for the contacts search
$(document).on('keyup', '#search', function(){
  var input, filter, table, tr, td, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("contacts");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    firstName = tr[i].getElementsByTagName("td")[2];
    lastName = tr[i].getElementsByTagName("td")[3];
    if (firstName || lastName) {
      if (firstName.innerHTML.toUpperCase().indexOf(filter) > -1 || lastName.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
});

// filtering for the address
$(document).on('keyup', '#searchByAddress', function(){
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchByAddress");
  filter = input.value.toUpperCase();
  table = document.getElementById("contacts");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    address = tr[i].getElementsByTagName("td")[4];
    if (address) {
      if (address.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
});

/*
// geocode function to plot to lat/long for contact list
$(function(){
    $('.geocode').each(function () {
        var geo = $(this).attr('class').split(' '),
            loc = {lat: geo[1], lng: geo[2]};
        marker = new google.maps.Marker({
            map: map,
            position: loc,
        });
    });
});*/