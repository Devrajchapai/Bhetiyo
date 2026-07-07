import { EntitySchema } from "typeorm";

const Conversation = new EntitySchema({
  name: "Conversation",
  tableName: "conversations",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    item_group_id: {
      type: "uuid",
      nullable: false,
    },
    type: {
      type: "varchar",
      length: 10,
      nullable: false,
    },
    is_closed: {
      type: "boolean",
      default: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    closed_at: {
      type: "timestamp",
      nullable: true,
    },
  },
});

export default Conversation;
