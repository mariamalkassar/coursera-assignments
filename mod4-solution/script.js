// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
(function () {
    var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    for (key in names) {
        var name = names[key];
        if (name[0].toLowerCase() !== 'j') {
            helloSpeaker.speak(name);
        } else {
            byeSpeaker.speak(name);
        }
    }
})();


