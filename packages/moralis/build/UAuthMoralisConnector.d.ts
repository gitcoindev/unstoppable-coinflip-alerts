import type UAuth from '@uauth/js';
import type { UAuthConstructorOptions } from '@uauth/js';
import AbstractWeb3Connector from './AbstractWeb3Connector';
export interface UAuthMoralisConnectors {
    injected: any | undefined;
    walletconnect: any | undefined;
}
export interface UAuthConnectorOptions extends Partial<UAuthConstructorOptions> {
    uauth?: UAuth;
    connectors: UAuthMoralisConnectors;
    shouldLoginWithRedirect?: boolean;
}
declare class UAuthMoralisConnector extends AbstractWeb3Connector {
    type: string;
    static UAuth: typeof UAuth;
    static options: UAuthConnectorOptions;
    static importUAuth(): Promise<void>;
    static setUAuthOptions(_options: UAuthConnectorOptions): void;
    private _subConnector?;
    private _uauth?;
    verifyEthereumBrowser(): void;
    activate({ chainId: providedChainId, mobileLinks, }?: {
        chainId: any;
        mobileLinks: any;
    }): Promise<any>;
    deactivate(): Promise<void>;
    get uauth(): UAuth;
}
export default UAuthMoralisConnector;
