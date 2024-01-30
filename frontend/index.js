//const { response } = require("express");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // :point_down: WORK WORK BELOW THIS LINE :point_down:
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  async function fetchData(){ 
    try {
  const learners = await getLearner()
  const mentors = await getMentor();
  learnerCardMaker (learners, mentors)
    } catch(error){
      console.error(error.message)
    }
  }
  // setTimeout(() => {
  //   learnerCardMaker()
  // }, 1000);
  document.querySelector('.info').textContent =  'No learner is selected'
  const entryPoint = document.querySelector('.cards');
  function learnerCardMaker(learners, mentors) {
    const fullLearners = learners.map(learner => replaceMentorIdsWithNames(learner, mentors));
    // not sure what to insert into my funtion yet. Will come back and figure it out
    fullLearners.forEach(learner => {
      const learnerCard = document.createElement('div');
      const h3Name = document.createElement('h3');
      const emailDiv = document.createElement('div');
      const h4MentorsDropDown = document.createElement("h4");
      const ulMentorNames = document.createElement("ul");

      h3Name.textContent = `${learner.fullName}`;
      emailDiv.textContent = `${learner.email}`;
      h4MentorsDropDown.textContent = `Mentors`
      h4MentorsDropDown.classList.add('closed')
      learner.mentors.forEach(mentorName => {
        const liMentorNames = document.createElement('li');
        liMentorNames.textContent = `${mentorName}`
        ulMentorNames.appendChild(liMentorNames)
      })
      learnerCard.classList.add('card')
      h4MentorsDropDown.addEventListener('click', (event) => {
        const isOpened = h4MentorsDropDown.classList.contains('open')
        if (learnerCard.classList.contains('selected')){
          event.stopPropagation()
        }
        h4MentorsDropDown.classList.toggle('open', !isOpened)
        h4MentorsDropDown.classList.toggle('closed', !isOpened)
        if(isOpened){
          ulMentorNames.style.display = 'none'
        }else{
          ulMentorNames.style.display = 'block'
        }
      })
      learnerCard.appendChild(h3Name)
      learnerCard.appendChild(emailDiv)
      learnerCard.appendChild(h4MentorsDropDown)
      h4MentorsDropDown.appendChild(ulMentorNames)
      entryPoint.appendChild(learnerCard)
    })
    return entryPoint
  }
  async function getLearner() {
    const response = await axios.get(`http://localhost:3003/api/learners`)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.error(err)
      })
    return response
  }
  async function getMentor() {
   const response = await axios.get(`http://localhost:3003/api/mentors`)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.error(err)
      })
      return response
  }
  function replaceMentorIdsWithNames(learner) {
    const updatedMentors = learner.mentors.map(learnerMentorId => {
     // console.log("mentors:", mentors);
      const mentor = mentors.find(m => m.id === learnerMentorId);
      if (mentor) {
        return `${mentor.firstName} ${mentor.lastName}`;
      }
    });
    return { ...learner, mentors: updatedMentors };
  }
  document.querySelector('.cards').addEventListener('click', evt =>{
  console.log('loading')
document.querySelector('.info').textContent =  `The selected learner is ${learners.fullName}`
})
  
    
  // :point_up_2: WORK WORK ABOVE THIS LINE :point_up_2:
}
// :exclamation: DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()


// let learnersData = fetch('http://localhost:3003/api/learners')
// let mentorsData = fetch('http://localhost:3003/api/mentors')
// Promise.all([learnersData, mentorsData])
// .then(datas => {
//   datas.forEach(data => {
//     process(data.json())
//   })
// })
// .catch(err =>{
// console.log('There is an error', err.message)
// })

// let renderedData = data => {}

// let process = (prom) => {
//   prom.then(data =>{
//     let div = document.createElement('div')
//     div.textContent = 'cards'

//   })
// }
//document.querySelector('.info').textContent = 'No learner is selected'
// const fetchData = async () => {
//   try {
//     // Using Promise.all to fetch data from both endpoints concurrently
//     const [learnersData, mentorsData] = await Promise.all([
//       axios.get('http://localhost:3003/api/learners'),
//       axios.get('http://localhost:3003/api/mentors'),
//     ]);
    
//     return { learners: learnersData.data, mentors: mentorsData.data };
    
    
//   } catch (err){
//     console.log('promise rejected with an err.message-->', err.message)

//   }
// };
// const combinedData = await fetchData();

// const learnerAndMentor = combinedData.learners.map(learner => {
//   const mentorNames = learner.mentors.map(mentorId => {
//     console.log(mentorNames)
//     const mentor = combinedData.mentors.find(mentor => mentor.id == mentorId)
//     console.log(mentor)
//     return mentor ? mentor.name : 'unknown Mentor'
     
//   })
//   return {...learner, mentorNames}
 
// })

  
//   document.querySelector('.cards').addEventListener('click', async evt =>{
//   console.log('loading')
  
    
//   document.querySelector('.info').textContent = 'The selected learner is ${learners.fullname} "ID:"${id.value}'
    
// })
 


