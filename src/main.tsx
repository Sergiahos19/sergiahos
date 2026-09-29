import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { pageBackground } from './data/profile'
import './styles/index.css'
document.documentElement.style.setProperty('--page-background-image', `url("${pageBackground}")`)
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>)
