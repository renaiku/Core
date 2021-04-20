/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

enum TcsEventTarget {
	LOCAL = 'local',
	CLIENT = 'client',
	SERVER = 'server',
}

interface TcsEvent {
	eventType: TcsEventsList;
	target: TcsEventTarget;
	data: Object;
}

interface TcsClientEvent extends TcsEvent {
	targetId: Number;
}
