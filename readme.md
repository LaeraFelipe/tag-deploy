# Tag deploy

Tag Deploy is an innovative solution designed to simplify the process of adding tags in Git, making it more efficient to configure projects for deployment. With this intuitive tool, you can easily add and manage tags, customizing the identification of specific points in your repository. In addition, Tag Deploy gives you the flexibility to configure specific environments for each tag, ensuring precise control over deployment destinations. Simplify your deployment workflow and gain more control over your projects with Tag Deploy

## Using

- Pull the project to your local machine.
- [Run npm install and npm link do assign `tag-deploy` command.](#link-configuration)
- [Rename the file tag-deploy-config.json.example to tag-deploy-config.json and modify with your projects infos.](#configuration)
- Run `tag-deploy` in your command line.

## Configuration

To configure the project, create a file in the root called 'tag-deploy-config'. If you prefer, use the sample configuration below as a starting point for your own configuration:

```json
{
  "global": {
    "deployments": [
      {
        "name": "homolog",
        "branch": "develop",
        "modifier": "-rc"
      },
      {
        "name": "production",
        "branch": "master"
      }
    ]
  },
  "projects": []
}
```

### Projects

You can configure the project manually by changing the JSON values in the 'tag-deploy-config' file, resulting in a configuration similar to the example below:

```json
{
  "global": {
    "deployments": [
      {
        "name": "homolog",
        "branch": "develop",
        "modifier": "-rc"
      },
      {
        "name": "production",
        "branch": "master"
      }
    ]
  },
  "projects": [{ "name": "", "path": "" }]
}
```

An alternative is to include the '--add' option before the project execution command. This tells the system that you want to add it and it will create an interface where you can manually enter the information or specify the path of a folder containing several projects. This way, you can select the projects you want to configure simultaneously.

```bash
tag-deploy --add
```

## Link configuration

To run the project from any directory in your terminal, you can create an npm link. To do this, simply access the folder where your project is located in the terminal and run the following command:

```bash
npm link
```

## Autores

- [@laerafelipe](https://www.github.com/LaeraFelipe)
- [@rennerborges](https://www.github.com/rennerborges)
