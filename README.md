# SketchKbJS / 開発中

## 概要
最小限の干渉で実装可能なSPAのフレームワーク

## 利用
```html
<script src="https://cdn.jsdelivr.net/gh/meziro039/sketchkbjs/dist/sketchkb.min.js"></script>
```
```js
const Skb = new SketchKb({
    "PagePath" : {
        "Bind" : false, // true
        "Cache" : false, // true
        "#ID" : {
            "Html" : [
                "<p>Code</p>",
                ["Path"]
            ],
            "Css" : [
                "Path"
            ],
            "Js" : [
                "Path"
            ]
        },
        Run : function() {

        }
    }
});
```

### Hello World
```html
<script src="https://cdn.jsdelivr.net/gh/meziro039/sketchkbjs/dist/sketchkb.min.js"></script>
<div id="Hello"></div>
<script>
    const Skb = new SketchKb({
        "/" : {
            "#Hello" : {
                "Html" : [
                    "Hello World"
                ]
            }
        }
    });
    Skb.Route("/");
</script>
```

### aタグの動作停止例
aタグの動作をキャンセルして、SPAを機能させます。`<button>`ではなく`<a>`を使うことでクローラーなどに良い影響を与えます。
```js
// "anchor"を<a>にクラス指定する
const elementsCancelAnchor = document.getElementsByClassName("anchor");
for (let i = 0;i < elementsCancelAnchor.length;i++) {
    elementsCancelAnchor[i].addEventListener("click", function(element){
        element.preventDefault();
    }, false);
};
```

## 更新履歴
### Ver0.0.0β
Release: 2023/02/05
- 概念実装

### Ver0.0.1β
Release: 2023/02/06
- キャッシュ機能追加
<!--
SessionStorageに取得したデータを格納する。何らかのエラー(利用不可/容量不足)でデータを格納できない場合は、毎回データを取得する。
-->

### Ver0.0.2β
Release: 2023/02/07
- キャッシュ有効化設定機能追加
- 上位コンポーネント展開機能追加
- 描画後制御実行機能追加
<!--
上位コンポーネントと同一IDを下位コンポーネントで設定すると上位コンポーネントのデータが消えるのは仕様。
-->

### Ver0.0.3β
Release: 2023/02/
- エラースキップ機能を追加
- コンポーネント機能を強化
<!--
下位コンポーネントが存在しない場合に上位コンポーネントに`/+`のように設定されたものがある場合それを読み込むというもの。なお`/`のようなものは読み込まれずエラーになる。`/*`同位,下位コンポーネントからのBind。`/+`指定された同位,下位コンポーネントが存在しない場合に読み込まれる。
-->

---

### 予定
- リファクタリング

<!--
PageNameには*が使えます。これはそれに続くすべてのパスに対して適応されるもので`hoge/*`とした場合`hoge/fuga`などに適応されます。なお、`hoge/fuga`を設定している場合はそちらが優先されます。なお、`Bind`を`true`にしている場合は`hoge/*`の内容が読み込まれた後に`goge/fuga`が読み込まれます。`*`としてすべてに共通のデータを読み込ませることも可能です。

/*
SketchKbは高度な機能を提供しません。同じ下地を使う場合`Base`の設定は同じ値を設定してください。同じ位置を指定していたとしてもSketchKbJSは異なるものと認識してデータの再読み込みを行います。
*/

もしもCSSやJavaScriptを埋め込みたい場合はHtmlを利用して`<script>`や`<style>`を利用してください。

特定階層下で利用する場合は、`Skb.Route("Path","追加する階層")`としてください。
注意 階層を指定する場合`/Forder`と指定してください。そうしない場合クリックするたびに存在しない階層を無限に追加します。

SketchKbは一見正常に動作しているように見える場合でもエラーが発生している場合があります。よくある例を以下に示します

Baseの概念廃止。



## FAQ

Q.無限にパスが追加されます。
A.`Skb.Route("hoge")`の様に設定している可能性があります。`https://example.com/hoge`にアクセスしたい場合は`Skb.Route("/hoge")`と設定してください。`/`が先頭に必要です。

Q.データが正しく取得されません。
A.`new SketchKb`を行った際に設定したPageIdが間違っている可能性があります。`https://example.com/hoge`にアクセスした際に表示させたい場合はPageIdに`/hoge`を指定してください。`/`が先頭に必要です。

絶対にDeploy機能で任意の利用者が投稿したデータを読み込まないでください。XSS攻撃が可能になります。

whileループやsetIntervalの抜け方はないのでexit()を移管時に実行する。
-->