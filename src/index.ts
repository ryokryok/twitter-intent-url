const BASE_URL = 'https://twitter.com/intent'

export interface TweetOption {
  shareUrl: string
  hashtags: string | string[]
  via: string
  replyTweet: string // tweet id
}

// screen name or user id
export type Account = string | { userId: string }

const defaultOption: TweetOption = {
  shareUrl: '',
  hashtags: '',
  via: '',
  replyTweet: '',
}

export const tweetUrl = (
  text?: string,
  option?: Partial<TweetOption>,
): string => {
  const tweetOption: TweetOption = { ...defaultOption, ...option }
  const url = new URL(`${BASE_URL}/tweet`)
  const { shareUrl, hashtags, via, replyTweet } = tweetOption
  const params = url.searchParams
  text && params.set('text', text)
  shareUrl && params.set('url', shareUrl)
  if (hashtags) {
    if (Array.isArray(hashtags))
      params.set('hashtags', hashtags.join(','))
    else
      params.set('hashtags', hashtags)
  }
  via && params.set('via', via)
  replyTweet && params.set('in_reply_to', replyTweet)

  return url.href
}

export const followUrl = (account: Account): string => {
  const url = new URL(`${BASE_URL}/follow`)
  // prefer user_id over screen_name.
  // bacause user_id is immutable.
  if (typeof account !== 'string')
    url.searchParams.set('user_id', `${account.userId}`)
  else
    url.searchParams.set('screen_name', `${account}`)

  return url.href
}

export const likeTweetUrl = (tweetId: string): string => {
  const url = new URL(`${BASE_URL}/like`)
  url.searchParams.set('tweet_id', `${tweetId}`)
  return url.href
}

export const retweetUrl = (tweetId: string): string => {
  const url = new URL(`${BASE_URL}/retweet`)
  url.searchParams.set('tweet_id', `${tweetId}`)
  return url.href
}
