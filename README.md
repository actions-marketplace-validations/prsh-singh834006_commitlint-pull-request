<div align="center"><h1>Validate pull request title with conventional commit</h1></div>

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
      - name: Conventional Pull Request Validator
        uses: prsh-singh834006/validate-pr-title@0.0.1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```
