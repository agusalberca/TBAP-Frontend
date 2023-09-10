import { ethers } from "ethers"
import RewardToken from "../assets/contracts/RewardToken.json"
import { contractAddress } from "../constants"

const execTransaction = (method, params = []) => {
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner()
  console.log (contractAddress)
  const contract = new ethers.Contract(contractAddress, RewardToken.abi, signer)
  const tx = contract[method](...params)
  return tx
}

export const mintToken = (title, issuerId, nonce, uri, signature) => {
  // Its important not to put any spaces in the ABI!!
//   string calldata title, uint16 issuerId, uint256 nonce, string calldata uri, bytes calldata signature
  const method = "mint(string,uint16,uint256,string,bytes)"
  const params = [ title, issuerId, nonce, uri, signature ]
  return execTransaction(method, params)
}