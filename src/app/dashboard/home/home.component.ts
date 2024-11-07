import { Component, OnInit, HostListener } from '@angular/core';
import { QuestionsService } from '../../core/services/questionsApi/questions.service';
import { Questions } from '../../core/interfaces/questions';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Answers } from '../../core/interfaces/answers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  questions: Questions[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  selectedOption: string = 'TOP';
  currentQuestion: Questions | null = null;
  contentLoading: boolean = false; // this will check if the contennt is loaded succesffuly in response. So, loading screen can be loaded

  constructor(private questionsApi: QuestionsService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    if (this.isLoading || this.currentPage > this.totalPages) return;

    this.isLoading = true;
    this.contentLoading = true;
    this.questionsApi
      .getQuestions(this.currentPage, 50, this.selectedOption)
      .subscribe(
        (res) => {
          this.questions.push(...res.questions);
          this.totalPages = res.totalPages;
          this.currentPage++;
          this.isLoading = false;
          this.contentLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  postQuestion(questionForm: NgForm) {
    const body = {
      body: questionForm.value.question,
    };

    this.questionsApi.createQuestion(body).subscribe(
      (res) => {
        this.questions.unshift(res);

        setTimeout(() => {
          questionForm.reset();
        }, 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;

    this.questions = [];
    this.currentPage = 1;
    this.totalPages = 1;

    this.loadQuestions();
  }

  openDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.classList.remove('hidden');
    }
  }

  getAnswerFlag(event: any) {
    if (event) {
      const element = document.getElementById('answer-popup');
      const isHidden = element?.classList.contains('hidden');

      if (isHidden) return element?.classList.remove('hidden');
      element?.classList.add('hidden');
    }
  }

  getCurrentQuestion(event: Questions) {
    this.currentQuestion = event;
  }

  getAnswer(event: Answers) {
    if (event) {
      this.router.navigate([
        `d/${this.currentQuestion!.author._id}/q/${this.currentQuestion!._id}`,
      ]);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;

    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= documentHeight - 100) {
      this.loadQuestions();
    }
  }
}
