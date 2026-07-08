import { EntitySchema } from "typeorm";

const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notifications",
  schema: "bhetiyo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    user_id: {
      type: "int",
      nullable: false,
    },
    type: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    message: {
      type: "text",
      nullable: true,
    },
    matched_item_group_id: {
      type: "uuid",
      nullable: false,
    },
    source_item_group_id: {
      type: "uuid",
      nullable: false,
    },
    similarity_score: {
      type: "decimal",
      precision: 5,
      scale: 2,
      nullable: true,
    },
    is_read: {
      type: "boolean",
      default: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
});

export default Notification;
