import Deck from './components/Deck'
import Presenter from './components/Presenter'
import './styles/presenter.css'

/**
 * Sem router. A raiz do site é a apresentação antiga (`public/index.html`),
 * servida como arquivo estático; este app responde em duas portas:
 *
 *   /telao        → o telão, projetado
 *   /apresentador → a janela de controle (reescrita da Vercel para cá)
 *
 * `?apresentador` faz o mesmo e não depende de reescrita, então a janela de
 * controle também abre em `npm run dev` e no `preview`.
 */
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  const presenting =
    path.endsWith('/apresentador') || new URLSearchParams(window.location.search).has('apresentador')
  return presenting ? <Presenter /> : <Deck />
}
