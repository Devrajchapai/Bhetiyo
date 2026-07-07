import { EntitySchema } from "typeorm";

const ConversationParticipant = new EntitySchema({
  name: "ConversationParticipant",
  tableName: "conversation_participants",
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
    user_id: {
      type: "int",
      nullable: false,
    },
    joined_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

export default ConversationParticipant;
