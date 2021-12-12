# Connecting to Postgres with Node.js

In this workshop, we'll be using the `node-postgres` package to allow Node to talk to our database. We will write scripts that execute the SQL queries you've been practicing.

We will be...

- setting up a postgres instance using Heroku
- using the `node-postgres` library to connect to our postgres
- sending a query to create a table
- sending a query and inserting our data into the table
- sending a query and reading data from the database

## Setting up a database in the cloud ☁️

The first step is to provision a real life data base! This will be running somewhere in Europe, and we will connect to it using the internet.

👉 Go to [heroku](https://signup.heroku.com/login) and sign up for a free account.

👉 Create a new app, give it a name and select the region as europe.

👉 Navigate to the resources tab of your new app.

👉 In the Add-ons search bar, type postgres and select Heroku Postgres.

👉 Select the `Hobby Dev - Free` plan and click `Submit Order Form`.

We now have a database set up for us to use. Now we need to find the connection settings. We call these credentials.

👉 Click the link to `Heroku Postgres`; this will open a new tab.

👉 Locate your credentials in the settings tab.

## Connecting to Postgres in Node.js

The aim for this section will be to set up our connection to the database we just provisioned. In the file `db/index.js`, we will require the things we need and then export a function that will allow us to send queries to our database throughout our application.

👉 Install the `node-postgres` package via `npm i pg` in your terminal. Once it's installed correctly, it should show up as a dependency in your `package.json`.

Now that we have our package installed, the next step is to set up a `pool`. A connection pool allows you to connect to the database once and then export the ability to query your database. You can then import this query function wherever you need to write a SQL query elsewhere in your application.

👉 To the docs! Use the [Suggested Project Structure](https://node-postgres.com/guides/project-structure) page in the `node-postgres` docs to guide you in setting up your `db/index.js` file.

## Keeping our database credentials secret

Credentials should be kept secret and not uploaded to GitHub. While it is possible to hard code our connection settings in the code, it is not good practice as if you pushed your code to GitHub and the repo was public, everyone can spam your database! (Luckily, our SoC repos are internal!)

👉 Put your connection settings in a `.env` file. Use the `.env.example` as a template. You can also check the [programmatic section in the docs about connecting here](https://node-postgres.com/features/connecting).

👉 Add `.env` to your `.gitignore`.

👉 Use [dotenv](https://www.npmjs.com/package/dotenv) to put your variables into the environment.

👉 For the argument to Pool(), instead of hard-coding, use your environment variables.

**Do not push any hard-coded Heroku credentials up to Github.**

## Using our query function

Now that we've set up our `pool` and exported our `query` method, we can use it to create our first table in the `script` folder within `db`.

👉 Make a file within `scripts` where you'll write the function to create your table. In this file:

- Require your `query` from `db/index.js`.
- Make an asynchronous function called `createTable`. In the body of the function, await the query function and store this in a variable `res`.
- As the argument to our query function, hand in the relevant SQL statement to create a table called `pokemon`. Check out the data in [pokemon-data.js](pokemon-data.js) so you can decide which/what type of columns your table needs.
- Create a meaningful console.log using your `res` variable so you know when the table has been created successfully.
- Call the function `createTable` below where you've defined it.

👉 Add a script to your `package.json` that will use Node to run your `createTable` file's filepath when you run the script with `npm run`.

👉 Run your create table script.

## Inserting data

👉 Make another file in `scripts` for your function to upload this data to your table. In this file:

- Require your `query` from `db/index.js`.
- Require your `pokemon` data.
- Make an asynchronous function called `populateTable`.
- In the body of the function, use JavaScript and SQL to insert each Pokemon into your table. Store the result of your query in `res`.
- Remember to use [paramaterised queries](https://node-postgres.com/features/queries) ($ syntax) for each value being passed in (e.g. $1, $2, etc.)!
- Create a meaningful console.log using `res` to show each pokemon is being added correctly.

👉 Add a script to your `package.json` to run this file with NPM.

👉 Run your populate table script.

## Create your API

### Requirements

| Method | Path                  | Additional Info | Result                                         | Response                                     |
| ------ | --------------------- | --------------- | ---------------------------------------------- | -------------------------------------------- |
| GET    | /pokemon              |                 | all pokemon                                    | { success: Boolean, payload: pokemon array } |
| GET    | /pokemon/<pokemon_id> |                 | pokemon with a particular id if it exists      | { success: Boolean, payload: pokemon }       |
| GET    | /pokemon              | ?search=saur    | all pokemon with "saur" in the name            | { success: Boolean, payload: pokemon array } |
| GET    | /pokemon              | ?type=grass     | all pokemon who have “grass” in the type array | { success: Boolean, payload: pokemon array } |
| POST   | /pokemon              | { body }        | create a new pokemon                           | { success: Boolean, payload: pokemon }       |
| PUT    | /pokemon/<pokemon_id> | { body }        | updated pokemon                                | { success: Boolean, payload: pokemon }       |
| DELETE | /pokemon/<pokemon_id> |                 | pokemon deleted                                | { success: Boolean, payload: pokemon }       |

Bonus:

| Method | Path                  | Additional Info | Result          |
| ------ | --------------------- | --------------- | --------------- |
| PATCH  | /pokemon/<pokemon_id> | { body }        | updated pokemon |

👉 In `models/pokemon.js`, create the functions that will use the `query` method to interact with the data in the table and return relevant data (e.g. getPokemon, getPokemonById, createPokemon, etc.). Export these functions from this file.

👉 In `routes/pokemon.js`, create the routes from the requirements table. Import and use the functions from your models to provide the correct response.

Remember to run your server and use Postman to send requests and check your responses!
