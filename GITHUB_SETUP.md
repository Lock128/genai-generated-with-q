# Activating CODEOWNERS in GitHub

To ensure the CODEOWNERS file is properly enforced in GitHub, follow these steps:

## 1. Configure Branch Protection Rules

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Navigate to "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"
5. In the "Branch name pattern" field, enter `main` (or your default branch name)
6. Check the following options:
   - "Require pull request reviews before merging"
   - "Require review from Code Owners"
   - "Include administrators" (optional, but recommended)
7. Set "Required approving reviews" to at least 1
8. Click "Create" or "Save changes"

## 2. Verify CODEOWNERS File Location

Ensure your CODEOWNERS file is in one of these locations:
- In the root directory (already done)
- In the `.github/` directory
- In the `docs/` directory

## 3. Testing the Setup

1. Create a test branch and make a small change
2. Submit a pull request to the protected branch
3. Verify that GitHub automatically requests reviews from the code owners (@username1 and @raphal)
4. Confirm that the PR cannot be merged until approved by at least one code owner

## Additional Notes

- The CODEOWNERS file follows a pattern similar to gitignore files
- Each line is a file pattern followed by one or more owners
- Order is important; the last matching pattern takes precedence
- GitHub Enterprise may have slightly different UI options

For more information, see [GitHub's documentation on CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).