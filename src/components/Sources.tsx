import { sources } from '../slides/sources'

type Props = {
  /** id da fonte aberta, ou null quando está no menu das seis */
  open: string | null
  onOpen: (id: string) => void
  /** notas do apresentador ligadas (tecla N): mostra o pouso */
  notes: boolean
}

export default function Sources({ open, onOpen, notes }: Props) {
  const current = open ? sources.find((s) => s.id === open) : undefined

  if (current) {
    return (
      <aside className="overlay overlay--source">
        <p className="label">{current.kind}</p>
        <p className="line source__lead">{current.lead}</p>
        <p className="source__follow">{current.follow}</p>
        <p className="source__basta">Isso basta?</p>
        {notes ? <p className="source__pouso">{current.pouso}</p> : null}
      </aside>
    )
  }

  return (
    <aside className="overlay overlay--sources">
      <p className="ftitle">De onde veio isso que você sabe?</p>
      <div className="fgrid">
        {sources.map((s) => (
          <button key={s.id} type="button" className="fb" onClick={() => onOpen(s.id)}>
            <b>{s.title}</b>
            <span>{s.kind}</span>
          </button>
        ))}
      </div>
      <p className="fhint">clique em uma · Esc volta para a linha</p>
      <p className="help">
        → avança · ← volta · F tela cheia · T cronômetro · N notas · B fontes · Home reinicia
      </p>
    </aside>
  )
}
