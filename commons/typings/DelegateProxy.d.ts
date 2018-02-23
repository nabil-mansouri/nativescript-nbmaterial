
declare class DPDelegateProxy extends NSObject {

	static alloc(): DPDelegateProxy; // inherited from NSObject

	static new(): DPDelegateProxy; // inherited from NSObject

	interceptedSelectorArguments(selector: string, _arguments: NSArray<any>): void;
}

declare function DP_argumentsFromInvocation(invocation: NSInvocation): NSArray<any>;

declare function DP_argumentsFromInvocationWithIndex(invocation: NSInvocation, index: number): any;

declare function DP_isMethodReturnTypeVoid(method: void): boolean;

declare function DP_isMethodSignatureVoid(methodSignature: NSMethodSignature): boolean;

declare class DelegateProxy extends DPDelegateProxy {

	static alloc(): DelegateProxy; // inherited from NSObject

	static new(): DelegateProxy; // inherited from NSObject
}

declare var DelegateProxyVersionNumber: number;

declare var DelegateProxyVersionNumberVar: number;

declare var DelegateProxyVersionString: interop.Reference<number>;

declare var DelegateProxyVersionStringVar: interop.Reference<number>;
