import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },

    externalId: {
      type: "varchar",
      nullable: false,
    },

    name: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },

    source: {
      type: "varchar",
      // enum: ["google", "facebook", "tiktok"],
      nullable: false,
    },

    gender: {
      type: "varchar",
      num: ["male", "female", "other"],
      nullable: true,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

export default User;
