const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
});

const activePage = () => {
   // const header = document.querySelector('header');
   // const barsBox = document.querySelector('.bars-box');


//    header.classList.remove('active');
//    setTimeout(() => {
//       header.classList.add('active');
//    }, 1100);
   navLinks.forEach(link => {
      link.classList.remove('active');
   });

//    barsBox.classList.remove('active');
//    setTimeout(() => {
//       barsBox.classList.add('active');
//    }, 1100);
    sections.forEach(section => {
      section.classList.remove('active');
   });

   menuIcon.classList.remove('bx-x');
   navbar.classList.remove('active');

}

navLinks.forEach((link, idx) => { 
   link.addEventListener('click', () => {
      if (!link.classList.contains('active')) {
         activePage();

         link.classList.add('active');

         setTimeout(() => {
            sections[idx].classList.add('active');
         }, 0); //1100
      }
   });
});

logoLink.addEventListener('click', () => {
   if (!navLinks[0].classList.contains('active')) {
      activePage();

      navLinks[0].classList.add('active');

      setTimeout(() => {
            sections[0].classList.add('active');
         }, 0); //1100

   }
});

const expBtns = document.querySelectorAll('.exp-btn');

expBtns.forEach((btn, idx) => {
       btn.addEventListener('click', () => {
        const expDetails = document.querySelectorAll('.exp-detail');

           expBtns.forEach(btn => {
              btn.classList.remove('active');
           });
           btn.classList.add('active');

                 expDetails.forEach(detail => {
              detail.classList.remove('active');
           });
           expDetails[idx].classList.add('active');

       });
} );

const arrowRight = document.querySelector('.project-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.project-box .navigation .arrow-left');

let index = 0;

const activeProject = () => {
   const imgSlide = document.querySelector('.project-carousel .img-slide');
   const projectDetails = document.querySelectorAll('.project-detail');

   imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

   projectDetails.forEach(detail => { 
      detail.classList.remove('active');
   });
   projectDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => { 
   if (index < 4) {
      index++;
      arrowLeft.classList.remove('disabled');
   }
   else {
      index = 5;
      arrowRight.classList.add('disabled');
      }

   activeProject();
});

arrowLeft.addEventListener('click', () => { 
   if (index > 1) {
      index--;
      arrowRight.classList.remove('disabled');
   }
   else {
      index = 0;
      arrowLeft.classList.add('disabled');
   }

   activeProject();
});

// EmailJS Configuration
(function() {
   emailjs.init("oLHv-CDyjnjoHmpdm"); // User's EmailJS public key
})();

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const emailInput = contactForm.querySelector('input[name="email"]');
const emailError = document.getElementById('email-error');

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real-time validation
emailInput.addEventListener('input', function() {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('show');
    emailError.classList.remove('hide');
  } else {
    emailError.classList.remove('show');
    emailError.classList.add('hide');
    setTimeout(() => {
      emailError.textContent = '';
      emailError.classList.remove('hide');
    }, 300);
  }
});

contactForm.addEventListener('submit', async (e) => {
   // Validate email before sending
   if (!validateEmail(emailInput.value)) {
     emailError.textContent = 'Please enter a valid email address.';
     emailError.classList.add('show');
     emailError.classList.remove('hide');
     emailInput.focus();
     e.preventDefault();
     return;
   }

   e.preventDefault();
   
   const submitBtn = contactForm.querySelector('.btn');
   const originalText = submitBtn.textContent;
   
   // Show loading state
   submitBtn.textContent = 'Sending...';
   submitBtn.disabled = true;
   
   try {
      // Get form data
      const formData = {
         name: contactForm.querySelector('input[name="name"]').value,
         email: contactForm.querySelector('input[name="email"]').value,
         phone: contactForm.querySelector('input[name="phone"]').value,
         subject: contactForm.querySelector('input[name="subject"]').value,
         message: contactForm.querySelector('textarea[name="message"]').value
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
         'service_kowbsva', // User's EmailJS service ID
         'template_qqv9sds', // User's EmailJS template ID
         {
            to_name: 'Puneet',
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            subject: formData.subject,
            message: formData.message
         }
      );
      
      if (response.status === 200) {
         // Success
         submitBtn.textContent = 'Message Sent!';
         submitBtn.style.background = '#28a745';
         contactForm.reset();
         
         // Reset button after 3 seconds
         setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
         }, 3000);
         
         // Show success message
         showNotification('Message sent successfully!', 'success');
      } else {
         throw new Error('Failed to send message');
      }
   } catch (error) {
      console.error('EmailJS Error:', error);
      // Error
      submitBtn.textContent = 'Failed to Send';
      submitBtn.style.background = '#dc3545';
      
      // Reset button after 3 seconds
      setTimeout(() => {
         submitBtn.textContent = originalText;
         submitBtn.style.background = '';
         submitBtn.disabled = false;
      }, 3000);
      
      // Show error message
      showNotification('Failed to send message. Please try again.', 'error');
   }
});

// Notification function
function showNotification(message, type) {
   // Remove existing notification
   const existingNotification = document.querySelector('.notification');
   if (existingNotification) {
      existingNotification.remove();
   }
   
   // Create notification element
   const notification = document.createElement('div');
   notification.className = `notification ${type}`;
   notification.textContent = message;
   
   // Style the notification
   notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      color: white;
      font-size: 1.6rem;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
   `;
   
   // Add to page
   document.body.appendChild(notification);
   
   // Animate in
   setTimeout(() => {
      notification.style.transform = 'translateX(0)';
   }, 100);
   
   // Remove after 5 seconds
   setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
         notification.remove();
      }, 300);
   }, 5000);
}