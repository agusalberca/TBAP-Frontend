import { AvalancheChain } from './chains/avalanche';
import { AvalancheTestChain } from './chains/avalancheTest';
import { BinanceSmartChain } from './chains/bsc';
import { BSCTestChain } from './chains/bscTest';
import { EthereumMainnetChain } from './chains/ethereum';
import { GanacheChain } from './chains/ganache';
import { GoerliTestChain } from './chains/goerliTest';
import { HardhatChain } from './chains/hardhat';
import { PolygonChain } from './chains/polygon';
import { PolygonMumbaiChain } from './chains/polygonMumbai';
import { PolygonAmoyChain } from './chains/polygonAmoy';
import { Network } from './models/network/types/Network';

export const SUPPORTED_NETWORKS: Network[] = [
  // AvalancheChain,
  // BinanceSmartChain,
  // PolygonChain,
  // EthereumMainnetChain,
  // AvalancheTestChain,
  // BSCTestChain,
  // PolygonMumbaiChain,
  PolygonAmoyChain,
  // GoerliTestChain,
  // GanacheChain,
  // HardhatChain,
];
export const DEFAULT_NETWORK = PolygonAmoyChain;
export const SIGN_TIMEOUT_IN_SEC = 60;
export const SLOW_DOWN_IN_MS = 1000;
