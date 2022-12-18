import { Routes } from 'react-router-dom'
import { Route } from 'react-router';
import Home from './component/routes/home/home.component';
import Navigation from './component/navigation/navigation.component'
import Shop from './component/routes/Shop/shop.component'
import Authentication from './component/routes/authentication/authentication.component';
import Checkout from './component/routes/checkout/checkout.component';


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='Shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  )

}

export default App;
//job