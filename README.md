# SketchKbJS / 開発中

## 概要
SPA的な何かができるようになる予定。

## 
```js
new SketchKb({
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

## 更新履歴
### Ver0.0.0β
Release: 2023/02/05

<!--

## 概要
SketchKbJSは、非常にコンパクトでシンプルなSPAライブラリです。多くの機能やエラー処理は提供しません。

## 機能
```js
const Skb = new SketchKb({
    "PageName" : {
        
    }
});
```

```js
Skb.Route("hoge");
```
```html
<a href="/hoge"></a>
```

## 更新履歴

```json
{
    "PageName" : {
        "PathMode" : "History", // "None"
        "Bind" : false, // true
        "Run" : "Function",
        "Data" : {
            "Html" : [
                "<span>Code</span>",
                ["Path","#ID"],
                ["Path"]
            ],
            "Css" : [
                "Path"
            ],
            "Js" : [
                "Path"
            ],
            "#ID" : "<span>Code</span>"
        }
    }
}
```
Cache:

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