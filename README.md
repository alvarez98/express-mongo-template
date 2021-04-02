# Notifications Service

Notifications Service for Digital Window

## Getting Started :arrow_forward:

Instructions for configuration and deployment this project

### Prerequisites :clipboard:

- Install [NodeJS y NPM](https://nodejs.org/es/download/)
- Install [Docker](https://docs.docker.com/engine/install/) y [Docker-compose](https://docs.docker.com/compose/install/)

## Deployment :package:

### Run API

- Configure your environment variables on a .env file like in ´.env.example´

- Init your database and server with:

```sh
$ docker-compose up --build
```

- To start to mongo express interface just navigate to localhost on port 8081

### Run tests

- Create and fill `.env.test` file with the values in `.env.example`

- Create containers and run tests with:

```sh
$ docker-compose --env-file ./.env.test up -d
```

- Run following command for view logs:

```sh
$ docker-compose logs api
``` 
## Built With :hammer_and_wrench:

- [NodeJs](https://nodejs.org/es/)
  - [Express Framework](https://expressjs.com/es/)
- [Docker](https://docs.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/es)

## Contributing :family_man_man_boy:

Please read [CONTRIBUTING.md](https://www.aaaimx.org/cod) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning :triangular_flag_on_post:

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Future work :rocket:

## Contributors :family_man_man_boy:

- **Esteban Alvarez** - _Initial work_ - [@alvarez98](https://github.com/alvarez98)

## Credits :star:

- **A template to make good README.md** - _Base template_ - [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

## References :link:

1. 

## License :page_facing_up:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Made with ❤️ by [Esteban Alvarez](https://github.com/alvarez98) 