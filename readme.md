# CC SOLO API Project - Tsuttakater - 
このリポジトリはCode Chrysalisの生徒であるときに作成しました  
This was created during my time as a student at Code Chrysalis

## 概要
TsuttaketerではAPIエンドポイントを利用してつぶやきの投稿と各ユーザのつぶやきの取得ができます。

## 使い方

### Usersエンドポイント

|エンドポイント|メソッド|説明|リクエストボディ|
|-|-|-|-|
|/api/users|GET|全ユーザのリストを返します|-|
|/api/users/:userId|GET|指定したIDのユーザ情報とそのユーザのつぶやきの一覧を返します|-|
|/api/users|POST|ユーザを登録します|{ "username": string }|
|/api/users/:userId|PATCH|ユーザ情報を変更します|{ "username": string }|
|/api/users/:userId|DELETE|ユーザを削除します|-|

### Tweetsエンドポイント
Tweetsエンドポイントはユーザを指定して実行します
|エンドポイント|メソッド|説明|リクエストボディ|
|-|-|-|-|
|/api/users/:userId/tweets|GET|指定したユーザのつぶやきの一覧を返します|-|
|/api/users/:userId/tweets/:tweetId|GET|指定したユーザの指定したつぶやきを返します|-|
|/api/users/:userId/tweets|POST|指定したユーザでつぶやきを投稿します|{ "text": string }|
|/api/users/:userId/tweets/:tweetId|PATCH|指定したユーザの指定したつぶやきを変更します|{ "text": string }|
|/api/users/:userId/tweets/:tweetId|DELETE|指定したユーザの指定したつぶやきを削除します|-|