import { Component, OnInit, HostListener } from '@angular/core';
import { QuestionsService } from '../../core/services/questionsApi/questions.service';
import { Questions } from '../../core/interfaces/questions';

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

  constructor(private questionsApi: QuestionsService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    if (this.isLoading || this.currentPage > this.totalPages) return;

    this.isLoading = true;
    this.questionsApi.getQuestions(this.currentPage, 50, 'TOP').subscribe(
      (res) => {
        this.questions.push(...res.questions);
        this.totalPages = res.totalPages;
        this.currentPage++;
        this.isLoading = false;
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
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
