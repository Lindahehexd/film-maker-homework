# Film Maker

此作品主要使用 Next13, TypeScript, Chakra UI 開發。

## 設計規格

以下規格參考 Figma 檔案(非公開網址)。

### Layout

- 尺寸: 1440 x 4592 (px)

### 導覽列

- 字型: Apercu / Italic / Bold / 40px

- 高度: 96 (px)

### 卡片

- 左卡片尺寸: 474 x 373 (px)

- 右卡片尺寸: 811 x 320 (px)

### 影片

- 寬度: 1440px

### 過場文字

- 字型: Apercu / Italic / Bold / 32px

### 滾動區塊

- 圖片: 400 x 800 ( gap: 30px )
- 邊距: marin left = 30px / mb: 273px

## 實作部分說明

此段將會針對下方幾個部分做簡單的說明，詳細內容請參考代碼 :

- Layout
- Font
- Features
  - Header
  - ShuffleCards
  - Video
  - HorizontalCards

### Layout

首先，預先設定好佈局尺寸後，再將元件個別匯入，避免開發上處理佈局問題。

![Imgur](https://i.imgur.com/A62hM51.png)

### Font

透過 Chakra UI 的 custom theme，將文字設定為 Apercu。

```
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Apercu",
  },
});

export default theme;
```

### Features

以下將針對實作的 features 做說明，共 4 個項目，每個項目皆有其目標與應對方法:

Header :

- 目標:

  - 往下滑動 scrollTop > 300px 後隱藏 Header。
  - 並於滾輪向上捲動時觸發顯示 Header。
  - 隱藏及顯示的過程請加上 transition 讓畫面流暢。

- 方法:
  - 使用 useState 去判斷當前 windowScrollY 的參數，如果>300 則隱藏導覽列，反之則顯示。
  - 為了達到畫面流暢，於 CSS 新增 transition。

ShuffleCards :

- 目標:
  - 卡片點擊時觸發切換動畫、並使用透視視角確保視覺接近真實視角。
  
- 方法:

  - 邏輯

    - 針對每個卡片，使用 CSS keyframe 製作兩個動畫。
    - 通過更改狀態（isMoved / isCard2Moved / index）來觸發動畫。
    - 使用三元式判斷: 當點擊時，各別觸發動畫，並在重新點擊時，執行另外一個動畫。
    - 點擊當下，zindex 會切換達到卡片上下效果。
    - 為避免初始渲染會執行動畫，另外這一個 useState 初始值為 0。

  - 點擊卡片後:
    ```
    const handleClick = () => {
    setIsMoved(!isMoved); //觸發卡片1的動畫（動畫1、動畫2）
    setIsCard2Moved(!isCard2Moved); //觸發卡片2的動畫（動畫1、動畫2）
    setIndex(index === 1 ? 2 : 1); //在點擊時改變zindex值，切換卡片上下
    setInit(1); //將初始值從0設置為1以觸發動畫
    }
    ```

Video:

- 目標:

  - Entry ratio 大於 30% 後播放影片, 小於時主動暫停播放。
  - 當 invisible 時，主動將播放進度 reset 回 time = 0。

- 方法:
  - 使用 useRef 去控制 Vedio Block 的 DOM 元素。
  - 使用兩個 useEffect 去針對影片去操作:
    - 第一個 useEffect 控制可視範圍內 30%~70%內的動作邏輯 (進入後播放，離開後暫停，返回後播放)。
    - 第二個 useEffect 去控制 可視範圍外 (>100%) 的動作邏輯 (若影片不在可視範圍內，則影片秒數為 0)。

ScrollCard:

- 目標:
  - 當滑鼠進入該區塊時，效果滾動的效果為橫向移動。
- 方法:
  - 使用 useRef 去控制區塊內的 DOM 元素，並使用 onWheel 去監聽滾動事件。
  - 當滾輪向上滾動時，容器元素向左滾動 30 像素，向下滾動時，容器元素向右滾動 30 像素，達到橫向滾動的效果。
  - CSS 方面，使用 overScrollX + flexShrink = 0 實現區塊內圖片不會被縮減，超過則會顯示滾輪。
  - 用 display:none 的方式隱藏滾動條 (overflowX 如果用 hidden 會無法用 contain) 然後用 cooverscrollBehavior="contain" 限制區塊外面(瀏覽器)的垂直滾動，因此就能達到區塊內橫向滾動，而瀏覽器不會同時垂直滾動的效果。

## Contacts

tkd09152129@gmail.com
