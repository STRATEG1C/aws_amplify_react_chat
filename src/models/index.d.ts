import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class ChatRoom {
  readonly id: string;
  readonly initiatorId: string;
  readonly participantId: string;
  constructor(init: ModelInit<ChatRoom>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly text: string;
  readonly chatRoomId: string;
  readonly authorId: string;
  readonly sendTime: string;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly cognitoID: string;
  readonly username: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}