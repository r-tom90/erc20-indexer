# Simple ERC-20 Indexer

This is an skeleton app that uses the Alchemy SDK rigged to Alchemy's Enhanced APIs in order to display all of an address's ERC-20 token balances.

## Set Up

1. Install dependencies by running `npm install`
2. Start application by running `npm run dev`

## Challenge

Fork this repo and build out more features! This is minimalistic on purpose.

We purposefully built this app to be minimalistic so that you can get some software development practice in fixing our bugs! 🪲

Here are a few challenge suggestions:

1. Add Wallet integration so that any user that connects their wallet can check their ERC-20 token balance [x]
2. There is no indication of a request in progress... that's bad UX! Do you think you can add some sort of indication of loading? [x]
3. Add some styling! 🎨 [x]
4. The token balances can sometimes be a little long and break the outline of the page... can you fix that? 🔧 []
5. There is no error-checking for wrongly formed requests, or really any error checking of any kind... can you add some in? [x]
6. The images and grid display could look better... anything you can do about that? [x]
7. There are ways to make this app faster... can you implement some of them? How can the query be made _even_ quicker? []
8. Can you add ENS support for inputs? []
9. Completely open-ended!! Use this as the base for your next hackathon project, dream company or personal expedition []

# ERC-20 Token Indexer 🪙

Now that you've learned about the ERC-20 token standard and even built it out from scratch, we've packaged up a skeleton application written using [Vite + React](https://vitejs.dev/guide/).

Here at AU, we love using an awesome front-end component library called [Chakra UI](https://chakra-ui.com/). This app uses a bunch of Chakra! 🔥

First time hearing of Chakra? We recommend reading [this article](https://www.freecodecamp.org/news/why-should-you-start-using-chakraui/#:~:text=Chakra%20UI%20is%20a%20component,with%20some%20other%20libraries%20too.) explaining ChakraUI and why it's a very powerful tool for front-end developers to learn!

This skeleton application uses the [Alchemy SDK](https://www.alchemy.com/sdk) in order to instantly return ALL the ERC-20 token balances of an address. Woah! 🔥

Thanks to the Alchemy SDK, you can do this blazingly fast. This is because the Alchemy SDK is rigged directly to Alchemy's own [`alchemy_getTokenBalances`](https://docs.alchemy.com/reference/alchemy-gettokenbalances) endpoint.

This is an extremely powerful API! Can you imagine what a headache it would be to acquire ALL of the ERC-20 token balances of an address otherwise?? You would need to manually:

1. go through EVERY block in the blockchain
2. go through EVERY tx in every block,
3. index each tx,
4. see whether the tx involves any ERC-20 specific events
5. then, build up your own database

That’s super difficult!! Thanks to Alchemy's [Enhanced APIs](https://www.alchemy.com/enhanced-apis), this is no longer a burden on the developer.

Set this app up and see for yourself, you'll be able to query anyone's entire ERC-20 token balance collection in a few seconds flat! 🏎

The app you will set up below uses a powerful combination of the following Alchemy Enhanced API endpoints:

[`alchemy_getTokenBalances`](https://docs.alchemy.com/reference/alchemy-gettokenbalances)
[`alchemy_getTokenMetadata`](https://docs.alchemy.com/reference/alchemy-gettokenmetadata)
