import got from 'got';
import express, {Request, Response } from "express";
import * as Joi from 'joi';

const app = express();
app.use(express.json());
let p = '';
const models:any[] = [];
const uns: any[] = [];
let globTime = 300000;

app.get("/", (req:Request, res:Response) => {
  res.send("<b>hello world</b>");
});

app.get("/api/mashhad", async (req:Request, res:Response) => {
  try {
    const response = await got(`https://api.divar.ir/v8/web-search/mashhad/`);
    const json = JSON.parse(response.body);
    var main = json.schema.ui_schema.category.urischema.display;
    var main2 = Object.keys(main);
    res.send("<b>Please Choose Your Category and enter in the url</b><br>" + main2);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/mashhad/:name", async (req:Request, res:Response) => {
  try {
    const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${req.params.name}`);
    if (!response) {
      res.status(404).send('no such category');
    } else {
      const json = JSON.parse(response.body);
      var main = json.schema.json_schema.properties;
      if (main.brand_model) {
        const main2 = main.brand_model.properties.value.items.enum;
        res.send("<b>Please Choose Your Specific Brand and eneter in the url</b><br>" + main2 );
      } else {
        res.send("<b>Your Chooosen Category Does Not Have Specific models, for a Beautified api, please enter your category in format like this to start getting your ads</b><br>"
          + `/api/mashhad/un/${req.params.name}`);
      }
    };
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/mashhad/:name/:name2", async (req:Request, res:Response) => {
    try {
      const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${req.params.name}/${req.params.name2}`);
      if (!response) {
        res.status(404).send('no such product');
      } else {
        const json = JSON.parse(response.body);
        json.widget_list.forEach((_item: { data: { title: any; image: any; description: any; }; }) => {
          p += `<div> <h1>title: ${_item.data.title}</h1> <img src='${_item.data.image}'><h4>description: ${_item.data.description}</h4> </div>`
          models.push(_item.data);
        })
        res.send(p);
      }
    } catch (error) {
      console.log(error);
    }
});

app.get("/api/mashhad/:name/:name2/:id", (req:Request, res:Response) => {
  const model = models.find(x => x.id === parseInt(req.params.id))
  if (!model) {
    res.status(404).send('');
  }
  res.send(model);
})

app.get("/api/mashhad/un/:name3/", async (req:Request, res:Response) => {
    try {
      const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${req.params.name3}/}`);
      if (!response) {
        res.status(404).send('no such category');
      } else {
        const json = JSON.parse(response.body);
        json.widget_list.forEach((_item: { data: { title: any; image: any; description: any; }; }) => {
          p += `<div> <h1>title: ${_item.data.title}</h1> <img src='${_item.data.image}'><h4>description: ${_item.data.description}</h4> </div>`
          uns.push(_item.data);
        })
        res.send(uns);
      }
    } catch (error) {
      console.log(error);
    }
});
app.get("/api/mashhad/un/:name3/:id", (req:Request, res:Response) => {
  const un = uns.find(x => x.index === parseInt(req.params.id))
  if (!un) {
    res.status(404).send('');
  }
  res.send(un);
})

app.put("/api/mashhad/:name/:name2/", (req:Request, res:Response) => {

  const schema = Joi.object({
    time: Joi.number().min(5).required()
  })
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  globTime = req.body.time;
  res.send({
    "time": `${globTime}`
  });

})
app.put("/api/mashhad/un/:name3/", (req:Request, res:Response) => {

  const schema = Joi.object({
    time: Joi.number().min(5).required()
  })
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  globTime = req.body.time;
  res.send({
    "time": `${globTime}`
  });
})

app.post('/api/mashhad/:name/:name2', (req:Request, res:Response) => {

  const schema = Joi.object({
    name: Joi.string().min(5).required()
  })
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const model = {
    id: models.length + 1,
    name: req.body.name
  }

  const mod = models.find(item => item.name === model.name);
  if (mod) {
    return res.status(404).send('we had this category. id is : ' + mod.id);
  }

  models.push(model);
  res.send(model);
})

app.post('/api/mashhad/un/:name3/', (req:Request, res:Response) => {

  const schema = Joi.object({
    name: Joi.string().min(5).required()
  })
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const uni = {
    id: uns.length + 1,
    name: req.body.name
  }

  const unig = uns.find(item => item.name === uni.name);
  if (unig) {
    return res.status(404).send('we had this category. id is : ' + uni.id);
  }

  models.push(uni);
  res.send(uni);
})

app.delete('api/mashhad/un/:name3/:id', (req:Request, res:Response) => {
  const un = uns.find(x => x.id === parseInt(req.params.id))
  if (!un) {
    res.status(404).send('');
  }
  const index = uns.indexOf(un);
  models.splice(index)
  res.send(un);
})

app.delete('/api/mashhad/:name/:name2/:id', (req:Request, res:Response) => {
  const model = models.find(x => x.id === parseInt(req.params.id))
  if (!model) {
    res.status(404).send('');
  }
  if (model){
  const index = models.indexOf(model);
  models.splice(index)
  }
  res.send(model);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
