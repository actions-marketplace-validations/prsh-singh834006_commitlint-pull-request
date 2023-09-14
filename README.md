<div align="center"><h1>Validate pull request title and commits with conventional commit</h1></div>

This action is an open pull request.

## Configuration with

The following settings must be passed as environment variables as shown in the
example.

| Key                | Value                                       | Suggested Type | Required | Default              |
| ------------------ | ------------------------------------------- | -------------- | -------- | -------------------- |
| `GITHUB_TOKEN`     | Github token.                      | `secret env`   | **Yes**  | N/A                  |

## Example usage

```yml
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Commitlint Pull Request
        uses: prsh-singh834006/commitlint-pull-request@0.0.1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```
