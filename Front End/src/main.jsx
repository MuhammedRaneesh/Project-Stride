import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { Authprovider } from './Context/AuthContext.jsx'
import { CartProvider } from './Context/CartContex.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <CartProvider>
        <App />
      </CartProvider>
    </Authprovider>
  </StrictMode>,

)
