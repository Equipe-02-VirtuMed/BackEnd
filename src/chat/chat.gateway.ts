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
    console.log(message);
    this.server.emit("receive-message", JSON.stringify(message));
  }

  @SubscribeMessage("file")
  handleFile(@MessageBody() file: any): void {
    console.log("file ---");
    console.log(file);
    this.server.emit("receive-message", JSON.stringify(file));
  }
}
