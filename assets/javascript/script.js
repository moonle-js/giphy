const gifsBlock = document.querySelector('#gifsBlock');;
const button = document.querySelector('#button')

//elements section where buttons will be added
const elements = document.querySelector('#elements');
const findButton = document.querySelector('#findButton')
const addElementPrompt = document.querySelector('#addElementPrompt')
//elements
var existElements;

setInterval(function(){
    //while onclick the element on the top page will show gifs of the topic
    existElements = document.querySelectorAll('.added');
    existElements.forEach(function(item){
        item.addEventListener('click', function(){
            findGiphy(item.querySelector('p').innerHTML)
        })
    })
    // Here i am deleting element 
    var deleteButtons = document.querySelectorAll('.addedX');
    deleteButtons.forEach(function(item){
        item.addEventListener('click', function(){
            item.parentNode.remove();
            gifsBlock.innerHTML = ""
            
        })
    }) 
    // Deleting item
    
},500)

window.onload = function(){
    setInterval(function(){
        if(elements.innerHTML.trim() == ""){
            gifsBlock.innerHTML = ""
        }
    },10)
}



var limit = 25; //Limit for the requested gifs

function findGiphy(element){
        //url and options
        var url = `https://api.giphy.com/v1/gifs/search?api_key=6KuOvESdKT4Rbefuq6TzWPxquxg4NEsG&q=${element}&limit=${limit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        options = {
            method: "GET",
        }

        //fetching the data
        fetch(url,options)
            .then(response => response.json())
            .then(data => {

                gifsBlock.innerHTML = "";
                for(let i = 0; i < limit; i++){
                    gifsBlock.innerHTML += `<img class='giphy' src="https://media2.giphy.com/media/${data.data[i].id}/giphy_s.gif">`
                
                    document.querySelectorAll('img').forEach(function(item){
                        item.addEventListener('click', function(){
                            // It is the main part of my code
                            // Here i am changing static image to gif and reverse
                            if(item.getAttribute('src').includes('_s.gif')){
                                item.setAttribute('src', item.getAttribute('src').replace('_s.gif', '.gif')) // here i change to gif
                            }else if(!item.getAttribute('src').includes('_s.gif')){
                                item.setAttribute('src', item.getAttribute('src').replace('.gif', '_s.gif')) // here i change to static image
                            }
                        })
                    })
                }
            })    
}

//  Here i am adding searched element to the menu
findButton.addEventListener('click', function(){
    if(addElementPrompt.value.trim()){
        elements.innerHTML += `
        <div class = "addedMain">
            <div class = "added">
                <p>${addElementPrompt.value}</p>
            </div>
            <div class="addedX">x</div>

        </div>
        `
        // and here i am fetching result of my search
        findGiphy(addElementPrompt.value)
        addElementPrompt.value = '';
    }
    
})
