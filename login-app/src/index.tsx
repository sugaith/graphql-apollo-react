import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './components/App'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { store } from './Store'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert('Error:  ' + message)
    })
  }
  if (networkError) {
    alert('NetworkError:  ' + networkError.message)
  }
})

const authLink = setContext((_, { headers }) => {
  const { getState } = store
  const { userInfo } = getState()
  return {
    headers: {
      ...headers,
      authorization: userInfo.token ? `Bearer ${userInfo.token}` : '',
    },
  }
})

const httpLink = from([
  errorLink,
  new HttpLink({ uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql' }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)

reportWebVitals()
