# reactive-storage
Simple reactive storage using a Proxy object

```javascript
let gameStorage = new Storage({level: undefined, score: undefined});

const observerLevel = (oldVal, newVal) => {
    console.log(`Change level: ${oldVal} -> ${newVal}`);
};
const observerScore = (oldVal, newVal) => {
    console.log(`Change score: ${oldVal} -> ${newVal}`);
};

gameStorage.subscribe('level', observerLevel);
gameStorage.subscribe('score', observerScore);

gameStorage.level = 1;                              // Change level: undefined -> 1
gameStorage.score = 123;                            // Change score: undefined -> 123

console.log(`Level: ${gameStorage.level}`);         // Level: 1
console.log(`Score: ${gameStorage.score}`);         // Score: 123

gameStorage.unsubscribe('level', observerLevel);
gameStorage.unsubscribe('score', observerScore);
```
