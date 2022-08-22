// criando uma função para colocar todas as outras dentro (factory)
export default function Controls({
    //pegando todas as coisas relacionadas ao controls que estão dentro das funções abaixo
    buttonPause,
    buttonPlay,
    buttonSet,
    buttonStop
}) {
  // criando uma função só para resetar os botões, já que eu usei isso 2x no meu código (quando o timer termina e quando aperto o botão Stop), então, com a função, não preciso ficar repetindo
  function reset() {
    buttonStop.classList.add('hide') // botão stop vai sumir
    buttonSet.classList.remove('hide') // botão set vai aparecer
    buttonPlay.classList.remove('hide') // botão play vai sumir
    buttonPause.classList.add('hide') // botão pause vai aparecer
  }

  function play() {
    // quando der Play:
    buttonPlay.classList.add('hide') // botão play vai sumir
    buttonPause.classList.remove('hide') // botão pause vai aparecer
    buttonSet.classList.add('hide') // botão set vai sumir
    buttonStop.classList.remove('hide') // botão stop vai aparecer
  }
  function pause() {
    // quando der Pause:
    buttonPlay.classList.remove('hide') // botão Play vai aparecer
    buttonPause.classList.add('hide') // botão Pause vai sumir
  }

  function getMinutes() { // pegar os minutos digitados no prompt
    let newMinutes = prompt('Quantos minutos?') // criando uma nova variável para receber os minutos que a pessoa vai configurar no prompt
    if (!newMinutes) {
      return false // senão tiver os minutos, retornar falso 
    } // senão
    return newMinutes // retornasr os minutos configurados 

  }

  return {
    reset,
    play,
    pause,
    getMinutes
  }
}
