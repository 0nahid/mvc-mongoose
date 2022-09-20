> Bulk methods

```
{
  "ids": [
    "id",
    "id",
    ...
  ],
  "data":{
    "...":"...",
    ....
  }
}
```

> Bulk unique methods [@latest]

```
{
  "ids": [
    {
      "id": "...",
      "data": {
        "...": "...",
      }
    },
    {
      "id": "...",
      "data": {
        "...": "...",
      }
    }
  ]
}
```

> bulk delete by ids

```
{
  "ids": [
    "...","..."
  ]
}
```

> Filtering Flexibility

`const filters = { ...req.query };`

```
  // exclude the page and limit from the query
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((field) => delete filters[field]);
```

```
// build the query
let queries:queries = {};
if (req.query.sort) {
  const sortBy = req.query.sort.toString().split(",").join(" ");
  queries.sortBy = sortBy;
}
console.log(queries.sortBy);
if (req.query.fields){
  const fields = req.query.fields.toString().split(",").join(" ");
  queries.fields = fields;
}
```

```
//DB method
const products = await ProductModel.find({ ...filters }).sort(queries.sortBy).select(queries.fields);

```
