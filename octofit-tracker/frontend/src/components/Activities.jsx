import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(activitiesEndpoint).then(setActivities).catch(() => setError('Unable to load activities.')) }, [])

  return <section><h1>Activity Log</h1>{error && <p className="alert alert-danger">{error}</p>}<div className="row g-3">{activities.map((activity) => <div className="col-md-6 col-xl-4" key={activity._id ?? activity.id}><article className="activity-item p-3 h-100"><div className="d-flex justify-content-between"><strong>{activity.type}</strong><span>{activity.points ?? 0} pts</span></div><p className="mb-1 text-secondary">{activity.user?.name ?? activity.userName ?? 'Team member'}</p><small>{activity.durationMinutes ?? 0} min · {activity.calories ?? 0} cal</small></article></div>)}</div>{!error && activities.length === 0 && <p className="text-secondary">No activities found.</p>}</section>
}