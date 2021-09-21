export function update() {
    var sun = document.getElementById('selectSun').value;
    var water = document.getElementById('selectWater').value;
    var dog = document.getElementById('selectDog').value;

    var wrapContent = document.getElementById("getContent");

    // check if all selects received values
    if(sun != "Select..." && water != "Select..." && dog != "Select..."){
        document.getElementById('noResults').style.display = 'none';
            // Create a request
            var request = new XMLHttpRequest()
            // Open a new connection, using the GET request on the URL endpoint
            request.open('GET', 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun='+sun+'&water='+water+'&pets='+dog+'', true)

            request.onload = function () {
            // Begin accessing JSON data here
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    
                    wrapContent.innerHTML = "";
                    
                    data.forEach((plant) => {
                        var sunLight = '';
                        var favorite = '';
                        var waterVol = '';
                        var toxicity = '';

                        if(plant.staff_favorite){favorite = '<div class="staff">&#10024; Staff favorite</div>';}
                        if(plant.toxicity){
                            toxicity = '<span style="background-image: url(images/icons/toxic.svg)">Toxicity</span>';
                        }else{
                            toxicity = '<span style="background-image: url(images/icons/pet.svg)">Pet friendly</span>';
                        }
                            
                        
                        if(plant.sun == 'no'){
                            sunLight = '<span style="background-image: url(images/icons/no-sun.svg)">Sun light</span>';
                        }else if(plant.sun == 'low'){
                            sunLight = '<span style="background-image: url(images/icons/low-sun.svg)">Sun light</span>';
                        }else if(plant.sun == 'high'){
                            sunLight = '<span style="background-image: url(images/icons/high-sun.svg)">Sun light</span>';
                        }

                        if(plant.water == 'rarely'){
                            waterVol = '<span style="background-image: url(images/icons/1-drop.svg)">Water vol.</span>';
                        }else if(plant.water == 'daily'){
                            waterVol = '<span style="background-image: url(images/icons/2-drops.svg)">Water vol.</span>';
                        }else if(plant.water == 'regularly'){
                            waterVol = '<span style="background-image: url(images/icons/3-drops.svg)">Water vol.</span>';
                        }


                        wrapContent.insertAdjacentHTML( 'beforeend', '<div class="plantThumbs">  \
                            '+favorite+' \
                            <img src="'+plant.url+'" class="plantImg" /> \
                            <div class="plantInfo">\
                                <h3>'+plant.name+'</h3> \
                            </div> \
                                <div class="plantIcons"> \
                                    <strong>$'+plant.price+'</strong> \
                                    '+toxicity+' \
                                    '+sunLight+' \
                                    '+waterVol+' \
                                    <div class="control"></div> \
                                </div> \
                        </div>' );
                    });
                    
                } else {
                    return false;
                }
            }

            // Send request
            request.send();
            document.getElementById('showResults').style.display = 'block';
            document.getElementById('results').scrollIntoView({block: "end", behavior: "smooth"});
            return true;
    }
    
}

//update();

