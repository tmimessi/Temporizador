import Sounds from "./sounds.js"

// criando uma função para colocar todas as outras dentro (factory)
export default function Timer({
  //pegando todas as coisas relacionadas ao timer que estão dentro das funções abaixo
  minutesDisplay,
  secondsDisplay,
  resetControls
}) {
  let timerTimeout // criando essa variável para parar o timer quando apertar o botão stop, colocando aqui pois só estou usando ela dentro do timer, não estou utilizando como dependência em outro lugar

  let minutes = Number(minutesDisplay.textContent) // criando essa variável aqui pois ela será utilizada na função do play E na função do set (aproveitei o secondsDisplay que já foi declarado pra não ter que fazer do mesmo jeito que foi feito nele e transformei pra número.)


  // tb está sendo usado muito a atualização do display e da configuração de aparecer o 0 na frente, então, criando uma função só para isso:
  function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes // se a pessoa tiver clicado em cancelar no prompt, vai dar undefined, então, vai exibir os minutos setados no index.html, senão, vai exibir o que ela configurou no prompt
    seconds = seconds === undefined ? 0 : seconds // mesma lógica acima dos minutos
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }

  function reset() {
    updateDisplay(minutes, 0) // ao resetar, exibir o minutos que foram configurados no prompt e 0 segundos
    clearTimeout(timerTimeout) // parando o timer
  }

  function countdown() {
    // 1000 = 1 segundo - ou seja, a cada 1 segundo, a função anterior será executada
    // recebendo o setTimeout na variável criada para usá-la depois
    timerTimeout = setTimeout(function () {
      let seconds = Number(secondsDisplay.textContent) // transformando os segundos na tela em número pra usar no if
      let minutes = Number(minutesDisplay.textContent) // transformando os minutos na tela em número pra usar no if

      updateDisplay(minutes, 0) // colocando essa função aqui também para que os segundos terminem em 0 e não em 01 como estava antes

      if (minutes <= 0 && seconds <= 0) {
        // se os minutos e os segundos chegarem em 0 é pq o timer acabou
        // voltando os botões pra configuração inicial (reset)
        resetControls()
        updateDisplay() // atualizando o display conforme a lógica dessa função, que é exibindo os minutos que a pessoa configurou inicialmente.
        Sounds().timeEnd()
        return // acabou o timer, então não preciso executar mais nada pra baixo daqui
      }
      if (seconds <= 0) {
        // se os segundos chegarem em 0, atribuir 60 pra começar de novo e decrementar os minutos também
        seconds = 60
        --minutes
      }

      // chamando essa função para colocar o 0 na frente de números menores que 10
      updateDisplay(minutes, String(seconds - 1))

      // chamando a função dentro dela mesma para que os segundos fiquem decrementando:
      countdown()
    }, 1000)
  }

  // criando a função updateMinutes pois em nenhum momento o timer estava sendo atualziado para o número que a pessoa configurou, estava exibindo o que estava configurado no index.html
  function updateMinutes(newMinutes) {
    minutes = newMinutes
  }

  function hold() {
    // parando a contagem
    clearTimeout(timerTimeout)
  }

  return {
    // jogando essas duas funções pra fora
    countdown,
    reset,
    updateDisplay,
    updateMinutes,
    hold
  }
}
