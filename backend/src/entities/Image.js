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

    name: {
      type: "varchar",
      length: 50,
      nullable: false,
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
