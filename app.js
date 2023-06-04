var map = L.map('map').setView([52.181169, 21.559253], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.dragging.disable()
var szkola = L.marker([52.181169, 21.559253]).addTo(map).bindPopup("SZKOLA")

console.log(woje)

 map.on("click", addMarker)

 //function addMarker(e) {
 //   
 //   console.log(szkola)
 //  
 //   var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
//
 //   var tab = [[szkola._latlng.lat, szkola._latlng.lng], [e.latlng.lat, e.latlng.lng]]
//
 // var line = L.polyline(tab).addTo(map)
//
 // 
//
 //   
 //}

 function addMarker(e) {
    console.log(szkola)

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

    var tab = [[szkola._latlng.lat, szkola._latlng.lng], [e.latlng.lat, e.latlng.lng]]

    var line = L.polyline(tab).addTo(map)

    var distanceToSchool = e.latlng.distanceTo(szkola.getLatLng()) / 1000 //przeliczanie na km
    console.log('Odległość do SZKOŁY:', distanceToSchool)

    L.popup()
        .setLatLng(e.latlng)
        .setContent('Odległość do SZKOŁY wynosi: ' + distanceToSchool.toFixed(2) + ' km')
        .openOn(map)
}


for (let i = 0; i <= woje.features.length - 1; i++) {
    var wojew = L.geoJSON(woje.features[i], {color:'blue'}).addTo(map)
    

    wojew.on("click", showName)
    // wojew.on("mouseover", setColor)
    // wojew.on("mouseout", setColorPrew)
        
    

    function showName(e){
        console.log(e.layer.feature.properties.nazwa)
    }
}


function setColor(e){
    this.setStyle({
        color: 'purple'
    });

    console.log(e)
}

function setColorPrew(e){
      this.setStyle({
         color: 'blue'
      });

      console.log(e)
}

var wojewodztwa = []
var warstwy = []

for (let i = 0; i <= woje.features.length - 1; i++) {
    var nazwaWojewodztwa = woje.features[i].properties.nazwa    //wyswietlanie wojewodztw w konsoli 
    wojewodztwa.push(nazwaWojewodztwa)
}

console.log(wojewodztwa)


//Losowanie wojwodztwa

// Zmienne globalne


// Funkcja losująca województwo
function wylosujWojewodztwo() {
    if (wojewodztwa.length > 0) {
        var index = Math.floor(Math.random() * wojewodztwa.length);
        wylosowaneWojewodztwo = wojewodztwa[index];

        wylosowanyKolor(wylosowaneWojewodztwo);

        document.getElementById("wylosowane").innerHTML = wylosowaneWojewodztwo;

        wojewodztwa.splice(index, 1);
    } else {
        document.getElementById("wylosowane").innerHTML = "Wylosowano wszystkie województwa";
    }
}

function wylosowanyKolor(nazwa) {
    map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === nazwa) {
            layer.setStyle({ color: 'yellow' });
        }
    });
}





// Funkcja zmieniająca kolor zaznaczonego województwa na żółty
function wylosowanyKolor(nazwa) {
    map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.nazwa === nazwa) {
            layer.setStyle({
                color: 'yellow'
            });
        }
    });
}

// Funkcja sprawdzająca wpisane województwo przez użytkownika

var punkty = 0;
var lives = 3;









function handleWrongAnswer() {
  lives--; // Odejmowanie jednego życia

  if (lives > 0) {
    // Jeśli pozostały jeszcze życia, wyświetl komunikat
    alert("Niepoprawne województwo. Pozostało " + lives + " życia.");
  } else {
    // Gdy wszystkie życia zostały wykorzystane
    document.body.style.backgroundColor = "black"; // Ustawienie tła na czarne
    document.getElementById("map").style.display = "none"; // Ukrycie mapy
    document.getElementById("lives").style.display = "none"; // Ukrycie diva z informacją o życiach

    // Wyświetl komunikat, liczbę punktów i przycisk do rozpoczęcia gry od nowa
    var gameOverMessage = document.createElement("h1");
    gameOverMessage.innerText = "Koniec gry";
    gameOverMessage.style.color = "white"; // Ustawienie koloru tekstu na biały
    document.body.appendChild(gameOverMessage);

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = "Liczba punktów: " + punkty;
    scoreDisplay.style.color = "white"; // Ustawienie koloru tekstu na biały
    document.body.appendChild(scoreDisplay);

    var restartButton = document.createElement("button");
    restartButton.innerText = "Rozpocznij grę od nowa";
    restartButton.onclick = function() {
      location.reload(); // Przeładuj stronę, aby zacząć grę od nowa
    };
    document.body.appendChild(restartButton);
  }
}

