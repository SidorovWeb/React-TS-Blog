import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const container = document.getElementById('App') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
