const core = require('@actions/core');
const github = require('@actions/github');

const REGEX_PATTERN = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/i

const validEvent = ['pull_request'];

async function run() {
    try {
        const authToken = core.getInput('GITHUB_TOKEN', { required: true })

        const client = new github.getOctokit(authToken);

        const eventName = github.context.eventName;

        core.info(`Event: ${eventName}`);

        if (validEvent.indexOf(eventName) < 0) {
            core.setFailed(`Invalid event: ${eventName}`);
            return;
        }

        core.info(github.context.pull_request)
        
        const owner = github.context.payload.pull_request.base.user.login;

        const repo = github.context.payload.pull_request.base.repo.name;


        const { data: pullRequest } = await client.rest.pulls.get({
          owner,
          repo,
          pull_number: github.context.payload.pull_request.number
        });

        const title = pullRequest.title;
        
        core.info(`PR Title: "${title}"`);
        
        const commitsListed = await client.rest.pulls.listCommits({
          owner: repo.owner.login,
          repo: repo.name,
          pull_number: github.context.payload.pull_request.number,
        })
   
        core.info(`Pull request ${pullRequest}`)
        
        core.info(`Commit listed ${commitsListed}`)

        if (!REGEX_PATTERN.test(title)) {
            core.setFailed(`Pull Request title "${title}" doesn't match conventional commit message`);
            return
        }

       commitsListed.each((commit) => {
        core.info(commit.message)
        if(!REGEX_PATTERN.test(commit.message)) {
          core.setFailed(`Commit message title "${commit.message}" doesn't match conventional commit message`);   
        }
       })

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();