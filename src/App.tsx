import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Tweets';
import { QueryClient, QueryClientProvider } from 'react-query'
import Tweets from './components/Tweets';
 
 const queryClient = new QueryClient()

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: "center"
    }}>
      <QueryClientProvider client={queryClient}>
        <Tweets/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
