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

    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    email: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

export default User;
