import { createMachine } from 'xstate';

const machine = createMachine({
	states: {
		initialize: {
			invoke: {
				src: 'init',
				onDone: 'connected',
				onError: 'error'
			}
		},

		connected: {
			on: {
				connect: '.',
				message: '.',
				chainChanged: '.',
				accountsChanged: '.',
				disconnect: 'disconnected'
			}
		},

		disconnected: {
			on: {
				connect: 'connected'
			}
		},

		error: {
			type: 'final'
		}
	}
});

export default machine;
