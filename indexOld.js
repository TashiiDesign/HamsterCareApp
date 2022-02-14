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

        if (floorspace >= recSize) {
            console.log('Great')
        }
        else if (floorspace > minSize && floorspace < recSize){
            console.log('Upgrade asap')
        }
        else {
            console.log('Below Minimum')
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


    }

}


    
    const submit = document.querySelector('.submit')

    submit.addEventListener('click', () => {

        selectedSpecies = document.querySelector('input[name="hamsterSpecies"]:checked').value;
        length = document.querySelector('.length').value;
        width = document.querySelector('.width').value;

        if(!selectedSpecies || !length || !width) {
            console.log('Please enter a Value')
            
        } else {

        const newHamster = new Hamster(selectedSpecies, length, width);
        console.log(newHamster)
        const cageFloorspace = newHamster.calcFloorspace();
        console.log(cageFloorspace)
        console.log(`Species: ${selectedSpecies} Floorspace: ${cageFloorspace}`)
        newHamster.getSelectedToys();
        
        }

        
    })



