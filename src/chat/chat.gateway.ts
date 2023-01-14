import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway(8001, { cors: "*" })
export class ChatGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: any, payload: any): void {
    this.server.emit("receive-message", JSON.stringify(message));
  }
}
