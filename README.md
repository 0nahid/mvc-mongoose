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
  // operators
  let queryStr = JSON.stringify(filters);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));
  filters = JSON.parse(queryStr);
```

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

> The final get api
> `http://localhost:5001/api/v1/products?price[gt]=20&sort=quantity&status=out-of-stock&page=1&limit=5`
