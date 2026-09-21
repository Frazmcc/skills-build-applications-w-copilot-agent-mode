import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  ['users', 'Members'],
  ['activities', 'Activities'],
  ['teams', 'Teams'],
  ['leaderboard', 'Leaderboard'],
  ['workouts', 'Workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
          <div className="d-flex align-items-center gap-2 text-white fw-bold fs-4">
            <img src="/octofitapp-small.png" width="36" height="36" alt="OctoFit" />
            OctoFit Tracker
          </div>
          <nav className="nav" aria-label="Primary navigation">
            {navigation.map(([path, label]) => (
              <NavLink className="nav-link" key={path} to={`/${path}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
