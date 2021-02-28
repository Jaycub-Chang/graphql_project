const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const axios = require("axios");
const cors = require("cors");

// download data
const tpc_attractions_page1 = require("./database/tpc_attractions_page1.json");
const tpc_attractions_page2 = require("./database/tpc_attractions_page2.json");
const tpc_attractions_page3 = require("./database/tpc_attractions_page3.json");
const tpc_attractions_page4 = require("./database/tpc_attractions_page4.json");
const tpc_attractions_page5 = require("./database/tpc_attractions_page5.json");
const tpc_attractions_page6 = require("./database/tpc_attractions_page6.json");
const tpc_attractions_page7 = require("./database/tpc_attractions_page7.json");
const tpc_attractions_page8 = require("./database/tpc_attractions_page8.json");
const tpc_attractions_page9 = require("./database/tpc_attractions_page9.json");
const tpc_attractions_page10 = require("./database/tpc_attractions_page10.json");
const tpc_attractions_page11 = require("./database/tpc_attractions_page11.json");
const tpc_attractions_page12 = require("./database/tpc_attractions_page12.json");
const tpc_attractions_page13 = require("./database/tpc_attractions_page13.json");
const tpc_attractions_page14 = require("./database/tpc_attractions_page14.json");
const tpc_attractions_page15 = require("./database/tpc_attractions_page15.json");
const totalData = [
  ...tpc_attractions_page1.data,
  ...tpc_attractions_page2.data,
  ...tpc_attractions_page3.data,
  ...tpc_attractions_page4.data,
  ...tpc_attractions_page5.data,
  ...tpc_attractions_page6.data,
  ...tpc_attractions_page7.data,
  ...tpc_attractions_page8.data,
  ...tpc_attractions_page9.data,
  ...tpc_attractions_page10.data,
  ...tpc_attractions_page11.data,
  ...tpc_attractions_page12.data,
  ...tpc_attractions_page13.data,
  ...tpc_attractions_page14.data,
  ...tpc_attractions_page15.data,
];

// get api data
const getInitActivities = async () => {
  let payload;
  await axios({
    method: "get",
    baseURL: "https://www.travel.taipei/open-api",
    url: "/zh-tw/Events/Activity",
    "Content-Type": "application/json",
  })
    .then((result) => {
      payload = result.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return payload;
};

const getInitNews = async () => {
  let payload;
  await axios({
    method: "get",
    baseURL: "https://www.travel.taipei/open-api",
    url: "/zh-tw/Events/News",
    "Content-Type": "application/json",
  })
    .then((result) => {
      payload = result.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return payload;
};

// graphql schema
const myGraphQLSchema = buildSchema(`
    type Query {
        attraction(id:Int): Attraction
        attractions(distric:String,category:[String],name:String): [Attraction]
        hotAttractions: [Attraction]
        latestNews: [News]
    }
    type Attraction {
        id: Int
        name: String
        introduction: String
        open_time: String
        distric: String
        address: String
        tel: String
        fax: String
        email: String
        official_site: String
        facebook: String
        ticket: String
        remind: String
        category: [Category]
        images: [Image]
    }
    type Category {
        id: Int
        name: String
    }
    type Image {
        src: String
        ext: String
    }
    type News {
        id: Int
        title: String
        description: String
        posted: String
        modified: String
        url: String
    }
`);

const getAttraction = (args) => {
  const { id } = args;
  if (id) {
    return totalData.filter((location) => {
      return location.id === id;
    })[0];
  } else {
    return {};
  }
};

const getAttractions = (args) => {
  const { distric, category, name } = args;
  if (distric && category) {
    const dataFilterByDistric = totalData.filter(
      (location) => location.distric === distric
    );
    return dataFilterByDistric.filter((location) =>
      filterByCategory(location, category)
    );
  }
  if (distric) {
    return totalData.filter((location) => location.distric === distric);
  }
  if (category.length) {
    return totalData.filter((location) => filterByCategory(location, category));
  }
  if (name) {
    return totalData.filter((location) => location.name.indexOf(name) !== -1);
  }
  return {};
};

const filterByCategory = (location, category) => {
  let isMatch = true;
  const locationCates = location.category.reduce((prev, current) => {
    return [...prev, current.name];
  }, []);
  category.forEach((cate) => {
    if (locationCates.indexOf(cate) === -1) {
      isMatch = false;
    }
  });
  return isMatch;
};

const getHotAttractions = () => {
  return totalData.filter((location, index) => index < 10);
};

const getLatestNews = async () => {
  const payload = await getInitNews();
  return [...payload.data];
};

// root resolver
const root = {
  attraction: getAttraction,
  attractions: getAttractions,
  hotAttractions: getHotAttractions,
  latestNews: getLatestNews,
};

const PORT = 4000;

const app = express();

// allow cross policy
app.use(cors());

// bodyParser is needed just for POST.
app.use(
  "/graphql",
  graphqlHTTP({ schema: myGraphQLSchema, rootValue: root, graphiql: true })
);

app.listen(PORT, () => console.log("Running server on port 4000."));

app.get("/", async (req, res) => {
  const payload = await getInitNews();
  res.send(payload);
});
