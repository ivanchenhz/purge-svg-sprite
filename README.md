# purge-svg-sprite

## What is purge-svg-sprite?
Sort of like purge css, will purge the unused symbols in svg sprite...
Any symbol exists in the '-c glob path' will be kept in the purged result. 


## Getting Started

#### Installation

```
yarn add purge-svg-sprite -D or npm install purge-svg-sprite -D 
```

## Usage

```js
yarn purge-svg-sprite -c 'path/**/*.svelte' path/**/*.vue -i path/inputSprite.svg -o path/outputSprite.svg
```