const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable-Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}
//Passing a joke to VoiceRss Api
function tellMeAJoke(joke){
    VoiceRSS.speech({
        key: 'cff37c2480764486be06167a8754f93e',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}


// Get jokes from joke API
async function getJokesFromApi(){
    let joke = '';
    const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        res = await fetch(jokeApiUrl);
        data = await res.json();

        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        //Text-to-Speech
        tellMeAJoke(joke);
        //Disable Button
        toggleButton();
    } catch(err){
        console.log(` Whoops ${err}`);
    }
}

//Event Listeners
button.addEventListener('click', ()=>{
    getJokesFromApi()
})
audioElement.addEventListener('ended', toggleButton);