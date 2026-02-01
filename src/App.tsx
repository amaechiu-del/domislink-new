import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import AppsSoftware from './pages/AppsSoftware'
import GitHubDeveloperHub from './pages/GitHubDeveloperHub'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps-software" element={<AppsSoftware />} />
        <Route path="/github-pr" element={<GitHubDeveloperHub />} />
      </Routes>
    </HashRouter>
  )
}
