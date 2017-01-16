/**
 * Created by maximvlasenko on 01/16/17.
 */


const words = [
    'spacejump',
    'apples',
    'graphics',
    'javascript',
    'peaches'
];
// length: 6 = only use words with 6 chars
// length: [6,8] = only use words with between 6 and 8 chars
// upper_case = first means football -> Football
// upper_case = last means football -> footbalL
// strip = vowels means football -> ftbll
// strip = consonants means football -> ooa
const configs = [{
        upper_case:'first',
        length:[6,8]
    },
    {
        upper_case:'last',
        strip:'vowels',
        length:[6,8]
    },{
        upper_case:'first',
        length:[7,10],
        strip:'vowels'
    },{
        length:[7,9],
        strip:'consonants'
}];

String.prototype.last = function(){
    return this.substring(0, this.length - 1) +
        this.substring(this.length - 1, this.length).toUpperCase();
}

String.prototype.first = function(){
    return this.substring(0, 1).toUpperCase() +
        this.substring(1, this.length );
}

String.prototype.consonants = function(){
    let word = [];
    for (var i = 0; i < this.length; i++)  {
        if(this[i].vowels().length == 0){
            word.push(this[i]);
        }
    }
    return word.join('');
}

String.prototype.vowels = function(){
    return this.replace(/[aeiou]/ig,'');
}


Array.prototype.transformation = function(config){
    if (typeof config != 'object' && config.isArray()) {
        console.log ('You should use configuration to transform array of words');
        return;
    }
    //console.log(this);
    let result = [];
    this.config = config;
    for (var i = 0; i < this.length; i++){
        result[i] = [];
        for(var j = 0; j < this.config.length; j++){
            let wordTransform = '';
            wordTransform = this.manageData(this[i], this.config[j]);
            result[i].push(wordTransform);
        }
    }
    return result;
}

Array.prototype.manageData = function(word, config) {
    let wordData = word;
    if ((typeof config.length == 'number' && word.length == config.length) ||
        (typeof config.length == 'object' &&
        (word.length >= config.length[0] && word.length <= config.length[1]))
    ) {

        if (typeof config.strip != 'undefined')
            wordData = wordData[config.strip]();

        if (typeof config.upper_case != 'undefined')
            wordData = wordData[config.upper_case]()

    }
    return wordData;
}


console.log(words.transformation(configs));
