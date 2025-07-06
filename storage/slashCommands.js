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