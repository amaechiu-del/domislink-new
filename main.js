// main.js
import './style.css'

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <section style="text-align:center; padding:3rem; font-family:Inter, sans-serif;">
      <h1 style="font-size:2.5rem; color:#2c3e50;">Welcome to Domislink</h1>
      <p style="font-size:1.1rem; color:#555;">Your website is live and running on Vite + JavaScript.</p>
      <button id="actionBtn" style="margin-top:1.5rem; padding:10px 24px; background:#0078ff; color:white; border:none; border-radius:8px; cursor:pointer;">
        Click Me
      </button>
    </section>
  `

  document.querySelector('#actionBtn').addEventListener('click', () => {
    alert('Domislink system is active ✅')
  })
})
