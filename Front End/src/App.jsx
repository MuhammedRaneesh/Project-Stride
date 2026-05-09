import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./Approutes"
function App() {
  return (
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


  )

}

export default App