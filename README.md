# twitter-intent-url

Generate Twitter web intent url.

referenced:

https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview

## Usage

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

```sh
npm install twitter-intent-url
```

```ts
import { tweetUrl } from "twitter-intent-url";

// if you want to tweet text contains URL, use backtick (`) characters.
const tweetText = `Tesla in space.

https://www.youtube.com/watch?v=aBr2kKAHN6M&t=2007s`;

console.log(tweetUrl(tweetText));
// https://twitter.com/intent/tweet?text=Tesla+in+space.%0A%0Ahttps%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DaBr2kKAHN6M%26t%3D2007s

// you can also reply to a tweet.
console.log(tweetUrl("", { replyTweet: "1580661436132757506" }));
// https://twitter.com/intent/tweet?in_reply_to=1580661436132757506
```

More exmaple, [check test code.](./src/index.test.ts)

## Supports

- Tweet or Reply to a Tweet
- Retweet a Tweet
- Like a Tweet
- Follow a User

## License

MIT
