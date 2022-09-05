import {TWEETS_API_URL} from '../constants'

interface Details {
    id: string,
    name: string,
    profile_image_url: string
}

interface Response {
    details: Details
    message: string[]
}

async function fetchTweets(username: string): Promise<Response> {
    if (!username) {
        username = 'WhiteHouse' // for testing
    }

    const response = await fetch(TWEETS_API_URL + "?username=" + username + "&num_tweets=5")
    
    const data = await response.text()

    console.log(data)

    return JSON.parse(data)
}

export default fetchTweets;