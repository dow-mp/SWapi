const beingsURL = "https://swapi.dev/api/people";

async function getStarWarsData() {
    const response1 = await fetch(beingsURL);
    const peopleData = await response1.json();
    const people = peopleData.results;
    
    const nameFields = Array.from(document.querySelectorAll(".name"));
    const heightFields = Array.from(document.querySelectorAll(".height"));
    const massFields = Array.from(document.querySelectorAll(".mass"));
    const planetFields = Array.from(document.querySelectorAll(".planet"));
    
    // loop through array of people.name to insert each index into a subsequent nameField
    for (let i=0; i<people.length; i++) {
        nameFields[i].textContent = people[i].name;
        heightFields[i].textContent = people[i].height;
        massFields[i].textContent = people[i].mass;

        // fetch planet data directly from the first data set (because planet property links to another api url)
        const response2 = await fetch(people[i].homeworld);
        const planetData = await response2.json();
        const planet = planetData.name;
        planetFields[i].textContent = planet;
        
        
        const filmURLArr = people[i].films;
        // loop through array of film URLs to pull titles and add to page as list items
        for (let f=0; f<filmURLArr.length; f++) {
            async function retrieveFilm() {
                const response = await fetch(filmURLArr[f]);
                const filmInfo = await response.json();
                const filmTitle = filmInfo.title;
                const textNode = document.createTextNode(filmTitle);
                const li = document.createElement("li");
                li.appendChild(textNode);
                const ul = document.querySelector(".films"+i+" ul");
                ul.appendChild(li);
            };
            retrieveFilm();
        }
    }
};

getStarWarsData();
