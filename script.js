const paragraphs = [
        "The sun is a star located at the center of our solar system. It is the largest and most massive object in the solar system, accounting for about 99.86% of the total mass. The sun provides light and heat to the Earth, and its gravitational pull helps to keep the planets in their orbits.",
        "The Earth is the third planet from the sun and the fifth largest planet in the solar system. It has one natural satellite, the moon, which is the largest relative to its host planet in the solar system. Earth is the only known planet to have liquid water on its surface, and is home to a diverse range of life forms.",
        "The moon is the Earth's only natural satellite. It was formed about 4.5 billion years ago, shortly after the formation of the solar system. The moon has a significant effect on the Earth, as its gravitational pull causes tides and affects the rotation of the planet. It is also the location of the first human landing in 1969 by astronauts of the Apollo 11 mission.",
        "Mars is the fourth planet from the sun and is commonly referred to as the Red Planet. It is the second closest planet to Earth, and is often studied by scientists for the possibility of supporting life. Mars has a thin atmosphere, and its surface is covered with a layer of iron oxide, giving it a reddish appearance.",
        "Jupiter is the fifth planet from the sun and is the largest planet in the solar system. It is a gas giant, meaning that it is primarily composed of hydrogen and helium. Jupiter has a strong magnetic field and a large number of moons, including the four largest, known as the Galilean moons.",
        "The quick brown fox jumps over the lazy dog. This sentence is often used as a typing exercise to practice all the letters of the alphabet. It contains every letter at least once, making it a great way to improve your typing speed and accuracy. As you type this sentence repeatedly, try to focus on maintaining a good typing posture, using the correct finger positions, and minimizing errors. With regular practice, you'll gradually develop better typing skills and become more efficient at typing.",
  "The universe is a vast expanse of wonder and mystery. From the intricate dance of celestial bodies to the microscopic world of atoms, there is so much to explore. Scientists tirelessly uncover the secrets of the cosmos, revealing the beauty and complexity that surrounds us. Each discovery brings us closer to understanding our place in this vast tapestry of existence.",
  "Imagine standing at the edge of a breathtaking canyon, its walls carved over millions of years by the relentless force of nature. The sheer magnitude of the landscape leaves you in awe, a humbling reminder of the power and grandeur of our planet. As the wind whispers through the canyons, you can't help but feel a sense of wonder and reverence for the natural world.",
  "History is a tapestry woven with the threads of human triumphs and tragedies. It tells tales of great civilizations that rose and fell, of brave explorers who ventured into the unknown, and of revolutions that shaped the course of nations. Each era leaves its mark, shaping the world we inhabit today. By studying history, we gain insights into our collective past and a glimpse into the possibilities of our future.",
  "In the realm of art, creativity knows no bounds. Paintings come alive with vibrant colors, capturing emotions and stories within their strokes. Sculptures breathe life into stone, frozen in a moment of eternal beauty. Musicians weave melodies that touch our souls, transporting us to realms beyond our imagination. Art is a universal language that speaks to the depths of our humanity."
  
    ]

     const pg = document.getElementById('pg');
    const userinput = document.querySelector('.textinput');
    const resetbtn = document.querySelector('.containerin button');
    const totaltime = document.querySelector('.time .txt2');
    const totalwpm = document.querySelector('.wpm .txt2');
    const totalmistake = document.querySelector('.mistake .txt2');
    const totalcpm = document.querySelector('.cpm .txt2');
     const cop= document.getElementById('copy');
    let timer;
    
    let maxTime = 120;
    let timeRemaining = maxTime;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = 0;
      let wpm;
    const setparagraph = () => {
        const randIndex = Math.floor(Math.random() * paragraphs.length)
        pg.innerText = "";
        paragraphs[randIndex].split("").forEach(char => {
            // console.log(char);
            pg.innerHTML += `<span>${char}</span>`
        })

        pg.querySelectorAll('span')[0].classList.add('active');
        document.addEventListener("keydown", () => userinput.focus())
        pg.addEventListener("click", () => userinput.focus())

        totalmistake.innerText = 0;
        totalcpm.innerText = 0;
        totalwpm.innerText = 0;
        totaltime.innerText = timeRemaining;
    }



    const startTyping = () => {
        let characters = pg.querySelectorAll('span');
        // console.log(characters);
        //the
        //you
        let typedChar = userinput.value.split("")[charIndex];
        if (charIndex < characters.length - 1 && timeRemaining > 0) {
            if (!isTyping) {
                // 0 or false
                timer = setInterval(startTimer, 1000);
                isTyping = true;
            }

            if (typedChar == null) {
                if (charIndex > 0) {
                    charIndex--;
                    if (characters[charIndex].classList.contains("incorrect")) {
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("incorrect", "correct");
                }
            }
            else {
                if (characters[charIndex].innerText == typedChar) {
                    characters[charIndex].classList.add("correct");

                }
                else {
                    characters[charIndex].classList.add("incorrect");
                    mistakes++;
                }
                charIndex++;
            }

            characters.forEach(char => {
                char.classList.remove("active");
            })
            characters[charIndex].classList.add("active");

            // WPM is calculated by dividing the number of characters typed correctly (charIndex - mistakes) by 5 (the average number of characters per word) and dividing that result by the time it took to type those words (maxTime - timeRemaining), and then multiplying the result by 60 to convert to minutes.


           wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
            wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
            totalwpm.innerText = wpm;
            totalmistake.innerText = mistakes;
            totalcpm.innerText = charIndex - mistakes;
        }

        else{
          const t = document.getElementById('tips');
          t.innerText="The average typing speed is around 40 words per minute. To achieve a high level of productivity, aim for 60 to 70 words per minute instead. \n ";
          if(wpm<40)t.innerText=t.innerText+"Your typing speed stands at "+wpm+"words/min. you might want to improve a bit";
          if(wpm>40 && wpm<60)t.innerText=t.innerText+"Your typing speed stands at "+wpm+"words/min. you are above the avg human speed of writing. But there's always room for improvement";
          if(wpm>60 && wpm<70)t.innerText=t.innerText+"Your typing speed stands at "+wpm+"words/min. Congratulations! You have a very productive speed";
          if(wpm>70 && wpm<120)t.innerText=t.innerText+"Your typing speed stands at "+wpm+"words/min. You are awesome at it!! Keep going..";
          if(wpm>120)t.innerText=t.innerText+"Your typing speed stands at "+wpm+"words/min. You nailed it!!";
          
          
          cop.hidden=false;
            clearInterval(timer);
            isTyping = false;
        }
    }
    const startTimer = () => {
        if(timeRemaining >0){
            timeRemaining--;
            totaltime.innerText = timeRemaining;
            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
            totalwpm.innerHTMl = wpm;
        }
        else{
            clearInterval(timer);
            isTyping = false;
        }
     }
    const resetGame = () => {
        setparagraph();
        clearInterval(timer)
        timeRemaining = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = 0;
        userinput.value = "";
        totaltime.innerText = timeRemaining;
        totalwpm.innerText = 0;
        totalmistake.innerText = 0;
        totalcpm.innerText = 0;
         cop.hidden=true;
    }

    setparagraph();
    resetbtn.addEventListener('click', resetGame);
    userinput.addEventListener('input', startTyping);