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
      "name": "whitelist",
      "type": 1,
      "description": "Create new user subscription",
      "options": [
        {
          "name": 'user',
          "description": 'Discord user',
          "type": 6,
          "required": true,
        },
        {
          "name": 'expiration_days',
          "description": 'Expiration days',
          "type": 4,
          "required": true,
        },
        {
          "name": 'server_id',
          "description": 'Server ID',
          "type": 3,
          "required": true,
        },
      ]
    },
    {
      "name": "renew",
      "type": 1,
      "description": "Renew a user subscription for more days.",
      "options": [
        {
          "name": 'server_id',
          "description": 'Server ID',
          "type": 3,
          "required": true,
        },
        {
          "name": 'days',
          "description": 'Extend days',
          "type": 4,
          "required": true,
        },
      ]
    },
    {
      "name": "remove",
      "type": 1,
      "description": "Remove a user subscription.",
      "options": [
        {
          "name": 'server_id',
          "description": 'Server ID',
          "type": 3,
          "required": true,
        },
        {
          "name": 'days',
          "description": 'Extend days',
          "type": 4,
          "required": true,
        },
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
