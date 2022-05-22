/// <reference types="node" />
import { EventEmitter } from 'events';
declare class AbstractWeb3Connector extends EventEmitter {
    type: string;
    network: string;
    account: any;
    chainId: any;
    provider: any;
    constructor();
    subscribeToEvents(provider: any): void;
    unsubscribeToEvents(provider: any): void;
    activate(): Promise<unknown>;
    /**
     * Updates account and emit event, on EIP-1193 accountsChanged events
     */
    handleAccountsChanged(accounts: any): void;
    /**
     * Updates chainId and emit event, on EIP-1193 accountsChanged events
     */
    handleChainChanged(chainId: any): void;
    handleConnect(connectInfo: any): void;
    handleDisconnect(error: any): void;
}
export default AbstractWeb3Connector;
