function name(){
  const slider = document.querySelector('.slider');
  const leftArrow = document.querySelector('.left');
  const rightArrow = document.querySelector('.right');
  const indicatorParents = document.querySelector('.controls ul')

  function setIndex(index) {
      document.querySelector('.controls .selected').classList.remove('selected')
      slider.style.transform = 'translate(' + (index) * -25 + '%)'
  }

  let sectionIndex = 0;

  document.querySelectorAll('.controls li').forEach((indicator, ind) => {
      indicator.addEventListener('click', function () {
          sectionIndex = ind;
          indicator.classList.add('selected')
          setIndex(sectionIndex)
      })
  })

  rightArrow.addEventListener('click', () => {
      sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3
      indicatorParents.children[sectionIndex].classList.add('selected')
      setIndex(sectionIndex)
  })
  leftArrow.addEventListener('click', () => {
      sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0
      indicatorParents.children[sectionIndex].classList.add('selected')
      setIndex(sectionIndex)
  })}
