'use strict';

{
  
  
  let quizSet = [];
  quizSet = [
  {q: '手塚治虫の作品「ブラックジャック」の主人公の名前は', c:['間黒夫', '黒井雄一', 'ジェームズブラック']},
  {q: '「名探偵コナン」のベルトの機能は', c:['サッカーボールが出てくる', '通信障害を起こさせる', '充電ができる']},
  {q: '「ドラゴンボール」のブロリーが登場する最初の映画は', c:[' ドラゴンボールZ 燃えつきろ!!熱戦・烈戦・超激戦', 'ドラゴンボールZ 危険なふたり!超戦士はねむれない', 'ドラゴンボールZ ブロリー']},
  {q: '「鬼滅の刃」の鬼殺隊の下から３番目の階級は', c:['かのと', 'つちのと', 'ひのと']},
  ];
  

  

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scorelabel = document.querySelector('#result > p');
  const questioncount = document.querySelector('#atama > p')
  const wrongul = document.getElementById('wrongsectionul');
  const pro = document.getElementById('pronounce');

// // クイズセット
// const partnum = document.querySelector('#list > p');
// const partnumbox = document.getElementById('list');
// partnum.textContent = 'part1 list';
// partnumbox.appendChild(partnum);


// 分野





  let currentNum = 0;
  let isAnswerd;
  let score = 0;
  const wrongset = [];
  
  if(wrongset){
    wrongset.length = 0;
  }

  pro.addEventListener('click', () => {
    let u = new SpeechSynthesisUtterance();
    u.lang = 'ja';
    u.text = question.textContent;
    speechSynthesis.speak(u);
  });

  
  function shuffle(arr){
    for(let i = arr.length -1;i>0;i--){
      const r = Math.floor(Math.random()*(i+1));
      const tmp = arr[i];
      arr[i] = arr[r];
      arr[r] = tmp;
    }
    return arr;
  }
  

  // 制誤判定
  function checkanswer(li){
    if(isAnswerd){
      return;
    }
    isAnswerd = true;
    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    }else{
      li.classList.add('wrong');
      wrongset.push({q:`${quizSet[currentNum].q}`, a:`${quizSet[currentNum].c[0]}`});

    }
    btn.classList.remove('disabled');
  }

  
  // クイズをセットする関数
  function setQuiz(){
    questioncount.textContent = `Question: ${currentNum + 1}`;
    
    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    
    isAnswerd = false;
    question.textContent = quizSet[currentNum].q;
    const shuffledchoices = shuffle([...quizSet[currentNum].c]);
    
    shuffledchoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
      checkanswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length -1){
      btn.textContent = 'show score';
    }
    
  }

  // クイズをセットする
  setQuiz();

  btn.addEventListener('click', ()=>{
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');


    // クイズが終わったら
    if(currentNum === quizSet.length -1){
      scorelabel.textContent = `score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
      

    // 間違えボックス
      
      wrongset.forEach((w, index) =>{
        const wrongq = document.createElement('li');
        const wronga = document.createElement('p');
        wrongq.textContent = `${wrongset[index].q}:`;
        wronga.textContent = `${wrongset[index].a}`;
        wrongul.appendChild(wrongq);
        wrongul.appendChild(wronga);
      });
    // クイズが終わってない場合
    }else{
    currentNum++;
    setQuiz();
    }

  });


  // リスト
  quizSet.forEach((list, index) => {
    const list_ul = document.getElementById('listul');
    const list_li = document.createElement('li');
    list_li.textContent = `${quizSet[index].q} - ${quizSet[index].c[0]}`;
    list_ul.appendChild(list_li);
  })
}

