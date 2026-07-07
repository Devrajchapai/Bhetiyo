import { EntitySchema } from "typeorm";

const Claim = new EntitySchema({
  name: "Claim",
  tableName: "claims",
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
    claimant_id: {
      type: "int",
      nullable: false,
    },
    type: {
      type: "varchar",
      length: 10,
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

export default Claim;
