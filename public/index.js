let section1 = document.querySelector('.section1')
let section2 = document.querySelector('.section2')
let section3 = document.querySelector('.section3')
let section4 = document.querySelector('.section4')
let resultsText = document.querySelector('.resultsText')
let resultsP1 = document.createElement('p')
let resultsP2 = document.createElement('p')
let ul = document.querySelector('.ul')
let ol = document.querySelector('.ol')
let valid;
const submit = document.querySelector('.submit')



//Toys
let wheel = document.getElementById('wheel')
let saucer = document.getElementById('saucer')
let substrate = document.getElementById('substrate')
let chews = document.getElementById('chews')
let tunnels = document.getElementById('tunnels')
let houses = document.getElementById('houses')
let sandbox = document.getElementById('sandbox')
let corklog = document.getElementById('corklog')
let sprays = document.getElementById('sprays')
let herbs = document.getElementById('herbs')

//helper function to limit how many times a function can be invoked
const debounce = (func) => { 
    let timeoutId
    //stops func from being invoked until certain amt of time is passed
    return(...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            //auto keep track of number of arguments
            func.apply(null, args);
        }, 500)
    }
}

inputValidation();

//Need to figure out how to check whether both inputs have values
const onInput = debounce(event => {
    const value = event.target.value

    inputValidation(value);
});

const inputs = document.querySelectorAll('.input')
inputs.forEach(input => {
    input.addEventListener('input', onInput);
})




function inputValidation(value) {
    let errorMessage = document.querySelector(".errorMessage")
    valid = false;

    if(!value) {
        console.log('disabled')
        valid = false
        errorMessage.classList.add('help', 'is-danger')
        errorMessage.classList.remove('displayNone')
        submit.classList.add('disabled')
        
    }else{
        console.log('enabled')
        errorMessage.classList.add('displayNone')
        valid = true
        submit.classList.remove('disabled')
    }
}
class Hamster {
    constructor(selectedSpecies, length, width, selectedToys = []) {
        
        this.selectedSpecies = selectedSpecies;
        this.width = width;
        this.length = length
        this.selectedToys = selectedToys

    }

    calcFloorspace() {
        const { width, length } = this;
        const minSize = 450;
        const recSize = minSize+200;
        const floorspace = Math.round((width * length) / 6.45);

        resultsText.appendChild(resultsP1)

        if (floorspace >= recSize) {
            resultsP1.innerText = `Good size`
            
        }

        else if (floorspace > minSize && floorspace < recSize) {

            resultsP1.innerText = `Your size is above the minimum but should be upgraded to ${recSize} or above`

        }

        else {

            resultsP1.innerText = `Unfortunately, your enclosure does not meet the minimum size and should be upgraded immediately.`
        }



        return `${floorspace} Sq Inches`
    }

    

    getSelectedToys() {
        let { selectedToys } = this;
        const checked =  document.querySelectorAll('input[type=checkbox]:checked')


        for (var i = 0; i < checked.length; i++) {
            selectedToys.push(checked[i].value)
            console.log(selectedToys[i]) 

        }

        if (selectedToys.length === 0) {
            let li = document.createElement('li')
            li.innerText = `You did not select any toys`
            ul.appendChild(li)

       } else {

        selectedToys.forEach(function(item) {
            let li = document.createElement('li')
            let text = document.createTextNode(item)
            ul.appendChild(li)
            li.appendChild(text)

            })
        }


        if (selectedToys.indexOf("Wheel") === -1 && selectedToys.indexOf('Flying Saucer') === -1) {
            let li = document.createElement('li')
            li.innerText = `All hamsters must have access to a Wheel. Please add a suitably sized one immediately`
            ol.appendChild(li)
        }
       
        if (selectedToys.indexOf("Flying Saucer") == 0 && selectedToys.indexOf('Wheel' === -1)) {

            let li = document.createElement('li')
            li.innerText = `Unfortunately, a Flying Saucer is not a replacement for a standing Wheel. Please add a suitably sized one immediately `
            ol.appendChild(li)

        }

        if (selectedToys.indexOf("Houses/Hides") === -1) {
            let li = document.createElement('li')
            li.innerText = `All enclosures must include some kind of house/private area for hamsters to feel safe. Please provide a suitably sized one immediately. Multi-chamber wooden houses are a good option!`
            ol.appendChild(li)
        }

        if (selectedToys.indexOf("Sandbox") === -1) {
            let li = document.createElement('li')
            li.innerText = `It is now recommended that all enclosures include a Sandbox. This is because most hamsters use the sand as a way to remove excess oils and clean themselves (NEVER BATHE OR WASH YOUR HAMSTER!) `
            ol.appendChild(li)
        }

        if(selectedToys.indexOf('Herbs') === -1 && selectedToys.indexOf('Sprays') === -1) {
            let li = document.createElement('li')
            li.innerText = `Foraging is an important part of a hamsters routine. Safe herbs, flowers and sprays should be added throughout the enclosure to mimic the wild`
            ol.appendChild(li)

        }

        if (selectedToys.length <= 4) {
            let li = document.createElement('li')
            li.innerText = `For your hamster to carry out it's natural instincts and thrive, please consider adding more of the enrichment options above`
            ol.appendChild(li)
        }

    }

}


  



    submit.addEventListener('click', () => {

        selectedSpecies = document.querySelector('input[name="hamsterSpecies"]:checked');
        length = document.querySelector('.length').value;
        width = document.querySelector('.width').value;

        if(!selectedSpecies) {
            console.log('you have not selected a species')
            alert('You have not selected a species of hamster')

        } else if (!valid){
            alert('You did not add your cage width and length')
        }

        else {
        section4.classList.remove("displayNone");
        section1.classList.add("displayNone");
        section2.classList.add("displayNone");
        section3.classList.add("displayNone");



        const newHamster = new Hamster(selectedSpecies.value, length, width);
        console.log(newHamster)
        const cageFloorspace = newHamster.calcFloorspace();
        console.log(cageFloorspace)
        console.log(`Species: ${selectedSpecies.value} Floorspace: ${cageFloorspace}`)
        newHamster.getSelectedToys();

        const yourFloorspace = document.querySelector('.yourFloorspace')
        yourFloorspace.innerText = `${cageFloorspace}`
        
        
        if(selectedSpecies == 'Syrian') {
            resultsText.appendChild(resultsP2)
            resultsP2.innerText = `As your hamster is a ${selectedSpecies.value}, it is recommended that the biggest possible enclosure be provided.`
            
        }
      


        }
    })

    const redo = document.querySelector('.redo')

    redo.addEventListener('click', () => {
        window.location.reload();
    })



