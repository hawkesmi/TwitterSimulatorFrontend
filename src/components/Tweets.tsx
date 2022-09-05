import React, {useState} from 'react';
import '../App.css';
import { useQuery } from 'react-query'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import fetchTweets from '../api/fetchTweets';
import FetchingSpinnner from './FetchingSpinner';
import TweetFooter from './TweetFooter';
  

function Tweets() {
  const [username, setUsername] = useState<string>('')

  const {
    isLoading,
    isError,
    data,
    error,
    refetch,
    isFetching 
  } = useQuery('fetchTweets', () => fetchTweets(username), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) { event.preventDefault() }
    if (isFetching) { return }
    refetch()
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Search username"
          variant="outlined"
          style={{width: "800px"}}
          value={username}
          onChange={handleUsernameChange}
        />
      </form>
      <br/>
      <div>
        {!isFetching && data ? (
          <ul style={{borderBottom: "1px solid grey", borderLeft: "1px solid grey", borderRight: "1px solid grey"}}>
            {data.message.map((tweet, index) => (
                <li style={{borderTop: "1px solid grey", padding: "10px", width:"800px", position: "relative", textAlign: "left"}} key={index}>
                  <Grid container spacing={0}>
                    <Grid item xs={1}>
                      <img style={{borderRadius: "50%", width: "80%", display: "inline"}} src={data.details.profile_image_url}/>
                    </Grid>
                    <Grid item xs={11}>
                      <span style={{fontWeight: "bold"}}>{data.details.name}&nbsp;</span>
                      <span style={{}}>@{username}&nbsp;·&nbsp;7h</span><br/>
                      <span style={{}}>{tweet}</span><br/>
                      <TweetFooter/>
                    </Grid>
                  </Grid>
                  <p style={{position: "absolute", bottom: "0", right: "0"}}>er</p>
                </li>
            ))}
          </ul>
        ) : (
          isError && <span>Error: {error instanceof Error && error.message}</span>
        )}
        <div>{isFetching ? <FetchingSpinnner/> : null}</div>
      </div>
    </div>
  );
}

export default Tweets;
