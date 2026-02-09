# Module 1: Getting Started

## What You'll Learn
- Set up your development environment
- Run the TODO app locally
- Understand the project structure

---

In this section you will learn how to run the demo TODO app on localhost so you can use it to complete the exercises.

## Prerequisites
#### Github account
Sign up via [github.com](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)

#### Install the homebrew
Install the package manager [homebrew](https://brew.sh) for easy installations (only for MacOS)  
Run this in the `Terminal` application (Cmd + Space -> Terminal)

  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
#### Install Git 
With Git installed on your machine, you allow your computer to connect with your github account. 

  ***MacOS*** (type the following in a Terminal windows and press Enter)
  ```bash
  brew install git
  ```
  ***Windows***    
  Download the Git software from [here](https://git-scm.com/install/windows). To verify if it has
  been installed correctly, run `git --version` in the Command Prompt. It should run without
  any errors.  

#### Install Node  
  ***MacOS***  
  ```bash
  brew install node
  npm --version ##Verify installation
  ```
  ***Windows***    
  Download it for your computer [here](https://nodejs.org/en/download). Always choose `LTS`
  versions for install.

#### An IDE ([Cursor](https://cursor.com), VSCode, or terminal-only)  
Install the IDE of your choice or choose to work with Terminal/Command Prompt depending on your OS.  

#### Forking the course material repository
[Fork this repository](https://github.com/kshruti22/ai-empowered-development-course/tree/main) through your Github account. Learn more about forking [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).  

#### Clone the course material repository
In this step, we will attempt to get a local copy of the repository you forked in your Github account, to make changes to it easily. 

  ***Cursor***    
  Open Cursor and select the `Clone via SSH` option. In the search bar, you should see your recent fork   if you have connected your Github account to Cursor.
  
  ***VSCode***  
  Open VSCode and select the `Clone Git repository` option. Select `Clone via Github` and follow
  the steps in the dialog.
  
  ***Terminal***  
  ```bash
  cd <path_where_you_want_to_clone_repo>
  git clone <your_repository_url>
  ```
#### Install claude  
  Open a new Terminal instance in Cursor. (Terminal Menu -> New Terminal)  
  
  ***MacOS***
  ```bash
  brew install claude-code
  ```
  ***Windows***   
  ```bash
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```
> [!WARNING]
> Before the next step, make sure you have switched to your repository folder i.e., ai-empowered-development-course. Otherwise, you will end up giving Claude access to all of your computer which can be dangerous.
  ```bash
  cd <path-to-ai-empowered-development-course>
  claude
  ```
This step should ask you for login details or throw an error. If so, move on to the next step.  

#### Access to Claude 
For Netlighters, follow **Step 2** in this [guide](https://docs.chat.netlight.com/guide/codepilot/tools/claude-code))  
> [!NOTE]
> To access the root or parent folder in your computer, i.e., `~` from `~/.claude.json` and `.claude/settings.json` do this:  
> **MacOS**: Open Finder -> Go to /Users/YourUsername -> Cmd + Shift + G -> Cmd + Shift + .  
> **Windows**: Open File Explorer -> Go to C:\Users\YourUsername\.claude\


#### FINAL STEP 
In your IDE -> New Terminal:
  ```bash
  claude
  ```
This should run without any login prompts or errors. If you are still getting an error, troubleshoot using **Step 9** from [this guide](https://docs.chat.netlight.com/guide/codepilot/tools/claude-code).  

#### Further steps
If you want to learn further about CLAUDE.md, memory management and advanced knowledge in agentic AI, read **Step 5 and onwards** from [this guide](https://docs.chat.netlight.com/guide/codepilot/tools/claude-code).

## Project Structure

```
ai-empowered-development-course/
├── index.html      # Main HTML markup - contains the app layout
├── styles.css      # All CSS styling for the app
├── main.js         # Application logic (add, delete, filter todos)
├── package.json    # Project dependencies and scripts
└── vite.config.js  # Vite configuration
```

**How it works:**
- `index.html` defines the structure (input field, buttons, todo list)
- `styles.css` styling
- `main.js` handles all the interactivity (adding todos, marking complete, filtering)

## Exercise: Run the TODO App
**Goal**: Get the TODO app running locally to verify your setup works

**Steps**:
1. Clone the repository (choose one option):

   **Option A: Clone directly (read-only)**
   ```bash
   git clone https://github.com/RBirkeland/ai-empowered-development-course
   cd ai-empowered-development-course
   ```

   **Option B: Fork and clone your fork (recommended)**
   ```bash
   # Fork the repository on GitHub first (click "Fork" on the repo page)
   git clone https://github.com/YOUR_USERNAME/ai-empowered-development-course
   cd ai-empowered-development-course
   ```

   **Why fork?** If you fork your own copy, you can push your exercise solutions and create pull requests; cloning directly gives you read-only access. For this bootcamp, we recommend forking so you can practice the full development workflow including commits, pushes, and PRs. If you just want to test without pushing anything you can go with Option A.

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open the app at the URL shown (typically `http://localhost:5173`)

5. Test: add a todo, mark it complete, delete it, try the filter buttons

**Exercise is complete when**: App loads without errors and all basic features (add, complete, delete, filter) work

---

[Next: Working with AI Agents →](2-working-with-ai-agents.md)
