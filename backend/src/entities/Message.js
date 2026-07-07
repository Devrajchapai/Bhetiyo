import { EntitySchema } from "typeorm";

const Message = new EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    conversation_id: {
      type: "int",
      nullable: false,
    },
    sender_id: {
      type: "int",
      nullable: false,
    },
    content: {
      type: "text",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
});

export default Message;
