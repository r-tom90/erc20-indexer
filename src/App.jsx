import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const { address, status, isConnected } = useAccount();

  const { data, isError, isLoading } = useEnsName({
    address: address?.toLowerCase(),
  });

  console.log("data", data);
  console.log("address", address);
  console.log("status", status);
  console.log("isConnected", isConnected);

  async function getTokenBalance() {
    try {
      const config = {
        apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };

      const alchemy = new Alchemy(config);
      const data = await alchemy.core.getTokenBalances(address || userAddress);
      setLoading(true);
      setResults(data);

      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }

      setTokenDataObjects(await Promise.all(tokenDataPromises));
      setHasQueried(true);
    } catch (err) {
      console.error(err);
      // console.log(err); can be used as well for catching errors
    } finally {
      //finally is a block of code that's executed after a try block, regardless of whether an exception was thrown or not.
      setLoading(false);
    }
  }
  console.log("Results", setResults);
  console.log("tokenDataObjects", tokenDataObjects);

  const handleInputChange = ({ target }) => {
    setUserAddress(target.value);
  };

  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <ConnectButton />
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <Input
          value={address ? address : userAddress}
          onChange={handleInputChange}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button
          fontSize={20}
          onClick={getTokenBalance}
          mt={36}
          bgColor="#1f1f1f"
          disabled={loading}
        >
          {loading ? "Loading..." : "Check ERC-20 Token Balances"}
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>
        {hasQueried ? (
          <SimpleGrid w={"90vw"} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  key={i}
                  flexDir={"column"}
                  color="white"
                  bg="#1f1f1f"
                  w={"15vw"}
                >
                  <Center>
                    <Image w="40px" src={tokenDataObjects[i].logo} />
                  </Center>
                  <Center>
                    <b>Symbol:</b> {tokenDataObjects[i].symbol}&nbsp;
                  </Center>
                  <Center>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance,
                      tokenDataObjects[i].decimals
                    )}
                  </Center>
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          "Please make a query! This may take a few seconds..."
        )}
      </Flex>
    </Box>
  );
}

export default App;
