const spinner = document.getElementById("spinner");
spinner.style.display = "none";
const loadPlayer = () =>{
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value;
    inputField.value = "";
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player))

}
const displayPlayer = players =>{
  // spinner condition
  if(players){ // if player is available
    spinner.style.display = "none"; // spinner off
  }
  else{
    spinner.style.display = "block"; // else spinner on
  }
    const playerContainer = document.getElementById
    ("player-container");
    playerContainer.textContent = "";
    players.forEach(player => {
        const div = document.createElement("div");
        div.className = "col-lg-6";
        
        div.innerHTML = `
        <div class="card my-3 w-100">
              <div>
                <img src="${player.strThumb}" class="card-img-top" alt="..."/>
              </div>
              <div class="card-body">
                <h4 class="card-title">Name:${player.strPlayer}</h4>
                <h6 class="card-title">Country: ${player.strNationality}</h6>
                <p class="card-text"></p>
                <div class="button-group">
                  <button  class="btn btn-danger">Delete</button>
                  <button onclick="playerDetails('${player.idPlayer}')"class="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
        `
        playerContainer.appendChild(div);

        // console.log(player.idPlayer);
       
    })
}
// player detail by player id
const playerDetails = details =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayerDetails(data.players[0]))
}

const displayPlayerDetails = details =>{
  const detailsContainer = document.getElementById("details-container");
//  player exit condition ( male/ female)
  console.log(details);
  if(details.strGender == "Male"){
    document.getElementById("male").style.display = "block";
    document.getElementById("female").style.display = "none";
  }
  else{
    document.getElementById("male").style.display = "none";
    document.getElementById("female").style.display = "block";
  }
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mt-4 w-100">
  <img src="${details.strThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${details.strPlayer}</h5>
    <p class="card-text">${details.strDescriptionEN.slice(0, 200)}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  `
  detailsContainer.appendChild(div);


}
// 

 