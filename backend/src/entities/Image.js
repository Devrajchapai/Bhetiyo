import { EntitySchema, JoinColumn } from "typeorm";

const Image = new EntitySchema({
  name: "Image",
  tableName: "images",
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

    url: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    vector_value: {
      type: "varbinary",
      length: 6144,
      nullable: false,
    },

    source: {
      type: "varchar",
      length: 255,
      nullable: false,
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

export default Image;
