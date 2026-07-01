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

    url: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    vector_value: {
      type: "mediumblob",
      nullable: false,
    },

    group_id: {
      type: "uuid",
      nullable: false,
    },
  },

  relations: {},
});

export default Image;
