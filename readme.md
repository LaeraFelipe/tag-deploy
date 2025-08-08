# Tag Deploy

**Tag Deploy** is a lightweight CLI tool that simplifies the process of adding and managing Git tags, making it easier to prepare projects for deployment.

With an intuitive interface, you can:

* Quickly create and manage tags.
* Configure custom identifiers for specific points in your repository.
* Define distinct deployment environments for each tag.
* Maintain precise control over deployment destinations.

Streamline your deployment workflow and gain more control over your projects with **Tag Deploy**.

---

## 📦 Installation & Usage

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```
2. Install dependencies and link the command globally:

   ```bash
   npm install
   npm link
   ```
3. Rename the example config file:

   ```bash
   mv tag-deploy-config.json.example tag-deploy-config.json
   ```
4. Edit the configuration file with your project details.
5. Run:

   ```bash
   tag-deploy
   ```

---

## ⚙️ Configuration

Create a file in the root directory called `tag-deploy-config.json`.
You can use the example below as a starting point:

```json
{
  "global": {
    "editor": "code -w",
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

---

### 📂 Projects

You can manually configure projects by editing the `projects` array in `tag-deploy-config.json`:

```json
{
  "global": {
    "editor": "code -w",
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
  "projects": [
    { "name": "project-1", "path": "/path/to/project-1" }
  ]
}
```

Alternatively, you can use the interactive setup:

```bash
tag-deploy --add
```

This allows you to:

* Add a project manually.
* Provide a folder path containing multiple projects and select the ones you want to configure simultaneously.

---

## 🔗 Link Configuration

To run `tag-deploy` from any directory, link it globally:

```bash
npm link
```

---

## 📜 CLI Options

* `tag-deploy --config` → Opens the configuration file in your chosen editor (set in the `global.editor` field).
* `tag-deploy --report` → Displays a table of all configured projects with their tag information.

---

## 👥 Authors

* [@laerafelipe](https://github.com/LaeraFelipe)
* [@rennerborges](https://github.com/rennerborges)
