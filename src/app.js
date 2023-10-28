const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body

  const repository ={
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(repository)

  return  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
   const {id} = request.params

    const repository = repositories.find((item)=> item.id == id);
   
    if(repository == null){
      return response.status(400).send("Bad Request");
    }

    const {title, url, techs} = request.body
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    return response.json(repository);
    

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

    const repositoryIndex = repositories.findIndex((item)=> item.id == id);
    if(repositoryIndex < 0){
      return response.status(400).send("Bad Request");
    }
    const rep = repositories[repositoryIndex]; 
    repositories.splice(repositoryIndex,1)
    return response.status(204).send(rep);
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex((item)=> item.id == id);
  if(repositoryIndex < 0){
    return response.status(400).send("Bad Request");
  }
  const rep = repositories[repositoryIndex];
  rep.likes += 1;
   return response.json(rep);
});

module.exports = app;
