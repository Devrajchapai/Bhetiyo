import { EntitySchema } from "typeorm";

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

    userId: {
      type: "int",
      nullable: true,
      default: null,
    },
  },
});

export default Image;
