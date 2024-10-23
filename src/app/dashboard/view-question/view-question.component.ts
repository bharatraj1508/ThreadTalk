import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../core/services/questionsApi/questions.service';
import { AnswersService } from '../../core/services/answersApi/answers.service';
import { Answers } from '../../core/interfaces/answers';
import { Questions } from '../../core/interfaces/questions';
import { formatDate } from '../../core/util/helperFunction';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css'], // Fixed 'styleUrl' to 'styleUrls'
})
export class ViewQuestionComponent implements OnInit {
  uid: string = '';
  qid: string = '';
  question: Questions | null = null;
  answers: Answers[] = [];
  formatedDate: string = '';
  currentPage: number = 1;
  hasMoreAnswers: boolean = true;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private answersApi: AnswersService,
    private questionApi: QuestionsService
  ) {
    this.route.params.subscribe((params) => {
      if (params['uid'] && params['qid']) {
        this.uid = params['uid'];
        this.qid = params['qid'];
      }
    });
  }

  ngOnInit(): void {
    this.loadQuestion();
    this.loadAnswers();
  }

  loadQuestion() {
    this.questionApi.getSingleQuestion(this.qid).subscribe(
      (res) => {
        this.question = res;
        this.formatedDate = this.dateFormat(this.question.created_at);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadAnswers() {
    if (!this.hasMoreAnswers || this.isLoading) return;

    this.isLoading = true;
    this.answersApi.getAnswwers(this.qid, this.currentPage, 5).subscribe(
      (res) => {
        if (res.answers.length > 0) {
          this.answers = [...this.answers, ...res.answers];
          this.currentPage++;
        } else {
          this.hasMoreAnswers = false;
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  dateFormat(t: string) {
    return formatDate(t);
  }

  getAnswerFlag(event: boolean) {
    if (event) {
      const element = document.getElementById('answer-popup');
      const isHidden = element?.classList.contains('hidden');

      if (isHidden) return element?.classList.remove('hidden');
      element?.classList.add('hidden');
    }
  }

  getAnswer(event: Answers) {
    this.answers.unshift(event);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.isLoading
    ) {
      this.loadAnswers();
    }
  }
}
