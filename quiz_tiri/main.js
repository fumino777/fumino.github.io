'use strict';

{

  let quizSet = [
    {q: '日本で一番面積の小さい県は', c:['香川県', '埼玉県', '神奈川県']},
    {q: '世界で二番目に大きな国は?', c:['カナダ', 'アメリカ', '中国']},
    {q: '世界で三番目に大きな国は?', c:['アメリカ', '中国', 'ブラジル']},
    {q: '世界で四番目にGDPが高い国は?', c:['ドイツ', 'インド', 'フランス']},
    {q: '2020年、世界で四番目にGDPが高い国は?', c:['ドイツ', 'インド', 'フランス']},
    {q: '2020年、三番目に人口が多い国は?', c:['アメリカ', 'インドネシア', 'パキスタン']},
    {q: '日本で一番面積の大きい都道府県は?', c:['北海道', '長野県', '沖縄県']},
    {q: '日本で一番高い山は?', c:['富士山', '白峰三山', '穂高連峰']},
  ];


  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scorelabel = document.querySelector('#result > p');
  const questioncount = document.querySelector('#atama > p')
  const wrongul = document.getElementById('wrongsectionul');
  const pro = document.getElementById('pronounce');

// クイズセット
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

