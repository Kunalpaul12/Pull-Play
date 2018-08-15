https://www.behance.net/gallery/54017803/User-Profile-UI // ui 

*what need to see
UI
1> content zoom down in my screen
2> make a text little bigger
3> placeholder should go away when text filed is clicked

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
          xmlhttp.open("POST", "/api/post",false);
          xmlhttp.setRequestHeader("Content-Type", "appliation/json");
          xmlhttp.send(JSON.stringify({ 
          name:document.getElementById("name").value,
          songName:document.getElementById("songName").innerHTML,
          dedicatedTo:document.getElementById("dedicatedtext").value,
          userImage:userImageBlob,
          dedicatedToImage:dedicatedToImageBlob
         }));
          alert(xmlhttp.status)