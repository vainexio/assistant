/*
SUB_COMMAND - 1
SUB_COMMAND_GROUP - 2
STRING - 3
INTEGER - 4
BOOLEAN - 5
USER - 6
CHANNEL - 7
ROLE - 8
MENTIONABLE - 9
NUMBER - 10
ATTACHMENT - 11
*/
module.exports = {
  register: true,
  deleteSlashes: ['1272095323275132990'],
  slashes: [
    {
      "name": "giveperms",
      "type": 1,
      "description": "Allow a role to use bot commands for a specific user on a server",
      "options": [
        {
          "name": "user",
          "description": "Discord user to grant perms for",
          "type": 6,
          "required": true
        },
        {
          "name": "role",
          "description": "Role to grant permission to",
          "type": 8,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID where the role applies",
          "type": 3,
          "required": true
        },
        {
          "name": "expiration_days",
          "description": "Expiration days (optional, defaults to 30)",
          "type": 4,
          "required": false
        },
        {
          "name": "type",
          "description": "Whitelist type (optional, defaults to 'perms')",
          "type": 3,
          "required": false
        }
      ]
    },
    {
      "name": "removeperms",
      "type": 1,
      "description": "Deny a role from using bot commands for a specific user on a server",
      "options": [
        {
          "name": "user",
          "description": "Discord user to remove perms from",
          "type": 6,
          "required": true
        },
        {
          "name": "role",
          "description": "Role to remove from the whitelist",
          "type": 8,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID where the role applies",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "whitelist",
      "type": 1,
      "description": "Create or update a user whitelist/subscription",
      "options": [
        {
          "name": "user",
          "description": "Discord user to whitelist",
          "type": 6,
          "required": true
        },
        {
          "name": "expiration_days",
          "description": "Expiration days",
          "type": 4,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID the whitelist applies to",
          "type": 3,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type (e.g. scanner, perms)",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "renew",
      "type": 1,
      "description": "Renew a user whitelist/subscription for more days (by user_id, server_id, type)",
      "options": [
        {
          "name": "user_id",
          "description": "User ID of the whitelist entry to renew",
          "type": 3,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID of the whitelist entry",
          "type": 3,
          "required": true
        },
        {
          "name": "days",
          "description": "Number of days to add",
          "type": 4,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type (must match the entry's type)",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "remove",
      "type": 1,
      "description": "Remove a user whitelist/subscription by user_id and type",
      "options": [
        {
          "name": "user_id",
          "description": "User ID of the whitelist entry to remove",
          "type": 3,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type to remove (e.g. scanner, perms)",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "getlink",
      "type": 1,
      "description": "Find gamepass link",
      "options": [
        {
          "name": 'username',
          "description": 'Roblox username',
          "type": 3,
          "required": true,
        },
        {
          "name": 'ct',
          "description": 'Covered rax price',
          "type": 10,
          "required": false,
        },
        {
          "name": 'nct',
          "description": 'Not covered tax price',
          "type": 10,
          "required": false,
        },
      ]
    },
  ],
};
