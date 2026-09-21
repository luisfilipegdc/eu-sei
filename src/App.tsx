import Deck from './components/Deck'
import Presenter from './components/Presenter'
import './styles/presenter.css'

/**
 * Duas rotas, sem router: `/` é o telão (tela 2, projetada) e `/apresentador`
 * é a janela de controle (tela 1). A Vercel reescreve tudo para index.html.
 */
export default function App() {
  const presenting = window.location.pathname.replace(/\/+$/, '') === '/apresentador'
  return presenting ? <Presenter /> : <Deck />
}
