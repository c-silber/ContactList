$(document).ready(function () {    
    // initialize the modal
    $('.modal').modal();
    
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
    
    // clicking anywhere on the row to set the map focus
    $('.tRow').click(function () {
       // reset the map here
        var geocode = $(this).find('.geocode').attr('class').split(" ");
        var lng = parseFloat(geocode[1]);
        var lat = parseFloat(geocode[2]);
        var focus =  
            {'lat': lat,
             'lng': lng};
        map.setCenter(focus);
    });
    
    // clicking on the 'New Contact' button
    $('.waves').click(function () {
        $.ajax({
            url: '/mailer',
            type: 'get',
            success: function (data) {
                window.location.href = '/mailer'
            }
        });
    });
    
    // on clicking the edit in the contact list
    $('.edit').click(function()  {
        var id = this.id;
        $('#' + id).css('visibility', 'hidden');
        $(this).siblings().each(function () {
            if ($(this).attr('class') !== 'delete' && 
                $(this).attr('class') !== 'icons') {
                var val = $(this).text();
                var tClass = $(this).attr('class');
                 $(this).replaceWith("<td><input size=10 overflow=hidden class='" + tClass + " changed' value='" + val + "' type='text'></td>");
            } else if ($(this).attr('class') !== 'icons') {    
                 $(this).prepend('<a href="#"><i id="' + id + '" style="color:blue;padding-right:10px" class="fa fa-floppy-o fa-lg" aria-hidden="true"></i></a>')
            } else {
                var email = $('#contactEmail' + id).attr('style');
                var phone = $('#contactPhone' + id).attr('style');
                var mail = $('#contactMail' + id).attr('style');

                $(this).replaceWith('<td class="methodChanges'+id+'"><a href="#"><i  id="contact_email'+id+'" style="' + email + '" class="material-icons mChanged">email</i></a><a href="#"><i id="contact_phone'+id+'" style="' + phone + '" class="material-icons mChanged">phone</i></a><a href="#"><i id="contact_mail'+id+'" style="' + mail + '" class="material-icons mChanged">markunread_mailbox</i></a></td>');   
            }
        });
    });
});

// click event for toggle contact email
$(document).on('click', '.mChanged', function(){
    var color = $(this).attr("style");
     if ( color == "color:#673ab7" || color ==  "color: rgb(103, 58, 183);" ) {
        $(this).css("color", "#9e9e9e");
    } else {
        $(this).css("color", "#673ab7");
    }
});

// click event for dynamically created save icon
$(document).on('click', '.fa-floppy-o', function () {
    var id = this.id;
    var editData = [];
    $('.changed').each(function() {
        editData.push($(this).val());
        $(this).replaceWith("<td>" + $(this).val() + "</td>");
    });
    
    var email = $('#contact_email' + id).attr('style');
    var phone = $('#contact_phone' + id).attr('style');
    var mail = $('#contact_mail' + id).attr('style');
    
    $('.methodChanges' + id).replaceWith('<td class="icons"><i id="contactEmail'+id+'" style="' + email + '" class="material-icons">email</i><i id="contactPhone'+id+'" style="' + phone + '" class="material-icons">phone</i><i id="contactMail'+id+'" style="' + mail + '" class="material-icons">markunread_mailbox</i></td>');  
    
    editData.push(this.id);
    
    if (email == "color:#673ab7" || email == "color: rgb(103, 58, 183);"){
        editData.push(true);
    } else {
        editData.push(false);
    }
    
    if (phone == "color:#673ab7" || phone == "color: rgb(103, 58, 183);"){
        editData.push(true);
    } else {
        editData.push(false);
    }
    
    if (mail == "color:#673ab7" || mail == "color: rgb(103, 58, 183);"){
        editData.push(true);
    } else {
        editData.push(false);
    }
    
    // submit post request to save the data
   $.ajax({
        url: '/contacts',
        type: 'post',
        data: {data: editData, id: this.id},
        success: function (data) {
            console.log("worked");
        }
    });
    
    $('#' + id).css('visibility', 'visible');
    $(this).remove();
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

// filtering for the address search
$(document).on('keyup', '#searchByAddress', function(){
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchByAddress");
  filter = input.value.toUpperCase();
  table = document.getElementById("contacts");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    address = tr[i].getElementsByTagName("td")[4];
    city = tr[i].getElementsByTagName("td")[5];
    state = tr[i].getElementsByTagName("td")[6];
    zip = tr[i].getElementsByTagName("td")[7];
    if (address || city || state || zip) {
      if (address.innerHTML.toUpperCase().indexOf(filter) > -1 ||
         city.innerHTML.toUpperCase().indexOf(filter) > -1 ||
         state.innerHTML.toUpperCase().indexOf(filter) > -1 ||
         zip.innerHTML.toUpperCase().indexOf(filter) > -1) {
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