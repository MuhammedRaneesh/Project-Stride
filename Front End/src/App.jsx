import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import AppRoutes from "./Approutes"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick
        />
      </div>
    </MotionConfig>
  )
}

export default App