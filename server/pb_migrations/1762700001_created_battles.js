/// <reference path="../pb_data/types.d.ts" />
migrate(
  app => {
    const collection = new Collection({
      createRule: null,
      deleteRule: null,
      fields: [
        {
          autogeneratePattern: "[a-z0-9]{15}",
          hidden: false,
          id: "text3208210256",
          max: 15,
          min: 15,
          name: "id",
          pattern: "^[a-z0-9]+$",
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: "text"
        },
        {
          cascadeDelete: false,
          collectionId: "pbc_3072146508",
          hidden: false,
          id: "relation_participants",
          maxSelect: 999,
          minSelect: 1,
          name: "participants",
          presentable: false,
          required: true,
          system: false,
          type: "relation"
        },
        {
          cascadeDelete: false,
          collectionId: "pbc_3072146508",
          hidden: false,
          id: "relation_winners",
          maxSelect: 999,
          minSelect: 0,
          name: "winners",
          presentable: false,
          required: false,
          system: false,
          type: "relation"
        },
        {
          autogeneratePattern: "",
          hidden: false,
          id: "text_battle_log",
          max: 0,
          min: 0,
          name: "battle_log",
          pattern: "",
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: "text"
        },
        {
          hidden: false,
          id: "autodate2990389176",
          name: "created",
          onCreate: true,
          onUpdate: false,
          presentable: false,
          system: false,
          type: "autodate"
        },
        {
          hidden: false,
          id: "autodate3332085495",
          name: "updated",
          onCreate: true,
          onUpdate: true,
          presentable: false,
          system: false,
          type: "autodate"
        }
      ],
      id: "pbc_battles_001",
      indexes: [],
      listRule: "",
      name: "battles",
      system: false,
      type: "base",
      updateRule: null,
      viewRule: ""
    });

    return app.save(collection);
  },
  app => {
    const collection = app.findCollectionByNameOrId("pbc_battles_001");

    return app.delete(collection);
  }
);
