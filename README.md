# LiSA Navi
とある学校の校内マップサイト

> [!Caution]
> 使用・編集は学校関係者のみです。
> 上記以外の方は、一切コミットは受け入れませんのでご了承ください。

> [!Important]
> 編集者向けの情報のみ述べています。一般の方は気にしないでください。

## プロジェクト編集者メモ
```
ここらへんにToDoリストとか書いてもいいかも
```


## ファイル構成

### HTML

`index.html`

トップページとして表示されるサイト。

`map.html`

index.htmlに埋め込みとして利用されている。主にマップ画像。


### CSS

`index.css`

UIなどの装飾。

`map.css`

マップ画像のサイズ調整などに使用。


### JavaScript

`index.js`

UIの動作などをメインに処理。

`map.js`

埋め込みのズームや教室強調表示が組み込まれている。

`data.js`

変数専用。画像内の教室の座標が原始的に組み込まれている。
