//Variables (letters and suffix arrays)
var letters = [["a", "e", "i", "o", "u"],
 ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]];
var suffix = ["land", "ia", "istan", "mark"];

//Functions
function randomic(max){
    return Math.floor((Math.random()*max));
}

function format(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function newConsonant(){
    return letters[1][randomic(21)];
}

function newVowel(name){
    vowel = letters[0][randomic(5)];
    if(name[name.length-1] != vowel || name.length == 0){
        return vowel;
    }else{
        var newOne;
        do{
            newOne = letters[0][randomic(5)];
        }while(newOne == name[name.length-1]);
        console.log("newOne: ("+name+")"+newOne);
        return newOne;
    }
}

function oneSyllable(name){
    return newVowel(name);
}

function twoSyllable(name){
    var vowel = newVowel(name);
    console.log("TwoSyllable: generated vowel ("+name+")'"+vowel+"'");
    var selector = randomic(7);
    console.log("TwoSyllable: selector equals "+selector);
    switch(selector){
        case 0: case 1: case 2: return vowel + newConsonant(); 
        case 3: case 4: case 5: return newConsonant() + vowel;
        case 6: return vowel + newVowel(vowel); //generates another vowel
        default: console.log("TwoSyllable: DEFAULT (this shouldn't have happend)");
    }
}

function threeSyllable(name){ //expand cases as developing
    return newConsonant()+newVowel(name)+newConsonant();
}

function generateName(){
    console.log("GenerateName: New name generation starting");
    var name = "";
    var syllables = [];
    for(var j = 0; j <= randomic(4)+2; j++){
        syllables[j] = randomic(3)+1; //INCREASE as developing
        switch(syllables[j]){
            case 1:
                name += oneSyllable(name);
                console.log("OneSyllable: ("+name.substring(0, name.length)+")"+name[name.length-1]);
                break;
            case 2:
                name += twoSyllable(name);
                console.log("TwoSyllable: ("+name.substring(0, name.length-3)+")"+name.substring(name.length-2));
                break;
            case 3:
                name += threeSyllable(name);
                console.log("ThreeSyllable: ("+name.substring(0, name.length-4)+")"+name.substring(name.length-2));
            default:
                break;
        }
        //name+="-";
    }
    if(randomic(2) == 1 || syllables.length == 1){
        var selectedSuffix = suffix[randomic(suffix.length)];
        console.log("Suffix: generated suffix for "+name);
        console.log("Suffix: "+selectedSuffix);
        if(name[name.length-1] == selectedSuffix[0]){
            console.log("Suffix: "+name[name.length-1] +"=="+ selectedSuffix[0]);
            selectedSuffix = selectedSuffix.substring(1, selectedSuffix.length-1);
            console.log(selectedSuffix.substring(1, selectedSuffix.length-1));
        }
        name += selectedSuffix;
    }
    console.log(syllables);
    return format(name);
}

function listNames(limit){
    var list = []
    document.getElementById("list_generated").innerHTML = "";
    for(var i = 0; i < limit; i++){
        name = generateName();
        document.getElementById("list_generated").innerHTML += '<li class="country">'+name+'</li>';
        list[i] = name;
    }
    return list;
}

//JQuery
$(function(){
    var list = listNames(10);
    $("#generate").click(function(){
        list = listNames(10);
        console.log(list);
    });
    $(".country").click(function(){ // does not work properly
        console.log("SaveName: Going to save the name");
        var index = $(".country").index(this);
        console.log("SaveName: Name saved");
        document.getElementById("list_saved").innerHTML += '<li>'+list[index]+'</li>';

    })
});
