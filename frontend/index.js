async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

document.querySelector('.info').textContent = 'No learner is selected'

const fetchData = async () => {
  try {
    // Using Promise.all to fetch data from both endpoints concurrently
    const [learnersData, mentorsData] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors'),
    ]);

    return { learners: learnersData.data, mentors: mentorsData.data };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Propagate the error to handle it in the next catch block
  }
};

// Call fetchData to get combined data from both endpoints
const combinedData = await fetchData();

// Combine data into a single data structure
const learnersWithMentors = combinedData.learners.map(learner => {
  const mentorNames = learner.mentors.map(mentorId => {
    const mentor = combinedData.mentors.find(mentor => mentor.id === mentorId);
    return mentor ? mentor.name : 'Unknown Mentor';
  });

  return { ...learner, mentorNames };
});


  
  document.querySelector('.cards').addEventListener('click', async evt =>{
  console.log('loading')
  
    try {
  document.querySelector('.info').textContent = 'The selected learner is ${learners.fullname} "ID:"${id.value}'
    }

    catch {
      console.log('Error fetching learners:', error.message)
    }
})
 


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
