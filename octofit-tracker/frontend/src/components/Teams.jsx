import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(teamsEndpoint).then(setTeams).catch(() => setError('Unable to load teams.')) }, [])

  return <section><h1>Teams</h1>{error && <p className="alert alert-danger">{error}</p>}<div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id ?? team.id}><article className="team-item p-4 h-100"><h2>{team.name}</h2><p className="text-secondary">{team.description || 'No team description yet.'}</p><span className="badge text-bg-light">{team.members?.length ?? team.memberCount ?? 0} members</span></article></div>)}</div>{!error && teams.length === 0 && <p className="text-secondary">No teams found.</p>}</section>
}