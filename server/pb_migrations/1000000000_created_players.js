/// <reference path="../pb_data/types.d.ts" />

migrate(
  app => {
    const collection = new Collection({
      id: "players_collection",
      name: "players",
      type: "base",
      system: false,
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      indexes: [
        "CREATE UNIQUE INDEX idx_players_username ON players (username)",
        "CREATE UNIQUE INDEX idx_players_email ON players (email)"
      ],
      fields: [
        {
          id: "username_field",
          name: "username",
          type: "text",
          system: false,
          hidden: false,
          presentable: false,
          required: true,
          primaryKey: false,
          min: 3,
          max: 50,
          pattern: "",
          autogeneratePattern: ""
        },
        {
          id: "email_field",
          name: "email",
          type: "email",
          system: false,
          hidden: false,
          presentable: false,
          required: true,
          exceptDomains: [],
          onlyDomains: []
        },
        {
          id: "level_field",
          name: "level",
          type: "number",
          system: false,
          hidden: false,
          presentable: false,
          required: false,
          min: 1,
          max: null,
          onlyInt: true
        },
        {
          id: "experience_field",
          name: "experience",
          type: "number",
          system: false,
          hidden: false,
          presentable: false,
          required: false,
          min: 0,
          max: null,
          onlyInt: true
        },
        {
          id: "status_field",
          name: "status",
          type: "select",
          system: false,
          hidden: false,
          presentable: false,
          required: false,
          values: ["online", "offline", "away"],
          maxSelect: 1
        },
        {
          id: "lastseen_field",
          name: "lastSeen",
          type: "date",
          system: false,
          hidden: false,
          presentable: false,
          required: false,
          min: "",
          max: ""
        },
        {
          id: "created_field",
          name: "created",
          type: "autodate",
          system: false,
          hidden: false,
          presentable: false,
          onCreate: true,
          onUpdate: false
        },
        {
          id: "updated_field",
          name: "updated",
          type: "autodate",
          system: false,
          hidden: false,
          presentable: false,
          onCreate: true,
          onUpdate: true
        }
      ],
      options: {}
    });

    app.save(collection);
  },
  app => {
    try {
      const collection = app.findCollectionByNameOrId("players_collection");
      app.delete(collection);
    } catch {
      // collection already missing
    }
  }
);
