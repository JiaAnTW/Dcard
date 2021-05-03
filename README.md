# Dcard 無限捲動

## 環境設定

-   node 版本: v12.19.0
-   安裝: `npm i`
-   開發: `npm start`
-   開發時的專案 url: http://localhost:8080/#/
-   打包: `npm run build`，打包後檔案會在 build 資料夾
-   打包 & 查看打包後的結果: `npm run demo`
-   打包後 demo 的 url: http://localhost:8081/#/

> 解決 CORS 的方案在開發時使用的是 webpack dev server 的 proxy，打包後使用的是自己寫的 node proxy(server.js)。

## 專案結構

```
src
|____components(共用元件)
|
|____data(存放redux設定)
|
|____routes(分頁設定)
|	|____Router.js(路由設定)
|	|____Page(頁面元素)
|		|____LocalComponent(頁面元件)
|
|____theme(global style設定)
|
|____utils(共用hook)
|
|____App.js(專案設定，如Provider、global style)
|____index.js(React程式進入點)

```

## 比較特別的元件介紹

### VirtualWindow

-   功能: 以原生 JS + React 實現在大量列表中，只渲染出會出現在畫面中的列表元素。
-   props:
    -   Container : ReactElement
        -   要作為容器的元素
    -   height : number
        -   單一列表元素的高度，每個列表都會是固定的高度
    -   ref : ReactRef
        -   這個 ref 會被綁定在 Container 上

```jsx
<VirtualWindow Container={PostList} height={155} ref={listRef}>
    {/* array elements */}
</VirtualWindow>
```

### useScrollBottomEffect

-   功能: 當監聽元素捲動到底部時，觸發 side effect
-   使用方式: 類似 useEffect

```javascript
// ref是要監聽的容器的ref
// 當ref捲動到底部時，會呼叫第一個參數callback
useScrollBottomEffect(callback, ref);

useScrollBottomEffect(() => {
    /* do someting when scroll to bottom */
}, ref);
```
