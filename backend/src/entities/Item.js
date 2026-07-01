import { EntitySchema } from "typeorm";

const Item = new EntitySchema({
  name: "Item",
  tableName: "items",
  schema: "bhetiyo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },

    group_id: {
      type: "uuid",
      unique: true,
      nullable: false,
    },

    user_id: {
      type: "int",
      nullable: true,
    },

    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    category: {
      type: "varchar",
      length: 100,
      nullable: false,
    },

    dateFound: {
      type: "varchar",
      length: 20,
      nullable: true,
    },

    description: {
      type: "text",
      nullable: true,
    },

    location: {
      type: "text",
      nullable: true,
    },

    source: {
      type: "varchar",
      length: 20,
      nullable: false,
    },

    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      JoinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
  },
});

export default Item;
