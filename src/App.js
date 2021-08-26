import { createTheme, ThemeProvider } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import { IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import firebase from './firebase/firebase';
import useLocalStorage from './hooks/useLocalStorage';
import AccountPage from './pages/Account/AccountPage';
import AdminPage from './pages/Admin/AdminPage';
import Checkout from './pages/Checkout/CheckoutPage';
import Homepage from './pages/Homepage/Homepage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';
import ProductsPage from './pages/Products/ProductsPage';
import { fetchUser } from './store/auth-actions';
import { uiActions } from './store/ui-slice';

const theme = createTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: { main: green["A100"] },
    default: {
      main: '#376a99',
      contrastText: '#d0e4f7'
    }
  }
})

function App() {
  const dispatch = useDispatch()
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart', { products: [], total: 0 })
  // const currentUser = useSelector(state => state.auth.user)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(fetchUser(user.uid))
    } else {
      dispatch(uiActions.setUserFetching(false))
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale="vi" defaultLocale="vi">
        <div className="App">
          <Switch>
            {/* {(auth.isAuth && auth.user.role === "admin") && <Route path='/admin' render={() => <AdminPage />} />} */}
            <Route path='/admin' render={() => <AdminPage />} />
            <Route path='/products/:id' render={() =>
              <ProductDetailsPage
                localStorageCart={localStorageCart}
                setLocalStorageCart={setLocalStorageCart}
              />} />
            <Route path='/products' render={() =>
              <ProductsPage
                localStorageCart={localStorageCart}
                setLocalStorageCart={setLocalStorageCart}
              />} />
            <Route path='/checkout' render={() =>
              <Checkout
                localStorageCart={localStorageCart}
                setLocalStorageCart={setLocalStorageCart} />} />
            {/* {auth.isAuth && <Route path='/account' render={() => <AccountPage />} />} */}
            <Route path='/account' render={() => <AccountPage />} />
            <Route path='/' render={() => <Homepage
              localStorageCart={localStorageCart}
              setLocalStorageCart={setLocalStorageCart} />} />
          </Switch>
          {/* </Route> */}
        </div>
      </IntlProvider>
    </ThemeProvider >
  );
}

export default App;
