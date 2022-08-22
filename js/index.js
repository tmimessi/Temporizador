import Controls from './controls.js'
import Timer from './timer.js'
import Sounds from './sounds.js'
// tirando de dentro do elements cada elemento que vou precisar, que são todos que estão lá
import {
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonSoundOff,
  buttonSoundOn,
  buttonStop,
  minutesDisplay,
  secondsDisplay
} from './elements.js'

// não tem dependências no Sounds mas atribundi assim para poder colocar os sons nos botões - função construtora
const sound = Sounds()

// fazendo a injeção de dependências do controls aqui e jogando dentro da variável controls e depois substituindo ela aonde está sendo utilizado as dependências aqui
const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})
// fazendo a injeção de dependências do timer aqui e jogando dentro da variável timer e depois substituindo ela aonde está sendo utilizado as dependências aqui
const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.reset // para não dar erro de resetControls não está definido, foi atribuido o controls.reset mas sem executar pois lá dentro já está sendo executado
})

buttonPlay.addEventListener('click', function () {
  // chamando a configuração do play que tá dentro lá do controls.js
  controls.play()
  // depois que for configurado os minutos desejados, ao clicar em play, preciso que vá decrementando, então eu chamo a função countdown
  timer.countdown()
  // adicionando o som no botão
  sound.pressButton()
})

buttonPause.addEventListener('click', function () {
  // chamando a configuração do pause que tá dentro lá do controls.js
  controls.pause()
  // parando a contagem
  timer.hold()
  // adicionando o som no botão
  sound.pressButton()
})

// não preciso que o botão stop mude algo (volte para o set)

buttonStop.addEventListener('click', function () {
  // quando der Stop - chamando a configuração do reset que tá dentro lá do controls.js
  controls.reset()
  // resetando o timer chamando essa configuração que tá dentro do timer.js
  timer.reset()
  // adicionando o som no botão
  sound.pressButton()
})

// o botão set vai receber outra lógica
buttonSet.addEventListener('click', function () {
  let newMinutes = controls.getMinutes() // pegando o getMinutes do controls.js
  if (!newMinutes) {
    // se a pessoa apertar em cancelar o prompt, vai resetar o timer
    timer.reset()
    return
  } // senão

  timer.updateDisplay(newMinutes, 0) // atualizando o display, usando a função updateDisplay dentro do timer.js
  timer.updateMinutes(newMinutes) // atualizando os minutos
})

buttonSoundOn.addEventListener('click', function () {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  //removendo o som
  sound.bgAudio.pause()
})

buttonSoundOff.addEventListener('click', function () {
  buttonSoundOff.classList.add('hide')
  buttonSoundOn.classList.remove('hide')
    //adicionando o som
    sound.bgAudio.play()
})
