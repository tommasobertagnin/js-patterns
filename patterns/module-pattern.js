/*------------------
 MODULE PATTERN
 A widely used template to create units of reusable code

 some details:
 - avoid polluting the global namespace
 - achieve privacy through closures
------------------*/

const mySecretBox = (()=>{
  const treasure = 'a bunch of pens and post-its..';
  const key = '01100001 01100010 01100011';

  return {
    seeTreasure: function (password) {
      if (password === key)
        console.log('aaaand the treasure is:', treasure);
      else
        console.log('Sorry, you don\'t know the abc of bits..');
    },
  };
})();

mySecretBox.seeTreasure();
