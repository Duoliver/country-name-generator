var letters = [["a", "e", "i", "o", "u"],
 ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]];
 var suffix = ["land", "ia", "istan", "mark"];

 
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

function generateName(){
    var name = "";
    var syllables = [];
    for(var j = 0; j <= randomic(4)+2; j++){
        syllables[j] = randomic(2)+1; //INCREASE as developing
        switch(syllables[j]){
            case 1:
                name += oneSyllable(name);
                console.log("OneSyllable: ("+name.substring(0, name.length)+")"+name[name.length-1]);
                break;
            case 2:
                name += twoSyllable(name);
                console.log("TwoSyllable: ("+name.substring(0, name.length-2)+")"+name.substring(name.length-2));
                break;
            default:
                break;
        }
        //name+="-";
    }
    if(randomic(2) == 1){
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
    var list = ""
    for(var i = 0; i < limit; i++){
        list += "<li>"+generateName()+"</li> ";
    }
    document.getElementById("lista").innerHTML = list;
}
/*
$("#generate").click(function(){
    
});
*/
$(function(){
    listNames(10);
    $("#generate").click(function(){
        listNames(10);
    });
});


/*
function generateName(){
    for(var i = 0; i < 10; i++){ //generates ten words
        var name = "";
        for(var j = 0; j <= randomic(6); j++){ //number of syllables
            for(var k = 0; k <= randomic(6); k++){ //letters (syllable size)
                var selector = randomic(2);
                name += letters[selector][selector == 0 ? randomic(5) : randomic(21)];
        }
        if(randomic(2) == 1){
            name += suffix[randomic(suffix.length)];
        }
        return format(name);
    }
}
*/
