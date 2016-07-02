# clean-sublime-settings

## Description

Quickly remove comments and unpretty(fy) (not mininify) `*.sublime-settings`. I got tired of having to do this
manually and also sometimes pretty output makes reading settings almost impossible.

converts this:
```javascript
  {
    // save before running commands
    "save_first": true

    // if present, use this command instead of plain "git"
    // e.g. "/Users/kemayo/bin/git" or "C:\bin\git.exe"
    ,"git_command": false

    // if present, use this command instead of plain "gitk"
    // e.g. "/Users/kemayo/bin/gitk" or "C:\bin\gitk.exe"
    ,"gitk_command": false

    // point this the installation location of git-flow
    ,"git_flow_command": "/usr/local/bin/git-flow"

    // use the panel for diff output, rather than a new scratch window (new tab)
    ,"diff_panel": false

    // If you'd rather have your status command open files instead of show you a
    // diff, set this to true.  You can still do `Git: Status` followed by
    // 'Git: Diff Current File' to get a file diff
    ,"status_opens_file": false

    // Use --verbose flag for commit messages
    ,"verbose_commits": true

    // How many commit messages to store in the history. Set to 0 to disable.
    ,"history_size": 5

    // Show git flow commands
    ,"flow": false

    // Annotations default to being on for all files. Can be slow in some cases.
    ,"annotations": false

    // statusbar
    ,"statusbar_branch": true
    // Symbols for quick git status in status bar
    ,"statusbar_status": true
    ,"statusbar_status_symbols" : {"modified": "≠", "added": "+", "deleted": "×", "untracked": "?", "conflicts": "‼", "renamed":"R", "copied":"C", "clean": "✓", "separator": " "}

    // e.g. "Packages/Git/syntax/Git Commit Message.tmLanguage"
    ,"diff_syntax": "Packages/Diff/Diff.tmLanguage"

    // Rulers for commit view
    ,"commit_rulers": [70]
  }

```


to this:
```javascript
  {
    "save_first":true,
    "git_command":false,
    "gitk_command":false,
    "git_flow_command":"/usr/local/bin/git-flow",
    "diff_panel":false,
    "status_opens_file":false,
    "verbose_commits":true,
    "history_size":5,
    "flow":false,
    "annotations":false,
    "statusbar_branch":true,
    "statusbar_status":true,
    "statusbar_status_symbols":{"modified":"≠","added":"+","deleted":"×","untracked":"?","conflicts":"‼","renamed":"R","copied":"C","clean":"✓","separator":" "},
    "diff_syntax":"Packages/Diff/Diff.tmLanguage",
    "commit_rulers":[70]
  }
```


## Installation
`clone this repo`, `npm install` and create an alias in your shell to run this script with node, like...:
`alias clean_sublime_settings="node /path/to/this/repo's/index.js"`

## Command

`clean_sublime_settings -i /path/to/file.sublime-settings`

run command like 
```bash
  # or whatever your alias is... -i...
  clean_sublime_settings -i '/path/to/file.sublime-settings'
```

will pipe uncommented and unprettyfied version of sublime-settings file to process.stdout.

## PrettyOutput

If you want prettyoutput let me know and I'll modify the script. Or install `jq` with `brew` and and pipe to it like...

```shell
cleansublime -i ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/Preferences.sublime-settings|jq . -S
```

