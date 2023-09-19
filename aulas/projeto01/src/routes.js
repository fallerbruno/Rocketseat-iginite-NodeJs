import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { BuildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: BuildRoutePath("/users"),
    handler: async (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: BuildRoutePath("/users"),
    handler: async (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: BuildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      const users = database.select("users");
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return res.writeHead(404).end();
      }

      users.splice(userIndex, 1);

      return res.writeHead(204).end();
    },
  },
];
