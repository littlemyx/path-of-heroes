/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const itemsCollection = app.findCollectionByNameOrId("items");
    const playersCollection = app.findCollectionByNameOrId("players");

    // Create items first (IDs must be exactly 15 chars: [a-z0-9])
    const items = [
      { id: "seeditem0000001", name: "Iron Sword", level: 1, type: "weapon", hit_stat: 10 },
      { id: "seeditem0000002", name: "Steel Shield", level: 2, type: "armour", hit_stat: 5 },
      { id: "seeditem0000003", name: "Fire Staff", level: 5, type: "weapon", hit_stat: 25 },
      { id: "seeditem0000004", name: "Dragon Armor", level: 10, type: "armour", hit_stat: 15 },
      { id: "seeditem0000005", name: "Excalibur", level: 20, type: "weapon", hit_stat: 50 },
      { id: "seeditem0000006", name: "Leather Vest", level: 1, type: "armour", hit_stat: 3 },
    ];

    const createdItemIds = [];
    for (const itemData of items) {
      const record = new Record(itemsCollection);
      record.set("id", itemData.id);
      record.set("name", itemData.name);
      record.set("level", itemData.level);
      record.set("type", itemData.type);
      record.set("hit_stat", itemData.hit_stat);
      app.save(record);
      createdItemIds.push(itemData.id);
    }

    // Create players with items (IDs must be exactly 15 chars: [a-z0-9])
    const players = [
      { id: "seedplayer00001", name: "Артур", items: ["seeditem0000001", "seeditem0000002"] },
      { id: "seedplayer00002", name: "Мерлин", items: ["seeditem0000003"] },
      { id: "seedplayer00003", name: "Ланселот", items: ["seeditem0000005", "seeditem0000004"] },
      { id: "seedplayer00004", name: "Гвиневра", items: ["seeditem0000006"] },
      { id: "seedplayer00005", name: "Персиваль", items: [] },
    ];

    for (const playerData of players) {
      const record = new Record(playersCollection);
      record.set("id", playerData.id);
      record.set("name", playerData.name);
      record.set("items", playerData.items);
      app.save(record);
    }

    console.log("Seed data created: 6 items, 5 players");
  },
  (app) => {
    // Rollback: delete seeded data
    const playersCollection = app.findCollectionByNameOrId("players");
    const itemsCollection = app.findCollectionByNameOrId("items");

    const playerIds = ["seedplayer00001", "seedplayer00002", "seedplayer00003", "seedplayer00004", "seedplayer00005"];
    const itemIds = ["seeditem0000001", "seeditem0000002", "seeditem0000003", "seeditem0000004", "seeditem0000005", "seeditem0000006"];

    for (const id of playerIds) {
      try {
        const record = app.findRecordById(playersCollection, id);
        app.delete(record);
      } catch (e) {
        // Record might not exist
      }
    }

    for (const id of itemIds) {
      try {
        const record = app.findRecordById(itemsCollection, id);
        app.delete(record);
      } catch (e) {
        // Record might not exist
      }
    }

    console.log("Seed data removed");
  }
);

