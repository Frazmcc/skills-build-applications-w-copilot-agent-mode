import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch(() => setError('Unable to load workouts.')) }, [])

  return <section><h1>Workout Library</h1>{error && <p className="alert alert-danger">{error}</p>}<div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id ?? workout.id}><article className="workout-item p-4 h-100"><span className="badge text-bg-success mb-3">{workout.level}</span><h2>{workout.title}</h2><p className="text-secondary">{workout.description}</p><small>{workout.durationMinutes ?? 0} minutes</small></article></div>)}</div>{!error && workouts.length === 0 && <p className="text-secondary">No workouts found.</p>}</section>
}