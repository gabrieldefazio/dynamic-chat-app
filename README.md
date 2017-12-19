## Technical Challenge Assignment for Dynamic Yield
### Demo: https://gabrieldefazio.github.io/dynamic-chat-app/

#### Bonus
For site at:
https://www.underarmour.com/en-us/mens/new-arrivals/g/39272

 Open browser dev tools and enter the following code snippet in the console to hide all products that cost more than $100.
```
$('.tile').each(i=>{
   const price = $('.tile')[i].children[5].innerText
   $('.tile')[i].style.visibility = +price.slice(1) > 100 ? "hidden" : "visible"
})