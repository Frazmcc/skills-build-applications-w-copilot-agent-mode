import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch(() => setError('Unable to load leaderboard.')) }, [])

  return <section><h1>Leaderboard</h1>{error && <p className="alert alert-danger">{error}</p>}<ol className="leaderboard list-group list-group-numbered">{entries.map((entry, index) => <li className="list-group-item d-flex justify-content-between align-items-center" key={entry._id ?? entry.id ?? index}><span>{entry.user?.name ?? entry.name ?? 'Team member'}</span><strong>{entry.points ?? entry.totalPoints ?? 0} pts</strong></li>)}</ol>{!error && entries.length === 0 && <p className="text-secondary">No leaderboard entries found.</p>}</section>
}