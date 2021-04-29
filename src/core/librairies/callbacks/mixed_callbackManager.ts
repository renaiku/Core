/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

class TcsCallbackManager {
	private ClientCallBack: any[];
	private ServerCallBack: any[];
	private requestId = 0;

	/**
	 * Initialize the callbacks manager
	 */
	constructor() {
		this.ClientCallBack = [];
		this.ServerCallBack = [];

		/**
		 * Client side event
		 */
		onNet('callbacks:clientEvent', (requestId: number, args: any[]) => {
			this.ClientCallBack[requestId](args);
			this.ClientCallBack[requestId] = null;
		});

		/**
		 * Server side event
		 */
		onNet(
			'callbacks:serverEvent',
			(eventName: string, requestId: number, args: any) => {
				const _source = source;
				const index = TCS.callbacks.ServerCallBack.indexOf(eventName);
				if (this.ServerCallBack[index] != null) {
					this.ServerCallBack[index](_source, args);
				}
				emitNet('callbacks:clientEvent', _source, requestId, args);
			},
		);
	}

	/**
	 * Client side function
	 * @param eventName The name of the event to call on the server side
	 * @param cb return function
	 * @param args arguments to be transmitted on the server side
	 */
	TriggerServerCallback = (eventName: string, cb: Function, args: any) => {
		this.ClientCallBack[this.requestId] = cb;
		emitNet('callbacks:serverEvent', eventName, this.requestId, args);
		this.requestId++;
	};

	/**
	 * Server side function
	 * @param eventName The name of the event to call on the client side
	 * @param cb return function
	 */
	RegisterServerCallback = (eventName: string, cb: Function) => {
		//@ts-ignore
		this.ServerCallBack[eventName] = cb;
	};
}
