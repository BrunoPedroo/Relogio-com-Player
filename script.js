function carregar(){
    
   setInterval(carregar, 1000);

    const msg = document.getElementById('msg')
    const img = document.getElementById('imagem')
    const bom = document.getElementById('bom')
    const emoji = document.getElementById('emoji')
    let data = new Date()
    let hora = data.getHours().toString().padStart(2, '0');
    let min = data.getMinutes().toString().padStart(2, '0');
    let sec = data.getSeconds().toString().padStart(2, '0');
    let dia = data.getDate()
    let mes =data.getMonth().toString().padStart(2, '0');
    let ano = data.getFullYear()

    msg.innerHTML =`Agora são ${hora}:${min}:${sec} <br> Dia ${dia}/${mes}/${ano}`

    if (hora >=0 && hora < 12) {
    //Bom Dia!
        img.src="img/img manha.webp"
        document.body.style.background = '#e2cd9f'
        bom.innerHTML =`Bom dia!`
        emoji.innerHTML = `Hora do Dia ☀️`

    }  
    else if(hora >= 12 && hora < 18) {
    //Boa Tarde!
        img.src="img/img tarde.webp"
        document.body.style.background = '#b9846f'
        bom.innerHTML =`Boa Tarde!`
        emoji.innerHTML = `Hora do Dia 🌇`
    }
   else{
    //boa Noite!
        img.src="img/img noite.jpeg"
        document.body.style.background = '#044283'
        bom.innerHTML =`Boa Noite!`
        emoji.innerHTML = `Hora do Dia 🌙`
    }
}
//Área do player de musica 
let currentIndex = 0;
let playlist = [];

async function carregarPlaylist() {
  const resposta = await fetch('https://api.jsonbin.io/v3/b/680b28128561e97a50071e0f', {
    headers: {
      'X-Master-Key': '$2a$10$z15tjUTalwwQ0uxWYrdyL.8sf46RTmeYQCQ/G7BaA4iYFf0nPHsfO'
    }
  });
  const dados = await resposta.json();
  playlist = dados.record;
  carregarMusica(currentIndex);
}

function carregarMusica(index) {
  const musica = playlist[index];
  document.getElementById('player').src = musica.file;
  document.getElementById('musicName').textContent = musica.name;
}

document.getElementById('playPauseButton').addEventListener('click', () => {
  const player = document.getElementById('player');
  if (player.paused) {
    player.play();
    playPauseButton.innerHTML = "<i class='bx bx-pause'></i>";
  } else {
    player.pause();
    playPauseButton.innerHTML = "<i class='bx bx-caret-right'></i>";
  }
});

document.getElementById('nextButton').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  carregarMusica(currentIndex);
  document.getElementById('player').play();
});

document.getElementById('prevButton').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  carregarMusica(currentIndex);
  document.getElementById('player').play();
});

carregarPlaylist();