// punkty

// Zmienne globalne
var selectedLayer = null;
var punkty = 0;

// Funkcja sprawdzająca wprowadzone województwo przez użytkownika
function Send() {
  var inputPowiaty = document.getElementById("powiaty").value.toLowerCase(); // Pobranie wartości z inputa i przekształcenie na małe litery

  if (selectedLayer && inputPowiaty === selectedLayer.feature.properties.nazwa.toLowerCase()) {
    // Poprawna odpowiedź
    alert("Poprawne województwo!");
    selectedLayer.setStyle({ color: 'lime' }); // Zmiana koloru zaznaczonej warstwy na zielony
    punkty++; // Zwiększenie liczby punktów
  } else {
    // Niepoprawna odpowiedź
    alert("Niepoprawne województwo. Spróbuj ponownie.");
    if (selectedLayer) {
      selectedLayer.setStyle({ color: 'red' }); // Zmiana koloru zaznaczonej warstwy na czerwony
    }
  }

  // Wyświetlanie aktualnej liczby punktów
  document.getElementById("punkty").innerHTML = "Punkty: " + punkty;
}

// Funkcja zmieniająca kolor zaznaczonej warstwy na żółty
function wylosowanyKolor(nazwa) {
  map.eachLayer(function (layer) {
    if (layer.feature && layer.feature.properties.nazwa === nazwa) {
      layer.setStyle({ color: 'yellow' });
      selectedLayer = layer; // Zapisanie referencji do zaznaczonej warstwy
    }
  });
}

// Funkcja obsługująca poprawną odpowiedź
function handleCorrectAnswer() {
  if (selectedLayer) {
    selectedLayer.setStyle({ color: 'lime' }); // Zmiana koloru zaznaczonej warstwy na zielony
  }
  alert("Poprawne województwo!");
  punkty++; // Zwiększenie liczby punktów
}

// Funkcja obsługująca błędną odpowiedź
function handleWrongAnswer() {
  if (selectedLayer) {
    selectedLayer.setStyle({ color: 'red' }); // Zmiana koloru zaznaczonej warstwy na czerwony
  }
  alert("Niepoprawne województwo. Spróbuj ponownie.");
}


// Resetowanie wartości inputa po załadowaniu strony
window.onload = function () {
  var inputPowiaty = document.getElementById("powiaty");
  inputPowiaty.value = "";
}

  
  








// function Send() {
//   var inputPowiaty = document.getElementById("powiaty").value; // Pobranie wartości z inputa
// 
//   // Sprawdzenie poprawności
//   if (inputPowiaty.toLowerCase() === wylosowaneWojewodztwo.toLowerCase()) {
//     alert("Poprawne województwo!");
//     punkty++; // Dodaj punkt za poprawną odpowiedź
//   } else {
//     alert("Niepoprawne województwo. Spróbuj ponownie.");
//     
//  
// }
// 
//   // Wyświetl aktualną sumę punktów
//   document.getElementById("punkty").innerHTML = "Punkty: " + punkty;
//  }










































// Funkcja zmieniająca kolor zaznaczonego województwa na żółty


// function wylosowanyKolor(nazwa) {
//     map.eachLayer(function (layer) {
//         if (layer.feature && layer.feature.properties.nazwa === nazwa) {
//             layer.setStyle({
//                 color: 'yellow'
//             });
//         }
//     });
// }

// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Zmienna przechowująca informację o tym, czy użytkownik zaznaczył województwo


// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika
// Funkcja sprawdzająca zaznaczenie województwa przez użytkownika


























// function wylosujWojewodztwo() {
//     // Sprawdź, czy istnieją jeszcze jakieś województwa do losowania
//     if (wojewodztwa.length > 0) {
//       // Losuj indeks
//       var index = Math.floor(Math.random() * wojewodztwa.length);
//       var wylosowaneWojewodztwo = wojewodztwa[index];
//   
//       // Zaznacz wylosowane województwo na żółto
//       wylosowanyKolor(wylosowaneWojewodztwo);
//   
//       // Aktualizuj wyświetlane informacje
//       document.getElementById("wylosowane").innerHTML = wylosowaneWojewodztwo;
//   
//       // Usuń wylosowane województwo z listy
//       wojewodztwa.splice(index, 1);
//     } else {
//       document.getElementById("wylosowane").innerHTML = "Wylosowano wszystkie województwa";
//     }
//   }
//   
//   function wylosowanyKolor(nazwa) {
//     map.eachLayer(function(layer) {
//       if (layer.feature && layer.feature.properties.nazwa === nazwa) {
//         layer.setStyle({
//           color: 'yellow'
//         });
//       }
//     });
//   }
//   

  
  
































 





 