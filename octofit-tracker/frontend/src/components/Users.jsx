import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch(() => setError('Unable to load users.')) }, [])

  return <section><h1>Members</h1>{error && <p className="alert alert-danger">{error}</p>}<div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Email</th><th className="text-end">Points</th></tr></thead><tbody>{users.map((user) => <tr key={user._id ?? user.id}><td>{user.name}</td><td>{user.email}</td><td className="text-end">{user.totalPoints ?? 0}</td></tr>)}</tbody></table></div>{!error && users.length === 0 && <p className="text-secondary">No members found.</p>}</section>
}