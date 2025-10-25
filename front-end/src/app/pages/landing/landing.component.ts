import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeFaq: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateStats();
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showPrivacyInfo() {
    alert('Privacy Policy\n\nWe respect your privacy and are committed to protecting your personal data. Your tasks and account information are securely stored and never shared with third parties without your explicit consent.\n\nFor more information, please contact us at support at todomaster.com');
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const targetValue = parseInt(target.getAttribute('data-target') || '0');
          this.animateNumber(target, 0, targetValue,2000);
        }
      });
    });

    stats.forEach(stat => observer.observe(stat));
  }

  animateNumber(element: HTMLElement, start: number, end: number, duration: number) {
    const startTime = performance.now();
    const targetValue = parseFloat(element.getAttribute('data-target') || '0');
    
    const updateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = start + (end - start) * progress;
      
      // Check if the target value is a decimal
      if (targetValue % 1 !== 0) {
        // Display as decimal (e.g., 4.9)
        if (progress >= 1) {
          // Animation complete, show exact target value
          element.textContent = targetValue.toFixed(1);
        } else {
          // During animation, show current value
          element.textContent = current.toFixed(1);
        }
      } else {
        // Display as integer with locale formatting
        element.textContent = Math.floor(current).toLocaleString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    requestAnimationFrame(updateNumber);
  }
} 