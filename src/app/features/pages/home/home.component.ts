import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FooterComponent } from "../../../core/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, CommonModule, ScrollingModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  content: any;
  pageIndex = 0;
  openedCard: number = 1;
  cards = [
    {
      id: 1,
      place: 'Reykjavík',
      title: 'The Capital City',
      image: 'https://images.prismic.io/visiticeland/fed7e105-3226-4c2f-a764-78f5863ca6ba_reykjavik.png?auto=compress,format'
    },
    {
      id: 2,
      place: 'Blue Lagoon',
      title: 'Famous Geothermal Spa',
      image: 'https://adventures.is/media/157891/icelands-blue-lagoon.jpg?anchor=center&mode=crop&width=970&height=645&rnd=132364168390000000&format=jpg&quality=80'
    },
    {
      id: 3,
      place: 'Gullfoss',
      title: 'The Golden Waterfall',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTSk2vN8FbYPoanlqTPFi7ZGNVdCnlOa1E7Q&s'
    },
    {
      id: 4,
      place: 'Thingvellir National Park',
      title: 'Historic National Park',
      image: 'https://www.tripsavvy.com/thmb/eoX8eNIiMMZdCDC0Otv3qsaREzw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-919584740-5c75b331c9e77c00011c829a.jpg'
    },
    {
      id: 5,
      place: 'Jökulsárlón',
      title: 'Glacier Lagoon',
      image: 'https://arcticshorex.com/wp-content/uploads/2020/07/Jokulsarlon-Glacial-Lagoon-5-1024x576.jpg'
    }
  ]

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.content = document.querySelectorAll('.page-section');
      this.toggleText(0, 'show');
    }
  }

  openCard(cardId: number): void {
    if (cardId < 1) {
      this.openedCard = 1;
    } else if (cardId > this.cards.length) {
      this.openedCard = this.cards.length;
    } else {
      this.openedCard = cardId;
    }
  }

  getProgressBar(): number {
    return (this.openedCard / this.cards.length) * 100;
  }

  toggleText(pageIndex: number, state: 'show' | 'hide'): void {
    if (state === 'show') {
      this.content[pageIndex].querySelector('.page-content').classList.add('show');
    } else {
      this.content[pageIndex].querySelector('.page-content').classList.remove('show');
    }
  };

  togglePageContent(): void {
    this.content.forEach((section: HTMLScriptElement, i: number) => {
      if (i === this.pageIndex) {
        this.toggleText(i, 'show');
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    var delta = event['deltaY'] ?? 0;

    if (delta > 0) {
      if (this.pageIndex >= 1) return;
      this.toggleText(this.pageIndex, 'hide');
      this.pageIndex++;
    } else {
      if (this.pageIndex <= 0) return;
      this.toggleText(this.pageIndex, 'hide');
      this.pageIndex--;
    }

    this.togglePageContent();
  }
}
