# README

## 安装

`npm install hr-scripts -g`

## 例子

`hr-scripts -a [Github Token]  --progress --repo laravel/framework`


## 帮助

```
Usage: hr-scripts -r [owner/repo]

选项：
  --version       显示版本号                                              [布尔]
  --repo, -r      Query metionableUsers from Github's repository (owner/repo).
                                                                 [字符串] [必需]
  --token, -a     Personal access toekn (See more:
                  https://github.com/settings/tokens)            [字符串] [必需]
  --output, -o    输出的文件格式, xlsx, json 两种可选                   [字符串]
  --progress, -p  Show progress.                                          [布尔]
  -h, --help      Show help.                                              [布尔]

缺少这些必须的选项：repo, token
```
