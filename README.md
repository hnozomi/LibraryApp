# 本貸し出し架空アプリ

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`


## コーディングルール
importの順番(間には空行)
1. React自身
2. ライブラリ
3. 自作コンポーネント(階層ごとにまとめる)
   近い階層から深い階層順
　 型のimportは一番下


hookの順序
1. useContext
2. useLocation
3. useState
4. カスタムフック
5. useNavigate
5. useEffect

初期データの定義をまとめてした。
useEffectはロジックが入るので、最後

分割方法
pages: 他の要素の組み合わせ。ロジックの読み込み(カスタムフックの呼び出し)
Layout: CSSをあてる
Organismis: Partsを組み合わせた要素
Parts: 最小の要素


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
"# LibraryApp" 


