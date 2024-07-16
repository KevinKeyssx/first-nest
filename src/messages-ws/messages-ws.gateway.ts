import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
}						from '@nestjs/websockets';
import { JwtService } 	from '@nestjs/jwt';

import { Server, Socket } from 'socket.io';

import { MessagesWsService }	from './messages-ws.service';
import { NewMessageDto } 		from './dtos/new.message.dto';
import { JwtPayload } 			from '../auth';


@WebSocketGateway({
	// cors: true
	cors: {
		origin			: 'http://localhost:5173',
		methods			: ['GET', 'POST'],
		allowedHeaders	: ['Content-Type', 'Authorization', 'authentication', 'hola'],
        credentials		: true,
	}
})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() wss: Server;
	constructor(
		private readonly messagesWsService  : MessagesWsService,
		private readonly jwtService         : JwtService
	) {}


	async handleConnection( client: Socket ) {
		console.log('Client connected:', client );

		const token = client.handshake.headers.authentication as string;
		let payload: JwtPayload;
		console.log("🚀 ~ token:", token)

		try {
			payload = this.jwtService.verify( token );
			await this.messagesWsService.registerClient( client, payload.id );
		} catch ( error ) {
			console.log('***Error verifying token:', error);
			client.disconnect();
			return;
		}

		console.log("🚀 ~ payload:", payload)

		this.wss.emit( 'clients-updated', this.messagesWsService.getConnectedClients() );
	}


	handleDisconnect( client: Socket ) {

		console.log('Client disconnected:', client.id );
		this.messagesWsService.removeClient( client.id );
		this.wss.emit( 'clients-updated', this.messagesWsService.getConnectedClients() );

	}

	@SubscribeMessage('message-from-client')
	handleMassageFromClient( client: Socket, payload: NewMessageDto ) {

		console.log('Message from client:', payload, client.id );
		// !Emite únicamente al cliente que envió el mensaje
		// client.emit( 'message-from-server', {
		//   fullName: 'John Doe',
		//   // ...payload
		//   message: payload.message || 'No message provided'
		// });

		// !Emite a todos los clientes conectados menos al que envió el mensaje
		// client.broadcast.emit( 'message-from-server', {
		// fullName: 'John Doe',
		// // ...payload
		// message: payload.message || 'No message provided'
		// });

		//! Emitir a todos los clientes conectados
		// this.wss.emit( 'message-from-server', payload );
		this.wss.emit('message-from-server', {
			fullName: this.messagesWsService.getUserFullName(client.id),
			message: payload.message || 'no-message!!'
		});

	}

}
