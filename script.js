   

   let nav_hover=document.querySelector('.nav-hover');
   let list_item=document.querySelector('.toggle');
   let navbar=document.querySelector('.navbar');
   let details=document.querySelector('.details');
   let list_flex=document.querySelector('.list-flex');
   
   document.querySelectorAll('.smooth-scroll').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Get the target section id from the href attribute
                const targetId = this.getAttribute('href');
                
                // Scroll to the target section smoothly
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    
      
   nav_hover.addEventListener('click',()=>{
      
      let data1=list_item.classList.toggle('list-item');
      
      list_item.classList.toggle('list-flex');
      details.classList.toggle('hidden');
      details.classList.toggle('details');
      nav_hover.classList.toggle('nav-center')

      if(data1==true)
      {
        nav_hover.innerHTML=`<i class="fa-solid fa-xmark"></i>`;
      }
       else
      {
       nav_hover.innerHTML=`<i class="fa fa-bars"></i>`; 
      }
    
   });

   //db code msg

document.getElementById("sendMessage").addEventListener("click", function(event) {
    // Prevent default behavior
       event.preventDefault();
    // Get user input
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if(name.length<5)
    {
           alert("Please fill name full.");
        return;
        
    }
     if(!email.trimStart().match(/^[a-zA-Z]/)) {
     alert("Please fill email address correctly.");
     return;
     }


     if(message.length<30)
     {
        alert('message at list 10 world');
        return;
     }

    // Send data to backend
    fetch("http://localhost:5000/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
    

       
        alert("data inserted");
        
         document.getElementById("name").value ="";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    })
    .catch(error => console.error("Error:", error));
});

// css animation
function animateCounter(elementId, target, duration = 2000, interval = 20) {
    const element = document.getElementById(elementId);
    let count = 0;
    const steps = Math.ceil(duration / interval);
    const increment = target / steps;

    function updateCounter() {
        count += increment;
        if (count < target) {
            element.innerText = Math.ceil(count);
            setTimeout(updateCounter, interval);
        } else {
            element.innerText = target;
        }
    }

    updateCounter();
}

// Call function with different numbers
animateCounter("counter1", 500);
animateCounter("counter2", 1200, 3000); // Custom duration
animateCounter("counter3", 750, 2500, 30); 
animateCounter("counter4", 750, 2500, 30)// Custom duration and interval


const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 100); // Staggered delay effect
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));
