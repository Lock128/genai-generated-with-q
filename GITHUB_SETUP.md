# Setting Up CODEOWNERS in GitHub

To activate and leverage the CODEOWNERS file in GitHub, follow these steps:

## 1. Repository Settings

1. Go to your repository on GitHub: https://github.com/Lock128/genai-generated-with-q
2. Click on "Settings" (requires admin privileges)
3. Navigate to "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"

## 2. Configure Branch Protection

For your main branch (likely `main` or `master`):

1. Enter the branch name pattern (e.g., `main`)
2. Check "Require pull request reviews before merging"
3. Set "Required approving reviews" to 1
4. Check "Require review from Code Owners"
5. Optionally, configure additional protections as needed:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators (applies rules to admins as well)

## 3. Save Your Changes

Click "Create" or "Save changes" to apply these settings.

## 4. Verification

After setting up, GitHub will automatically:
- Identify the code owners for files changed in a PR
- Request reviews from those owners
- Prevent merging until required reviews are obtained

The CODEOWNERS file is now active and will be used by GitHub to enforce review requirements.