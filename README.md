# bunnai

<p align="center">
  <img src="https://github.com/chhoumann/bunnai/assets/29108628/1ec69e68-7d5e-4a4d-b4d6-56e202e1c54c">
</p>

have ai write commit messages for you in [lazygit](https://github.com/jesseduffield/lazygit).

uses openai to generate commit message suggestions based on the diff between the current branch and master.
then you can select a commit message from the list and use it to commit your changes.

## installation

```sh
bun install -g @chhoumann/bunnai
```

set up with your openai api key & preferred model:

```sh
bunnai config
```

## usage

you can specify custom templates. use `bunnai config` to edit the templates.
when you invoke `bunnai`, you can specify a template name to use with `--template`.

### as a menu

this creates a menu of commit messages based on the diff between the current branch and master.

insert the following custom command into your [lazygit](https://github.com/jesseduffield/lazygit) config file:

```yaml
customCommands:
    - key: "<c-a>" # ctrl + a
        description: "pick AI commit"
        command: 'git commit -m "{{.Form.Msg}}"'
        context: "files"
        prompts:
            - type: "menuFromCommand"
            title: "ai Commits"
            key: "Msg"
            command: "bunx bunnai"
            filter: '^(?P<number>\d+)\.\s(?P<message>.+)$'
            valueFormat: "{{ .message }}"
            labelFormat: "{{ .number }}: {{ .message | green }}"
```

### with vim

this allows you to edit the commit message in vim after you've selected it from the menu.

abort comitting by deleting the commit message in vim.

```yaml
customCommands:
    - key: "<c-a>" # ctrl + a
      description: "Pick AI commit"
      command: 'echo "{{.Form.Msg}}" > .git/COMMIT_EDITMSG && vim .git/COMMIT_EDITMSG && [ -s .git/COMMIT_EDITMSG ] && git commit -F .git/COMMIT_EDITMSG || echo "Commit message is empty, commit aborted."'
      context: "files"
      subprocess: true
      prompts:
          - type: "menuFromCommand"
            title: "AI Commits"
            key: "Msg"
            command: "bunx bunnai"
            filter: '^(?P<number>\d+)\.\s(?P<message>.+)$'
            valueFormat: "{{ .message }}"
            labelFormat: "{{ .number }}: {{ .message | green }}"
```

## using with Ollama (local LLM)

You can use bunnai with local models via [Ollama](https://ollama.com/):

1. Install and run Ollama (see [Ollama docs](https://ollama.com/)).
2. Start a model, e.g.:

    ```sh
    ollama run llama3
    ```

3. Configure bunnai to use Ollama:

    ```sh
    bunnai config
    # Set provider to "ollama"
    # Set Ollama endpoint (default: http://localhost:11434)
    # Set Ollama model (e.g. llama3, phi3, etc)
    ```

4. Use bunnai as usual. Commit messages will be generated using your local Ollama model.

## acknowledgements

check out these other projects that inspired this one:

- <https://github.com/BuilderIO/ai-shell>
