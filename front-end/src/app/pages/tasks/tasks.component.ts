import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService, Task } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskText: string = '';
  editingTaskId: number | null = null;
  editingTaskText: string = '';
  loading: boolean = false;
  error: string = '';
  isDemoMode: boolean = false;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isDemoMode = true;
      this.loadDemoTasks();
    } else {
      this.isDemoMode = false;
      this.loadTasks();
    }
  }

  // Load demo tasks for unauthenticated users
  loadDemoTasks(): void {
    this.tasks = [
      { id: 1, text: 'Complete project presentation', done: true, userId: 0 },
      { id: 2, text: 'Review code changes', done: false, userId: 0 },
      { id: 3, text: 'Plan team meeting', done: false, userId: 0 },
      { id: 4, text: 'Update documentation', done: true, userId:0}
    ];
  }

  // Load all tasks from backend
  loadTasks(): void {
    this.loading = true;
    this.error = '';
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        if (error.status === 419) { // Token expired or invalid, switch to demo mode
          localStorage.removeItem('token');
          this.isDemoMode = true;
          this.loadDemoTasks();
          this.error = 'Session expired. You are now in demo mode.';
        } else {
          this.error = 'Failed to load tasks';
        }
        this.loading = false;
      },
    });
  }

  // Create new task
  addTask(): void {
    if (!this.newTaskText.trim()) {
      return;
    }

    if (this.isDemoMode) {
      // Add task to demo mode
      const newTask: Task = {
        id: Date.now(),
        text: this.newTaskText.trim(),
        done: false,
        userId: 0
      };
      this.tasks.push(newTask);
      this.newTaskText = '';
      return;
    }

    this.loading = true;

    this.tasksService.createTask(this.newTaskText.trim()).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.newTaskText = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error adding task:', error);
        this.error = 'Failed to add task';
        this.loading = false;
      },
    });
  }

  // Start editing a task
  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editingTaskText = task.text;
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingTaskId = null;
    this.editingTaskText = '';
  }

  // Update task text
  updateTask(taskId: number): void {
    if (!this.editingTaskText.trim()) {
      return;
    }

    if (this.isDemoMode) {
      // Update task in demo mode
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].text = this.editingTaskText.trim();
      }
      this.cancelEdit();
      return;
    }

    this.loading = true;

    this.tasksService
      .updateTask(taskId, this.editingTaskText.trim())
      .subscribe({
        next: () => {
          const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
          if (taskIndex !== -1) {
            this.tasks[taskIndex].text = this.editingTaskText.trim();
          }
          this.cancelEdit();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.error = 'Failed to update task';
          this.loading = false;
        },
      });
  }

  // Toggle task done status
  toggleTaskDone(task: Task): void {
    if (this.isDemoMode) {
      // Toggle task in demo mode
      task.done = !task.done;
      return;
    }

    this.loading = true;

    this.tasksService.toggleTaskDone(task.id).subscribe({
      next: (updatedTask) => {
        // Update the task with the response from the backend
        if (updatedTask && updatedTask.done !== undefined) {
          task.done = updatedTask.done;
        } else {
          // Fallback: toggle locally if backend doesn't return the updated task
          task.done = !task.done;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error toggling task:', error);
        this.error = 'Failed to update task status';
        this.loading = false;
      },
    });
  }

  // Delete task
  deleteTask(taskId: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    if (this.isDemoMode) {
      // Delete task in demo mode
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      return;
    }

    this.loading = true;

    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.error = 'Failed to delete task';
        this.loading = false;
      },
    });
  }

  // Login
  login(): void {
    this.router.navigate(['/auth']);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    //this.isDemoMode = true;
    //this.loadDemoTasks();
    //this.error = 'You have been logged out successfully. You are now in demo mode.';
    // Navigate back to landing page after a short delay
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  // Get completed tasks count
  get completedTasksCount(): number {
    return this.tasks.filter((task) => task.done).length;
  }

  // Get pending tasks count
  get pendingTasksCount(): number {
    return this.tasks.filter((task) => !task.done).length;
  }

  // Track by function for ngFor performance
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
