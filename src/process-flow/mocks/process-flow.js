export const processflow={
  "name":"Twitter to DB",
  "nodes": [
        {
        "id": "1",
        "name": "Twitter",
        "type": "source",
        },
      {
        "id": "2",
        "name": "filter",
        "type": "filter"
      },
      {
        "id": "3",
        "name": "DB",
        "type": "target"

      }
    ],
    "edges": [
      {
        "name": "Twitter_filter",
        "from": "Twitter",
        "to": "filter",

      },
      {
        "name": "filter_DB",
        "from": "filter",
        "to": "DB"
      }
    ]
  }