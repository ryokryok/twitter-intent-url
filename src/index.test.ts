import { describe, expect, it } from "vitest";
import {
  followUrl,
  likeTweetUrl,
  retweetUrl,
  TweetOption,
  tweetUrl,
} from "./index.js";

describe("test to create twitter link", () => {
  const testText = "Hello World";

  const testData: TweetOption = {
    shareUrl: "https://twitter.com/",
    hashtags: "Twitter",
    via: "TwitterDev",
    replyTweet: "525001166233403393",
  };

  it("expected without props", () => {
    expect(tweetUrl()).toBe(`https://twitter.com/intent/tweet`);
  });
  it("expected with text", () => {
    expect(tweetUrl(testText)).toBe(
      `https://twitter.com/intent/tweet?text=Hello+World`
    );
    expect(tweetUrl("new\nline")).toBe(
      `https://twitter.com/intent/tweet?text=new%0Aline`
    );
  });
  it("expected with url", () => {
    expect(tweetUrl("", { shareUrl: testData.shareUrl })).toBe(
      `https://twitter.com/intent/tweet?url=https%3A%2F%2Ftwitter.com%2F`
    );
  });
  it("expected with hashtags", () => {
    expect(tweetUrl("", { hashtags: testData.hashtags })).toBe(
      `https://twitter.com/intent/tweet?hashtags=Twitter`
    );
    expect(tweetUrl("", { hashtags: ["foo", "bar", "baz"] })).toBe(
      `https://twitter.com/intent/tweet?hashtags=foo%2Cbar%2Cbaz`
    );
  });
  it("expected with via", () => {
    expect(tweetUrl("", { via: testData.via })).toBe(
      `https://twitter.com/intent/tweet?via=TwitterDev`
    );
  });
  it("expected with reply to", () => {
    expect(tweetUrl("", { replyTweet: testData.replyTweet })).toBe(
      `https://twitter.com/intent/tweet?in_reply_to=525001166233403393`
    );
  });
  it("expected with full props", () => {
    expect(tweetUrl(testText, testData)).toBe(
      `https://twitter.com/intent/tweet?text=Hello+World&url=https%3A%2F%2Ftwitter.com%2F&hashtags=Twitter&via=TwitterDev&in_reply_to=525001166233403393`
    );
  });
});

describe("test to follow twitter link", () => {
  const testData = {
    screenName: "twitterdev",
    userId: "2244994945",
  };

  it("expected follow link with screen name", () => {
    expect(followUrl(testData.screenName)).toBe(
      `https://twitter.com/intent/follow?screen_name=twitterdev`
    );
  });
  it("expected follow link with user id", () => {
    expect(followUrl({ userId: testData.userId })).toBe(
      `https://twitter.com/intent/follow?user_id=2244994945`
    );
  });
});

describe("test to create like a tweet link", () => {
  const testTweetId = "36287294927413248";
  it("expected like a tweet", () => {
    expect(likeTweetUrl(testTweetId)).toBe(
      `https://twitter.com/intent/like?tweet_id=36287294927413248`
    );
  });
});

describe("test to create retweet link", () => {
  const testTweetId = "36287294927413248";
  it("expected retweet", () => {
    expect(retweetUrl(testTweetId)).toBe(
      `https://twitter.com/intent/retweet?tweet_id=36287294927413248`
    );
  });
});
